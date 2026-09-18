/**
 * すべての記録種別に共通するフィールド。
 */
export interface BaseRecord {
  /** 記録の同一性を表すID。編集後も同じ記録は同じID。 */
  eventId: string;
  /** 記録の日時。 */
  datetime: Date;
  /** メモ。未入力・空文字・空白だけの場合は省略。最大200文字（超過時は先頭199文字＋`…`）。 */
  memo?: string;
}

/**
 * ml単位の量を表すvalue。
 */
export type MlValue = {
  /** 量（ml）。正の数。 */
  value: number;
  /** 単位。 */
  unit: "ml";
};
