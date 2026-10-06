const BASE_URL = '/api/applications';

async function handleResponse(response) {
  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.details = data?.details || [];
    throw error;
  }

  return data;
}

export async function fetchApplications({ search, status } = {}) {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (status) params.set('status', status);

  const query = params.toString();
  const response = await fetch(`${BASE_URL}${query ? `?${query}` : ''}`);
  return handleResponse(response);
}

export async function fetchStats() {
  const response = await fetch(`${BASE_URL}/stats`);
  return handleResponse(response);
}

export async function createApplication(payload) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
}

export async function updateApplication(id, payload) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
}

export async function updateApplicationStatus(id, status) {
  const response = await fetch(`${BASE_URL}/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return handleResponse(response);
}

export async function deleteApplication(id) {
  const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  return handleResponse(response);
}
