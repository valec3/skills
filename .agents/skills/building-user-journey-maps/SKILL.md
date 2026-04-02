---
name: building-user-journey-maps
description: Builds user journey maps across stages and touchpoints. Use when the user asks for journey mapping, experience gaps, moments of truth, cross-channel UX, or lifecycle analysis.
---

# Building User Journey Maps

## When to Use

- User asks for journey map from awareness to retention.
- Team needs to identify friction across channels.
- Stakeholders need a lifecycle-level UX view.

## Workflow

- [ ] Define journey scope and persona.
- [ ] Split lifecycle into 4-7 stages.
- [ ] Capture actions, thoughts, emotions, and pain points.
- [ ] Identify moments of truth and drop-off risks.
- [ ] Prioritize opportunity areas.

## Instructions

1. Build journey by stage, not by feature list.
2. For each stage include:
   - User goal.
   - Touchpoints.
   - Emotion score (1-5).
   - Frictions.
   - Opportunity ideas.
3. Add backstage dependencies when known:
   - Policy, operations, support, data quality.
4. Tag each opportunity by impact and effort.
5. End with top 3 interventions to test first.

## Output Format

Save as `results/journey-map.txt`:

PERSONA: <name>
JOURNEY SCOPE: <scope>

STAGE: <stage>
GOAL: <goal>
TOUCHPOINTS:

- ...
  EMOTION SCORE: <1-5>
  FRICTIONS:
- ...
  OPPORTUNITIES:
- Idea: ...
  Impact: High|Medium|Low
  Effort: High|Medium|Low

TOP INTERVENTIONS:

1. ...
2. ...
3. ...

## Quality Bar

- Includes complete lifecycle, not isolated screens.
- Uses explicit prioritization (impact/effort).
- Produces clear next experiments.
