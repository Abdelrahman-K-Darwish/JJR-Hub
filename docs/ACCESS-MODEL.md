# JJR Hub — Access Model

## 1. Identity layers

### Functional roles
- New Hire / onboarding status
- Consultant
- Project Lead
- Practice Lead
- PMO
- Leadership

### Layered capabilities
These are separate from functional roles:
- Hub Admin
- Editor / Content Owner
- Community Steward / Moderator
- CAB Chair
- HR / Squad profile administration
- other resource-specific grants approved later

## 2. Core access question

Do not ask only:

`What role is this person?`

Ask:

`Can this authenticated user perform ACTION on RESOURCE within SCOPE?`

## 3. Scope examples

| Scope | Example |
|---|---|
| Self | own profile/settings |
| Project | projects the user belongs to/leads/is granted |
| Practice | practice-specific areas |
| Community | member/steward actions in that community |
| CAB | CAB membership/chair capabilities |
| Firm | employee-wide governed content |
| Restricted | explicit leadership/approved grant rules |

## 4. Frontend vs backend

Frontend may:
- show/hide actions for UX;
- render locked states;
- display mock authorization states during frontend development.

Frontend must not be treated as the security boundary.

Production backend must eventually:
- validate identity;
- enforce action/resource/scope permissions;
- scope list queries before returning data;
- omit sensitive payloads when required;
- re-check direct/detail resource access.

## 5. Important anti-patterns

Do not scatter:

```ts
if (user.role === 'admin') ...
if (user.role === 'leadership') ...
```

throughout pages.

Prefer a centralized UI-facing contract such as:

```ts
can(user, action, resource)
```

while keeping real authorization server-side when the backend is introduced.
