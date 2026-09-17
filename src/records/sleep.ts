import type { BaseRecord } from "@/records/base";
import type { RecordType } from "@/records/record-type";

/**
 * 寝る記録。
 *
 * @see {@link https://www.piyolog.com/app/piyolog/data_feed/ja/#records | 07 記録の種類と項目}
 */
export interface SleepRecord extends BaseRecord {
  type: typeof RecordType.Sleep;
}
