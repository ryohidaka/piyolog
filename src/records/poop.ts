import type { BaseRecord } from "@/records/base";

/**
 * うんちの量。
 *
 * - `minimum`: ちょっと
 * - `small`: 少なめ
 * - `normal`: ふつう
 * - `large`: 多め
 */
type PoopAmount = "minimum" | "small" | "normal" | "large";

/**
 * うんちのかたさ。
 *
 * - `diarrhea`: 下痢
 * - `soft`: やわらかめ
 * - `normal`: ふつう
 * - `hard`: かため
 */
type PoopHardness = "diarrhea" | "soft" | "normal" | "hard";

/**
 * うんちの色。
 *
 * - `white`: 白
 * - `yellow`: 黄
 * - `orange`: 橙
 * - `brown`: 茶
 * - `green`: 緑
 * - `red`: 赤
 * - `black`: 黒
 */
type PoopColor = "white" | "yellow" | "orange" | "brown" | "green" | "red" | "black";

/**
 * うんち記録。
 *
 * @see {@link https://www.piyolog.com/app/piyolog/data_feed/ja/#json | 06 JSONの基本仕様 - うんち：details}
 */
export interface PoopRecord extends BaseRecord {
  type: "Poop";
  /** うんちの詳細。すべて未設定の場合は省略。 */
  details?: {
    /** 量。 */
    amount?: PoopAmount;
    /** かたさ。 */
    hardness?: PoopHardness;
    /** 色。 */
    color?: PoopColor;
  };
}
