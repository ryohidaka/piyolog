export { RecordType } from "@/records/record-type";
export type { BreastFeedingRecord } from "@/records/breast-feeding";
export type { FormulaRecord } from "@/records/formula";
export type { ExpressedBreastMilkRecord } from "@/records/expressed-breast-milk";
export type { PumpingRecord } from "@/records/pumping";
export type { SleepRecord } from "@/records/sleep";
export type { PoopRecord } from "@/records/poop";
export type { UnknownRecord } from "@/records/unknown";

import type { BreastFeedingRecord } from "@/records/breast-feeding";
import type { FormulaRecord } from "@/records/formula";
import type { ExpressedBreastMilkRecord } from "@/records/expressed-breast-milk";
import type { PumpingRecord } from "@/records/pumping";
import type { SleepRecord } from "@/records/sleep";
import type { PoopRecord } from "@/records/poop";
import type { UnknownRecord } from "@/records/unknown";

/**
 * 育児記録1件を表す判別可能なUnion型。
 *
 * @remarks
 * `type` フィールドで種別を判定できる（discriminated union）。
 * `switch (record.type)` で分岐すると、各ブランチ内で `value` や
 * `details` などの型が自動的に絞り込まれる。
 * 省略された値を0と解釈してはならない。
 *
 * @see {@link https://www.piyolog.com/app/piyolog/data_feed/ja/#json | 06 JSONの基本仕様 - 記録に共通する項目}
 * @see {@link https://www.piyolog.com/app/piyolog/data_feed/ja/#records | 07 記録の種類と項目}
 */
export type PiyoLogRecord =
  | BreastFeedingRecord
  | FormulaRecord
  | ExpressedBreastMilkRecord
  | PumpingRecord
  | SleepRecord
  | PoopRecord
  | UnknownRecord;
