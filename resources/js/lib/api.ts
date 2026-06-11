const API_BASE = '/api/v1';

type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
};

function getToken(): string | null {
    try {
        return localStorage.getItem('jwt_token');
    } catch {
        return null;
    }
}

export function setToken(token: string): void {
    localStorage.setItem('jwt_token', token);
}

export function clearToken(): void {
    localStorage.removeItem('jwt_token');
}

export async function login(email: string, password: string): Promise<string> {
    const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Login failed' }));
        throw new Error(err.message);
    }

    const body: ApiResponse<{ token: string }> = await res.json();
    setToken(body.data.token);
    return body.data.token;
}

async function request<T>(method: string, url: string, data?: unknown): Promise<T> {
    const headers: Record<string, string> = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    const token = getToken();
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${url}`, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
    });

    const body: ApiResponse<T> = await res.json();

    if (!res.ok) {
        throw new Error(body.message || `Request failed (${res.status})`);
    }

    return body.data;
}

export const api = {
    get: <T>(url: string) => request<T>('GET', url),
    post: <T>(url: string, data?: unknown) => request<T>('POST', url, data),
    put: <T>(url: string, data?: unknown) => request<T>('PUT', url, data),
    delete: <T>(url: string) => request<T>('DELETE', url),
};
