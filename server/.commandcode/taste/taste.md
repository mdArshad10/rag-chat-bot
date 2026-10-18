# Taste

## Tooling

- Uses Bun as the runtime and script runner for TypeScript services (`bun run dev` with `--watch`, `bun run typecheck`). Confidence: 0.45

## Workflow

- When the assistant reports a batch of related problems and offers to fix them, the user approves the whole batch in one word ("okey fix those") rather than cherry-picking — favors having all discovered inconsistencies fixed in a single pass instead of one-at-a-time. Confidence: 0.45

## Communication

- Asks "why" about non-obvious config/convention choices (e.g. gRPC on 50051 vs 8080) and expects a conceptual explanation — that the value is arbitrary/conventional plus the trade-offs — rather than just the applied value. Explain the reasoning behind conventions, don't only state them. Confidence: 0.6
- When pasting a raw stack trace/error, asks "can you tell me why it gives this error" and wants the root cause pinpointed (which file/line, and why the tool failed) explained up front — diagnosis first, not just a silent patch. Confidence: 0.55
