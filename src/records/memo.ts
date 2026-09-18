import type { BaseRecord } from "@/records/base";
import type { RecordType } from "@/records/record-type";

/**
 * メモ単独の記録。
 *
 * @see {@link https://www.piyolog.com/app/piyolog/data_feed/ja/#json | 06 JSONの基本仕様 - メモ：memo}
 */
export interface MemoRecord extends BaseRecord {
  type: typeof RecordType.Memo;
}
