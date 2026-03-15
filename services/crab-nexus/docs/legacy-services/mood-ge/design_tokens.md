# Design Tokens & UI/UX Strategy: Mood-Ge (무드게)

## 1. Visual Identity
- **Primary Color**: `#FF7F50` (Coral Crab) - Energetic yet soft, symbolizing the "Crab."
- **Secondary Colors**: 
    - `#87CEEB` (Sky Blue) - Calm, sky, and water.
    - `#98FB98` (Pale Green) - Growth and ritual.
- **Background**: `#F9F9FB` (Off-white) - Clean and non-distracting.
- **Typography**: `Pretendard`, Sans-serif, Rounded edges to feel approachable.

## 2. Interaction Model
- **The "Mood Crab"**: A central character that reacts to user input with animations.
- **Soft Transitions**: All state changes (mood logging, task completion) should use gentle CSS transitions (0.3s ease-in-out).
- **Haptic-like feedback**: Visual pops or subtle color changes when tasks are completed.

## 3. Core UI Components
- `MoodPicker`: A set of emoji-based buttons (Happy, Sad, Neutral, Energetic, Tired).
- `ChallengeCard`: A simple list item for daily micro-tasks with a checkbox.
- `RecoveryGauge`: A circular progress bar showing the user's weekly burnout recovery status.
- `CrabHome`: A visual representation of the crab's habitat that evolves.

## 4. Tone & Voice (Korean)
- "오늘 하루는 어떠셨나요?" (How was your day?)
- "작은 성취가 모여 큰 변화를 만들어요!" (Small wins make big changes!)
- "꽃게가 당신의 마음을 응원합니다." (The Crab is rooting for your heart.)
