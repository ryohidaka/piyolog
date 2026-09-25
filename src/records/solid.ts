import type { BaseRecord } from "@/records/base";
import type { RecordType } from "@/records/record-type";

/**
 * 離乳食記録。
 *
 * @see {@link https://www.piyolog.com/app/piyolog/data_feed/ja/#records | 07 記録の種類と項目}
 */
export interface SolidRecord extends BaseRecord {
  type: typeof RecordType.Solid;
}
