'use client';

import { useState, useEffect } from 'react';
import {
  ArrowRight,
  Shield,
  Wallet,
  ArrowDownRight,
  CheckCircle2,
  Zap,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import { api } from '@/lib/api/client';
import type { PipelineResponse, PipelineStageId } from '@/lib/api/contracts';
import { useDashboardStore } from '@/lib/dashboard-store';

/* ─── Stage Visual Config ───────────────────────────────────────────────── */

const STAGE_CONFIG: Record<
  string,
  {
    label: string;
    sublabel: string;
    color: string;
    glowColor: string;
    icon: React.ReactNode;
  }
> = {
  gateway_confirmed: {
    label: 'Gateway Confirmado',
    sublabel: 'Pagamento validado pelo provider',
    color: '#00FF41',
    glowColor: 'rgba(0,255,65,0.3)',
    icon: <Shield className="w-5 h-5" />,
  },
  holding_provider: {
    label: 'Holding Provider',
    sublabel: 'Capital em retenção (escrow)',
    color: '#FFB800',
    glowColor: 'rgba(255,184,0,0.3)',
    icon: <Wallet className="w-5 h-5" />,
  },
  fx_in_transit: {
    label: 'FX em Trânsito',
    sublabel: 'Conversão ou transferência em curso',
    color: '#00F0FF',
    glowColor: 'rgba(0,240,255,0.3)',
    icon: <ArrowDownRight className="w-5 h-5" />,
  },
  inventory_wallet: {
    label: 'Carteira Inventário',
    sublabel: 'Disponível para liquidação',
    color: '#00F0FF',
    glowColor: 'rgba(0,240,255,0.25)',
    icon: <Wallet className="w-5 h-5" />,
  },
  distributed: {
    label: 'Distribuído',
    sublabel: 'Liquidado ao merchant final',
    color: '#BF40FF',
    glowColor: 'rgba(191,64,255,0.3)',
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
};

const STAGE_ORDER: PipelineStageId[] = [
  'gateway_confirmed',
  'holding_provider',
  'fx_in_transit',
  'inventory_wallet',
  'distributed',
];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'EUR' }).format(value);
}

/* ─── Component ───────────────────────────────────────────────────────────── */

export default function LogisticPipeline() {
  const { setPipelineFilter } = useDashboardStore();

  const [pipelineData, setPipelineData] = useState<PipelineResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.pipeline.get();
      setPipelineData(res);
    } catch {
      setError('Dados indisponíveis. A verificar conexão...');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalVolume = pipelineData?.data
    ? Object.values(pipelineData.data).reduce((sum, stage) => sum + stage.total, 0)
    : 0;
  const totalTxns = pipelineData?.data
    ? Object.values(pipelineData.data).reduce((sum, stage) => sum + stage.count, 0)
    : 0;

  return (
    <div className="space-y-6">
      {/* ── Total Volume Banner ── */}
      <div className="cyber-panel p-4 border border-[rgba(0,255,65,0.2)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] cyber-mono text-[#555566] tracking-wider">PIPELINE TOTAL</span>
            {isLoading ? (
              <div className="h-8 w-48 bg-[rgba(51,51,51,0.3)] rounded animate-pulse mt-1" />
            ) : (
              <p className="text-2xl font-bold text-[#E0E0E8] cyber-mono">
                {error ? '—' : formatCurrency(totalVolume)}
              </p>
            )}
            <p className="text-xs text-[#555566]">
              {totalTxns.toLocaleString('pt-BR')} transações em todos os estágios
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] cyber-mono text-[#555566]">Estágios</p>
              <p className="text-sm font-semibold text-[#00F0FF] cyber-mono">5</p>
            </div>
            <button
              onClick={fetchData}
              className="p-2 rounded-lg border border-[rgba(51,51,51,0.5)] text-[#555566] hover:text-[#E0E0E8] hover:border-[rgba(51,51,51,0.8)] transition-colors"
              title="Atualizar"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Error Banner ── */}
      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[rgba(255,0,64,0.08)] border border-[rgba(255,0,64,0.3)]">
          <AlertTriangle className="w-4 h-4 text-[#FF0040] shrink-0" />
          <span className="text-xs text-[#FF0040]">{error}</span>
          <button
            onClick={fetchData}
            className="ml-auto text-[10px] cyber-mono text-[#FF0040] underline hover:no-underline"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {/* ── Pipeline Visualization ── */}
      <div className="cyber-panel p-6">
        <div className="flex items-center gap-2 mb-6">
          <Zap className="w-4 h-4 text-[#00FF41]" />
          <h3 className="text-sm font-semibold text-[#E0E0E8]">Pipeline Financeiro</h3>
          <span className="text-[10px] cyber-mono text-[#555566] ml-auto">
            CLIQUE NUM ESTÁGIO PARA VER DETALHES →
          </span>
        </div>

        {isLoading ? (
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-0">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex-1 h-48 bg-[rgba(51,51,51,0.15)] rounded-lg animate-pulse" />
            ))}
          </div>
        ) : !pipelineData?.data ? (
          <div className="text-center py-8">
            <p className="text-xs text-[#555566]">Nenhum dado de pipeline disponível</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-0">
            {STAGE_ORDER.map((stageId, index) => {
              const stage = pipelineData!.data[stageId];
              const cfg = STAGE_CONFIG[stageId];

              if (!stage) return null;

              return (
                <div key={stageId} className="flex-1 flex items-stretch">
                  {/* Stage Card — clickable for drill-down */}
                  <button
                    onClick={() => setPipelineFilter(stageId)}
                    className="flex-1 bg-[rgba(10,10,14,0.6)] rounded-lg p-4 border transition-all duration-300 hover:scale-[1.02] cursor-pointer text-left"
                    style={{
                      borderColor: `${cfg.color}33`,
                      boxShadow: `0 0 20px ${cfg.glowColor}10, inset 0 1px 0 ${cfg.color}10`,
                    }}
                  >
                    {/* Icon */}
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${cfg.color}15`, color: cfg.color }}
                      >
                        {cfg.icon}
                      </div>
                      <ArrowRight className="w-3 h-3 text-[#333] opacity-0 group-hover:opacity-100" />
                    </div>

                    {/* Label */}
                    <h4 className="text-sm font-semibold text-[#E0E0E8] mb-0.5">{cfg.label}</h4>
                    <p className="text-[10px] cyber-mono text-[#555566] mb-3">{cfg.sublabel}</p>

                    {/* Volume */}
                    <p className="text-lg font-bold cyber-mono" style={{ color: cfg.color }}>
                      {formatCurrency(stage.total)}
                    </p>
                    <p className="text-[10px] cyber-mono text-[#555566]">
                      {String(stage.count)} txns
                    </p>

                    {/* Percentage bar */}
                    {totalVolume > 0 && (
                      <div className="mt-3 relative">
                        <div className="neon-progress-bar h-1.5">
                          <div
                            className="neon-progress-fill"
                            style={{
                              width: `${(stage.total / totalVolume) * 100}%`,
                              background: `linear-gradient(90deg, ${cfg.color}33, ${cfg.color}, ${cfg.color}99)`,
                              boxShadow: `0 0 8px ${cfg.glowColor}`,
                            }}
                          />
                        </div>
                        <span
                          className="absolute right-0 -top-4 text-[9px] cyber-mono"
                          style={{ color: cfg.color }}
                        >
                          {((stage.total / totalVolume) * 100).toFixed(1)}%
                        </span>
                      </div>
                    )}
                  </button>

                  {/* Connector Arrow */}
                  {index < STAGE_ORDER.length - 1 && (
                    <>
                      <div className="hidden lg:flex items-center justify-center w-8 shrink-0">
                        <div className="flex flex-col items-center gap-1">
                          <div
                            className="w-8 h-[2px]"
                            style={{
                              background: `linear-gradient(90deg, ${cfg.color}40, ${STAGE_CONFIG[STAGE_ORDER[index + 1]]?.color ?? '#333'}40)`,
                            }}
                          />
                          <ArrowRight
                            className="w-3 h-3"
                            style={{ color: '#333' }}
                          />
                        </div>
                      </div>
                      <div className="flex lg:hidden items-center justify-center py-1">
                        <ArrowRight className="w-4 h-4 rotate-90" style={{ color: '#333' }} />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
