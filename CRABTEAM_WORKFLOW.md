# CrabTeam Autonomous Development Workflow

This document outlines the mandatory steps for developing any new service under the **CrabTeam** brand.

## Phase 1: Research & Planning (Foundations)
1.  **Trend Analyst (KR)**: Market research & trend identification.
2.  **Service Planner (PM)**: PRD (Product Requirement Document) creation.
3.  **UI/UX Designer**: Visual identity & design tokens.
4.  **Tech Architect**: System design & tech stack selection.

## Phase 2: Implementation (Builders)
1.  **Backend/Frontend Dev**: Core feature implementation.
2.  **DevOps Engineer**: Infrastructure & CI/CD setup.
3.  **QA Specialist**: Initial functional verification.

## Phase 3: The 10-Cycle Verification Loop (Mandatory)
-   **Step 1**: The **Evaluation Group (10 Personas)** reviews the current version.
-   **Step 2**: The **Consumer Insight Expert** synthesizes feedback.
-   **Step 3**: **CrabTeam** implements fixes/enhancements based on the report.
-   **Step 4**: Repeat the process for a minimum of **10 cycles**.
-   **Step 5**: Commit each cycle result to Git: `feat: Cycle [N] - [Description]`.

## Phase 4: Final Documentation & Handover
- Create a comprehensive `outputs/service_report_[service_name].md` in Git.
- Finalize all changes and **directly merge to the `main` branch**.
- The report must include:

    -   Service Vision & Goals.
    -   Technical Architecture.
    -   Key Features (Implemented vs. Planned).
    -   User Feedback Summary (from the 10 cycles).
    -   Local Setup & Test Guide.
    -   Market Success Potential.
-   **Final Step**: Merge the integrated feature branch into the `main` branch directly and push to the remote repository. No PR is required.

## Phase 5: Continuous Evolution (Post-Launch)
-   **Director**: **Evolution Director (진화 감독관)**
-   **Process**: A rigorous 10+ cycle iteration to upgrade the service.
-   **Data Sources**: Customer Feedback, Internal Experts, Internet Research, Competitor Analysis.
-   **Execution**: Each cycle is planned, delegated to builders, verified, and committed (`evolve: Cycle [N] - [Goal]`).

## Trigger Commands
-   **"꽃게팀 작업개시"**: This initiates the entire workflow for a NEW service (Phase 1 to Phase 4).
-   **"꽃게팀 진화개시 [서비스명]"**: This triggers the **Evolution Director** to take over an EXISTING service and run the 10+ cycle evolution process (Phase 5).
