# SETUP

npmはLatestでないとエラーが出る可能性があるので、ディストリビューションのNodeJSではなく最新版のLTSをインストールすること。

```sh
# Rust Install
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env
rustup update
# Wasm pack
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
# Cargo generate
cargo install cargo-generate

# npm with nodejs LTS (Ubuntu) see https://github.com/nodesource/distributions
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install npm@latest -g

#cargo-generate require pkg-config
sudo apt install pkg-config -y
```

# Make Project template
```sh
mkdir rust-rect
cd rust-rect/
cargo generate --git https://github.com/rustwasm/wasm-pack-template.git
```

# build project

```sh
#build

wasm-pack build
````