#!/bin/sh

set -eu

if [ "$#" -ne 3 ]; then
    echo "usage: $0 SOURCE_DIRECTORY OUTPUT_DIRECTORY FALLBACK_LOCKFILE" >&2
    exit 2
fi

source_directory=$(cd "$1" && pwd)
output_directory=$2
fallback_lockfile=$3

if [ ! -f "$source_directory/Cargo.toml" ] ||
    [ ! -f "$source_directory/wasm-paint/Cargo.toml" ]
then
    echo "not a wasm-paint source checkout: $source_directory" >&2
    exit 2
fi

if [ -e "$output_directory/wasm-paint" ] || [ -e "$output_directory/wasm-font" ]; then
    echo "output package directories must not already exist: $output_directory" >&2
    exit 2
fi

if [ ! -f "$source_directory/Cargo.lock" ]; then
    if [ ! -f "$fallback_lockfile" ]; then
        echo "source and fallback Cargo.lock are both missing" >&2
        exit 2
    fi
    cp "$fallback_lockfile" "$source_directory/Cargo.lock"
fi

mkdir -p "$output_directory"
output_directory=$(cd "$output_directory" && pwd)

cd "$source_directory/wasm-paint"

wasm-pack build --target web --release --out-dir "$output_directory/wasm-paint" -- \
    --locked
wasm-pack build --target web --release --out-dir "$output_directory/wasm-font" -- \
    --locked --features font,svg-font

for package_directory in wasm-paint wasm-font; do
    # wasm-pack creates this for source checkouts. It must not hide generated
    # files from the homepage repository's git index.
    rm -f "$output_directory/$package_directory/.gitignore"

    for file in \
        LICENSE_APACHE \
        LICENSE_MIT \
        package.json \
        paint.d.ts \
        paint.js \
        paint_bg.wasm \
        paint_bg.wasm.d.ts
    do
        if [ ! -f "$output_directory/$package_directory/$file" ]; then
            echo "missing generated file: $package_directory/$file" >&2
            exit 1
        fi
    done
done

if ! cmp -s \
    "$output_directory/wasm-paint/package.json" \
    "$output_directory/wasm-font/package.json"
then
    echo "generated package manifests differ between feature sets" >&2
    exit 1
fi

echo "Generated homepage packages in $output_directory"
