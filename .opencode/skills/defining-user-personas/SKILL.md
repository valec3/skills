---
name: defining-user-personas
description: Defines evidence-based user personas. Use when the user asks for personas, proto-personas, audience segmentation, behavior archetypes, empathy maps, or target-user profiles for a product.
---

# Defining User Personas

## When to Use

- User asks for user personas or proto-personas.
- User needs audience segments before UI/UX design.
- Team needs shared language for goals, pains, and behaviors.

## Workflow

- [ ] Clarify product scope and primary use case.
- [ ] List available evidence (interviews, analytics, support tickets, sales notes).
- [ ] Draft 2-4 personas with distinct behavior patterns.
- [ ] Validate persona overlap and remove duplicates.
- [ ] Produce actionable output for design decisions.

## Instructions

1. Start from behaviors, not demographics.
2. For each persona, include:
   - Name and short archetype label.
   - Primary job-to-be-done.
   - Core goals and success criteria.
   - Main frustrations and blockers.
   - Decision triggers and trust signals.
   - Preferred channel and device context.
   - Accessibility or context constraints (if known).
3. Add confidence level per assumption:
   - High: directly observed.
   - Medium: inferred from multiple signals.
   - Low: hypothesis needing validation.
4. Add anti-persona notes when useful.
5. End with design implications per persona.

## Output Format

Save as plain text in `results/personas.txt` using this structure:

PERSONA: <name>
ARCHETYPE: <label>
JTBD: <job>
GOALS:

- ...
  PAINS:
- ...
  TRIGGERS:
- ...
  DESIGN IMPLICATIONS:
- ...
  CONFIDENCE: High | Medium | Low

## Quality Bar

- Personas are behavior-first and non-overlapping.
- Every persona has at least 3 concrete design implications.
- Assumptions are explicitly marked with confidence.
