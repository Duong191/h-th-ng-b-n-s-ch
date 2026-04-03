export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

/** Must match BookstoreContext localStorage keys */
const ACCESS_TOKEN_KEY = 'bookstoreAccessToken';
const REFRESH_TOKEN_KEY = 'bookstoreRefreshToken';

interface RequestOptions extends RequestInit {
  token?: string;
}

function isAuthRecoverable(status: number, message: string): boolean {
  const m = message.toLowerCase();
  if (status === 401) return true;
  if (m.includes('jwt expired') || m.includes('tokenexpired')) return true;
  if (status === 500 && m.includes('jwt')) return true;
  return false;
}

let refreshInFlight: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  if (refreshInFlight) return refreshInFlight;

  refreshInFlight = (async () => {
    try {
      const rt = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (!rt) return null;
      const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: rt }),
      });
      if (!res.ok) return null;
      const data = (await res.json()) as { accessToken?: string };
      if (!data.accessToken) return null;
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
      return data.accessToken;
    } catch {
      return null;
    } finally {
      refreshInFlight = null;
    }
  })();

  return refreshInFlight;
}

async function readErrorMessage(response: Response): Promise<string> {
  let message = `Request failed with status ${response.status}`;
  try {
    const payload = (await response.json()) as { message?: string };
    message = payload.message || message;
  } catch {
    /* ignore */
  }
  return message;
}

export async function httpRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { token: initialToken, headers, ...rest } = options;
  let token = initialToken;
  let didRetry = false;

  for (;;) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...rest,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(headers || {}),
      },
    });

    if (!response.ok) {
      const message = await readErrorMessage(response);
      if (!didRetry && token && isAuthRecoverable(response.status, message)) {
        const newAccess = await refreshAccessToken();
        if (newAccess) {
          token = newAccess;
          didRetry = true;
          continue;
        }
      }
      throw new Error(message);
    }

    if (response.status === 204 || response.status === 205) {
      return undefined as T;
    }

    const contentLength = response.headers.get('content-length');
    if (contentLength === '0') {
      return undefined as T;
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('application/json')) {
      const text = await response.text();
      return text as T;
    }

    return (await response.json()) as T;
  }
}
