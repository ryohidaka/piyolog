import type { BaseRecord } from "@/records/base";
import type { RecordType } from "@/records/record-type";

/**
 * 胸囲記録。
 *
 * @see {@link https://www.piyolog.com/app/piyolog/data_feed/ja/#json | 06 JSONの基本仕様 - 数値と単位：value}
 */
export interface ChestRecord extends BaseRecord {
  type: typeof RecordType.Chest;
  /** 胸囲。値が未入力・0以下の場合は省略。 */
  value?: {
    /** 胸囲（cm）。正の数。 */
    value: number;
    /** 単位。常に `"cm"`。 */
    unit: "cm";
  };
}
