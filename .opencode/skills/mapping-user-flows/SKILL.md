---
name: mapping-user-flows
description: Maps end-to-end user flows. Use when the user asks for task flows, conversion flow, onboarding flow, checkout alternative flow, state transitions, or UX flow diagrams.
---

# Mapping User Flows

## When to Use

- User asks to define how users move through screens.
- Team needs happy path plus edge cases.
- Product requires alignment between UX and engineering states.

## Workflow

- [ ] Define entry points and success event.
- [ ] Create happy path with numbered steps.
- [ ] Add alternate paths and failure states.
- [ ] Mark decision points and required data.
- [ ] Add UX risks and mitigation actions.

## Instructions

1. Always define flow scope first:
   - Actor.
   - Start state.
   - End state.
   - Success metric.
2. Build flows in this sequence:
   - Happy path.
   - Empty states.
   - Error and recovery path.
   - Exit and re-entry path.
3. For each step, include:
   - Screen or module name.
   - User action.
   - System response.
   - Validation or guard condition.
4. Explicitly mark irreversible steps.
5. Add instrumentation hints (events to track).

## Output Format

Save as `results/user-flow.txt`:

FLOW NAME: <name>
ACTOR: <persona>
SUCCESS EVENT: <event>

HAPPY PATH:

1. Screen: ...
   Action: ...
   System: ...
   Condition: ...

ALTERNATE PATHS:

- Trigger: ...
  Recovery: ...

ERROR STATES:

- Error: ...
  UX Message: ...
  Recovery Action: ...

METRICS TO TRACK:

- ...

## Quality Bar

- Flow is testable from start to finish.
- Error recovery is explicit at each critical step.
- Tracking events align with decision points.
