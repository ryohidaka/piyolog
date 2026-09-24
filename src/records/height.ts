import type { BaseRecord } from "@/records/base";
import type { RecordType } from "@/records/record-type";

/**
 * 身長記録。
 *
 * @see {@link https://www.piyolog.com/app/piyolog/data_feed/ja/#json | 06 JSONの基本仕様 - 数値と単位：value}
 */
export interface HeightRecord extends BaseRecord {
  type: typeof RecordType.Height;
  /** 身長。値が未入力・0以下の場合は省略。 */
  value?: {
    /** 身長（cm）。正の数。 */
    value: number;
    /** 単位。常に `"cm"`。 */
    unit: "cm";
  };
}
