---
name: auditing-ux-heuristics
description: Audits interfaces with UX heuristics and severity ratings. Use when the user asks for heuristic review, UX audit, usability issues, interface critique, or prioritized UX fixes.
---

# Auditing UX Heuristics

## When to Use

- User asks for UX review or usability audit.
- Team needs prioritized UX issues before implementation.
- Product quality gates require severity-based findings.

## Workflow

- [ ] Define audit scope (screens, persona, device).
- [ ] Evaluate against heuristic set.
- [ ] Log issue, evidence, impact, and recommendation.
- [ ] Assign severity and confidence.
- [ ] Return prioritized fix backlog.

## Instructions

1. Use these heuristics as baseline:
   - Visibility of system status.
   - Match between system and real world.
   - User control and freedom.
   - Consistency and standards.
   - Error prevention and recovery.
   - Recognition over recall.
   - Efficiency and flexibility.
   - Aesthetic and minimalist design.
   - Help and documentation.
2. For each finding include:
   - Screen/location.
   - Heuristic violated.
   - Evidence.
   - User impact.
   - Proposed fix.
3. Severity scale:
   - S1 Critical.
   - S2 High.
   - S3 Medium.
   - S4 Low.
4. Confidence scale:
   - High, Medium, Low.

## Output Format

Save as `results/ux-heuristic-audit.txt`:

FINDING ID: <id>
SEVERITY: S1|S2|S3|S4
CONFIDENCE: High|Medium|Low
SCREEN: <screen>
HEURISTIC: <name>
EVIDENCE: <observation>
IMPACT: <user/business>
RECOMMENDED FIX: <action>

PRIORITY BACKLOG:

1. ...
2. ...
3. ...

## Quality Bar

- Findings are evidence-based, not opinion-only.
- Each issue has severity and concrete fix.
- Backlog is ordered by user impact.
