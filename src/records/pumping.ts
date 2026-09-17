import type { BaseRecord, MlValue } from "@/records/base";
import type { RecordType } from "@/records/record-type";

/**
 * 搾乳記録。
 *
 * @see {@link https://www.piyolog.com/app/piyolog/data_feed/ja/#json | 06 JSONの基本仕様 - 数値と単位：value}
 */
export interface PumpingRecord extends BaseRecord {
  type: typeof RecordType.Pumping;
  /** 搾乳の量。値が未入力・0以下の場合は省略。 */
  value?: MlValue;
}
