---
name: generating-cv-latex
description: Generates professional CVs in LaTeX format. Use when user wants to create, update, or customize a CV in LaTeX using their existing template.
---

# CV LaTeX Generator

## When to use this skill

- User wants to create a new CV in LaTeX
- User wants to update their existing LaTeX CV
- User needs to adapt their CV for a specific job position
- User wants to translate CV content to English/Spanish
- User needs help formatting CV sections

## Workflow

1. Ask user which template to use: **1 página** or **2 páginas**
2. Gather user's data (or use provided information)
3. Identify which sections need to be included:
   - Header (name, title, phone, email, LinkedIn, portfolio)
   - Summary/Profile
   - Skills (technical/hard skills)
   - Work Experience
   - Complementary Experience (2 páginas)
   - Education
   - Certifications
   - Languages (optional)
4. Generate LaTeX code using selected template
5. Output the complete .tex file

## Available Templates

| Template | File | Use Case |
|----------|------|----------|
| 2 páginas | `resources/cv-format-2pages.tex` | Experiencia extensa, múltiples roles |
| 1 página | `resources/cv-format-1page.tex` | Aplicaciones rápidas, roles específicos |

Also available in `work/cv-latex/`:
- `cv-format-2pages.tex` - Tu plantilla actual con datos de ejemplo

## Instructions

### Header Format (IMPORTANT)
Always use this exact format:
```latex
\begin{center}
    {\Large \textbf{NOMBRE COMPLETO}} \\[-2pt]
    \textcolor{secondary}{Título Profesional} \\[4pt]
    +51 XXX XXX XXX \ | \
    \hrefmailto{email@email.com}{email@email.com} \\[-2pt]
    \href{https://linkedin.com/in/usuario}{linkedin.com/in/usuario} \ | \
    \href{https://portfolio.vercel.app}{portfolio.vercel.app}
\end{center}
```

**Note:** 
- NO incluir ubicación/ciudad en el header
- Usar `\hrefmailto{email}{display}` (no `\hrefmailto`)
- Incluir siempre portfolio

### Select Template
1. Ask user: "¿1 página o 2 páginas?"
2. Use corresponding template structure from `resources/`

### For new CVs:
1. Gather user's personal info: name, title, phone, email, LinkedIn, portfolio
2. Collect work experience (company, role, dates, bullet points)
3. Gather skills by category
4. Add education and certifications
5. Generate complete LaTeX file

### For updating existing CV:
1. Read current CV content from `work/data/victor-maye-career-data.json`
2. Identify what needs to be updated
3. Generate new version maintaining format

### For job-specific adaptations:
1. Ask for target job description
2. Reorder skills to prioritize relevant ones
3. Adjust bullet points to match job requirements keywords
4. Keep it to 2 pages maximum

### Language options:
- Spanish: Use "Perfil Profesional", "Habilidades Técnicas", "Experiencia Profesional"
- English: Use "Professional Profile", "Technical Skills", "Professional Experience"

## Tips

- Keep bullets concise (1-2 lines max)
- Use action verbs + metrics + tools
- ATS-friendly: avoid tables, graphics, headers/footers
- Always include portfolio link
- NO incluir ciudad en el header
