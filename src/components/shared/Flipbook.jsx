import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/*
 * A physical, page-turning book built from CSS 3D transforms.
 *
 * Pages are printed on the two faces of "leaves" hinged at the spine. Turning
 * a leaf rotates it 180° around that edge. Its z-index swaps exactly halfway
 * through the turn (a delayed z-index transition), so a leaf is always drawn
 * above the stack it is passing over. Wide screens show two-page spreads with
 * a closed cover at each end; narrow screens show one page at a time. Pages can
 * also be dragged over by hand, with a mouse or a finger.
 */

export const FLIP_MS = 650;

// Design size of one page in a spread. The whole spread is scaled to fit the
// screen, so page layouts stay identical across desktop sizes.
const PAGE_WIDTH = 440;
const PAGE_HEIGHT = 620;
const MAX_SCALE = 1.25;
const SINGLE_MAX_WIDTH = 520;
const STAGGER_MS = 70;
const MAX_RIFFLE_MS = 560;
// Turning by hand: how far the pointer moves before a press becomes a drag, how fast a
// throw finishes a turn on its own (px per ms), and how a released page settles.
const DRAG_START_PX = 6;
const FLICK_SPEED = 0.45;
const RELEASE_EASE = 'cubic-bezier(0.22, 0.75, 0.3, 1)';
const SPREAD_QUERY = '(min-width: 900px) and (min-height: 560px)';

/** True while the screen has room for a two-page spread. */
export function useSpreadLayout() {
  const [spread, setSpread] = useState(() => typeof window !== 'undefined' && window.matchMedia(SPREAD_QUERY).matches);

  useEffect(() => {
    const media = window.matchMedia(SPREAD_QUERY);
    const sync = () => setSpread(media.matches);
    sync();
    media.addEventListener?.('change', sync);
    return () => media.removeEventListener?.('change', sync);
  }, []);

  return spread;
}

// A "view" is what the reader sees at once. In a spread, view v shows pages
// 2v-1 (left) and 2v (right); view 0 is the closed front cover and the last
// view the closed back cover. On a single page, view and page are the same.
export const pageToView = (page, spread) => (spread ? Math.ceil(page / 2) : page);
export const viewToPage = (view, spread) => (spread ? Math.max(0, view * 2 - 1) : view);
export const viewCount = (pageCount, spread) => (spread ? Math.ceil(pageCount / 2) + 1 : pageCount);

export function visiblePages(view, pageCount, spread) {
  const pages = spread ? [view * 2 - 1, view * 2] : [view];
  return pages.filter((page) => page >= 0 && page < pageCount);
}

const stackWidth = (leaves) => (leaves > 0 ? Math.min(8, 2 + leaves) : 0);

function Face({ page, pageCount, side, back, visible, cast, castDelay, renderPage }) {
  const className = ['flipbook-face', back ? 'is-back' : 'is-front', cast && `is-${cast}`].filter(Boolean).join(' ');
  return (
    // Hidden faces are inert so their links stay out of the tab order and the accessibility tree.
    <div className={className} style={cast ? { '--cast-delay': `${castDelay}ms` } : undefined} inert={visible ? undefined : ''}>
      <div className="flipbook-page" data-lenis-prevent>
        {page >= 0 && page < pageCount && renderPage(page, side)}
      </div>
      <span className="flipbook-gutter" />
      <span className="flipbook-cast" />
      <span className="flipbook-shade" />
    </div>
  );
}

export default function Flipbook({ pageCount, page, spread, renderPage, onTurn, flipMs = FLIP_MS, label }) {
  const stageRef = useRef(null);
  const bookRef = useRef(null);
  const leafRefs = useRef([]);
  const dragRef = useRef(null);
  const suppressClickRef = useRef(false);
  const [box, setBox] = useState(null);
  const leafCount = spread ? Math.ceil(pageCount / 2) : pageCount;
  const lastView = viewCount(pageCount, spread) - 1;
  const view = Math.min(pageToView(page, spread), lastView);
  const visible = visiblePages(view, pageCount, spread);

  // Remember where a turn started, so a jump across several pages riffles
  // the leaves over one after another instead of all at once. A page the reader
  // turned by hand has already moved, so it skips the scripted turn.
  const [flip, setFlip] = useState({ from: view, to: view, spread });
  if (flip.to !== view || flip.spread !== spread) {
    setFlip({ from: flip.spread === spread && !flip.byHand ? flip.to : view, to: view, spread });
  }
  const turning = flipMs > 0 && flip.from !== flip.to;
  const forward = flip.to > flip.from;
  const first = Math.min(flip.from, flip.to);
  const end = Math.max(flip.from, flip.to); // leaves first … end-1 change sides
  // Long jumps riffle faster, so crossing a whole chapter never drags.
  const stagger = Math.min(STAGGER_MS, MAX_RIFFLE_MS / Math.max(1, end - first - 1));
  const settleMs = flipMs + Math.max(0, end - first - 1) * stagger;
  const delayOf = (leaf) => {
    if (!turning || leaf < first || leaf >= end) return 0;
    return Math.round((forward ? leaf - first : end - 1 - leaf) * stagger);
  };

  // The page a turning leaf lifts off brightens as it is uncovered; the page
  // it is about to land on darkens under its shadow.
  const castFor = (leaf, back) => {
    if (!turning) return null;
    if (!back && leaf === end) return forward ? 'revealed' : 'covered';
    if (back && leaf === first - 1) return forward ? 'covered' : 'revealed';
    return null;
  };
  const castDelay = (cast) => (cast === 'covered' ? settleMs - flipMs : 0);

  useEffect(() => {
    if (!turning) return undefined;
    const timer = setTimeout(() => setFlip((current) => ({ ...current, from: current.to })), settleMs + 60);
    return () => clearTimeout(timer);
  }, [turning, flip, settleMs]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const measure = () => {
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      setBox((current) => (current?.width === width && current?.height === height ? current : { width, height }));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => clearTimeout(dragRef.current?.timer), []);

  // --- Turning a page by hand -------------------------------------------------
  // The grabbed leaf rotates so its free edge stays with the pointer: the edge of
  // a leaf turned by θ sits at spine + width·cos θ, so θ = acos(offset / width).
  // The leaf is moved directly on the DOM while dragging, then handed back to
  // React (and the CSS transitions) once it has settled.

  const faceOf = (leaf, side) => leafRefs.current[leaf]?.querySelector(side === 'front' ? ':scope > .is-front' : ':scope > .is-back');

  function paintDrag(drag, angle) {
    const progress = drag.forward ? angle / 180 : 1 - angle / 180;
    drag.el.style.transform = `rotateY(${-angle}deg)`;
    drag.el.style.setProperty('--drag-light', Math.sin((angle * Math.PI) / 180).toFixed(3));
    // The page being uncovered is shadowed until the leaf lifts clear; the page
    // it is heading for darkens once the leaf is over it.
    for (const [face, kind, value] of [
      [drag.reveal, 'reveal', (1 - progress) * 0.9],
      [drag.cover, 'cover', Math.max(0, progress * 2 - 1) * 0.9],
    ]) {
      if (!face) continue;
      face.dataset.cast = kind;
      face.style.setProperty('--drag-cast', value.toFixed(3));
    }
  }

  function beginDrag(drag, event, dx) {
    const rect = bookRef.current?.getBoundingClientRect();
    if (!rect) return false;
    const spine = spread ? rect.left + rect.width / 2 : rect.left;
    // A spread turns whichever page was grabbed; a single page turns the way it is pulled.
    const forward = spread ? drag.startX > spine : dx < 0;
    if (forward ? view >= lastView : view <= 0) return false;
    const leaf = forward ? view : view - 1;
    const el = leafRefs.current[leaf];
    if (!el) return false;
    Object.assign(drag, {
      active: true,
      forward,
      leaf,
      el,
      spine,
      width: spread ? rect.width / 2 : rect.width,
      // One page fills a phone, so its turn needs less travel than a spread's.
      gain: spread ? 1 : 2,
      angle: forward ? 0 : 180,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      velocity: 0,
      reveal: forward ? faceOf(leaf + 1, 'front') : faceOf(leaf - 1, 'back'),
      cover: forward ? faceOf(leaf - 1, 'back') : faceOf(leaf + 1, 'front'),
    });
    el.dataset.dragging = '';
    stageRef.current.dataset.grabbing = '';
    stageRef.current.setPointerCapture(event.pointerId);
    window.getSelection()?.removeAllRanges();
    return true;
  }

  function moveDrag(drag, event) {
    const home = drag.spine + (drag.forward ? drag.width : -drag.width);
    const edge = home + (event.clientX - drag.startX) * drag.gain;
    drag.angle = (Math.acos(Math.min(1, Math.max(-1, (edge - drag.spine) / drag.width))) * 180) / Math.PI;
    const elapsed = event.timeStamp - drag.lastTime;
    if (elapsed > 0) drag.velocity = drag.velocity * 0.6 + ((event.clientX - drag.lastX) / elapsed) * 0.4;
    drag.lastX = event.clientX;
    drag.lastTime = event.timeStamp;
    paintDrag(drag, drag.angle);
  }

  function finishDrag(drag) {
    for (const el of [drag.el, drag.reveal, drag.cover]) {
      if (!el) continue;
      for (const property of ['transform', 'transition', '--drag-light', '--drag-cast']) el.style.removeProperty(property);
      delete el.dataset.releasing;
      delete el.dataset.cast;
    }
    if (dragRef.current === drag) dragRef.current = null;
  }

  function releaseDrag(drag, allowTurn) {
    drag.released = true;
    delete stageRef.current.dataset.grabbing;
    // Past halfway the page falls onto the other stack; a quick throw turns it early,
    // and a throw back returns it.
    const throwSpeed = drag.velocity * (drag.forward ? -1 : 1);
    const pastHalf = drag.forward ? drag.angle > 90 : drag.angle < 90;
    const turn = allowTurn && (throwSpeed > FLICK_SPEED || (throwSpeed > -FLICK_SPEED && pastHalf));
    const target = turn === drag.forward ? 180 : 0;
    const ms = flipMs ? Math.round(Math.max(180, (Math.abs(target - drag.angle) / 180) * flipMs)) : 0;
    drag.el.dataset.releasing = '';
    delete drag.el.dataset.dragging;
    drag.el.style.transition = ms ? `transform ${ms}ms ${RELEASE_EASE}, --drag-light ${ms}ms ${RELEASE_EASE}` : 'none';
    for (const face of [drag.reveal, drag.cover]) if (face) face.style.transition = ms ? `--drag-cast ${ms}ms ${RELEASE_EASE}` : 'none';
    paintDrag(drag, target);
    if (turn) {
      setFlip((current) => ({ ...current, byHand: true }));
      onTurn(drag.forward ? 1 : -1);
    }
    drag.timer = setTimeout(() => finishDrag(drag), ms + 40);
  }

  function handlePointerDown(event) {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
    if (turning || dragRef.current) return;
    // With a mouse, presses on the page's own links and buttons stay clicks.
    if (event.pointerType === 'mouse' && event.target.closest('a, button, input, select, textarea')) return;
    dragRef.current = { id: event.pointerId, startX: event.clientX, startY: event.clientY, active: false };
  }

  function handlePointerMove(event) {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId || drag.released) return;
    if (!drag.active) {
      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;
      if (Math.abs(dx) < DRAG_START_PX && Math.abs(dy) < DRAG_START_PX) return;
      // Mostly vertical movement is someone scrolling a page, not turning it.
      if (Math.abs(dy) > Math.abs(dx) || !beginDrag(drag, event, dx)) {
        dragRef.current = null;
        return;
      }
    }
    moveDrag(drag, event);
  }

  function handlePointerEnd(event) {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId || drag.released) return;
    if (!drag.active) {
      dragRef.current = null;
      return;
    }
    // The press became a turn, so the click that follows it must not also act.
    suppressClickRef.current = true;
    setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
    releaseDrag(drag, event.type === 'pointerup');
  }

  let frame = null;
  if (box) {
    frame = spread
      ? {
          width: PAGE_WIDTH * 2,
          height: PAGE_HEIGHT,
          scale: Math.max(0.2, Math.min((box.width - 40) / (PAGE_WIDTH * 2), (box.height - 20) / PAGE_HEIGHT, MAX_SCALE)),
        }
      : { width: Math.max(0, Math.min(box.width - 14, SINGLE_MAX_WIDTH)), height: Math.max(0, box.height - 8), scale: 1 };
  }

  // A closed spread slides so its cover sits in the middle, in step with the cover turning.
  const shift = spread && view === 0 ? -PAGE_WIDTH / 2 : spread && view === lastView ? PAGE_WIDTH / 2 : 0;
  const shiftDelay = turning && first === 0 ? delayOf(0) : turning && end === leafCount ? delayOf(leafCount - 1) : 0;

  const leaves = Array.from({ length: leafCount }, (_, leaf) => {
    const front = spread ? leaf * 2 : leaf;
    const back = spread ? leaf * 2 + 1 : -1;
    const turned = leaf < view;
    const moving = turning && leaf >= first && leaf < end;
    const frontCast = castFor(leaf, false);
    const backCast = castFor(leaf, true);
    return (
      <div
        key={leaf}
        ref={(el) => {
          leafRefs.current[leaf] = el;
        }}
        className={`flipbook-leaf${turned ? ' is-turned' : ''}${moving ? ' is-turning' : ''}`}
        style={{ zIndex: turned ? leafCount + leaf + 1 : leafCount - leaf, '--leaf-delay': `${delayOf(leaf)}ms` }}>
        <Face
          page={front}
          pageCount={pageCount}
          side={spread ? 'right' : 'single'}
          visible={visible.includes(front)}
          cast={frontCast}
          castDelay={castDelay(frontCast)}
          renderPage={renderPage}
        />
        <Face
          back
          page={back}
          pageCount={pageCount}
          side="left"
          visible={visible.includes(back)}
          cast={backCast}
          castDelay={castDelay(backCast)}
          renderPage={renderPage}
        />
        <span className="flipbook-leaf-edge" />
        <span className="flipbook-leaf-shadow" />
      </div>
    );
  });

  return (
    <div
      ref={stageRef}
      className="flipbook-stage"
      role="group"
      aria-roledescription="book"
      aria-label={label}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onClickCapture={(event) => {
        if (!suppressClickRef.current) return;
        suppressClickRef.current = false;
        event.stopPropagation();
        event.preventDefault();
      }}>
      {frame && (
        <div
          className="flipbook-viewport"
          style={{ width: frame.width, height: frame.height, transform: `translate(-50%, -50%) scale(${frame.scale})` }}>
          <div
            key={spread ? 'spread' : 'single'}
            ref={bookRef}
            className={`flipbook-book ${spread ? 'is-spread' : 'is-single'}`}
            style={{ '--flip-ms': `${flipMs}ms`, '--shift-delay': `${shiftDelay}ms`, transform: `translateX(${shift}px)` }}>
            {spread && (
              <div
                className={`flipbook-base is-left${view > 0 ? '' : ' is-empty'}`}
                style={{ '--base-delay': `${delayOf(0) + flipMs / 2}ms` }}>
                <span className="flipbook-stack" style={{ width: stackWidth(view) }} />
              </div>
            )}
            <div
              className={`flipbook-base is-right${view < leafCount ? '' : ' is-empty'}`}
              style={{ '--base-delay': `${delayOf(leafCount - 1) + flipMs / 2}ms` }}>
              <span className="flipbook-stack" style={{ width: stackWidth(spread ? leafCount - view : leafCount - view - 1) }} />
            </div>
            {leaves}
            {view > 0 && <div className="flipbook-edge is-prev" data-cursor="hover" aria-hidden="true" onClick={() => onTurn(-1)} />}
            {view < lastView && <div className="flipbook-edge is-next" data-cursor="hover" aria-hidden="true" onClick={() => onTurn(1)} />}
          </div>
        </div>
      )}
    </div>
  );
}
