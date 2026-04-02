---
name: running-spec-driven-development
description: Runs a complete Spec-Driven Development workflow. Use when the user asks to define requirements before coding, create technical specs, derive implementation plans, write acceptance criteria, or enforce build-from-spec execution.
---

# Running Spec-Driven Development

## When to Use

- User asks to build software from a spec-first process.
- Team needs clear requirements, constraints, and acceptance criteria before coding.
- A feature has high ambiguity and needs staged validation.

## Workflow

- [ ] Define problem statement and measurable outcome.
- [ ] Draft product spec (scope, non-goals, constraints).
- [ ] Convert spec into technical design decisions.
- [ ] Produce implementation plan with milestones.
- [ ] Derive test strategy and acceptance criteria.
- [ ] Execute in small batches and validate against spec.

## Instructions

1. Enforce phase gates:
   - Spec gate: no coding until requirements and non-goals are explicit.
   - Design gate: no coding until architecture and trade-offs are written.
   - Acceptance gate: no merge until criteria are validated.
2. Always separate these artifacts:
   - Product Spec: what and why.
   - Technical Spec: how.
   - Implementation Plan: when and in what sequence.
3. For each requirement, include:
   - Identifier (REQ-001 style).
   - User/system behavior.
   - Rationale.
   - Edge cases.
   - Acceptance test.
4. Require explicit non-goals to prevent scope creep.
5. Track assumptions and risks with owner and mitigation.
6. If information is missing, ask focused clarifying questions before drafting.

## Output Files

Generate plain text files under `results/spec-driven/`:

- `results/spec-driven/product-spec.txt`
- `results/spec-driven/technical-spec.txt`
- `results/spec-driven/implementation-plan.txt`
- `results/spec-driven/acceptance-tests.txt`

## Templates

Use this minimum structure for `product-spec.txt`:

TITLE: <feature>
PROBLEM STATEMENT:
SUCCESS METRICS:
IN SCOPE:
- ...
OUT OF SCOPE:
- ...
PERSONAS / ACTORS:
- ...
REQUIREMENTS:
- REQ-001: ...
EDGE CASES:
- ...
RISKS:
- ...

Use this minimum structure for `technical-spec.txt`:

ARCHITECTURE SUMMARY:
DATA MODEL CHANGES:
API / INTERFACE CHANGES:
STATE MANAGEMENT:
ERROR HANDLING:
OBSERVABILITY:
TRADE-OFFS:
- Decision: ...
  Alternatives: ...
  Why: ...

Use this minimum structure for `implementation-plan.txt`:

MILESTONES:
1. ...
2. ...
3. ...
TASK BREAKDOWN:
- TASK-001: ...
DEPENDENCIES:
- ...
ROLLBACK PLAN:
- ...

Use this minimum structure for `acceptance-tests.txt`:

ACCEPTANCE CRITERIA:
- AC-001 linked to REQ-001
TEST CASES:
- Given / When / Then
NON-FUNCTIONAL CHECKS:
- Performance
- Accessibility
- Security

## Quality Bar

- Every acceptance criterion maps to at least one requirement.
- Non-goals are explicit and testable.
- Plan includes risk mitigation and rollback.
- No implementation starts before spec and design gates pass.
