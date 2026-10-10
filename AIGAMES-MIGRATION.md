# AI Gamesへの入口と旧URL互換

これはローカル移行案の実装で、未公開。

公開順序は **AIGamesを先に公開・検証 → このbranchをmasterへ取り込み公開**。AIGamesのPages設定とworkflowの成功、`https://mith-mmk.github.io/AIGames/migration-ready.json` のrevisionとmain SHAの一致、一覧/Rubik/Rogue/からくりの実動作を先に確認する。

`index.html` と `script/index.html` は `/AIGames/` へリンクする。この入口は直接リンクなので、新サイトが404のうちにこのbranchを公開しない。

旧 `script/vibe/*.html` 18ページは `migrate.js` とnoscriptリンクだけを追加し、元のゲーム内容を保全している。対応先は `/AIGames/` または同名HTML。markerのsite/schemaが一致するとquery/hashを保ってlocation.replaceで転送。新サイト未公開・ネットワーク失敗・3秒タイムアウトなら旧ページのまま動く。JavaScriptなしは移行先への手動リンクが表示される。HTTP 301ではなくブラウザによる転送である。

ルービックキューブの正本はAIGamesへ移した。旧コピー・旧assetsはfallback用に残し、以降の新機能はAIGamesだけに反映する。恒久削除は互換窓口の扱いを別途決めてから。HTTPSの同一originなので保存キーと値は維持する。

検証はAIGamesの `scripts/migration-browser.cjs` が両checkoutを同一originで配信する。NERO Chrome154で18ページのquery/hash転送、markerなしのRubik旧ページ、noscript、同一originの進捗保持、ホームページ入口/戻り先を確認済み。証拠はAIGames `artifacts/migration/`。公開先の実反映はまだ検証していない。

リポジトリの公開設定・masterへのpushは今回変更していない。mainへのpushは別タスクで自動承認レビューに拒否され、公開操作の別経路による回避は行っていない。
