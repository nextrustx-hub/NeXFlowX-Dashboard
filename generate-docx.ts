const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType, 
        LevelFormat, VerticalAlign, PageNumber, PageBreak, TableOfContents } = require('docx');
const fs = require('fs');

const colors = {
  primary: "020617",
  body: "1E293B",
  secondary: "64748B",
  accent: "94A3B8",
  tableBg: "F8FAFC",
  tableHeader: "E2E8F0"
};

const tableBorder = { style: BorderStyle.SINGLE, size: 12, color: colors.primary };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Times New Roman", size: 24, color: colors.body } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 600, after: 300 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 240, after: 180 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, color: colors.secondary, font: "Times New Roman" },
        paragraph: { spacing: { before: 180, after: 120 }, outlineLevel: 2 } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-list", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [
    {
      properties: { page: { margin: { top: 0, right: 0, bottom: 0, left: 0 } } },
      children: [
        new Paragraph({ spacing: { before: 4000 }, alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "NeXFlowX Dashboard", size: 72, bold: true, color: colors.primary, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 200 }, alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Documentation Technique Complète", size: 36, bold: true, color: colors.secondary, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 300 }, alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Version 2.4.1-beta", size: 28, color: colors.accent, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 400 }, alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Plateforme B2B2C d'Orchestration Financière", size: 24, color: colors.body, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 600 }, alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Pour Evolution v3.0", size: 22, color: colors.secondary, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 800 }, alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Decembre 2024", size: 24, color: colors.body, font: "Times New Roman" })]
        }),
        new Paragraph({ children: [new PageBreak()] })
      ]
    },
    {
      properties: { page: { margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 } } },
      headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "NeXFlowX Dashboard - Documentation Technique", color: colors.secondary, size: 20 })]
      })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Page " }), new TextRun({ children: [PageNumber.CURRENT] }), new TextRun({ text: " of " }), new TextRun({ children: [PageNumber.TOTAL_PAGES] })]
      })] }) },
      children: [
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Table des Matières")] }),
        new TableOfContents("Table des Matières", { hyperlink: true, headingStyleRange: "1-3" }),
        new Paragraph({ spacing: { before: 200, after: 400 }, alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Note: Cliquez droit sur la table et selectionnez Update Field", color: "999999", size: 18 })]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("1. Vue d'ensemble du Projet")] }),
        new Paragraph({ spacing: { before: 200, after: 200 }, children: [new TextRun({ text: "NeXFlowX Dashboard est une plateforme B2B2C d'orchestration financière permettant aux proprietaires d'entreprises numeriques de surveiller et gerer les flux financiers transfrontaliers en temps reel.", spacing: { line: 250 } })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.1 Objectif Principal")] }),
        new Paragraph({ spacing: { before: 200, after: 200 }, children: [new TextRun({ text: "Fournir une visibilite centralisee sur les operations de paiement multi-marches europeens.", spacing: { line: 250 } })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.2 Stack Technologique")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Frontend: Next.js 16, TypeScript 5, React 19, Tailwind CSS 4, shadcn/ui", bold: true })] }),
        new Paragraph({ children: [new TextRun({ text: "State Management: Zustand + TanStack Query", bold: true })] }),
        new Paragraph({ children: [new TextRun({ text: "Backend: Prisma ORM, SQLite, NextAuth.js v4", bold: true })] }),
        new Paragraph({ children: [new TextRun({ text: "Design: Cyberpunk theme with glassmorphism effects", bold: true })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("2. Fonctionnalites Actives")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.1 Authentification")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "JWT-based authentication with token persistence in localStorage", bold: true })] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Login page with canvas animation")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Token validation on mount")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Session management with Zustand store")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.2 Dashboard Overview")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Real-time KPIs and activity feed", bold: true })] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Capital en Transit: Total pipeline volume")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Capital Distribue: Total distributed volume")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Gateway Confirmes: Validated transactions count")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Activity Feed with real-time updates")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Auto-Highlight for priority rails: NL-iDEAL, PT-MBWay, ES-Bizum")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.3 Capacity Matrix")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "72 payment rails across 11 countries with status monitoring", bold: true })] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Country filter (PT, ES, FR, NL, BE, AT, PL, UK, CH, DE, IT)")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Summary cards: AVAILABLE/LIMITED/CRITICAL/INTEGRATING counts")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Payment method cards with status badges")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Provider display (Stripe or N/A)")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Capacity display (infinity for UNLIMITED)")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("SLA in hours for each rail")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("LOCAL badge for market-specific rails")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.4 Logistic Pipeline")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "3-stage pipeline visualization with conversion metrics", bold: true })] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Stage 1: Gateway de Entrada (In Transit)")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Stage 2: Liquidez Garantida (Fiat EUR/BRL)")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Stage 3: Processando Entrega (USDT/PIX)")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Metrics per stage: volume, count, percentage, avg duration")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Conversion rates table: EUR-USDT, EUR-BRL, USDT-BRL")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.5 Transactions Table")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Searchable, filterable transaction history", bold: true })] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Search by ID, name, rail, email")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Filter by country, status, type")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Sortable columns with pagination")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Transaction details modal with timeline")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.6 Payment Link Generator")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Create and manage payment links", bold: true })] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Amount input with currency selector (EUR, USD, GBP, BRL, KES, NGN)")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Optional description field")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Success modal with checkout URL: https://pay.nexflowx.tech/{id}")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Copy link and social media buttons")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Available rails display with status badges")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.7 API Management")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Manage API keys and webhooks", bold: true })] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("List API keys with show/hide toggle")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Create new API key (shown once)")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Revoke API key with confirmation")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Webhook URL configuration")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Event toggles: payment.received, payment.failed, settlement.completed, etc.")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Delivery statistics: last_delivery_status, deliveries_24h, success_rate_24h")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("3. Contrat API Existant")] }),
        new Paragraph({ spacing: { before: 200, after: 200 }, children: [new TextRun({ text: "Base URL: /api/v1 via internal proxy", spacing: { line: 250 } })] }),
        new Paragraph({ children: [new TextRun({ text: "Authorization: Bearer <jwt> required for all requests", spacing: { line: 250 } })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.1 Authentication")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "POST /api/v1/auth/login", bold: true, color: "00FF41" })] }),
        new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "Request: { username: \"NeXFlowX\", password: \"Nex123456789*\" }", font: "Courier New", size: 20 })] }),
        new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "Response: { success: true, token: \"jwt...\", user: { id, username, role } }", font: "Courier New", size: 20 })] }),
        new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "GET /api/v1/auth/me - Validate session", font: "Courier New", size: 20 })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.2 System State")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "GET /api/v1/system-state?country_code={code}", bold: true, color: "00FF41" })] }),
        new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "Returns: 72 payment rails with availability status", font: "Courier New", size: 20 })] }),
        new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "Status values: AVAILABLE, LIMITED, CRITICAL, INTEGRATION_IN_PROGRESS", font: "Courier New", size: 20 })] }),
        new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "Meta: total_entries: 72, available: 68, limited: 2, critical: 1", font: "Courier New", size: 20 })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.3 Dashboard Stats")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "GET /api/v1/dashboard/stats?period=24h", bold: true, color: "00FF41" })] }),
        new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "Returns: volume_total, transactions_count, success_rate, alerts_active", font: "Courier New", size: 20 })] }),
        new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "Trend: volume_change_percent, success_rate_change_percent", font: "Courier New", size: 20 })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.4 Transactions")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "GET /api/v1/transactions?page=1&limit=25&country=PT&status=completed", bold: true, color: "00FF41" })] }),
        new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "Filters: country_code, status, type, search, sort, order", font: "Courier New", size: 20 })] }),
        new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "GET /api/v1/transactions/:id - Details with event timeline", font: "Courier New", size: 20 })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.5 Pipeline")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "GET /api/v1/pipeline", bold: true, color: "00FF41" })] }),
        new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "Returns: 3 stages (gateway, fiat, delivery) with volume and counts", font: "Courier New", size: 20 })] }),
        new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "Conversion rates: EUR_USDT, EUR_BRL, USDT_BRL", font: "Courier New", size: 20 })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.6 Payment Links")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "POST /api/v1/payment-links", bold: true, color: "00FF41" })] }),
        new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "Request: { amount, currency, description }", font: "Courier New", size: 20 })] }),
        new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "Response: { id, shareable_url, short_code, amount, status }", font: "Courier New", size: 20 })] }),
        new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "GET /api/v1/payment-links - List all links (no pagination)", font: "Courier New", size: 20 })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.7 API Keys")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "GET /api/v1/api-keys - List keys (key_full not shown)", bold: true, color: "00FF41" })] }),
        new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "POST /api/v1/api-keys - Create new key (key_full shown once)", font: "Courier New", size: 20 })] }),
        new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "DELETE /api/v1/api-keys/:id - Revoke key", font: "Courier New", size: 20 })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.8 Webhooks")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "GET /api/v1/webhooks - Get webhook config", bold: true, color: "00FF41" })] }),
        new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "PUT /api/v1/webhooks - Update URL and events", font: "Courier New", size: 20 })] }),
        new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "Events: payment.received, payment.failed, settlement.completed, capacity.warning", font: "Courier New", size: 20 })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.9 Activity")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "GET /api/v1/activity?page=1&limit=50", bold: true, color: "00FF41" })] }),
        new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "Returns: activity feed with timestamp, type, message, severity", font: "Courier New", size: 20 })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("4. Propositions d'Evolution v3.0")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.1 Integration IA (Skills)")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Leverage z-ai-web-dev-sdk skills for AI capabilities", bold: true })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("4.1.1 VLM - Document Analysis")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Upload receipts/invoices for automatic analysis", bold: true })] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Extract: amount, date, merchant, payment method")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Validate: compare with recorded transactions")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Detect anomalies: inconsistent amounts, duplicates, suspicious transactions")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Auto-classify transactions by type")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Benefit: 60% reduction in manual verification time", bold: true })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("4.1.2 LLM - Support Chatbot")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "AI assistant for user questions", bold: true })] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Where is my transaction TXN-8F4K2M?")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Why did my MBWay payment fail?")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("What is the current capacity for iDEAL?")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("How to configure a webhook?")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Benefit: 40% reduction in support tickets, 24/7 availability", bold: true })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("4.1.3 Image Generation - Reports")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Generate visual reports and charts", bold: true })] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Custom infographics by period")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Trend charts: volume, success rate")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Visual dashboards for presentations")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Benefit: Professional reports in seconds, easy sharing", bold: true })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("4.1.4 ASR - Voice Commands")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Voice interaction with dashboard", bold: true })] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Show me transactions from last week")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Create a 100 euro payment link")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("What is current MBWay capacity?")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Benefit: Improved accessibility, hands-free interaction", bold: true })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.2 UX/UI Improvements")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("4.2.1 Dark/Light Theme")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Theme toggle with next-themes", bold: true })] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Toggle in Header with sun/moon icon")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Persistence in localStorage")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("CSS variables for dynamic colors")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Palettes: Dark (current) and Light (white background)", bold: true })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("4.2.2 Advanced Animations")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Framer Motion enhancements", bold: true })] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Page transitions: fade + slide")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Card animations: scale + hover effects")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Table row animations: stagger entrance")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Loading skeletons: shimmer effect")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("4.2.3 Interactive Charts")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Recharts integration", bold: true })] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Line Chart: 30-day transaction volume")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Bar Chart: Country comparison")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Pie Chart: Payment method distribution")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Area Chart: Success rate trends")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.3 Advanced Financial Features")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("4.3.1 Real-time Forex")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Live currency conversion with Finance skill", bold: true })] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Real-time rates: EUR/USD, EUR/GBP, EUR/BRL")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Integrated calculator")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Rate history: 7/30/90 days")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Rate alerts: threshold notifications")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("4.3.2 Trend Analysis & Predictions")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "ML-powered insights", bold: true })] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Seasonal pattern detection")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Volume prediction: 7/14/30 days")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Underutilized rail identification")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Optimization recommendations")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("4.3.3 Automated Reports (PDF/Excel)")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "PDF and XLSX skill integration", bold: true })] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Automated monthly reports")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Customizable templates per company")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Export: PDF (presentation) and Excel (raw data)")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Automatic email delivery")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.4 Architecture & Performance")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("4.4.1 WebSocket Real-time")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Mini-service on port 3003", bold: true })] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Socket.io for client-server connection")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Events: transaction:created, transaction:updated, capacity:changed")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Auto-reconnect with exponential retry")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("4.4.2 PostgreSQL Migration")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Database upgrade", bold: true })] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("SQLite to PostgreSQL (Vercel Postgres or Supabase)")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Update Prisma schema with native PostgreSQL types")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Data migration script for existing records")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Indexing for frequently queried columns")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Connection pooling with Prisma")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Redis cache for frequent queries")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("4.4.3 Edge Functions & CDN")] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Performance optimization", bold: true })] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Migrate API routes to Edge Functions (Vercel Edge)")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("CDN for static assets (images, fonts)")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("Image optimization with Next.js Image component")] }),
        new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [new TextRun("ISR for static pages")] }),

        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("5. Summary Table")] }),

        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [2000, 2500, 2000, 2500],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, shading: { fill: colors.tableHeader, type: "CLEAR" }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Category", bold: true, size: 22 })] })]
                }),
                new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, shading: { fill: colors.tableHeader, type: "CLEAR" }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Feature", bold: true, size: 22 })] })]
                }),
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, shading: { fill: colors.tableHeader, type: "CLEAR" }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Complexity", bold: true, size: 22 })] })]
                }),
                new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, shading: { fill: colors.tableHeader, type: "CLEAR" }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Impact", bold: true, size: 22 })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "AI", size: 22 })] })]
                }),
                new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Chatbot LLM", size: 22 })] })]
                }),
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Medium", size: 22 })] })]
                }),
                new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "-40% support tickets", size: 22 })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "AI", size: 22 })] })]
                }),
                new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "VLM Doc Analysis", size: 22 })] })]
                }),
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "High", size: 22 })] })]
                }),
                new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "-60% verification time", size: 22 })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "UX/UI", size: 22 })] })]
                }),
                new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Dark/Light Mode", size: 22 })] })]
                }),
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Low", size: 22 })] })]
                }),
                new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Better accessibility", size: 22 })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "UX/UI", size: 22 })] })]
                }),
                new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Recharts Graphs", size: 22 })] })]
                }),
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Medium", size: 22 })] })]
                }),
                new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Trend visualization", size: 22 })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Architecture", size: 22 })] })]
                }),
                new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "WebSocket Real-time", size: 22 })] })]
                }),
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Medium", size: 22 })] })]
                }),
                new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Instant updates", size: 22 })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Architecture", size: 22 })] })]
                }),
                new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "PostgreSQL Migration", size: 22 })] })]
                }),
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "High", size: 22 })] })]
                }),
                new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "10x+ scalability", size: 22 })] })]
                })
              ]
            })
          ]
        }),

        new Paragraph({ spacing: { before: 600 }, children: [new TextRun("")] }),
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "--- End of Document ---", color: colors.secondary })] }),
        new Paragraph({ spacing: { before: 200 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "NeXFlowX Dashboard v2.4.1-beta", color: colors.secondary, size: 20 })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Technical Documentation - Proposed for Evolution v3.0", color: colors.secondary, size: 20 })] }),
        new Paragraph({ spacing: { before: 200 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Prepared by: Z.ai Code | Date: December 2024", color: colors.secondary, size: 20 })] })
      ]
    }
  ]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/NeXFlowX-Documentation-Technique-v2.4.1.docx", buffer);
  console.log("Document generated successfully!");
});
