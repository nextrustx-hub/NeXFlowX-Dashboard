'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  Key,
  Globe,
  Copy,
  Check,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Webhook,
  Zap,
  Shield,
  BookOpen,
  Terminal,
  ChevronRight,
  Braces,
  FileJson,
  ArrowRight,
  ExternalLink,
  LayoutTemplate,
  Code2,
  Info,
  Route,
  Link2,
  Loader2,
  Save,
  Lock,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { api } from '@/lib/api/client';
import type { AuthUser } from '@/lib/api/contracts';

/* ═══════════════════════════════════════════════════════════════
   API TAB — Types loaded from live API
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   UTILITY — copy to clipboard
   ═══════════════════════════════════════════════════════════════ */

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    return true;
  }
}

/* ═══════════════════════════════════════════════════════════════
   CODE BLOCK COMPONENT
   ═══════════════════════════════════════════════════════════════ */

function CodeBlock({
  code,
  language,
  filename,
}: {
  code: string;
  language: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await copyText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="rounded-lg border border-[rgba(51,51,51,0.5)] overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0F0F14] border-b border-[rgba(51,51,51,0.4)]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[11px] cyber-mono text-[#555566]">{filename ?? language}</span>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] cyber-mono transition-all duration-200 ${
            copied
              ? 'text-[#00FF41] bg-[rgba(0,255,65,0.1)]'
              : 'text-[#555566] hover:text-[#888899] hover:bg-[rgba(255,255,255,0.03)]'
          }`}
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copiado' : 'Copiar'}</span>
        </button>
      </div>
      {/* Code area */}
      <div className="bg-[#0A0C10] p-4 overflow-x-auto cyber-scrollbar">
        <pre className="text-[12px] leading-[1.7] cyber-mono text-[#ABB2BF] whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TAB 1: GERIR CHAVES & WEBHOOKS (LIVE API)
   ═══════════════════════════════════════════════════════════════ */

function KeysWebhooksTab() {
  // ── API Keys State ──
  const [apiKeys, setApiKeys] = useState<Array<{
    id: string; key_hash: string; environment: string;
    status: string; last_used_at: string | null; created_at: string;
  }>>([]);
  const [keysLoading, setKeysLoading] = useState(true);
  const [keysError, setKeysError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  // ── Webhook State (via PATCH /users/me) ──
  const [webhookURL, setWebhookURL] = useState('');
  const [webhookLoading, setWebhookLoading] = useState(true);
  const [webhookError, setWebhookError] = useState<string | null>(null);
  const [savingWebhook, setSavingWebhook] = useState(false);
  const [webhookSaved, setWebhookSaved] = useState(false);
  const [webhookSecret, setWebhookSecret] = useState('');
  const [copiedSecret, setCopiedSecret] = useState(false);

  // ── Fetch API Keys ──
  const fetchKeys = async () => {
    setKeysLoading(true);
    setKeysError(null);
    try {
      const res = await api.apiKeys.list();
      setApiKeys(res.data.map((k: Record<string, string>) => ({
        id: k.id ?? '',
        key_hash: (k as Record<string, string>).key_hash ?? (k as Record<string, string>).key_prefix ?? '',
        environment: k.environment ?? 'sandbox',
        status: k.status ?? 'active',
        last_used_at: k.last_used_at ?? null,
        created_at: k.created_at ?? '',
      })));
    } catch {
      setKeysError('Erro ao carregar chaves.');
    } finally {
      setKeysLoading(false);
    }
  };

  // ── Fetch current webhook URL from user profile ──
  const fetchWebhook = async () => {
    setWebhookLoading(true);
    setWebhookError(null);
    try {
      const res = await api.users.getMe();
      setWebhookURL(res.user?.webhook_url ?? '');
      setWebhookSecret(res.user?.webhook_secret ?? '');
    } catch {
      setWebhookError('Erro ao carregar perfil.');
    } finally {
      setWebhookLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
    fetchWebhook();
  }, []);

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const copyKey = async (hash: string, id: string) => {
    await copyText(hash);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // ── No create/revoke — keys are managed server-side ──

  const saveWebhookURL = async () => {
    setSavingWebhook(true);
    setWebhookSaved(false);
    try {
      await api.users.updateMe({ webhook_url: webhookURL });
      setWebhookSaved(true);
    } catch {
      // Silently fail
    } finally {
      setSavingWebhook(false);
    }
  };

  const fmtDate = (d: string | null) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const fmtLastUsed = (d: string | null) => {
    if (!d) return 'Nunca';
    const diff = Date.now() - new Date(d).getTime();
    if (diff < 60000) return 'agora mesmo';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min atrás`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h atrás`;
    return fmtDate(d);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* ═══ API Keys ═══ */}
      <div className="cyber-panel p-4">
        <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-[#00FF41]" />
            <h3 className="text-sm font-semibold text-[#E0E0E8]">API Keys</h3>
            <span className="text-[9px] cyber-mono text-[#444455]">GET /api-keys</span>
          </div>

        {/* Keys List */}
        {keysLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => <div key={i} className="h-24 bg-[rgba(51,51,51,0.15)] rounded-lg animate-pulse" />)}
          </div>
        ) : keysError ? (
          <div className="text-center py-6">
            <p className="text-xs text-[#FF0040]">{keysError}</p>
            <button onClick={fetchKeys} className="text-[10px] text-[#555566] underline mt-2 hover:no-underline">Tentar novamente</button>
          </div>
        ) : (
          <div className="space-y-3 max-h-[480px] overflow-y-auto cyber-scrollbar pr-1">
            {apiKeys.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-xs text-[#555566]">Nenhuma chave API criada</p>
              </div>
            ) : apiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  apiKey.status === 'active'
                    ? 'bg-[rgba(10,10,14,0.4)] border-[rgba(51,51,51,0.3)]'
                    : 'bg-[rgba(10,10,14,0.2)] border-[rgba(51,51,51,0.15)] opacity-60'
                }`}
              >
                <div className="flex items-center gap-2">
                    {apiKey.status === 'active'
                      ? <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF41]" />
                      : <AlertTriangle className="w-3.5 h-3.5 text-[#FF0040]" />}
                    <span className="text-xs font-medium text-[#E0E0E8]">{apiKey.id === '' ? 'Chave Ativa' : apiKey.id}</span>
                  </div>
                <div className="flex items-center gap-2 p-2 rounded bg-[rgba(10,10,14,0.6)] border border-[rgba(51,51,51,0.3)]">
                  <button
                    onClick={() => toggleKeyVisibility(apiKey.id)}
                    className="shrink-0 p-1 rounded hover:bg-[rgba(255,255,255,0.05)] text-[#555566] hover:text-[#E0E0E8] transition-colors"
                  >
                    {visibleKeys.has(apiKey.id) ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <code className="flex-1 text-[11px] cyber-mono text-[#888899] truncate">
                    {visibleKeys.has(apiKey.id) ? apiKey.key_hash : 'nx_live_••••••••••••'}
                  </code>
                  <button
                    onClick={() => copyKey(apiKey.key_hash, apiKey.id)}
                    className={`shrink-0 p-1 rounded transition-colors ${
                      copiedKey === apiKey.id
                        ? 'text-[#00FF41]'
                        : 'hover:bg-[rgba(255,255,255,0.05)] text-[#555566] hover:text-[#E0E0E8]'
                    }`}
                  >
                    {copiedKey === apiKey.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[9px] cyber-mono text-[#555566]">Criada: {fmtDate(apiKey.created_at)}</span>
                  <span className="text-[9px] cyber-mono text-[#555566]">Último uso: {fmtLastUsed(apiKey.last_used_at)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ═══ Webhook URL Configuration ═══ */}
      <div className="space-y-4">
        <div className="cyber-panel p-4 border border-[rgba(0,240,255,0.15)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Webhook className="w-4 h-4 text-[#00F0FF]" />
              <h3 className="text-sm font-semibold text-[#E0E0E8]">Webhook URL</h3>
              <span className="text-[9px] cyber-mono text-[#444455]">PATCH /users/me</span>
            </div>
            {webhookURL ? (
              <div className="flex items-center gap-1.5">
                <span className="status-dot active" style={{ width: '6px', height: '6px' }} />
                <span className="text-[10px] cyber-mono text-[#00FF41]">CONFIGURADO</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800]" />
                <span className="text-[10px] cyber-mono text-[#FFB800]">CONFIGURAR</span>
              </div>
            )}
          </div>

          {webhookLoading ? (
            <div className="space-y-3">
              <div className="h-8 bg-[rgba(51,51,51,0.15)] rounded animate-pulse" />
            </div>
          ) : webhookError ? (
            <div className="text-center py-4">
              <p className="text-xs text-[#FF0040]">{webhookError}</p>
              <button onClick={fetchWebhook} className="text-[10px] text-[#555566] underline mt-1 hover:no-underline">
                Tentar
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] cyber-mono text-[#555566] mb-1.5 tracking-wider">
                  WEBHOOK URL (NOTIFICAÇÕES)
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555566]" />
                    <input
                      type="url"
                      value={webhookURL}
                      onChange={(e) => { setWebhookURL(e.target.value); setWebhookSaved(false); }}
                      placeholder="https://seu-site.com/api/callback"
                      className="cyber-input w-full pl-10 pr-3 py-2.5 rounded-lg text-sm cyber-mono text-[#E0E0E8]"
                    />
                  </div>
                  <button
                    onClick={saveWebhookURL}
                    disabled={savingWebhook}
                    className="cyber-btn-primary px-3 py-2.5 rounded-lg text-xs cyber-mono disabled:opacity-40"
                  >
                    {savingWebhook ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <span><Save className="w-3 h-3" /> Salvar</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Success feedback */}
              {webhookSaved && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[rgba(0,255,65,0.06)] border border-[rgba(0,255,65,0.25)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF41] shrink-0" />
                  <span className="text-[11px] text-[#00FF41]">Webhook URL guardado com sucesso!</span>
                </div>
              )}

              {/* Info */}
              <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-[rgba(10,10,14,0.4)] border border-[rgba(51,51,51,0.3)]">
                <Info className="w-3.5 h-3.5 text-[#00F0FF] shrink-0 mt-0.5" />
                <div className="text-[10px] text-[#888899] leading-relaxed">
                  <span className="text-[#E0E0E8] font-medium">Webhooks automáticos:</span>{' '}
                  Quando o NeXFlowX receber uma confirmação da Stripe, uma notificação
                  será enviada para este URL com assinatura HMAC-SHA256.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ═══ HMAC Webhook Secret ═══ */}
        <div className="cyber-panel p-4 border border-[rgba(255,184,0,0.15)]">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-4 h-4 text-[#FFB800]" />
            <h3 className="text-sm font-semibold text-[#E0E0E8]">HMAC Webhook Secret</h3>
          </div>
          {webhookSecret ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-2 rounded bg-[rgba(10,10,14,0.6)] border border-[rgba(51,51,51,0.3)]">
                <code className="flex-1 text-[11px] cyber-mono text-[#FFB800] truncate">{webhookSecret}</code>
                <button
                  onClick={async () => { await copyText(webhookSecret); setCopiedSecret(true); setTimeout(() => setCopiedSecret(false), 2000); }}
                  className={`shrink-0 p-1 rounded transition-colors ${
                    copiedSecret
                      ? 'text-[#00FF41]'
                      : 'hover:bg-[rgba(255,255,255,0.05)] text-[#555566] hover:text-[#E0E0E8]'
                  }`}
                >
                  {copiedSecret ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-[10px] text-[#888899] leading-relaxed">
                Use este secret para validar a assinatura HMAC-SHA256 no header x-nexflowx-signature.
              </p>
            </div>
          ) : (
            <p className="text-xs text-[#555566]">Nenhum secret configurado</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION NAV ITEM
   ═══════════════════════════════════════════════════════════════ */

interface DocSection {
  id: string;
  number: string;
  label: string;
  icon: React.ReactNode;
}

function SectionNavItem({
  section,
  active,
  onClick,
}: {
  section: DocSection;
  active: boolean;
  onClick: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onClick(section.id)}
      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all duration-200 group ${
        active
          ? 'bg-[rgba(0,255,65,0.06)] border border-[rgba(0,255,65,0.2)]'
          : 'border border-transparent hover:bg-[rgba(255,255,255,0.02)] hover:border-[rgba(51,51,51,0.3)]'
      }`}
    >
      <span className={`shrink-0 w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold cyber-mono ${
        active ? 'bg-[rgba(0,255,65,0.15)] text-[#00FF41]' : 'bg-[rgba(51,51,51,0.3)] text-[#555566] group-hover:text-[#888899]'
      }`}>
        {section.number}
      </span>
      <span className={`text-[11px] truncate ${
        active ? 'text-[#E0E0E8] font-medium' : 'text-[#888899] group-hover:text-[#BBBBCC]'
      }`}>
        {section.label}
      </span>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TAB 2: DOCUMENTAÇÃO DA API (OFFICIAL v1)
   ═══════════════════════════════════════════════════════════════ */

function ApiDocsTab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('auth');

  // Fetch user's active API key for dynamic code snippet injection
  const [activeApiKey, setActiveApiKey] = useState<string>('');
  const BASE_URL = 'https://api.nexflowx.tech/api/v1';

  useEffect(() => {
    async function loadFirstActiveKey() {
      try {
        const res = await api.apiKeys.list();
        const activeKey = res.data.find(k => k.status === 'active');
        if (activeKey) {
          setActiveApiKey(activeKey.key_hash);
        }
      } catch {
        // Fallback: show placeholder
      }
    }
    loadFirstActiveKey();
  }, []);

  const activeApiKeyValue = activeApiKey || 'nx_live_••••••••••••';

  const sections: DocSection[] = [
    { id: 'auth', number: '1', label: 'Autenticação', icon: <Shield className="w-3.5 h-3.5" /> },
    { id: 'flows', number: '2', label: 'Fluxos de Integração', icon: <Route className="w-3.5 h-3.5" /> },
    { id: 'endpoint', number: '3', label: 'Referência da API', icon: <FileJson className="w-3.5 h-3.5" /> },
    { id: 'sdk', number: '4', label: 'Guia SDK Frontend', icon: <Code2 className="w-3.5 h-3.5" /> },
    { id: 'webhooks', number: '5', label: 'Pós-Pagamento & Webhooks', icon: <Webhook className="w-3.5 h-3.5" /> },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(`docs-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id.replace('docs-', ''));
          }
        }
      },
      { root: container, rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(`docs-${s.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ── Code Examples (dynamic API key injection) ── */

  const curlPaymentLinks = `curl -X POST ${BASE_URL}/payment-links \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: ${activeApiKeyValue}" \\
  -d '{
    "amount": 250.00,
    "currency": "EUR",
    "description": "Fatura #4091 - Subscrição Anual"
  }'`;

  const jsPaymentLinks = `const response = await fetch("${BASE_URL}/payment-links", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "${activeApiKeyValue}"
  },
  body: JSON.stringify({
    amount: 250.00,
    currency: "EUR",
    description: "Fatura #4091 - Subscrição Anual"
  })
});

const data = await response.json();
console.log("Checkout URL:", data.data.shareable_url);`;

  const responsePaymentLinks = `{
  "data": {
    "id": "cmnf9h6yd0000zvhklp5nbhxg",
    "shareable_url": "https://pay.nexflowx.tech/cmnf9h6yd0000zvhklp5nbhxg"
  }
}`;

  const sdkImportCode = `<script src="${BASE_URL.replace('/api/v1', '')}/sdk.js"></script>`;

  const sdkInitCode = `<!-- Container do Checkout -->
<div id="nexflowx-checkout-container"></div>

<script>
  // Inicializa o cliente com a sua chave
  const nexflow = NexFlowX('${activeApiKeyValue}');

  async function iniciarPagamento() {
    // 1. Gera a transação dinamicamente
    const checkout = await nexflow.checkout({
      amount: 250.00,
      currency: "EUR",
      description: "Fatura #4091"
    });

    // 2. Monta o Iframe na sua página
    //    URL do checkout: https://pay.nexflowx.tech/{id}
    await checkout.mount('#nexflowx-checkout-container');
  }

  // Chamar ao clicar no botão de compra
  document.getElementById('botao-pagar')
    .addEventListener('click', iniciarPagamento);
</script>`;

  const webhookPayloadCode = `// POST para o seu endpoint
// Content-Type: application/json

{
  "event": "transaction.confirmed",
  "data": {
    "id": "cmnf9h6yd0000zvhklp5nbhxg",
    "amount": 250.00,
    "currency": "EUR",
    "status": "confirmed",
    "paid_at": "2025-01-15T14:32:00Z"
  }
}`;

  /* ── Required Badge ── */
  const reqBadge = (
    <Badge className="text-[8px] px-1 py-px shrink-0" style={{ backgroundColor: 'rgba(0,255,65,0.12)', color: '#00FF41', border: '1px solid rgba(0,255,65,0.3)' }}>
      obrigatório
    </Badge>
  );
  const optBadge = (
    <Badge className="text-[8px] px-1 py-px shrink-0" style={{ backgroundColor: 'rgba(255,184,0,0.12)', color: '#FFB800', border: '1px solid rgba(255,184,0,0.3)' }}>
      opcional
    </Badge>
  );

  return (
    <div className="space-y-4">
      {/* ── Overview banner ── */}
      <div className="cyber-panel p-5 border border-[rgba(0,240,255,0.15)]">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-[rgba(0,240,255,0.08)] border border-[rgba(0,240,255,0.2)]">
            <BookOpen className="w-5 h-5 text-[#00F0FF]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-[#E0E0E8] mb-1">NeXFlowX API v1 — Documentação de Integração</h3>
            <p className="text-xs text-[#888899] leading-relaxed">
              A API do NeXFlowX permite a integração de um motor logístico de pagamentos globais na sua plataforma.
              Através de uma única integração, o nosso orquestrador roteia, protege e processa transações de forma invisível.
            </p>
          </div>
          <Badge className="cyber-badge-green text-[9px] shrink-0 hidden sm:inline-flex">v1.0</Badge>
        </div>
      </div>

      {/* ── Main layout: sidebar nav + content ── */}
      <div className="flex gap-4">
        {/* ── Left mini-nav (desktop) ── */}
        <aside className="hidden lg:block w-52 shrink-0">
          <nav className="sticky top-4 space-y-1">
            {sections.map((s) => (
              <SectionNavItem key={s.id} section={s} active={activeSection === s.id} onClick={scrollToSection} />
            ))}
          </nav>
        </aside>

        {/* ── Mobile horizontal nav ── */}
        <div className="lg:hidden w-full">
          <div className="flex gap-2 overflow-x-auto cyber-scrollbar pb-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] whitespace-nowrap transition-all duration-200 border ${
                  activeSection === s.id
                    ? 'bg-[rgba(0,255,65,0.08)] border-[rgba(0,255,65,0.25)] text-[#00FF41]'
                    : 'bg-[rgba(10,10,14,0.4)] border-[rgba(51,51,51,0.3)] text-[#888899]'
                }`}
              >
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold cyber-mono bg-[rgba(51,51,51,0.3)]">
                  {s.number}
                </span>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content area ── */}
        <main ref={containerRef} className="flex-1 min-w-0 space-y-6 lg:max-h-[calc(100vh-280px)] lg:overflow-y-auto lg:pr-2 cyber-scrollbar scroll-smooth">

          {/* ════════════════════════════════════════
             SECTION 1: AUTENTICAÇÃO E AMBIENTES
             ════════════════════════════════════════ */}
          <section id="docs-auth" className="cyber-panel p-5">
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[rgba(51,51,51,0.3)]">
              <div className="p-1.5 rounded-lg bg-[rgba(0,255,65,0.08)]">
                <Shield className="w-4 h-4 text-[#00FF41]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#E0E0E8]">1. Autenticação e Ambientes</h4>
                <p className="text-[10px] text-[#555566]">Configuração de acesso à API</p>
              </div>
              <Badge className="ml-auto cyber-badge-green text-[9px]">REQUERIDO</Badge>
            </div>

            <div className="space-y-4 text-xs text-[#888899] leading-relaxed">
              <p>
                Todos os pedidos à API devem ser autenticados através de uma chave de API{' '}
                <code className="text-[11px] px-1.5 py-0.5 rounded bg-[rgba(0,255,65,0.08)] text-[#00FF41] border border-[rgba(0,255,65,0.2)]">
                  x-api-key
                </code>, enviada no cabeçalho (header) de cada requisição.
              </p>

              {/* Environment info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-[rgba(10,10,14,0.5)] border border-[rgba(51,51,51,0.3)]">
                  <p className="text-[10px] cyber-mono text-[#555566] mb-1.5 tracking-wider">BASE URL</p>
                  <code className="text-[11px] text-[#00F0FF] break-all">{BASE_URL}</code>
                </div>
                <div className="p-3 rounded-lg bg-[rgba(10,10,14,0.5)] border border-[rgba(51,51,51,0.3)]">
                  <p className="text-[10px] cyber-mono text-[#555566] mb-1.5 tracking-wider">HEADER AUTH</p>
                  <code className="text-[11px] text-[#00FF41]">x-api-key</code>
                </div>
                <div className="p-3 rounded-lg bg-[rgba(10,10,14,0.5)] border border-[rgba(51,51,51,0.3)]">
                  <p className="text-[10px] cyber-mono text-[#555566] mb-1.5 tracking-wider">FORMATO DADOS</p>
                  <code className="text-[11px] text-[#E0E0E8]">application/json</code>
                </div>
              </div>

              {/* Header example */}
              <div className="p-3 rounded-lg bg-[rgba(10,10,14,0.5)] border border-[rgba(51,51,51,0.3)]">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] cyber-mono text-[#555566] tracking-wider">EXEMPLO DE HEADER</p>
                  {activeApiKey && (
                    <span className="text-[8px] cyber-mono px-1.5 py-px rounded bg-[rgba(0,240,255,0.08)] text-[#00F0FF] border border-[rgba(0,240,255,0.15)]">
                      DINÂMICO — sua chave ativa
                    </span>
                  )}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] cyber-mono text-[#555566] w-24 shrink-0">x-api-key:</span>
                    <code className="text-[11px] text-[#E0E0E8] font-medium break-all">{activeApiKeyValue}</code>
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div className="p-3 rounded-lg border border-[rgba(255,184,0,0.15)] bg-[rgba(255,184,0,0.04)]">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#FFB800] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-medium text-[#FFB800]">Segurança</p>
                    <p className="text-[10px] text-[#888899] mt-0.5">
                      Nunca exponha a sua API Key em código client-side (browser). Sempre faça chamadas a partir do seu backend.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════
             SECTION 2: FLUXOS DE INTEGRAÇÃO
             ════════════════════════════════════════ */}
          <section id="docs-flows" className="space-y-4">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="p-1.5 rounded-lg bg-[rgba(191,64,255,0.08)]">
                <Route className="w-4 h-4 text-[#BF40FF]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#E0E0E8]">2. Fluxos de Integração</h4>
                <p className="text-[10px] text-[#555566]">Duas vias, dependendo do controlo de UX pretendido</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Option A: Hosted Checkout */}
              <div className="cyber-panel p-5 border border-[rgba(0,255,65,0.12)] hover:border-[rgba(0,255,65,0.3)] transition-colors">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-lg bg-[rgba(0,255,65,0.08)]">
                    <ExternalLink className="w-4 h-4 text-[#00FF41]" />
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-[#E0E0E8]">Opção A — Hosted Checkout</h5>
                    <Badge className="text-[8px] mt-0.5" style={{ backgroundColor: 'rgba(0,255,65,0.1)', color: '#00FF41', border: '1px solid rgba(0,255,65,0.25)' }}>
                      Redirecionamento
                    </Badge>
                  </div>
                </div>
                <p className="text-[11px] text-[#888899] leading-relaxed mb-3">
                  A abordagem mais rápida. O seu servidor cria a transação e{' '}
                  <span className="text-[#00FF41] font-medium">redireciona o utilizador</span>{' '}
                  para a página de checkout segura, gerida pela infraestrutura NeXFlowX.
                </p>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[rgba(10,10,14,0.4)] border border-[rgba(51,51,51,0.2)]">
                  <span className="text-[9px] cyber-mono text-[#555566]">Fluxo:</span>
                  <code className="text-[9px] text-[#00F0FF]">POST → URL → redirect</code>
                </div>
              </div>

              {/* Option B: Embedded Checkout */}
              <div className="cyber-panel p-5 border border-[rgba(191,64,255,0.12)] hover:border-[rgba(191,64,255,0.3)] transition-colors">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-lg bg-[rgba(191,64,255,0.08)]">
                    <LayoutTemplate className="w-4 h-4 text-[#BF40FF]" />
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-[#E0E0E8]">Opção B — Embedded Checkout</h5>
                    <Badge className="text-[8px] mt-0.5" style={{ backgroundColor: 'rgba(191,64,255,0.1)', color: '#BF40FF', border: '1px solid rgba(191,64,255,0.25)' }}>
                      JS SDK / Iframe
                    </Badge>
                  </div>
                </div>
                <p className="text-[11px] text-[#888899] leading-relaxed mb-3">
                  Experiência nativa onde o utilizador{' '}
                  <span className="text-[#BF40FF] font-medium">nunca sai do seu website</span>.{' '}
                  O checkout é renderizado diretamente na sua interface através do SDK frontend.
                </p>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[rgba(10,10,14,0.4)] border border-[rgba(51,51,51,0.2)]">
                  <span className="text-[9px] cyber-mono text-[#555566]">Fluxo:</span>
                  <code className="text-[9px] text-[#BF40FF]">SDK → checkout → mount</code>
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════
             SECTION 3: REFERÊNCIA DA API (ENDPOINTS)
             ════════════════════════════════════════ */}
          <section id="docs-endpoint" className="cyber-panel p-5">
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[rgba(51,51,51,0.3)]">
              <div className="p-1.5 rounded-lg bg-[rgba(0,240,255,0.08)]">
                <FileJson className="w-4 h-4 text-[#00F0FF]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#E0E0E8]">3. Criar Intenção de Pagamento</h4>
                <p className="text-[10px] text-[#555566]">Gera uma nova transação e devolve as credenciais de checkout</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-[#888899] leading-relaxed">
              {/* Method + URL */}
              <div className="p-3 rounded-lg bg-[rgba(10,10,14,0.5)] border border-[rgba(51,51,51,0.3)]">
                <p className="text-[10px] cyber-mono text-[#555566] mb-2 tracking-wider">METHOD & URL</p>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-[11px] font-bold text-[#00FF41] cyber-mono px-2 py-0.5 rounded bg-[rgba(0,255,65,0.08)]">POST</span>
                  <code className="text-[11px] text-[#E0E0E8] break-all">/payment-links</code>
                </div>
              </div>

              {/* Content-Type + Host */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-[rgba(10,10,14,0.5)] border border-[rgba(51,51,51,0.3)]">
                  <p className="text-[10px] cyber-mono text-[#555566] mb-1 tracking-wider">HOST</p>
                  <code className="text-[11px] text-[#00F0FF]">api.nexflowx.tech</code>
                </div>
                <div className="p-3 rounded-lg bg-[rgba(10,10,14,0.5)] border border-[rgba(51,51,51,0.3)]">
                  <p className="text-[10px] cyber-mono text-[#555566] mb-1 tracking-wider">CONTENT-TYPE</p>
                  <code className="text-[11px] text-[#E0E0E8]">application/json</code>
                </div>
              </div>

              {/* Parameters */}
              <div>
                <p className="text-[10px] cyber-mono text-[#555566] mb-3 tracking-wider">BODY PARAMETERS</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[rgba(10,10,14,0.3)] border border-[rgba(51,51,51,0.2)]">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="text-[11px] text-[#E0E0E8] font-medium">amount</code>
                        {reqBadge}
                      </div>
                      <p className="text-[10px] text-[#555566]">
                        <span className="text-[#888899]">Number</span> — Valor total da transação. Deve ser um número decimal (ex: <code className="text-[#00F0FF]">250.00</code>).
                      </p>
                    </div>
                    <code className="text-[11px] text-[#00FF41] shrink-0 cyber-mono w-20 text-right">Float</code>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[rgba(10,10,14,0.3)] border border-[rgba(51,51,51,0.2)]">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="text-[11px] text-[#E0E0E8] font-medium">currency</code>
                        {reqBadge}
                      </div>
                      <p className="text-[10px] text-[#555566]">
                        <span className="text-[#888899]">String</span> — Código ISO 4217 da moeda com 3 letras (ex: <code className="text-[#00F0FF]">&quot;EUR&quot;</code>, <code className="text-[#00F0FF]">&quot;USD&quot;</code>).
                      </p>
                    </div>
                    <code className="text-[11px] text-[#00FF41] shrink-0 cyber-mono w-20 text-right">String</code>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[rgba(10,10,14,0.3)] border border-[rgba(51,51,51,0.2)]">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="text-[11px] text-[#E0E0E8] font-medium">description</code>
                        {optBadge}
                      </div>
                      <p className="text-[10px] text-[#555566]">
                        <span className="text-[#888899]">String</span> — Referência interna ou descrição do pedido para efeitos de reconciliação.
                      </p>
                    </div>
                    <code className="text-[11px] text-[#FFB800] shrink-0 cyber-mono w-20 text-right">String?</code>
                  </div>
                </div>
              </div>

              {/* Response fields */}
              <div className="p-3 rounded-lg bg-[rgba(10,10,14,0.5)] border border-[rgba(51,51,51,0.3)]">
                <p className="text-[10px] cyber-mono text-[#555566] mb-2 tracking-wider">RESPOSTA — 201 CREATED</p>
                <div className="flex flex-wrap gap-2">
                  <code className="text-[10px] text-[#00F0FF] bg-[rgba(0,240,255,0.06)] px-2 py-1 rounded border border-[rgba(0,240,255,0.15)]">.data.id</code>
                  <code className="text-[10px] text-[#00FF41] bg-[rgba(0,255,65,0.06)] px-2 py-1 rounded border border-[rgba(0,255,65,0.15)]">.data.shareable_url</code>
                </div>
              </div>

              {/* Code blocks — cURL + JS + Response */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-3.5 h-3.5 text-[#FF8C00]" />
                    <span className="text-[10px] cyber-mono text-[#555566] tracking-wider">cURL</span>
                  </div>
                  <CodeBlock language="bash" filename="terminal" code={curlPaymentLinks} />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Braces className="w-3.5 h-3.5 text-[#BF40FF]" />
                    <span className="text-[10px] cyber-mono text-[#555566] tracking-wider">JAVASCRIPT</span>
                  </div>
                  <CodeBlock language="javascript" filename="create-payment.js" code={jsPaymentLinks} />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRight className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span className="text-[10px] cyber-mono text-[#555566] tracking-wider">RESPOSTA 201</span>
                  </div>
                  <CodeBlock language="json" filename="response.json" code={responsePaymentLinks} />
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════
             SECTION 4: GUIA SDK FRONTEND
             ════════════════════════════════════════ */}
          <section id="docs-sdk" className="cyber-panel p-5">
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[rgba(51,51,51,0.3)]">
              <div className="p-1.5 rounded-lg bg-[rgba(191,64,255,0.08)]">
                <Code2 className="w-4 h-4 text-[#BF40FF]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#E0E0E8]">4. Guia de Implementação — SDK Frontend</h4>
                <p className="text-[10px] text-[#555566]">Embedded Checkout (Opção B) — renderize o checkout na sua página</p>
              </div>
              <Badge className="ml-auto text-[9px]" style={{ backgroundColor: 'rgba(191,64,255,0.1)', color: '#BF40FF', border: '1px solid rgba(191,64,255,0.25)' }}>
                OPÇÃO B
              </Badge>
            </div>

            <div className="space-y-4 text-xs text-[#888899] leading-relaxed">
              {/* Step 1 */}
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold cyber-mono bg-[rgba(0,240,255,0.1)] text-[#00F0FF] border border-[rgba(0,240,255,0.2)]">
                    1
                  </span>
                  <h5 className="text-[11px] font-semibold text-[#E0E0E8]">Importar o SDK NeXFlowX</h5>
                </div>
                <p className="text-[10px] text-[#555566] mb-2 ml-8.5">
                  Adicione o script ao <code className="text-[#BF40FF]">&lt;head&gt;</code> ou final do <code className="text-[#BF40FF]">&lt;body&gt;</code> do seu website:
                </p>
                <div className="ml-8.5">
                  <CodeBlock language="html" filename="index.html" code={sdkImportCode} />
                </div>

                {/* Step 2 */}
                <div className="mt-4">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold cyber-mono bg-[rgba(0,240,255,0.1)] text-[#00F0FF] border border-[rgba(0,240,255,0.2)]">
                      2
                    </span>
                    <h5 className="text-[11px] font-semibold text-[#E0E0E8]">Inicializar e Montar o Checkout</h5>
                  </div>
                  <p className="text-[10px] text-[#555566] mb-2 ml-8.5">
                    Crie um contentor HTML onde o formulário será injetado e utilize o SDK para iniciar a transação:
                  </p>
                  <div className="ml-8.5">
                    <CodeBlock language="html" filename="checkout.js" code={sdkInitCode} />
                  </div>
                </div>

                {/* SDK method reference */}
                <div className="p-3 rounded-lg bg-[rgba(10,10,14,0.4)] border border-[rgba(51,51,51,0.3)] mt-4">
                  <p className="text-[10px] cyber-mono text-[#555566] mb-2 tracking-wider">MÉTODOS DO SDK</p>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <code className="text-[10px] text-[#BF40FF] w-40 shrink-0">NexFlowX(key)</code>
                      <span className="text-[10px] text-[#555566]">— Inicializa o cliente</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-[10px] text-[#00F0FF] w-40 shrink-0">.checkout(params)</code>
                      <span className="text-[10px] text-[#555566]">— Gera a transação</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-[10px] text-[#00FF41] w-40 shrink-0">.mount(selector)</code>
                      <span className="text-[10px] text-[#555566]">— Renderiza o iframe</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════
             SECTION 5: PÓS-PAGAMENTO & WEBHOOKS
             ════════════════════════════════════════ */}
          <section id="docs-webhooks" className="cyber-panel p-5">
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[rgba(51,51,51,0.3)]">
              <div className="p-1.5 rounded-lg bg-[rgba(255,184,0,0.08)]">
                <Webhook className="w-4 h-4 text-[#FFB800]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#E0E0E8]">5. Pós-Pagamento & Webhooks</h4>
                <p className="text-[10px] text-[#555566]">Notificações em tempo real para o seu backend</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-[#888899] leading-relaxed">
              <p>
                Após o pagamento ser processado com sucesso, o cliente visualizará a nossa página de confirmação.
                Para que o seu sistema (Backend) seja notificado em tempo real de que o pagamento foi liquidado,
                a nossa equipa irá configurar um Webhook a apontar para o seu servidor.
              </p>

              {/* Event info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-[rgba(10,10,14,0.5)] border border-[rgba(51,51,51,0.3)]">
                  <p className="text-[10px] cyber-mono text-[#555566] mb-1.5 tracking-wider">EVENTO DISPARADO</p>
                  <code className="text-[11px] text-[#00FF41] px-1.5 py-0.5 rounded bg-[rgba(0,255,65,0.08)] border border-[rgba(0,255,65,0.2)]">
                    transaction.confirmed
                  </code>
                </div>
                <div className="p-3 rounded-lg bg-[rgba(10,10,14,0.5)] border border-[rgba(51,51,51,0.3)]">
                  <p className="text-[10px] cyber-mono text-[#555566] mb-1.5 tracking-wider">REQUISITO</p>
                  <p className="text-[10px] text-[#E0E0E8]">Fornecer URL do endpoint ao gestor de conta NeXFlowX</p>
                </div>
              </div>

              {/* Webhook URL example */}
              <div className="p-3 rounded-lg bg-[rgba(10,10,14,0.5)] border border-[rgba(51,51,51,0.3)]">
                <p className="text-[10px] cyber-mono text-[#555566] mb-2 tracking-wider">EXEMPLO DE WEBHOOK URL</p>
                <code className="text-[11px] text-[#00F0FF] break-all">
                  https://api.sua-empresa.com/webhooks/nexflowx
                </code>
              </div>

              {/* Info box */}
              <div className="p-3 rounded-lg border border-[rgba(0,240,255,0.15)] bg-[rgba(0,240,255,0.04)]">
                <div className="flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 text-[#00F0FF] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-medium text-[#00F0FF]">Configuração do Webhook</p>
                    <p className="text-[10px] text-[#888899] mt-0.5">
                      A configuração do webhook é feita pela equipa NeXFlowX. Forneça ao seu gestor de conta
                      o URL do seu servidor que irá receber as confirmações de pagamento.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payload example */}
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowRight className="w-3.5 h-3.5 text-[#FFB800]" />
                  <span className="text-[10px] cyber-mono text-[#555566] tracking-wider">WEBHOOK PAYLOAD</span>
                </div>
                <CodeBlock language="json" filename="webhook-payload.json" code={webhookPayloadCode} />
              </div>

              {/* Security Note */}
              <div className="p-3 rounded-lg border border-[rgba(255,184,0,0.15)] bg-[rgba(255,184,0,0.04)]">
                <div className="flex items-start gap-2">
                  <Shield className="w-3.5 h-3.5 text-[#FFB800] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-medium text-[#FFB800]">Segurança: HMAC-SHA256</p>
                    <p className="text-[10px] text-[#888899] mt-0.5">
                      Cada payload de webhook é assinado com HMAC-SHA256. Valide a assinatura usando o header{' '}
                      <code className="text-[10px] px-1 py-0.5 rounded bg-[rgba(255,184,0,0.1)] text-[#FFB800] border border-[rgba(255,184,0,0.2)]">x-nexflowx-signature</code>{' '}
                      e o seu Webhook Secret disponível na aba &quot;Chaves &amp; Webhooks&quot;.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT — DEVELOPER HUB WITH TABS
   ═══════════════════════════════════════════════════════════════ */

export default function APIManagement() {
  const [activeTab, setActiveTab] = useState('keys');

  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-1">
        <ChevronRight className="w-4 h-4 text-[#00FF41]" />
        <span className="text-[10px] cyber-mono text-[#555566] tracking-wider">API & INTEGRAÇÃO</span>
      </div>
      <h3 className="text-lg font-bold text-[#E0E0E8]">Developer Hub</h3>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-[rgba(15,15,20,0.5)] border border-[rgba(51,51,51,0.5)] h-11 p-1 rounded-xl w-full justify-start">
          <TabsTrigger
            value="keys"
            className="data-[state=active]:bg-[rgba(0,255,65,0.08)] data-[state=active]:text-[#00FF41] data-[state=active]:shadow-[0_0_12px_rgba(0,255,65,0.1)] text-[#888899] hover:text-[#BBBBCC] hover:bg-[rgba(255,255,255,0.03)] data-[state=active]:border-[rgba(0,255,65,0.25)] rounded-lg px-4 gap-2 transition-all duration-200"
          >
            <Key className="w-4 h-4" />
            <span className="text-xs font-medium">Gerir Chaves & Webhooks</span>
          </TabsTrigger>
          <TabsTrigger
            value="docs"
            className="data-[state=active]:bg-[rgba(0,255,65,0.08)] data-[state=active]:text-[#00FF41] data-[state=active]:shadow-[0_0_12px_rgba(0,255,65,0.1)] text-[#888899] hover:text-[#BBBBCC] hover:bg-[rgba(255,255,255,0.03)] data-[state=active]:border-[rgba(0,255,65,0.25)] rounded-lg px-4 gap-2 transition-all duration-200"
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-xs font-medium">Documentação da API</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="keys" className="mt-2">
          <KeysWebhooksTab />
        </TabsContent>

        <TabsContent value="docs" className="mt-2">
          <ApiDocsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
