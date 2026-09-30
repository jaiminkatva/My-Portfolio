const API_URL = (import.meta.env.VITE_API_URL || '/api/v1').replace(/\/$/, '');

export async function apiRequest(path, options = {}) {
  const { token, body, headers, ...requestOptions } = options;
  const response = await fetch(`${API_URL}${path}`, {
    ...requestOptions,
    headers: {
      Accept: 'application/json',
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) return null;

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(payload?.message || 'Something went wrong. Please try again.');
    error.status = response.status;
    error.details = payload?.details;
    throw error;
  }

  return payload?.data;
}

export const portfolioApi = {
  getContent: () => apiRequest('/content'),
  listProjects: ({ featured = false } = {}) => apiRequest(`/projects${featured ? '?featured=true' : ''}`),
  submitInquiry: (data) => apiRequest('/inquiries', { method: 'POST', body: data }),
};

export const adminApi = {
  login: (credentials) => apiRequest('/auth/login', { method: 'POST', body: credentials }),
  me: (token) => apiRequest('/auth/me', { token }),
  getContent: (token) => apiRequest('/content', { token }),
  updateContent: (token, content) => apiRequest('/content', { method: 'PUT', token, body: content }),
  listProjects: (token) => apiRequest('/projects/admin', { token }),
  createProject: (token, project) => apiRequest('/projects', { method: 'POST', token, body: project }),
  updateProject: (token, id, project) => apiRequest(`/projects/${id}`, { method: 'PATCH', token, body: project }),
  deleteProject: (token, id) => apiRequest(`/projects/${id}`, { method: 'DELETE', token }),
  listInquiries: (token, status = '') => apiRequest(`/inquiries${status ? `?status=${status}` : ''}`, { token }),
  updateInquiry: (token, id, data) => apiRequest(`/inquiries/${id}`, { method: 'PATCH', token, body: data }),
};
