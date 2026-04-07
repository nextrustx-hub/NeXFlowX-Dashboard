/**
 * ═══════════════════════════════════════════════════════════════════════════
 * NeXFlowX API Client
 *
 * Direct calls to https://api.nexflowx.tech/api/v1
 * JWT tokens stored in localStorage and injected via Authorization: Bearer
 * ═══════════════════════════════════════════════════════════════════════════
 */

import type {
  LoginRequest,
  LoginResponse,
  AuthMeResponse,
  PipelineResponse,
  TransactionsResponse,
  Transaction,
  UpdateStatusRequest,
  UpdateStatusResponse,
  CreatePaymentLinkRequest,
  CreatePaymentLinkResponse,
  PaymentLinksResponse,
  CreateAPIKeyRequest,
  CreateAPIKeyResponse,
  APIKeysResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  APIError,
} from './contracts';

// ─── CONFIG ────────────────────────────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.nexflowx.tech/api/v1';

export const BACKEND_BASE_URL = API_BASE;

// ─── ERROR CLASS ───────────────────────────────────────────────────────────

export class NexFlowXAPIError extends Error {
  status: number;
  code: string;
  constructor(message: string, status: number, code: string) {
    super(message);
    this.name = 'NexFlowXAPIError';
    this.status = status;
    this.code = code;
  }
}

// ─── HTTP CLIENT ──────────────────────────────────────────────────────────

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('nexflowx_token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options.headers as Record<string, string>) ?? {}),
  };

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    mode: 'cors',
    headers,
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as APIError | null;
    throw new NexFlowXAPIError(
      body?.error?.message ?? body?.message ?? `HTTP ${res.status}`,
      res.status,
      body?.error?.code ?? 'UNKNOWN_ERROR'
    );
  }

  return res.json() as Promise<T>;
}

// ─── AUTH ──────────────────────────────────────────────────────────────────

export const auth = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const res = await request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (typeof window !== 'undefined' && res.token) {
      localStorage.setItem('nexflowx_token', res.token);
      if (res.refresh_token) {
        localStorage.setItem('nexflowx_refresh', res.refresh_token);
      }
    }
    return res;
  },

  async logout(): Promise<void> {
    try {
      await request('/auth/logout', { method: 'POST' });
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('nexflowx_token');
        localStorage.removeItem('nexflowx_refresh');
      }
    }
  },

  async me(): Promise<AuthMeResponse> {
    return request('/auth/me');
  },

  /** Used for token validation only — does NOT hit the backend */
  async validate(): Promise<AuthMeResponse> {
    return request('/auth/me');
  },
};

// ─── PIPELINE ─────────────────────────────────────────────────────────────

export const pipeline = {
  async get(): Promise<PipelineResponse> {
    return request('/pipeline');
  },
};

// ─── TRANSACTIONS ──────────────────────────────────────────────────────────

export const transactions = {
  async list(query: Record<string, string> = {}): Promise<TransactionsResponse> {
    const params = new URLSearchParams(
      Object.entries(query).filter(([, v]) => v != null) as [string, string][]
    );
    return request(`/transactions${params.toString() ? `?${params}` : ''}`);
  },

  async get(id: string): Promise<{ success: boolean; data: Transaction }> {
    return request(`/transactions/${id}`);
  },

  async updateStatus(
    id: string,
    data: UpdateStatusRequest
  ): Promise<UpdateStatusResponse> {
    return request(`/transactions/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
};

// ─── PAYMENT LINKS ─────────────────────────────────────────────────────────

export const paymentLinks = {
  async create(data: CreatePaymentLinkRequest): Promise<CreatePaymentLinkResponse> {
    return request('/payment-links', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async list(): Promise<PaymentLinksResponse> {
    return request('/payment-links');
  },
};

// ─── API KEYS ──────────────────────────────────────────────────────────────

export const apiKeys = {
  async list(): Promise<APIKeysResponse> {
    return request('/api-keys');
  },

  async create(data: CreateAPIKeyRequest): Promise<CreateAPIKeyResponse> {
    return request('/api-keys', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async revoke(id: string): Promise<void> {
    await request(`/api-keys/${id}`, { method: 'DELETE' });
  },
};

// ─── USER (Webhook URL + Profile) ──────────────────────────────────────

export const users = {
  /** GET /users/me — returns { success, user: { webhook_url, webhook_secret, ... } } */
  async getMe(): Promise<AuthMeResponse> {
    return request('/users/me');
  },

  /** PATCH /users/me — update webhook_url */
  async updateMe(data: UpdateUserRequest): Promise<UpdateUserResponse> {
    return request('/users/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
};

// ─── AGGREGATED CLIENT ────────────────────────────────────────────────────

export const api = {
  auth,
  pipeline,
  transactions,
  paymentLinks,
  apiKeys,
  users,
};
