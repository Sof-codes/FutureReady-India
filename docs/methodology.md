# Methodology Documentation — FutureReady India

## 1. Mathematical Formulation of AI Task Exposure Score

For any task $t$, we define five parameters evaluated on a normalized scale $[0, 4]$:
- $R_t$: AI Replaceability (Potential of state-of-the-art AI to execute the task)
- $J_t$: Human Judgement & Strategic Decision Requirement
- $S_t$: Social Interaction & Empathy Requirement
- $C_t$: Unstructured Creativity Requirement
- $K_t$: Technical & Domain Complexity

The raw task exposure $E_t$ is calculated as:
$$E_t = \frac{R_t}{4.0} \times \left(1.0 - 0.40 \times \frac{J_t + S_t + C_t}{12.0}\right)$$

### Exposure Tiers
- **High Exposure** ($E_t \ge 0.70$): High potential for automation; priority for AI tool workflow adoption.
- **Medium Exposure** ($0.40 \le E_t < 0.70$): Strong candidate for AI augmentation and collaborative human-AI workflows.
- **Low Exposure** ($E_t < 0.40$): High reliance on human judgment, relationship management, or complex reasoning.

---

## 2. Career Pathway Recommendation Model

The career match score for candidate $U$ against occupation $O$ is formulated as:
$$\text{MatchScore}(U, O) = w_1 \cdot \text{SkillMatch} + w_2 \cdot \text{InterestMatch} + w_3 \cdot \text{AIReadiness} + w_4 \cdot \text{FutureAlignment}$$

Where:
- $w_1 = 0.50$ (Skill proficiency alignment)
- $w_2 = 0.20$ (User sector interest alignment)
- $w_3 = 0.15$ (Self-assessed AI tool fluency)
- $w_4 = 0.15$ (Alignment with WEF/ILO high-growth skill signals)
