# piyolog

[![NPM Version](https://img.shields.io/npm/v/piyolog?logo=npm)](https://www.npmjs.com/package/piyolog)
[![CI](https://github.com/ryohidaka/piyolog/actions/workflows/ci.yml/badge.svg)](https://github.com/ryohidaka/piyolog/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/ryohidaka/piyolog/graph/badge.svg?token=MNntzVzWfi)](https://codecov.io/gh/ryohidaka/piyolog)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/ryohidaka/piyolog)

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

### 記録種別ごとの分岐

`feed.records` は記録の種類ごとに判別可能なUnion型（`PiyoLogRecord`）です。`switch (record.type)` で分岐すると、各ケース内で `value` や `details` などのフィールドが自動的に絞り込まれます。

```typescript
import type { PiyoLogRecord } from "piyolog";

function describeRecord(record: PiyoLogRecord): string {
  switch (record.type) {
    case "BreastFeeding":
      return `母乳: 左${record.leftTime ?? "-"}秒`;

    case "Formula":
      return `ミルク: ${record.value?.value ?? "-"}ml`;

    case "ExpressedBreastMilk":
      return `搾母乳: ${record.value?.value ?? "-"}ml`;

    case "Pumping":
      return `搾乳: ${record.value?.value ?? "-"}ml`;

    default:
      return record.type;
  }
}
```

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
