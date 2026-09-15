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
 * すべての記録種別に共通するフィールド。
 */
interface BaseRecord {
  /** 記録の同一性を表すID。編集後も同じ記録は同じID。 */
  eventId: string;
  /** 記録の日時。 */
  datetime: Date;
}

/**
 * 母乳記録。
 *
 * @see {@link https://www.piyolog.com/app/piyolog/data_feed/ja/#json | 06 JSONの基本仕様 - 母乳：last / leftTime / rightTime}
 */
export interface BreastFeedingRecord extends BaseRecord {
  type: "BreastFeeding";
  /** 最後に授乳した側。順序未設定なら省略。 */
  last?: "left" | "right";
  /** 左の授乳時間（秒）。 */
  leftTime?: number;
  /** 右の授乳時間（秒）。 */
  rightTime?: number;
}

/**
 * 育児記録1件を表す判別可能なUnion型。
 *
 * @remarks
 * `type` フィールドで種別を判定できる（discriminated union）。
 * `switch (record.type)` で分岐すると、各ブランチ内で `value` や
 * `details` などの型が自動的に絞り込まれる。
 * 省略された値を0と解釈してはならない。
 *
 * @see {@link https://www.piyolog.com/app/piyolog/data_feed/ja/#json | 06 JSONの基本仕様 - 記録に共通する項目}
 * @see {@link https://www.piyolog.com/app/piyolog/data_feed/ja/#records | 07 記録の種類と項目}
 */
export type PiyoLogRecord = BaseRecord | BreastFeedingRecord;

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
