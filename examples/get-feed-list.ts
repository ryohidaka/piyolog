import { PiyoLog, RecordType } from "piyolog";
import type { PiyoLogRecord } from "piyolog";

const piyolog = new PiyoLog();

const feed = await piyolog.feed.list({
  period: "24h",
  feedId: process.env.PIYOLOG_FEED_ID!,
  secret: process.env.PIYOLOG_FEED_SECRET!,
});

console.log(`スキーマバージョン: ${feed.schemaVersion}`);
console.log(`生成時刻: ${feed.generatedAt.toISOString()}`);
console.log(`取得範囲: ${feed.range.from.toISOString()} 〜 ${feed.range.to.toISOString()}`);
console.log(`記録件数: ${feed.records.length}`);

for (const record of feed.records) {
  console.log(describeRecord(record));
}

/**
 * 記録の種類に応じて人が読める文字列に整形する。
 *
 * @param record - 対象の記録
 * @returns 表示用の文字列
 */
function describeRecord(record: PiyoLogRecord): string {
  switch (record.type) {
    case RecordType.BreastFeeding:
      return `[${record.datetime.toISOString()}] 母乳: 左${record.leftTime ?? "-"}秒 / 右${record.rightTime ?? "-"}秒`;

    case RecordType.Formula:
      return `[${record.datetime.toISOString()}] ミルク: ${record.value?.value}${record.value?.unit}`;

    case RecordType.ExpressedBreastMilk:
      return `[${record.datetime.toISOString()}] 搾母乳: ${record.value?.value}${record.value?.unit}`;

    case RecordType.Pumping:
      return `[${record.datetime.toISOString()}] 搾乳: ${record.value?.value}${record.value?.unit}`;

    case RecordType.Poop:
      return `[${record.datetime.toISOString()}] うんち: ${record.details?.amount}/${record.details?.hardness}/${record.details?.color}`;

    default:
      return `[${record.datetime.toISOString()}] ${record.type}`;
  }
}
