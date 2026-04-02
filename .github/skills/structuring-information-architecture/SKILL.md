---
name: structuring-information-architecture
description: Structures information architecture for websites and apps. Use when the user asks for sitemap, navigation model, taxonomy, labeling systems, content hierarchy, or IA cleanup.
---

# Structuring Information Architecture

## When to Use

- User asks for sitemap or menu structure.
- Product has discoverability issues.
- Content and navigation need clearer hierarchy.

## Workflow

- [ ] Inventory content and feature modules.
- [ ] Group by user mental model.
- [ ] Define top-level nav and secondary nav.
- [ ] Validate labels for clarity and consistency.
- [ ] Produce sitemap plus URL strategy.

## Instructions

1. Prioritize user language over internal team jargon.
2. Enforce IA rules:
   - Mutual exclusivity where possible.
   - Progressive disclosure for advanced sections.
   - Max 5-7 primary navigation items.
3. For each node define:
   - Purpose.
   - Audience.
   - Key tasks.
4. Include URL conventions:
   - Short, predictable slugs.
   - Consistent depth per section.
5. Add IA risks:
   - Duplicate labels.
   - Overloaded categories.
   - Dead-end pages.

## Output Format

Save as `results/information-architecture.txt`:

PRIMARY NAV:

- <item>: Purpose / Key task

SITEMAP:

- /<slug>
  - /<slug>/<child>

LABELING RULES:

- ...

URL STRATEGY:

- Pattern: ...

IA RISKS:

- ...

## Quality Bar

- Navigation supports top tasks in <=3 clicks.
- Labels are plain language and non-ambiguous.
- Sitemap maps directly to user goals.
