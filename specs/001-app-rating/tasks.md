# Tasks: App Store Rating Request

**Input**: Design documents from `/specs/001-app-rating/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅

**Tests**: Tests ARE included for this feature (per constitution Principle III)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

This is a mobile React Native project with single structure:
- Feature code: `src/features/appRating/`
- Store code: `src/infra/store/slices/rating/`
- Routes: `src/app/(protected)/(tabs)/features/(appRating)/`
- Tests: `src/infra/store/slices/rating/*.test.ts`, `tests/e2e/appRating.yaml`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: i18n translations and analytics infrastructure needed by all user stories

- [x] T001 [P] Add rating translation keys to src/infra/i18n/resources/en/translation.json
- [x] T002 [P] Add rating event types to src/infra/analytics/analytics.types.ts

**Checkpoint**: Translations and analytics infrastructure ready for feature implementation

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Rating state management that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 [P] Create RatingState and RatingActions types in src/infra/store/slices/rating/rating.types.ts
- [x] T004 [P] Create DeviceInfo, FeedbackEntry, and PromptConfig types in src/infra/store/slices/rating/rating.types.ts
- [x] T005 Implement createRatingSlice with all actions in src/infra/store/slices/rating/rating.slice.ts
- [x] T006 Create barrel export in src/infra/store/slices/rating/index.ts
- [x] T007 Integrate RatingSlice into main store in src/infra/store/store.ts
- [x] T008 Add RatingSlice fields to store persistence config in src/infra/store/store.ts

**Checkpoint**: Foundation ready - rating state management works, user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Positive Feedback Flow (Priority: P1) 🎯 MVP

**Goal**: Allow satisfied users to rate the app via native store modal

**Independent Test**: Navigate to Features screen, tap "Rate this app", tap "Yes", verify native rating modal appears (on device), dismiss modal, verify return to Features screen

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T009 [P] [US1] Unit test for RatingSlice initial state in src/infra/store/slices/rating/rating.slice.test.ts
- [x] T010 [P] [US1] Unit test for recordPromptShown action in src/infra/store/slices/rating/rating.slice.test.ts
- [x] T011 [P] [US1] Unit test for recordUserResponse action in src/infra/store/slices/rating/rating.slice.test.ts
- [x] T012 [P] [US1] Unit test for shouldShowPrompt logic in src/infra/store/slices/rating/rating.slice.test.ts

### Implementation for User Story 1

- [x] T013 [P] [US1] Create RatingPrompt component in src/features/appRating/components/RatingPrompt/RatingPrompt.tsx
- [x] T014 [P] [US1] Create RatingPrompt styles using Unistyles in src/features/appRating/components/RatingPrompt/RatingPrompt.tsx
- [x] T015 [P] [US1] Create rating routes layout in src/app/(protected)/(tabs)/features/(appRating)/_layout.tsx
- [x] T016 [P] [US1] Create prompt route screen in src/app/(protected)/(tabs)/features/(appRating)/prompt.tsx
- [x] T017 [US1] Integrate useAppStoreReview hook into RatingPrompt component for Yes button handler
- [x] T018 [US1] Add recordPromptShown call on RatingPrompt component mount with useEffect
- [x] T019 [US1] Add recordUserResponse call on Yes button press in RatingPrompt component
- [x] T020 [US1] Add analytics tracking for rating-prompt-viewed event in RatingPrompt component
- [x] T021 [US1] Add analytics tracking for rating-prompt-response-yes event in RatingPrompt component
- [x] T022 [US1] Add analytics tracking for rating-modal-shown and rating-modal-unavailable events in RatingPrompt component
- [x] T023 [US1] Add navigation to Features screen in src/app/(protected)/(tabs)/features/index.tsx with "Rate this app" CTA button
- [x] T024 [US1] Add featuresScreen.appRating.title and cta translations to src/infra/i18n/resources/en/translation.json
- [x] T025 [US1] Create barrel export for RatingPrompt in src/features/appRating/index.ts

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently - users can access rating prompt and see native modal

---

## Phase 4: User Story 2 - Negative Feedback Flow (Priority: P2)

**Goal**: Capture feedback from users who don't like the app before they leave negative public reviews

**Independent Test**: Navigate to Features screen, tap "Rate this app", tap "No", verify feedback form appears, enter text, submit, verify confirmation and return to Features screen

### Tests for User Story 2

- [ ] T026 [P] [US2] Unit test for submitFeedback action in src/infra/store/slices/rating/rating.slice.test.ts
- [ ] T027 [P] [US2] Unit test for FeedbackEntry generation with unique ID in src/infra/store/slices/rating/rating.slice.test.ts
- [ ] T028 [P] [US2] Component test for FeedbackForm text input in src/features/appRating/components/FeedbackForm/FeedbackForm.test.tsx
- [ ] T029 [P] [US2] Component test for FeedbackForm submit button in src/features/appRating/components/FeedbackForm/FeedbackForm.test.tsx

### Implementation for User Story 2

- [ ] T030 [P] [US2] Create FeedbackForm component in src/features/appRating/components/FeedbackForm/FeedbackForm.tsx
- [ ] T031 [P] [US2] Create FeedbackForm styles using Unistyles in src/features/appRating/components/FeedbackForm/FeedbackForm.tsx
- [ ] T032 [P] [US2] Create feedback route screen in src/app/(protected)/(tabs)/features/(appRating)/feedback.tsx
- [ ] T033 [US2] Add TextInput with multiline and maxLength in FeedbackForm component
- [ ] T034 [US2] Add character counter display in FeedbackForm component
- [ ] T035 [US2] Add submit button handler with submitFeedback store action in FeedbackForm component
- [ ] T036 [US2] Add device info collection using expo-device and expo-application in FeedbackForm component
- [ ] T037 [US2] Add confirmation alert on successful submission in FeedbackForm component
- [ ] T038 [US2] Add analytics tracking for feedback-form-viewed event in FeedbackForm component
- [ ] T039 [US2] Add analytics tracking for feedback-form-submitted event with hasText and textLength properties in FeedbackForm component
- [ ] T040 [US2] Add No button handler with navigation to feedback screen in RatingPrompt component
- [ ] T041 [US2] Add analytics tracking for rating-prompt-response-no event in RatingPrompt component
- [ ] T042 [US2] Add FeedbackForm to barrel export in src/features/appRating/index.ts

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - positive flow shows native modal, negative flow shows feedback form

---

## Phase 5: User Story 3 - Empty Feedback Submission (Priority: P3)

**Goal**: Allow users to exit feedback flow without being forced to provide text

**Independent Test**: Navigate to rating prompt, tap "No", verify feedback form, submit without text, verify confirmation. Repeat test but use back button instead of submit.

### Tests for User Story 3

- [ ] T043 [P] [US3] Unit test for submitFeedback with empty text in src/infra/store/slices/rating/rating.slice.test.ts
- [ ] T044 [P] [US3] Component test for FeedbackForm empty submission in src/features/appRating/components/FeedbackForm/FeedbackForm.test.tsx
- [ ] T045 [P] [US3] Component test for FeedbackForm cancel button in src/features/appRating/components/FeedbackForm/FeedbackForm.test.tsx

### Implementation for User Story 3

- [ ] T046 [US3] Add cancel button to FeedbackForm component with router.back() navigation
- [ ] T047 [US3] Add analytics tracking for feedback-form-cancelled event in FeedbackForm component
- [ ] T048 [US3] Verify submit button allows empty text submission in FeedbackForm component
- [ ] T049 [US3] Update analytics tracking to differentiate empty vs filled submissions in FeedbackForm component

**Checkpoint**: All three user stories are now complete and independently functional - users can rate, provide feedback, or exit without friction

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: E2E testing, edge case handling, and final quality improvements

- [ ] T050 [P] Create Maestro E2E test for positive flow in tests/e2e/appRating.yaml
- [ ] T051 [P] Create Maestro E2E test for negative flow in tests/e2e/appRating.yaml
- [ ] T052 [P] Add unit test for resetRatingState action in src/infra/store/slices/rating/rating.slice.test.ts
- [ ] T053 [P] Add unit test for updatePromptConfig action in src/infra/store/slices/rating/rating.slice.test.ts
- [ ] T054 [P] Add unit test for state persistence across store recreation in src/infra/store/slices/rating/rating.slice.test.ts
- [ ] T055 Add error handling for isStoreReviewAvailable failure in RatingPrompt component
- [ ] T056 Add loading state during native modal check in RatingPrompt component
- [ ] T057 Add disabled state for submit button during feedback submission in FeedbackForm component
- [ ] T058 Verify all strings use i18next translations (no hardcoded strings)
- [ ] T059 Verify all styles use Unistyles (no inline styles)
- [ ] T060 Run yarn lint:ts and fix any TypeScript errors
- [ ] T061 Run yarn lint and fix any ESLint warnings
- [ ] T062 Run yarn prettify to format all code
- [ ] T063 Run yarn test and verify all unit tests pass
- [ ] T064 Run yarn test:e2e and verify Maestro tests pass on device

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational completion - MVP deliverable
- **User Story 2 (Phase 4)**: Depends on Foundational completion - Can run in parallel with US1 if team capacity allows, but shares RatingPrompt component so sequential is safer
- **User Story 3 (Phase 5)**: Depends on User Story 2 completion (extends feedback form)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Independent after Foundational phase - No dependencies on other stories
- **User Story 2 (P2)**: Depends on User Story 1 (shares RatingPrompt component for No button navigation)
- **User Story 3 (P3)**: Depends on User Story 2 (extends FeedbackForm component with cancel flow)

### Within Each User Story

- Tests before implementation (write failing tests first per TDD)
- Components can be created in parallel (RatingPrompt and FeedbackForm are independent)
- Routes can be created in parallel (prompt.tsx and feedback.tsx are independent)
- Integration tasks (analytics, navigation, store integration) after component creation
- Story complete before moving to next priority

### Parallel Opportunities

#### Setup Phase (Phase 1)
```bash
# Both tasks touch different files - can run in parallel
Task T001: Add translations (en/translation.json)
Task T002: Add analytics events (analytics.types.ts)
```

#### Foundational Phase (Phase 2)
```bash
# Type files can be created in parallel
Task T003: RatingState/Actions types
Task T004: DeviceInfo/FeedbackEntry types

# After types complete, implementation and integration in sequence
```

#### User Story 1 (Phase 3)
```bash
# All test files can run in parallel (different test blocks)
Task T009, T010, T011, T012: All unit tests

# Component, styles, and routes can run in parallel (different files)
Task T013: RatingPrompt component
Task T014: RatingPrompt styles (same file as T013, but if separated)
Task T015: Layout
Task T016: Prompt route
Task T023: Features screen CTA

# After components exist, add integrations sequentially
```

#### User Story 2 (Phase 4)
```bash
# All test files can run in parallel
Task T026, T027: Slice tests
Task T028, T029: Component tests

# Component, styles, and route can run in parallel
Task T030: FeedbackForm component
Task T031: FeedbackForm styles (same file as T030)
Task T032: Feedback route

# After components exist, add integrations sequentially
```

#### Polish Phase (Phase 6)
```bash
# All test creation tasks in parallel
Task T050, T051: E2E tests (different test flows)
Task T052, T053, T054: Additional unit tests (different test blocks)

# Quality checks can run in parallel at the end
Task T060: yarn lint:ts
Task T061: yarn lint
Task T062: yarn prettify
```

---

## Parallel Example: User Story 1

```bash
# After Foundational phase completes, launch all US1 tests together:
Task: "Unit test for RatingSlice initial state"
Task: "Unit test for recordPromptShown action"
Task: "Unit test for recordUserResponse action"
Task: "Unit test for shouldShowPrompt logic"

# Then launch all US1 component/route creation together:
Task: "Create RatingPrompt component"
Task: "Create rating routes layout"
Task: "Create prompt route screen"
Task: "Add navigation CTA to Features screen"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T002)
2. Complete Phase 2: Foundational (T003-T008) - CRITICAL blocker
3. Complete Phase 3: User Story 1 (T009-T025)
4. **STOP and VALIDATE**: Test positive flow independently
   - Open app, navigate to Features
   - Tap "Rate this app"
   - Verify prompt appears with Yes/No
   - Tap Yes
   - Verify native modal appears (test on device)
   - Verify navigation back works
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Store slice works ✓
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Polish → Final quality pass → Deploy/Demo
6. Each increment adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. **Team completes Setup + Foundational together** (T001-T008)
2. **Once Foundational is done**:
   - Developer A: User Story 1 implementation (T013-T025)
   - Developer B: User Story 1 tests (T009-T012)
   - Developer C: Can start User Story 2 prep (T030-T032 component files)
3. **After US1 complete**:
   - Developer A: User Story 2 integration (T033-T042)
   - Developer B: User Story 2 tests (T026-T029)
   - Developer C: User Story 3 tests (T043-T045)
4. **After US2 complete**:
   - All developers: User Story 3 implementation (T046-T049)
5. **Final phase**:
   - All developers: Polish tasks in parallel (T050-T064)

---

## Notes

- **[P] tasks** = different files, no dependencies, safe to parallelize
- **[Story] label** maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing (TDD approach per constitution)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- **Avoid**: vague tasks, same file conflicts, cross-story dependencies that break independence
- **Remember**: This is a React Native mobile app - test native modal on device, not web preview
- **Constitution compliance**: All tasks follow clean architecture, TypeScript strict, Unistyles, i18next requirements

---

## Task Count Summary

- **Phase 1 (Setup)**: 2 tasks
- **Phase 2 (Foundational)**: 6 tasks
- **Phase 3 (User Story 1)**: 17 tasks (4 tests + 13 implementation)
- **Phase 4 (User Story 2)**: 17 tasks (4 tests + 13 implementation)
- **Phase 5 (User Story 3)**: 7 tasks (3 tests + 4 implementation)
- **Phase 6 (Polish)**: 15 tasks (5 tests + 10 quality/edge cases)

**Total: 64 tasks**

**Parallel opportunities**: 31 tasks marked [P] (48% parallelizable)

**MVP Scope** (User Story 1 only): 25 tasks (Setup + Foundational + US1)
