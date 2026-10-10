#!/bin/sh

set -eu

if [ "$#" -ne 4 ]; then
    echo "usage: $0 REPOSITORY COMMIT MAX_ATTEMPTS POLL_SECONDS" >&2
    exit 2
fi

repository=$1
expected_commit=$2
max_attempts=$3
poll_seconds=$4

if ! printf '%s' "$repository" | grep -Eq '^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$'; then
    echo "invalid repository: $repository" >&2
    exit 2
fi
if ! printf '%s' "$expected_commit" | grep -Eq '^[0-9a-f]{40}$'; then
    echo "invalid commit: $expected_commit" >&2
    exit 2
fi
case "$max_attempts:$poll_seconds" in
    *[!0-9:]* | :* | *:)
        echo "attempt and poll values must be non-negative integers" >&2
        exit 2
        ;;
esac
if [ "$max_attempts" -lt 1 ]; then
    echo "MAX_ATTEMPTS must be at least 1" >&2
    exit 2
fi

gh api --method POST "repos/$repository/pages/builds"

attempt=1
while [ "$attempt" -le "$max_attempts" ]; do
    build="$(gh api "repos/$repository/pages/builds/latest")"
    build_commit="$(printf '%s' "$build" | jq -r '.commit // ""')"
    build_status="$(printf '%s' "$build" | jq -r '.status // ""')"
    build_error="$(printf '%s' "$build" | jq -r '.error.message // ""')"

    if [ "$build_commit" = "$expected_commit" ]; then
        if [ "$build_status" = "built" ]; then
            echo "Pages built $expected_commit successfully."
            exit 0
        fi
        if [ "$build_status" = "errored" ] || [ -n "$build_error" ]; then
            echo "Pages build failed for $expected_commit: $build_error" >&2
            exit 1
        fi
    fi

    if [ "$poll_seconds" -gt 0 ]; then
        sleep "$poll_seconds"
    fi
    attempt=$((attempt + 1))
done

echo "Timed out waiting for Pages to build $expected_commit." >&2
exit 1
