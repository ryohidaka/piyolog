/**
 * 記録種別を表す `type` の値。
 *
 * @remarks
 * `switch (record.type)` の `case` に使うことで、typoを防ぎエディタ補完を
 * 有効にする。値は {@link PiyoLogRecord.type} の文字列リテラルと一致する。
 *
 * @example
 * ```ts
 * switch (record.type) {
 *   case RecordType.BreastFeeding:
 *     // ...
 * }
 * ```
 */
export const RecordType = {
  BreastFeeding: "BreastFeeding",
  Formula: "Formula",
  ExpressedBreastMilk: "ExpressedBreastMilk",
  Pumping: "Pumping",
  Sleep: "Sleep",
  WakeUp: "WakeUp",
  Pee: "Pee",
  Poop: "Poop",
  Temperature: "Temperature",
  Height: "Height",
  Weight: "Weight",
  Head: "Head",
  Chest: "Chest",
  Memo: "Memo",
} as const;
