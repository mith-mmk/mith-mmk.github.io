# wasm-paint deployment

The "Update wasm-paint packages" workflow checks the public
mith-mmk/wasm-paint main branch once per day at 03:17 UTC and can also be run
manually. It exits before installing the build tools when the source revision
recorded in .github/wasm-paint-published-sha is already published.

When the revision changes, the workflow builds and updates only:

- wasm/wasm-paint/pkg: default features
- wasm/wasm-font/pkg: font and svg-font features

Both checkouts omit persisted credentials, so source builds cannot read the
homepage repository's write token from Git configuration. The workflow exposes
the short-lived GITHUB_TOKEN only to the publication steps; no personal access
token or persistent secret is required. Its permissions are limited to
contents: write and pages: write.

## Pages publication and retries

This site currently uses legacy Pages deployment from master:/. Commits made
with GITHUB_TOKEN do not automatically start a Pages build, so the workflow
explicitly requests one through the Pages build API and waits for that exact
homepage commit to finish. Polling is bounded to five minutes.

The published source marker is committed only after the Pages build reports
built. An API error, Pages build error, timeout, concurrent homepage update, or
marker push failure leaves the previous marker unchanged. The next scheduled
or manual run therefore retries publication even when the generated package
files are already committed.

## Reproducible build

The workflow uses Rust 1.91.0 and wasm-pack 0.15.0. It prefers Cargo.lock from
the source checkout. Until wasm-paint tracks that file, the workflow uses
.github/wasm-paint.Cargo.lock, which pins the currently validated registry and
git dependencies. Update the fallback lockfile deliberately when source
dependency changes require it.

The build refuses an existing output directory, verifies the expected generated
files, and removes wasm-pack's generated .gitignore. Before committing, the
workflow rejects changes outside the two package directories and runs
git diff --check.
