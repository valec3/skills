---
name: generating-quotations-latex
description: Genera cotizaciones profesionales en LaTeX con diseño estilo libro. Usa cuando el usuario pide crear una cotización, presupuesto, propuesta comercial o factura proforma en LaTeX, o cuando necesita un documento de precios detallado con desglose de funcionalidades y especificaciones técnicas precisas.
---

# Generador de Cotizaciones en LaTeX

## Cuando usar esta skill

- Usuario pide "crear cotización LaTeX", "generar presupuesto proforma", "hacer propuesta comercial"
- Usuario proporciona requisitos específicos y quiere un documento PDF profesional con diseño elegante
- Usuario necesita desglose detallado de funcionalidades con precios por componente específico

## Flujo de Trabajo

1. **Recopilar información** usando el checklist de abajo
2. **Identificar estrictamente qué INCLUYE y qué NO INCLUYE**
3. **Desglosar precios por componente específico** (nunca generalidades)
4. **Generar LaTeX** usando el template estilo libro
5. **Validar** que toda especificación esté reflejada

## Checklist de Información Requerida

```
□ Nombre del proyecto: _______________
□ Descripción breve (2-3 oraciones): _______________
□ Tipo de sitio: (catálogo, tienda, portafolio, landing, etc.)

SECCIONES FRONTEND:
  □ Sección 1: _______________ - Qué hace: _______________
  □ Sección 2: _______________ - Qué hace: _______________

PANEL ADMINISTRATIVO (por cada módulo):
  □ Módulo: _______________
    - Campos editables: _______________
    - Límites: _______________
    - NO editable: _______________

EXTRAS INCLUIDOS: _______________
EXCLUSIONES EXPLÍCITAS: _______________
PRECIO TOTAL: S/ _______
PAGOS: Adelanto ____% | Entrega ____%
TIEMPO DE ENTREGA: ____ días úteis
DATOS DEV: Nombre: ______, Tel: ______, Email: ______
```

## Reglas de Especificación

Para cada módulo del panel admin, seguir este formato:

```
MÓDULO: [Nombre exacto]
CAMPOS EDITABLES:
  - [Campo 1]: [tipo] [límite si aplica]
  - [Campo 2]: [tipo] [límite si aplica]
LÍMITES DEL MÓDULO:
  - Máximo de items: X
  - Formatos imagen: JPG, PNG (máx 2MB)
ELEMENTOS NO EDITABLES:
  - [Elemento]: [razón]
```

## Template LaTeX - Diseño Estilo Libro

```latex
\documentclass[11pt]{article}
\usepackage[utf8]{inputenc}
\usepackage[spanish]{babel}
\usepackage[margin=2cm, top=2.5cm, bottom=2cm]{geometry}
\usepackage{xcolor}
\usepackage{booktabs}
\usepackage{fontspec}
\usepackage{titlesec}
\usepackage{graphicx}
\usepackage[colorlinks=true, linkcolor=main, urlcolor=main]{hyperref}

% Paleta de colores estilo libro
\definecolor{primary}{RGB}{41, 66, 122}
\definecolor{secondary}{RGB}{139, 90, 43}
\definecolor{accent}{RGB}{178, 34, 34}
\definecolor{light}{RGB}{245, 245, 245}
\definecolor{dark}{RGB}{33, 33, 33}
\definecolor{muted}{RGB}{128, 128, 128}

\setmainfont{Latin Modern Roman}
\titleformat{\section}{\Large\bfseries\color{primary}}{}{0em}{}
\titleformat{\subsection}{\large\bfseries\color{secondary}}{}{0em}{}

\begin{document}

% ENCABEZADO
\begin{minipage}[t]{0.65\textwidth}
    \vspace{0pt}
    {\LARGE\bfseries\color{primary}COTIZACIÓN}\\[0.3em]
    {\large\color{dark}[Nombre del Proyecto]}\\[0.5em]
    \small
    \begin{tabular}{rl}
        \textbf{Fecha:} & \today \\
        \textbf{Validez:} & 15 días
    \end{tabular}
\end{minipage}
\hfill
\begin{minipage}[t]{0.30\textwidth}
    \vspace{0pt}
    \raggedleft
    {\large\bfseries\color{secondary}[Tu Nombre]}\\[0.2em]
    \small\color{muted}
    Desarrollador Full Stack\\
    \href{tel:+51999999999}{+51 999 999 999}\\
    email@ejemplo.com
\end{minipage}

\vspace{0.5em}\hrule\vspace{0.5em}

% RESUMEN
\section*{Resumen}
\noindent
[Breve descripción del proyecto en 2-3 oraciones]

% INCLUIDOS
\section*{Lo que está INCLUIDO}
\subsection*{Estructura Visual}
\begin{tabular}{lp{11cm}r}
\toprule
\textbf{Componente} & \textbf{Descripción} & \textbf{Costo} \\
\midrule
[Item 1] & [Descripción específica] & S/ XX.00 \\
[Item 2] & [Descripción específica] & S/ XX.00 \\
\midrule
\textbf{Subtotal} & & \textbf{S/ XX.00} \\
\bottomrule
\end{tabular}

\subsection*{Panel Administrativo}
\begin{tabular}{lp{11cm}r}
\toprule
\textbf{Módulo} & \textbf{Qué incluye} & \textbf{Costo} \\
\midrule
\textbf{[Nombre]} & \textbf{Edita:} [campo1], [campo2], [campo3] & S/ XX.00 \\
 & \textbf{Límite:} [máx items], [formatos] & \\
\midrule
\textbf{[Nombre]} & \textbf{Edita:} [campo1], [campo2] & S/ XX.00 \\
 & \textbf{Límite:} [máx items], [formatos] & \\
\midrule
\textbf{Subtotal} & & \textbf{S/ XX.00} \\
\bottomrule
\end{tabular}

% NO INCLUIDOS
\section*{Lo que NO está INCLUIDO}
\begin{tabular}{lp{11cm}}
\toprule
\textbf{Categoría} & \textbf{Explicación} \\
\midrule
[Item excluido] & [Razón de exclusión] \\
[Item excluido] & [Razón de exclusión] \\
\bottomrule
\end{tabular}

% TOTAL
\vspace{1em}
\begin{center}
\fbox{
\begin{minipage}{0.4\textwidth}
\vspace{0.5em}
\centerline{\Large\bfseries\color{primary}TOTAL}\\[0.3em]
\centerline{\Large\bfseries\color{accent}S/ XXX.00}
\vspace{0.5em}
\end{minipage}
}
\end{center}

% CONDICIONES
\section*{Condiciones de Pago}
\begin{tabular}{lll}
\toprule
\textbf{Etapa} & \textbf{Monto} & \textbf{Condición} \\
\midrule
Adelanto & S/ XX.00 (XX\%) & Para iniciar desarrollo \\
Entrega & S/ XX.00 (XX\%) & Upon conformidad \\
\midrule
\end{tabular}

\begin{itemize}
    \item \textbf{Tiempo de entrega:} X a Y días úteis
    \item \textbf{Revisiones:} 2 rondas de ajustes menores
    \item \textbf{Cambios adicionales:} S/ XX.00/hora
\end{itemize}

\vfill
\begin{center}
\color{muted}\small
\midrule
\textbf{Contacto:} +51 XXX XXX XXX \quad|\quad email@ejemplo.com \\
\midrule
\end{center}

\end{document}
```

## Recursos

- **Compilar:** `xelatex archivo.tex` (requiere XeLaTeX)
- **Dependencias:** xcolor, booktabs, fontspec, titlesec, graphicx, hyperref
- **Debug:** Revisar archivo `.log` si hay errores de compilación
