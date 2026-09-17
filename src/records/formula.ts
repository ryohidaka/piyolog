import type { BaseRecord, MlValue } from "@/records/base";
import type { RecordType } from "@/records/record-type";

/**
 * 粉ミルク記録。
 *
 * @see {@link https://www.piyolog.com/app/piyolog/data_feed/ja/#json | 06 JSONの基本仕様 - 数値と単位：value}
 */
export interface FormulaRecord extends BaseRecord {
  type: typeof RecordType.Formula;
  /** ミルクの量。値が未入力・0以下の場合は省略。 */
  value?: MlValue;
}
