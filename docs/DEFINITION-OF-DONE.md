# JJR Hub — Definition of Done

## DoD-A — Frontend migration complete

A page is frontend-complete when:

- [ ] Route works.
- [ ] Uses the approved shell/layout.
- [ ] Reuses existing meaningful components where appropriate.
- [ ] No avoidable giant page component.
- [ ] Domain data is typed.
- [ ] Mock data lives outside page composition.
- [ ] Relevant workflow IDs are respected.
- [ ] Delivery classes are documented for sensitive/data-driven sections.
- [ ] Loading/empty/error/restricted states exist where relevant.
- [ ] Mobile/tablet/desktop checked.
- [ ] Keyboard interactions checked.
- [ ] Focus/labels/heading structure checked.
- [ ] No console errors caused by the change.
- [ ] Existing applicable lint/type/test/build checks pass.
- [ ] Intentional differences from the legacy mockup are recorded when meaningful.

## DoD-B — Production integration complete

A feature is production-integrated when applicable checks also prove:

- [ ] Authentication uses the approved production identity flow.
- [ ] Backend authorization is enforced.
- [ ] Class C data is absent from unauthorized responses.
- [ ] Class B data is scoped before return/aggregation.
- [ ] Direct resource requests re-check authorization.
- [ ] External systems are accessed through approved integration seams.
- [ ] Failure/timeout/partial-integration states are handled.
- [ ] Audit requirements are implemented where required.
- [ ] Security-sensitive workflows have negative tests.

Do not block frontend migration on DoD-B while the backend is intentionally deferred. Do not claim DoD-B until the backend exists and is tested.
