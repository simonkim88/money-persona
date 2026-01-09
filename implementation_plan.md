# Financial Persona Test Website - Implementation Plan

## Goal Description
Build a financial persona test website tailored for Korean teenagers. The system will determine a user's financial personality type (1 of 16) based on a quiz and provide tailored advice.

## Tech Stack
- **Frontend**: Next.js (App Router), **Framer Motion** (Kinetic Typography), Tailwind CSS.
- **Backend**: Python FastAPI, **LangChain/LlamaIndex** (for AI Mentor).
- **Database**: PostgreSQL + **pgvector** (for RAG knowledge base).
- **AI Model**: Gemini 1.5 Pro/Flash (via Vertex AI).
- **Auth**: OAuth 2.0 (Kakao, Google).

## User Review Required
> [!IMPORTANT]
> **Scope Update**: The plan now includes **Gamification** (XP, Levels), **Social Login**, and **AI Mentoring** (RAG).
> Please confirm if "Dr. Ryu" specific knowledge base files exist for the RAG system.

## Proposed Architecture & Changes

### Database Schema (PostgreSQL)
We will use SQLAlchemy (ORM) in FastAPI.

#### Tables
1.  **`users`**
    *   `id` (UUID, PK)
    *   `nickname` (String)
    *   `grade` (String, e.g., "Middle School 2")
    *   `oauth_provider` (Enum: KAKAO, GOOGLE, GUEST)
    *   `persona_code` (String, FK)
    *   `level` (Integer, default 1)
    *   `xp` (Integer, default 0)
    *   `created_at` (Timestamp)

2.  **`personas`** (Static content for 16 types)
    *   `code` (String, PK, e.g., "D-F-S-R")
    *   `name` (String)
    *   `group` (String)
    *   `description` (Text)
    *   `img_url` (String, **Pixar-style 3D Character**)
    *   **(Specific attributes for 16 types as defined previously)**

3.  **`pillar_scores`** (User's Raw Test Data)
    *   `id` (UUID, PK)
    *   `user_id` (UUID, FK)
    *   `command_score` (Integer)
    *   `time_score` (Integer)
    *   `play_score` (Integer)
    *   `value_score` (Integer)

4.  **`chat_logs`** (AI Mentor "Dr. Ryu")
    *   `id` (UUID, PK)
    *   `user_id` (UUID, FK)
    *   `session_id` (String)
    *   `message` (Text)
    *   `sender` (Enum: USER, AI_MENTOR)
    *   `timestamp` (Timestamp)

5.  **`gamification`** (New: Missions & Badges)
    *   `id` (UUID, PK)
    *   `user_id` (UUID, FK)
    *   `badges_earned` (JSON, list of badge IDs)
    *   `missions_completed` (JSON)
    *   `last_login` (Timestamp, for streak calculation)

### Frontend (Next.js + Tailwind CSS)

#### Design System (Apple HIG Inspired)
*   **Colors**: Subtle grays, high contrast black text, soft blue/system colors for actions.
    *   Background: `#F5F5F7` (Light gray typical of Apple backgrounds) or Pure White `#FFFFFF`.
    *   Cards: White with soft shadows (`shadow-sm`, `shadow-md`).
    *   Typography: Inter or San Francisco clone. Tight letter spacing for headings.
*   **Layout**:
    *   Ample whitespace (padding/margin `p-8`, `m-12`).
    *   Centered content with max-width constraints (`max-w-2xl`).
    *   Rounded corners: `rounded-2xl` or `rounded-3xl` for modern feel.

#### Component Structure
*   **Animation**: Extensive use of `Framer Motion` for "Kinetic Typography" and smooth transitions.
*   **`HeroSection`**: Pixar-style 3D intro.
*   **`StoryQuiz`**: 12-step interactive story with "Narrative" elements.
*   **`ResultDashboard`**:
    *   Persona Card (3D visual).
    *   Radar Chart (D/F/L/R axes).
    *   "Dr. Ryu" Chat Widget (Floating AI mentor).

### Backend (FastAPI + LangChain)

#### API Endpoints
*   `POST /auth/login`: Kakao/Google OAuth handling.
*   `GET /quiz/story`: Retrieve the 12 story-based questions.
*   `POST /quiz/submit`: Calculate persona + Award XP.
*   `POST /chat/mentor`: RAG-based chat with "Dr. Ryu" (Context: Financial Wisdom).
*   `GET /user/dashboard`: Get Level, XP, Badges, and History.

## Logic: 16-Type Algorithm & Gamification

1.  **Persona Logic (12 Questions)**
    *   Map 12 Story Questions -> 4 Axes.
    *   Calculate User Type.

2.  **Gamification Engine**
    *   **XP System**: Quiz Completion (+100XP), Daily Login (+10XP).
    *   **Leveling**: Formula (e.g., Level = sqrt(XP) * Constant).
    *   **Badges**: "First Step", "3-Day Streak", "Saver King".

3.  **AI RAG System (Dr. Ryu)**
    *   **Knowledge Base**: Ingest provided financial texts (Vector Store).
    *   **Persona**: System prompt to act as "Dr. Ryu" (Warm, Authoritative, Economist).

## Verification Plan

### Automated Tests
- Backend: Pytest for the scoring algorithm (ensure specific answers lead to expected persona).
- Frontend: Jest/React Testing Library for component rendering.

### Manual Verification
- Run through the full quiz flow.
- Verify the "Apple-style" aesthetics (visual check).
- Verify database persistence of results.
