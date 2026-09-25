import type { PiyoLogRecord } from "@/records";

export { RecordType } from "@/records";

export type {
  PiyoLogRecord,
  BreastFeedingRecord,
  FormulaRecord,
  ExpressedBreastMilkRecord,
  PumpingRecord,
  SleepRecord,
  WakeUpRecord,
  PeeRecord,
  PoopRecord,
  TemperatureRecord,
  HeightRecord,
  WeightRecord,
  HeadRecord,
  ChestRecord,
  FootRecord,
  MemoRecord,
  UnknownRecord,
} from "@/records";

/**
 * データフィードで取得できる期間の指定子。URL内の表記に対応する。
 *
 * @remarks
 * 「1日」は24時間を意味し、当日の0時からではない。
 *
 * @see {@link https://www.piyolog.com/app/piyolog/data_feed/ja/#updates | 04 取得期間と更新間隔}
 */
export type PiyoLogPeriod = "24h" | "3d" | "7d" | "28d";

/**
 * {@link FeedResource.list} に渡すパラメータ。
 *
 * @see {@link https://www.piyolog.com/app/piyolog/data_feed/ja/#json | 06 JSONの基本仕様 - リクエスト}
 */
export interface FetchFeedParams {
  /** 取得期間。 */
  period: PiyoLogPeriod;
  /** フィードID。 */
  feedId: string;
  /** シークレット。パスワードと同等に扱うこと。 */
  secret: string;
}

/**
 * データフィードの取得範囲。
 *
 * @see {@link https://www.piyolog.com/app/piyolog/data_feed/ja/#json | 06 JSONの基本仕様}
 */
export interface FeedRange {
  /** 期間の開始日時。この時刻の記録は含む。 */
  from: Date;
  /** 期間の終了日時。この時刻の記録は含まない。`generatedAt` と同じ値。 */
  to: Date;
}

/**
 * データフィードAPIレスポンス
 *
 * @see {@link https://www.piyolog.com/app/piyolog/data_feed/ja/#json | 06 JSONの基本仕様}
 */
export interface FeedResponse {
  /** データ仕様のバージョン。現在は `1`。 */
  schemaVersion: number;
  /** JSONを生成した時刻。記録の最終更新日時ではない。 */
  generatedAt: Date;
  /** 取得範囲。`range.from <= datetime < range.to`。 */
  range: FeedRange;
  /** 対象の記録の配列。`datetime` の昇順。対象がなければ空配列。 */
  records: PiyoLogRecord[];
}
