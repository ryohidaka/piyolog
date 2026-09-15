import { PiyoLog } from "piyolog";

const piyolog = new PiyoLog();

const feed = await piyolog.feed.list({
  period: "24h",
  feedId: process.env.PIYOLOG_FEED_ID!,
  secret: process.env.PIYOLOG_FEED_SECRET!,
});

console.log(`スキーマバージョン: ${feed.schemaVersion}`);
console.log(`生成時刻: ${feed.generatedAt.toISOString()}`);
console.log(`取得範囲: ${feed.range.from.toISOString()} 〜 ${feed.range.to.toISOString()}`);
