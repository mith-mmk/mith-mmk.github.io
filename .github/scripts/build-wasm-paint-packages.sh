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

for ui_file in \
    tests/web-paint-ui.html \
    tests/web-paint.html \
    tests/web-paint/external-ui.css \
    tests/web-paint/external-ui.js \
    tests/web-paint/paint-tool.js \
    tests/web-paint/assets/README.md \
    tests/web-paint/assets/meadow.png \
    tests/web-paint/assets/icons/LICENSE \
    tests/web-paint/assets/icons/LICENSE-emoji \
    tests/web-paint/assets/icons/add.svg \
    tests/web-paint/assets/icons/brush.svg \
    tests/web-paint/assets/icons/chevron.svg \
    tests/web-paint/assets/icons/clear.svg \
    tests/web-paint/assets/icons/eraser.svg \
    tests/web-paint/assets/icons/eye-off.svg \
    tests/web-paint/assets/icons/eye.svg \
    tests/web-paint/assets/icons/eyedropper.svg \
    tests/web-paint/assets/icons/fill.svg \
    tests/web-paint/assets/icons/image.svg \
    tests/web-paint/assets/icons/open.svg \
    tests/web-paint/assets/icons/pencil.svg \
    tests/web-paint/assets/icons/save.svg \
    tests/web-paint/assets/icons/shapes.svg \
    tests/web-paint/assets/icons/subtract.svg \
    tests/web-paint/assets/icons/text.svg
do
    if [ ! -f "$source_directory/$ui_file" ]; then
        echo "missing web paint UI file: $ui_file" >&2
        exit 2
    fi
done

if [ -e "$output_directory/wasm-paint" ] ||
    [ -e "$output_directory/wasm-font" ] ||
    [ -e "$output_directory/web-paint" ] ||
    [ -e "$output_directory/web-paint-ui.html" ] ||
    [ -e "$output_directory/web-paint.html" ]
then
    echo "output paths must not already exist: $output_directory" >&2
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

cp "$source_directory/tests/web-paint-ui.html" "$output_directory/web-paint-ui.html"
cp "$source_directory/tests/web-paint.html" "$output_directory/web-paint.html"
mkdir -p "$output_directory/web-paint"
cp "$source_directory/tests/web-paint/external-ui.css" "$output_directory/web-paint/"
cp "$source_directory/tests/web-paint/external-ui.js" "$output_directory/web-paint/"
cp "$source_directory/tests/web-paint/paint-tool.js" "$output_directory/web-paint/"
cp -R "$source_directory/tests/web-paint/assets" "$output_directory/web-paint/assets"

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

for ui_file in \
    web-paint-ui.html \
    web-paint.html \
    web-paint/external-ui.css \
    web-paint/external-ui.js \
    web-paint/paint-tool.js \
    web-paint/assets/README.md \
    web-paint/assets/meadow.png \
    web-paint/assets/icons/LICENSE \
    web-paint/assets/icons/LICENSE-emoji \
    web-paint/assets/icons/add.svg \
    web-paint/assets/icons/brush.svg \
    web-paint/assets/icons/chevron.svg \
    web-paint/assets/icons/clear.svg \
    web-paint/assets/icons/eraser.svg \
    web-paint/assets/icons/eye-off.svg \
    web-paint/assets/icons/eye.svg \
    web-paint/assets/icons/eyedropper.svg \
    web-paint/assets/icons/fill.svg \
    web-paint/assets/icons/image.svg \
    web-paint/assets/icons/open.svg \
    web-paint/assets/icons/pencil.svg \
    web-paint/assets/icons/save.svg \
    web-paint/assets/icons/shapes.svg \
    web-paint/assets/icons/subtract.svg \
    web-paint/assets/icons/text.svg
do
    if [ ! -f "$output_directory/$ui_file" ]; then
        echo "missing staged web paint UI file: $ui_file" >&2
        exit 1
    fi
done

if ! cmp -s \
    "$output_directory/wasm-paint/package.json" \
    "$output_directory/wasm-font/package.json"
then
    echo "generated package manifests differ between feature sets" >&2
    exit 1
fi

echo "Generated homepage packages and staged web paint UI in $output_directory"
