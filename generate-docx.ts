const { 
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
  HeadingLevel, AlignmentType, PageBreak, BorderStyle, WidthType, 
  VerticalAlign, ShadingType, LevelFormat, Header, Footer, PageNumber,
  TableOfContents
} = require('docx');
const fs = require('fs');

// Color scheme: "Midnight Code" for tech/finance
const colors = {
  primary: "020617",      // Midnight Black
  body: "1E293B",         // Deep Slate Blue
  secondary: "64748B",    // Cool Blue-Gray
  accent: "94A3B8",       // Steady Silver
  tableBg: "F8FAFC",      // Glacial Blue-White
  tableHeader: "E2E8F0",  // Light Blue-Gray
  border: "334155",       // Dark Slate
  neonGreen: "00FF41",    // Cyberpunk green
  neonCyan: "00F0FF"      // Cyberpunk cyan
};

// Table borders
const tableBorder = { style: BorderStyle.SINGLE, size: 12, color: colors.border };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

// Function to create TOC hint
const createTOCHint = () => {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 400 },
    children: [new TextRun({ 
      text: "Nota: Este Índice é gerado através de códigos de campo. Para garantir a precisão dos números de página após a edição, clique com o botão direito no Índice e selecione \"Atualizar Campo\".",
      color: "999999",
      size: 18,
      italics: true
    })]
  });
};

// Main document
const doc = new Document({
  styles: {
    default: { 
      document: { 
        run: { font: "Calibri", size: 22, color: colors.body } 
      } 
    },
    paragraphStyles: [
      { 
        id: "Heading1", 
        name: "Heading 1", 
        basedOn: "Normal", 
        next: "Normal", 
        quickFormat: true,
        run: { 
          size: 36, 
          bold: true, 
          color: colors.primary, 
          font: "Times New Roman" 
        },
        paragraph: { 
          spacing: { before: 600, after: 300, line: 250 },
          outlineLevel: 0 
        } 
      },
      { 
        id: "Heading2", 
        name: "Heading 2", 
        basedOn: "Normal", 
        next: "Normal", 
        quickFormat: true,
        run: { 
          size: 28, 
          bold: true, 
          color: colors.secondary, 
          font: "Times New Roman" 
        },
        paragraph: { 
          spacing: { before: 400, after: 200, line: 250 },
          outlineLevel: 1 
        } 
      },
      { 
        id: "Heading3", 
        name: "Heading 3", 
        basedOn: "Normal", 
        next: "Normal", 
        quickFormat: true,
        run: { 
          size: 24, 
          bold: true, 
          color: colors.secondary, 
          font: "Calibri" 
        },
        paragraph: { 
          spacing: { before: 300, after: 150, line: 250 },
          outlineLevel: 2 
        } 
      }
    ]
  },
  numbering: {
    config: [
      {
        reference: "bullet-list",
        levels: [{
          level: 0, 
          format: LevelFormat.BULLET, 
          text: "\u2022", 
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } 
        }]
      },
      {
        reference: "numbered-list-1",
        levels: [{
          level: 0,
          format: LevelFormat.DECIMAL,
          text: "%1.",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      },
      {
        reference: "numbered-list-2",
        levels: [{
          level: 0,
          format: LevelFormat.DECIMAL,
          text: "%1.",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      },
      {
        reference: "numbered-list-3",
        levels: [{
          level: 0,
          format: LevelFormat.DECIMAL,
          text: "%1.",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      },
      {
        reference: "numbered-list-4",
        levels: [{
          level: 0,
          format: LevelFormat.DECIMAL,
          text: "%1.",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      }
    ]
  },
  sections: [
    // ═══════════════════════════════════════════════════════════════════
    // COVER PAGE SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      properties: {
        page: { margin: { top: 0, right: 0, bottom: 0, left: 0 } }
      },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 2000 },
          children: [
            new TextRun({
              text: "NEUFLOWX",
              size: 72,
              bold: true,
              color: colors.neonGreen,
              font: "Calibri"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 400 },
          children: [
            new TextRun({
              text: "DASHBOARD - DOCUMENTAÇÃO TÉCNICA",
              size: 32,
              bold: true,
              color: colors.accent,
              font: "Times New Roman"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 100 },
          children: [
            new TextRun({
              text: "Plataforma de Orquestração Financeira B2B2C",
              size: 24,
              color: colors.body,
              font: "Calibri"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400, after: 100 },
          children: [
            new TextRun({
              text: "Versão 2.4.1-beta",
              size: 22,
              italics: true,
              color: colors.secondary,
              font: "Calibri"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 800, after: 100 },
          children: [
            new TextRun({
              text: "• Multi-Provider Routing",
              size: 20,
              color: colors.neonCyan,
              font: "Calibri"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 100 },
          children: [
            new TextRun({
              text: "• 11 Mercados • 72 Trilhos de Pagamento",
              size: 20,
              color: colors.neonCyan,
              font: "Calibri"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 100 },
          children: [
            new TextRun({
              text: "• Pipeline Financeiro em Tempo Real",
              size: 20,
              color: colors.neonCyan,
              font: "Calibri"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 2000 },
          children: [
            new TextRun({
              text: "───────────────────────────────",
              size: 20,
              color: colors.secondary
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 100 },
          children: [
            new TextRun({
              text: "NeXTrustX Hub",
              size: 20,
              color: colors.secondary,
              font: "Calibri"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          children: [
            new TextRun({
              text: "https://github.com/nextrustx-hub/NeXFlowX-Dashboard",
              size: 18,
              color: colors.accent,
              font: "Calibri"
            })
          ]
        })
      ]
    },
    // ═══════════════════════════════════════════════════════════════════
    // TABLE OF CONTENTS SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      properties: {
        page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
      },
      children: [
        new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 0, after: 200 }, children: [new TextRun({ text: "Índice", bold: true, size: 36 })] }),
        new TableOfContents("Índice", { hyperlink: true, headingStyleRange: "1-3" }),
        createTOCHint(),
        new Paragraph({ children: [new PageBreak()] })
      ]
    },
    // ═══════════════════════════════════════════════════════════════════
    // MAIN CONTENT SECTION WITH HEADER/FOOTER
    // ═══════════════════════════════════════════════════════════════════
    {
      properties: {
        page: { margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 } }
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({ text: "NeXFlowX Dashboard v2.4.1", size: 18, color: colors.secondary })
              ]
            })
          ]
        })
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "Página ", size: 18, color: colors.secondary }),
                new TextRun({ children: [PageNumber.CURRENT], size: 18, color: colors.secondary }),
                new TextRun({ text: " de ", size: 18, color: colors.secondary }),
                new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: colors.secondary })
              ]
            })
          ]
        })
      },
      children: [
        // ═══════════════════════════════════════════════════════════════════
        // 1. INTRODUÇÃO
        // ═══════════════════════════════════════════════════════════════════
        new Paragraph({ 
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "1. Introdução ao Projeto" })]
        }),
        new Paragraph({
          spacing: { line: 250 },
          children: [new TextRun({
            text: "O NeXFlowX Dashboard é uma plataforma de orquestração financeira B2B2C (Business-to-Business-to-Consumer) projetada para monitorar, rotear e gerenciar fluxos de pagamento transfronteiriços em tempo real. A plataforma atua como uma \"Control Tower\" centralizada que permite às empresas visualizar e controlar todas as suas operações financeiras através de uma única interface unificada."
          })]
        }),
        new Paragraph({
          spacing: { before: 200, line: 250 },
          children: [new TextRun({
            text: "O sistema suporta múltiplos providers de pagamento e routing dinâmico, permitindo que as empresas otimizem suas operações financeiras ao redor do mundo com base em disponibilidade, custo e performance. A arquitetura foi concebida para ser escalável, segura e altamente resiliente, com monitoramento 24/7 e pipeline financeiro em tempo real."
          })]
        }),

        // Vision
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400 },
          children: [new TextRun({ text: "1.1 Visão e Objetivos" })]
        }),
        new Paragraph({
          spacing: { line: 250 },
          children: [new TextRun({
            text: "A visão do NeXFlowX é transformar a complexidade dos pagamentos globais em uma experiência transparente e controlada. Os objetivos principais incluem:"
          })]
        }),
        new Paragraph({ numbering: { reference: "numbered-list-1", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Fornecer visibilidade em tempo real de todas as transações em todos os estágios do pipeline financeiro" })] }),
        new Paragraph({ numbering: { reference: "numbered-list-1", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Automatizar o roteamento de pagamentos para múltiplos providers baseado em regras de negócio" })] }),
        new Paragraph({ numbering: { reference: "numbered-list-1", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Garantir alta disponibilidade através de redundância de providers e trilhos de pagamento" })] }),
        new Paragraph({ numbering: { reference: "numbered-list-1", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Simplificar a integração com novos mercados e métodos de pagamento através de API unificada" })] }),
        new Paragraph({ numbering: { reference: "numbered-list-1", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Prover análises detalhadas e métricas para tomada de decisões estratégicas" })] }),

        // Use Cases
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400 },
          children: [new TextRun({ text: "1.2 Casos de Uso" })]
        }),
        new Paragraph({
          spacing: { line: 250 },
          children: [new TextRun({
            text: "O NeXFlowX Dashboard é projetado para atender a diversos cenários de negócio:"
          })]
        }),
        new Paragraph({ numbering: { reference: "numbered-list-2", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Marketplaces e E-commerce: Gerenciamento de pagamentos de múltiplos vendedores e compradores" })] }),
        new Paragraph({ numbering: { reference: "numbered-list-2", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "SaaS Companies: Processamento de assinaturas e pagamentos recorrentes globais" })] }),
        new Paragraph({ numbering: { reference: "numbered-list-2", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Empresas de Logística: Pagamentos cross-border relacionados a remessas e transporte" })] }),
        new Paragraph({ numbering: { reference: "numbered-list-2", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Instituições Financeiras: Orquestração de transferências internacionais e conversões FX" })] }),

        // ═══════════════════════════════════════════════════════════════════
        // 2. ARQUITETURA TÉCNICA
        // ═══════════════════════════════════════════════════════════════════
        new Paragraph({ 
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 600 },
          children: [new TextRun({ text: "2. Arquitetura Técnica" })]
        }),

        // Stack Tecnológico
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400 },
          children: [new TextRun({ text: "2.1 Stack Tecnológico" })]
        }),
        new Paragraph({
          spacing: { line: 250 },
          children: [new TextRun({
            text: "O NeXFlowX Dashboard utiliza uma stack moderna e robusta, otimizada para performance e escalabilidade:"
          })]
        }),
        new Paragraph({ numbering: { reference: "numbered-list-3", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Framework: Next.js 16 com App Router" })] }),
        new Paragraph({ numbering: { reference: "numbered-list-3", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Linguagem: TypeScript 5 com tipagem estrita" })] }),
        new Paragraph({ numbering: { reference: "numbered-list-3", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Frontend: React 19 com componentes server/client" })] }),
        new Paragraph({ numbering: { reference: "numbered-list-3", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Estilização: Tailwind CSS 4 com design system Cyberpunk/Hacker-Punk" })] }),
        new Paragraph({ numbering: { reference: "numbered-list-3", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "UI Components: shadcn/ui (New York style) com 40+ componentes" })] }),
        new Paragraph({ numbering: { reference: "numbered-list-3", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "State Management: Zustand para estado client-side" })] }),
        new Paragraph({ numbering: { reference: "numbered-list-3", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Server State: TanStack Query para cache e sincronização" })] }),
        new Paragraph({ numbering: { reference: "numbered-list-3", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Banco de Dados: Prisma ORM com SQLite (client-side)" })] }),
        new Paragraph({ numbering: { reference: "numbered-list-3", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Autenticação: NextAuth.js v4 com JWT tokens" })] }),

        // Estrutura do Projeto
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400 },
          children: [new TextRun({ text: "2.2 Estrutura do Projeto" })]
        }),
        new Paragraph({
          spacing: { line: 250 },
          children: [new TextRun({
            text: "A estrutura do projeto segue as melhores práticas do Next.js 16:"
          })]
        }),
        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [3000, 6360],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({
                  width: { size: 3000, type: WidthType.DXA },
                  borders: cellBorders,
                  shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Diretório", bold: true })] })]
                }),
                new TableCell({
                  width: { size: 6360, type: WidthType.DXA },
                  borders: cellBorders,
                  shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Descrição", bold: true })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 3000, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ children: [new TextRun({ text: "/src/app", font: "Courier New", size: 18 })] })]
                }),
                new TableCell({
                  width: { size: 6360, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ children: [new TextRun({ text: "Rotas Next.js com App Router (page.tsx, layout.tsx, api/)" })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 3000, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ children: [new TextRun({ text: "/src/components", font: "Courier New", size: 18 })] })]
                }),
                new TableCell({
                  width: { size: 6360, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ children: [new TextRun({ text: "Componentes React reutilizáveis (dashboard/, ui/)" })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 3000, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ children: [new TextRun({ text: "/src/lib", font: "Courier New", size: 18 })] })]
                }),
                new TableCell({
                  width: { size: 6360, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ children: [new TextRun({ text: "Lógica de negócio, stores, API client e contratos TypeScript" })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 3000, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ children: [new TextRun({ text: "/prisma", font: "Courier New", size: 18 })] })]
                }),
                new TableCell({
                  width: { size: 6360, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ children: [new TextRun({ text: "Schema e configurações do Prisma ORM" })] })]
                })
              ]
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          children: [new TextRun({ text: "Tabela 1: Estrutura de diretórios do projeto", size: 18, italics: true, color: colors.secondary })]
        }),

        // Design System
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400 },
          children: [new TextRun({ text: "2.3 Design System" })]
        }),
        new Paragraph({
          spacing: { line: 250 },
          children: [new TextRun({
            text: "O sistema de design adota um tema Cyberpunk/Hacker-Punk com as seguintes características:"
          })]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Cor Primária (Neon Green): #00FF41 - Para elementos de sucesso e ações principais" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Cor Secundária (Neon Cyan): #00F0FF - Para informações e estado de processamento" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Cor de Alerta (Amber): #FFB800 - Para avisos e estados de espera" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Cor de Erro (Red): #FF0040 - Para falhas e ações destrutivas" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Cor de Acento (Purple): #BF40FF - Para estados de conclusão e destaque" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Background: #0A0A0C - Fundo escuro para redução de fadiga visual" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Fonte Mono: Para dados técnicos e valores monetários" })] }),

        // ═══════════════════════════════════════════════════════════════════
        // 3. FUNCIONALIDADES ATIVAS
        // ═══════════════════════════════════════════════════════════════════
        new Paragraph({ 
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 600 },
          children: [new TextRun({ text: "3. Funcionalidades Ativas" })]
        }),

        // Autenticação
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400 },
          children: [new TextRun({ text: "3.1 Sistema de Autenticação" })]
        }),
        new Paragraph({
          spacing: { line: 250 },
          children: [new TextRun({
            text: "O sistema implementa autenticação segura com JWT (JSON Web Tokens):"
          })]
        }),
        new Paragraph({ numbering: { reference: "numbered-list-4", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Login com credenciais (username/password)" })] }),
        new Paragraph({ numbering: { reference: "numbered-list-4", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Tokens JWT armazenados em localStorage" })] }),
        new Paragraph({ numbering: { reference: "numbered-list-4", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Refresh tokens para renovação automática de sessão" })] }),
        new Paragraph({ numbering: { reference: "numbered-list-4", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Validação de token ao carregar a aplicação" })] }),
        new Paragraph({ numbering: { reference: "numbered-list-4", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Logout com limpeza segura de credenciais" })] }),
        new Paragraph({ numbering: { reference: "numbered-list-4", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Credenciais de teste: NeXFlowX / Nex123456789*" })] }),

        // Dashboard Overview
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400 },
          children: [new TextRun({ text: "3.2 Dashboard Overview" })]
        }),
        new Paragraph({
          spacing: { line: 250 },
          children: [new TextRun({
            text: "A visão geral do dashboard proporciona KPIs em tempo real e atividade recente:"
          })]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Capital em Trânsito: Valor total em processamento nos estágios do pipeline" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Capital Distribuído: Valor total já liquidado aos merchants" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Gateway Confirmados: Número de transações validadas pelo gateway" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Total de Transações: Contagem de todas as transações em todos os estágios" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Atividade Recente: Feed das últimas 10 transações em tempo real" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Highlight Automático: Rails prioritários destacados com base em regras de negócio" })] }),

        // Logistic Pipeline
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400 },
          children: [new TextRun({ text: "3.3 Pipeline Financeiro (Logistic Pipeline)" })]
        }),
        new Paragraph({
          spacing: { line: 250 },
          children: [new TextRun({
            text: "O pipeline financeiro visualiza o fluxo das transações através de 5 estágios:"
          })]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Gateway Confirmado: Pagamento validado pelo provider de pagamento" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Holding Provider: Capital em retenção (escrow) aguardando processamento" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "FX em Trânsito: Conversão de moeda ou transferência em curso" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Carteira Inventário: Fundos disponíveis para liquidação" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Distribuído: Valor liquidado ao merchant final" })] }),
        new Paragraph({
          spacing: { before: 200, line: 250 },
          children: [new TextRun({
            text: "Cada estágio exibe o valor total em processamento, número de transações e porcentagem em relação ao volume total. O usuário pode clicar em qualquer estágio para filtrar as transações e ver detalhes específicos."
          })]
        }),

        // Capacity Matrix
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400 },
          children: [new TextRun({ text: "3.4 Matriz de Capacidade" })]
        }),
        new Paragraph({
          spacing: { line: 250 },
          children: [new TextRun({
            text: "A matriz de capacidade exibe a disponibilidade de trilhos de pagamento em 11 mercados:"
          })]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "11 Países: Portugal, Espanha, França, Países Baixos, Bélgica, Áustria, Polónia, Reino Unido, Suíça, Alemanha, Itália" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "72 Trilhos de Pagamento: Múltiplos métodos por país (Cards, PIX, MBWay, iDEAL, Bancontact, etc.)" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Status de Disponibilidade: AVAILABLE, LIMITED, CRITICAL, INTEGRATION_IN_PROGRESS" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Capacidade de Volume: UNLIMITED, LIMITED, DEPLETED" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Rails Locais: Marcados com flag is_local para métodos específicos do mercado" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Auto-Highlight: Rails essenciais automaticamente destacados (ex: iDEAL para Holanda)" })] }),

        // Transactions Table
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400 },
          children: [new TextRun({ text: "3.5 Tabela de Transações" })]
        }),
        new Paragraph({
          spacing: { line: 250 },
          children: [new TextRun({
            text: "A tabela de transações fornece acesso detalhado a todas as operações:"
          })]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Filtragem por status, país, período e busca textual" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Presets de período: 7 dias, 30 dias, 90 dias, Este mês, Mês passado" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "KPIs agregados: Valor bruto, valor líquido, número de transações" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Detalhes por transação: ID, status, tipo, país, método, pagador, valor" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Atualização de status: Avanço manual para o próximo estágio do pipeline" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Exportação CSV: Exportação completa de transações filtradas" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Paginação: Navegação eficiente através de grandes volumes de dados" })] }),

        // Payment Link Generator
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400 },
          children: [new TextRun({ text: "3.6 Gerador de Links de Pagamento" })]
        }),
        new Paragraph({
          spacing: { line: 250 },
          children: [new TextRun({
            text: "O gerador de links de pagamento permite criar checkouts rapidamente:"
          })]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Definição de valor e moeda (EUR, USD, GBP, BRL, KES, NGN)" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Descrição opcional para referência interna" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Criação de link via API: POST /api/v1/payment-links" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Auto-abertura do checkout em nova aba: https://pay.nexflowx.tech/{id}" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Cópia do link para compartilhamento" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Cópia de mensagem formatada para redes sociais" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Visualização dos trilhos disponíveis com status de capacidade" })] }),

        // API Management
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400 },
          children: [new TextRun({ text: "3.7 Gestão de API e Integrações" })]
        }),
        new Paragraph({
          spacing: { line: 250 },
          children: [new TextRun({
            text: "A seção de API management fornece ferramentas para desenvolvedores:"
          })]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Lista de API Keys: Visualização de chaves ativas e revogadas" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Visualização de chave: Toggle para mostrar/ocultar chave completa" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Cópia de chave: Botão para copiar para clipboard" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Configuração de Webhook URL: URL para receber notificações de pagamento" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "HMAC Webhook Secret: Secret para validar assinaturas de webhook" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Documentação da API: Guia completo de integração com exemplos" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Exemplos de código: cURL, JavaScript, SDK Frontend" })] }),

        // ═══════════════════════════════════════════════════════════════════
        // 4. CONTRATO API
        // ═══════════════════════════════════════════════════════════════════
        new Paragraph({ 
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 600 },
          children: [new TextRun({ text: "4. Contrato API" })]
        }),

        // Base URL
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400 },
          children: [new TextRun({ text: "4.1 Base URL e Autenticação" })]
        }),
        new Paragraph({
          spacing: { line: 250 },
          children: [new TextRun({
            text: "A API v1 do NeXFlowX é acessível através da seguinte URL base:"
          })]
        }),
        new Paragraph({
          spacing: { before: 200, line: 250 },
          children: [new TextRun({ 
            text: "https://api.nexflowx.tech/api/v1",
            font: "Courier New",
            size: 20,
            color: colors.neonCyan
          })]
        }),
        new Paragraph({
          spacing: { before: 200, line: 250 },
          children: [new TextRun({
            text: "Autenticação é realizada através do header x-api-key:"
          })]
        }),
        new Paragraph({
          spacing: { before: 200, line: 250 },
          children: [new TextRun({ 
            text: "x-api-key: nx_live_••••••••••••",
            font: "Courier New",
            size: 20,
            color: colors.neonGreen
          })]
        }),

        // Endpoints
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400 },
          children: [new TextRun({ text: "4.2 Endpoints Disponíveis" })]
        }),

        // Auth endpoints
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 300 },
          children: [new TextRun({ text: "4.2.1 Autenticação" })]
        }),
        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [1500, 2360, 5500],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({
                  width: { size: 1500, type: WidthType.DXA },
                  borders: cellBorders,
                  shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Método", bold: true })] })]
                }),
                new TableCell({
                  width: { size: 2360, type: WidthType.DXA },
                  borders: cellBorders,
                  shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Endpoint", bold: true })] })]
                }),
                new TableCell({
                  width: { size: 5500, type: WidthType.DXA },
                  borders: cellBorders,
                  shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Descrição", bold: true })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 1500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "POST", color: colors.neonGreen, bold: true })] })]
                }),
                new TableCell({
                  width: { size: 2360, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "/auth/login", font: "Courier New", size: 18 })] })]
                }),
                new TableCell({
                  width: { size: 5500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Autentica usuário e retorna token JWT" })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 1500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "POST", color: colors.neonGreen, bold: true })] })]
                }),
                new TableCell({
                  width: { size: 2360, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "/auth/logout", font: "Courier New", size: 18 })] })]
                }),
                new TableCell({
                  width: { size: 5500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Termina sessão e invalida token" })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 1500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "GET", color: colors.neonCyan, bold: true })] })]
                }),
                new TableCell({
                  width: { size: 2360, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "/auth/me", font: "Courier New", size: 18 })] })]
                }),
                new TableCell({
                  width: { size: 5500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Retorna informações do usuário autenticado" })] })]
                })
              ]
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          children: [new TextRun({ text: "Tabela 2: Endpoints de autenticação", size: 18, italics: true, color: colors.secondary })]
        }),

        // Pipeline endpoint
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 300 },
          children: [new TextRun({ text: "4.2.2 Pipeline" })]
        }),
        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [1500, 2360, 5500],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({
                  width: { size: 1500, type: WidthType.DXA },
                  borders: cellBorders,
                  shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Método", bold: true })] })]
                }),
                new TableCell({
                  width: { size: 2360, type: WidthType.DXA },
                  borders: cellBorders,
                  shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Endpoint", bold: true })] })]
                }),
                new TableCell({
                  width: { size: 5500, type: WidthType.DXA },
                  borders: cellBorders,
                  shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Descrição", bold: true })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 1500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "GET", color: colors.neonCyan, bold: true })] })]
                }),
                new TableCell({
                  width: { size: 2360, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "/pipeline", font: "Courier New", size: 18 })] })]
                }),
                new TableCell({
                  width: { size: 5500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Retorna dados agregados do pipeline financeiro por estágio" })] })]
                })
              ]
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          children: [new TextRun({ text: "Tabela 3: Endpoint de pipeline", size: 18, italics: true, color: colors.secondary })]
        }),

        // Transactions endpoints
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 300 },
          children: [new TextRun({ text: "4.2.3 Transações" })]
        }),
        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [1500, 2360, 5500],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({
                  width: { size: 1500, type: WidthType.DXA },
                  borders: cellBorders,
                  shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Método", bold: true })] })]
                }),
                new TableCell({
                  width: { size: 2360, type: WidthType.DXA },
                  borders: cellBorders,
                  shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Endpoint", bold: true })] })]
                }),
                new TableCell({
                  width: { size: 5500, type: WidthType.DXA },
                  borders: cellBorders,
                  shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Descrição", bold: true })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 1500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "GET", color: colors.neonCyan, bold: true })] })]
                }),
                new TableCell({
                  width: { size: 2360, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "/transactions", font: "Courier New", size: 18 })] })]
                }),
                new TableCell({
                  width: { size: 5500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Lista transações com paginação e filtros (page, limit, status, country_code, date_from, date_to, search)" })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 1500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "GET", color: colors.neonCyan, bold: true })] })]
                }),
                new TableCell({
                  width: { size: 2360, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "/transactions/:id", font: "Courier New", size: 18 })] })]
                }),
                new TableCell({
                  width: { size: 5500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Retorna detalhes de uma transação específica" })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 1500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "PATCH", color: colors.neonGreen, bold: true })] })]
                }),
                new TableCell({
                  width: { size: 2360, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "/transactions/:id/status", font: "Courier New", size: 18 })] })]
                }),
                new TableCell({
                  width: { size: 5500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Atualiza o status de uma transação (body: { status })" })] })]
                })
              ]
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          children: [new TextRun({ text: "Tabela 4: Endpoints de transações", size: 18, italics: true, color: colors.secondary })]
        }),

        // Payment Links endpoints
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 300 },
          children: [new TextRun({ text: "4.2.4 Links de Pagamento" })]
        }),
        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [1500, 2360, 5500],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({
                  width: { size: 1500, type: WidthType.DXA },
                  borders: cellBorders,
                  shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Método", bold: true })] })]
                }),
                new TableCell({
                  width: { size: 2360, type: WidthType.DXA },
                  borders: cellBorders,
                  shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Endpoint", bold: true })] })]
                }),
                new TableCell({
                  width: { size: 5500, type: WidthType.DXA },
                  borders: cellBorders,
                  shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Descrição", bold: true })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 1500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "POST", color: colors.neonGreen, bold: true })] })]
                }),
                new TableCell({
                  width: { size: 2360, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "/payment-links", font: "Courier New", size: 18 })] })]
                }),
                new TableCell({
                  width: { size: 5500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Cria um novo link de pagamento (body: { amount, currency?, description? })" })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 1500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "GET", color: colors.neonCyan, bold: true })] })]
                }),
                new TableCell({
                  width: { size: 2360, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "/payment-links", font: "Courier New", size: 18 })] })]
                }),
                new TableCell({
                  width: { size: 5500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Lista todos os links de pagamento criados" })] })]
                })
              ]
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          children: [new TextRun({ text: "Tabela 5: Endpoints de links de pagamento", size: 18, italics: true, color: colors.secondary })]
        }),

        // API Keys endpoints
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 300 },
          children: [new TextRun({ text: "4.2.5 API Keys" })]
        }),
        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [1500, 2360, 5500],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({
                  width: { size: 1500, type: WidthType.DXA },
                  borders: cellBorders,
                  shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Método", bold: true })] })]
                }),
                new TableCell({
                  width: { size: 2360, type: WidthType.DXA },
                  borders: cellBorders,
                  shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Endpoint", bold: true })] })]
                }),
                new TableCell({
                  width: { size: 5500, type: WidthType.DXA },
                  borders: cellBorders,
                  shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Descrição", bold: true })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 1500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "GET", color: colors.neonCyan, bold: true })] })]
                }),
                new TableCell({
                  width: { size: 2360, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "/api-keys", font: "Courier New", size: 18 })] })]
                }),
                new TableCell({
                  width: { size: 5500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Lista todas as chaves API do usuário" })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 1500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "POST", color: colors.neonGreen, bold: true })] })]
                }),
                new TableCell({
                  width: { size: 2360, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "/api-keys", font: "Courier New", size: 18 })] })]
                }),
                new TableCell({
                  width: { size: 5500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Cria uma nova chave API (body: { name, environment })" })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 1500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "DELETE", color: colors.neonRed, bold: true })] })]
                }),
                new TableCell({
                  width: { size: 2360, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "/api-keys/:id", font: "Courier New", size: 18 })] })]
                }),
                new TableCell({
                  width: { size: 5500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Revoca uma chave API existente" })] })]
                })
              ]
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          children: [new TextRun({ text: "Tabela 6: Endpoints de API Keys", size: 18, italics: true, color: colors.secondary })]
        }),

        // User endpoints
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 300 },
          children: [new TextRun({ text: "4.2.6 Usuário e Webhooks" })]
        }),
        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [1500, 2360, 5500],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({
                  width: { size: 1500, type: WidthType.DXA },
                  borders: cellBorders,
                  shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Método", bold: true })] })]
                }),
                new TableCell({
                  width: { size: 2360, type: WidthType.DXA },
                  borders: cellBorders,
                  shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Endpoint", bold: true })] })]
                }),
                new TableCell({
                  width: { size: 5500, type: WidthType.DXA },
                  borders: cellBorders,
                  shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Descrição", bold: true })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 1500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "GET", color: colors.neonCyan, bold: true })] })]
                }),
                new TableCell({
                  width: { size: 2360, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "/users/me", font: "Courier New", size: 18 })] })]
                }),
                new TableCell({
                  width: { size: 5500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Retorna perfil do usuário incluindo webhook_url e webhook_secret" })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 1500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "PATCH", color: colors.neonGreen, bold: true })] })]
                }),
                new TableCell({
                  width: { size: 2360, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "/users/me", font: "Courier New", size: 18 })] })]
                }),
                new TableCell({
                  width: { size: 5500, type: WidthType.DXA },
                  borders: cellBorders,
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Atualiza perfil do usuário (webhook_url, email, name)" })] })]
                })
              ]
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          children: [new TextRun({ text: "Tabela 7: Endpoints de usuário e webhooks", size: 18, italics: true, color: colors.secondary })]
        }),

        // ═══════════════════════════════════════════════════════════════════
        // 5. PROPOSTAS DE EVOLUÇÃO
        // ═══════════════════════════════════════════════════════════════════
        new Paragraph({ 
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 600 },
          children: [new TextRun({ text: "5. Propostas de Evolução para v3.0" })]
        }),

        new Paragraph({
          spacing: { line: 250 },
          children: [new TextRun({
            text: "Com base na análise da arquitetura atual e necessidades de mercado, propõem-se as seguintes evoluções para a versão 3.0 do NeXFlowX Dashboard:"
          })]
        }),

        // Evolution 1
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400 },
          children: [new TextRun({ text: "5.1 Dashboard Avançado com Analytics em Tempo Real" })]
        }),
        new Paragraph({
          spacing: { line: 250 },
          children: [new TextRun({
            text: "Implementar visualizações avançadas de dados para insights estratégicos:"
          })]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Gráficos de tendência de volume por período (dia/semana/mês)" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Heatmap geográfico de transações por país" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Análise de conversão por método de pagamento" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Métricas de performance por provider" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Alertas automáticos para anomalias e thresholds" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Dashboard personalizável com widgets arrastáveis" })] }),

        // Evolution 2
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400 },
          children: [new TextRun({ text: "5.2 Multi-Tenancy e Gestão de Organizações" })]
        }),
        new Paragraph({
          spacing: { line: 250 },
          children: [new TextRun({
            text: "Implementar suporte para múltiplas organizações em uma única instância:"
          })]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Isolamento completo de dados por organização" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Hierarquia de usuários com RBAC (Role-Based Access Control)" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Configurações personalizáveis por organização" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "API Keys segregadas por organização" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Webhooks configuráveis por organização" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Relatórios personalizados por organização" })] }),

        // Evolution 3
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400 },
          children: [new TextRun({ text: "5.3 Motor de Regras de Routing Dinâmico" })]
        }),
        new Paragraph({
          spacing: { line: 250 },
          children: [new TextRun({
            text: "Criar um editor visual para definir regras de roteamento de pagamentos:"
          })]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Editor drag-and-drop para construir fluxos de decisão" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Condições baseadas em: valor, moeda, país, método, horário" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Priorização de providers baseada em custo, SLA, disponibilidade" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Fallback automático em caso de falha de provider" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Teste de regras em sandbox antes de produção" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Versionamento e rollback de regras" })] }),

        // Evolution 4
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400 },
          children: [new TextRun({ text: "5.4 Sistema de Notificações em Tempo Real" })]
        }),
        new Paragraph({
          spacing: { line: 250 },
          children: [new TextRun({
            text: "Implementar notificações instantâneas através de WebSocket:"
          })]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "WebSocket para atualizações em tempo real de transações" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Notificações push para browser e mobile" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Alertas configuráveis por evento (falha, sucesso, threshold)" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Centro de notificações com histórico e filtros" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Integração com Slack, Microsoft Teams, Email" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Preferências de notificação por usuário" })] }),

        // Evolution 5
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400 },
          children: [new TextRun({ text: "5.5 Compliance e Auditoria Avançada" })]
        }),
        new Paragraph({
          spacing: { line: 250 },
          children: [new TextRun({
            text: "Implementar recursos para conformidade regulatória e auditoria:"
          })]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Logs de auditoria para todas as ações (quem, quando, o quê)" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Rastreabilidade completa de cada transação (audit trail)" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Relatórios de conformidade (GDPR, PSD2, PCI-DSS)" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Gerenciamento de consentimento e dados pessoais" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Exportação de dados em formatos padronizados (CSV, JSON, PDF)" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Retenção automática de dados conforme políticas" })] }),

        // Evolution 6
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400 },
          children: [new TextRun({ text: "5.6 Integração com Inteligência Artificial" })]
        }),
        new Paragraph({
          spacing: { line: 250 },
          children: [new TextRun({
            text: "Incorporar AI para análise preditiva e automação:"
          })]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Detecção de fraudes em tempo real com ML" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Previsão de volumes e padrões de pagamento" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Classificação automática de transações" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Sugestões de otimização de routing baseadas em dados históricos" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Chatbot de suporte com contexto transacional" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Análise de sentimento de clientes via feedback" })] }),

        // Evolution 7
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400 },
          children: [new TextRun({ text: "5.7 Expansão de Mercados e Trilhos" })]
        }),
        new Paragraph({
          spacing: { line: 250 },
          children: [new TextRun({
            text: "Expandir a cobertura para novos mercados e métodos de pagamento:"
          })]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Novos mercados: EUA, Canadá, Japão, Austrália, Brasil, México" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Novos métodos: Swish (Suécia), Vipps (Noruega), MobilePay (Dinamarca)" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Criptomoedas: Bitcoin, Ethereum, USDT, USDC" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "BNPL (Buy Now Pay Later): Klarna, Afterpay, Affirm" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Carteiras digitais: Apple Pay, Google Pay, Samsung Pay" })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 250 }, children: [new TextRun({ text: "Integração com novos providers: Adyen, Braintree, Checkout.com" })] }),

        // Conclusão
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 600 },
          children: [new TextRun({ text: "6. Conclusão" })]
        }),
        new Paragraph({
          spacing: { line: 250 },
          children: [new TextRun({
            text: "O NeXFlowX Dashboard v2.4.1-beta representa uma base sólida para a orquestração de pagamentos globais. Com uma arquitetura moderna, design intuitivo e API robusta, a plataforma está preparada para escalar e evoluir conforme as necessidades do mercado."
          })]
        }),
        new Paragraph({
          spacing: { before: 200, line: 250 },
          children: [new TextRun({
            text: "As propostas de evolução para a v3.0 focam em transformar o dashboard de uma ferramenta de visualização para uma plataforma inteligente de gestão financeira, com recursos avançados de analytics, automação com AI, conformidade regulatória e expansão global."
          })]
        }),
        new Paragraph({
          spacing: { before: 200, line: 250 },
          children: [new TextRun({
            text: "A implementação dessas evoluções deve seguir uma abordagem incremental, priorizando funcionalidades que geram valor imediato para os usuários e garantindo estabilidade e performance em cada etapa."
          })]
        }),

        // Footer info
        new Paragraph({
          spacing: { before: 800, after: 200 },
          children: [new TextRun({
            text: "══════════════════════════════════════════════════════════════",
            color: colors.secondary
          })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { line: 250 },
          children: [new TextRun({
            text: "Documento gerado automaticamente • NeXFlowX Dashboard v2.4.1-beta",
            color: colors.secondary,
            size: 18
          })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { line: 250 },
          children: [new TextRun({
            text: "https://github.com/nextrustx-hub/NeXFlowX-Dashboard",
            color: colors.neonCyan,
            size: 18
          })]
        })
      ]
    }
  ]
});

// Save document
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("NeXFlowX-Documentacao-Tecnica-v2.4.1.docx", buffer);
  console.log("Document created successfully!");
});
