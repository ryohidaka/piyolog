import type { BaseRecord } from "@/records/base";
import type { RecordType } from "@/records/record-type";

/**
 * 足サイズ記録。
 *
 * @see {@link https://www.piyolog.com/app/piyolog/data_feed/ja/#json | 06 JSONの基本仕様 - 足サイズ：左右の値を持つvalue}
 */
export interface FootRecord extends BaseRecord {
  type: typeof RecordType.Foot;
  /** 足サイズ。両側とも値がなければ省略。 */
  value?: {
    /** 左足のサイズ（cm）。正の数。片側だけの場合は省略。 */
    left?: number;
    /** 右足のサイズ（cm）。正の数。片側だけの場合は省略。 */
    right?: number;
    /** 単位。常に `"cm"`。 */
    unit: "cm";
  };
}
