import type { BaseRecord } from "@/records/base";
import type { RecordType } from "@/records/record-type";

/**
 * 母乳記録。
 *
 * @see {@link https://www.piyolog.com/app/piyolog/data_feed/ja/#json | 06 JSONの基本仕様 - 母乳：last / leftTime / rightTime}
 */
export interface BreastFeedingRecord extends BaseRecord {
  type: typeof RecordType.BreastFeeding;
  /** 最後に授乳した側。順序未設定なら省略。 */
  last?: "left" | "right";
  /** 左の授乳時間（秒）。 */
  leftTime?: number;
  /** 右の授乳時間（秒）。 */
  rightTime?: number;
}
