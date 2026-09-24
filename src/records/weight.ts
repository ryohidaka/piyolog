import type { BaseRecord } from "@/records/base";
import type { RecordType } from "@/records/record-type";

/**
 * 体重記録。
 *
 * @see {@link https://www.piyolog.com/app/piyolog/data_feed/ja/#json | 06 JSONの基本仕様 - 数値と単位：value}
 */
export interface WeightRecord extends BaseRecord {
  type: typeof RecordType.Weight;
  /** 体重。値が未入力・0以下の場合は省略。 */
  value?: {
    /** 体重（kg）。正の数。 */
    value: number;
    /** 単位。常に `"kg"`。 */
    unit: "kg";
  };
}
