# piyolog

ぴよログのデータフィードAPIを利用するためのクライアントライブラリ

## インストール

```bash
npm install piyolog
```

## 使用方法

### 初期化

```typescript
import { PiyoLog } from "piyolog";

const piyolog = new PiyoLog();
```

### データフィードの取得

アプリの「設定」→「データフィード」から発行した `period` / `feedId` / `secret` を渡します。

```typescript
import { PiyoLog } from "piyolog";

const piyolog = new PiyoLog();

const feed = await piyolog.feed.list({
  period: "24h",
  feedId: process.env.PIYOLOG_FEED_ID!,
  secret: process.env.PIYOLOG_FEED_SECRET!,
});

console.log(`スキーマバージョン: ${feed.schemaVersion}`);
console.log(`生成時刻: ${feed.generatedAt.toISOString()}`);
```

`period` には以下のいずれかを指定します。

| 値    | 取得する範囲 |
| ----- | ------------ |
| `24h` | 過去24時間   |
| `3d`  | 過去72時間   |
| `7d`  | 過去168時間  |
| `28d` | 過去672時間  |

> [!NOTE]
> 利用できる期間は、フィード作成時のアカウントのプランによって異なります（無料プランは`24h`のみ）。

> [!WARNING]
> `secret` はパスワードと同じように扱ってください。
> 公開リポジトリやログへの出力は避け、環境変数などで管理することを推奨します。

### 型のimport

`FeedResponse` や `FetchFeedParams` などの型は `piyolog` から直接importできます。

```typescript
import type { FeedResponse, FetchFeedParams, PiyoLogPeriod } from "piyolog";

function handleFeed(feed: FeedResponse) {
  console.log(feed.schemaVersion);
}
```

## エラーハンドリング

`feed.list()` は、通信エラーやAPIエラー（`404`・`429`・`5xx`など）が発生した場合、汎用の `Error` を投げます。

```typescript
try {
  const feed = await piyolog.feed.list({ period: "24h", feedId, secret });
  console.log(feed.schemaVersion);
} catch (err) {
  console.error(err);
}
```

## 参考

- [データフィード — 使い方とデータ仕様（公式リファレンス）](https://www.piyolog.com/app/piyolog/data_feed/ja/)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).
