import {
  type FeedResponse,
  type PiyoLogRecord,
  type BreastFeedingRecord,
  type FormulaRecord,
  type ExpressedBreastMilkRecord,
  type PumpingRecord,
  type SleepRecord,
  type WakeUpRecord,
  type PeeRecord,
  type PoopRecord,
  type MemoRecord,
  RecordType,
} from "@/types";

/**
 * データフィードAPIのレスポンス生JSON（snake_case、日時は文字列）。
 *
 * @remarks
 * APIから返る実際のJSON形状。クライアント側の {@link FeedResponse}
 * （lowerCamelCase、日時は `Date`）へ変換する前段階の型。
 *
 * @see {@link https://www.piyolog.com/app/piyolog/data_feed/ja/#json | 06 JSONの基本仕様}
 */
export interface RawFeedResponse {
  schema_version: number;
  generated_at: string;
  range: {
    from: string;
    to: string;
  };
  records: RawPiyoLogRecord[];
}

/**
 * 育児記録1件の生JSON形状。
 *
 * @remarks
 * APIレスポンスの `records` 配列の要素はすべてこの形で届く。
 * `event_id` は {@link PiyoLogRecord.eventId} に、`datetime` は `Date` に変換する。
 */
export interface RawPiyoLogRecord {
  event_id: string;
  datetime: string;
  type: string;
  last?: "left" | "right";
  leftTime?: number;
  rightTime?: number;
  value?: { value: number; unit: string };
  details?: {
    amount?: string;
    hardness?: string;
    color?: string;
  };
  memo?: string;
}

/**
 * データフィードAPIのレスポンスJSONを、クライアント側の型に変換する。
 *
 * @remarks
 * `snake_case` のキーを `lowerCamelCase` に、日時文字列を `Date` に変換する。
 *
 * @param raw - `res.json()` で得られた生のレスポンスオブジェクト
 * @returns クライアント側の型に変換された {@link FeedResponse}
 */
export function parseFeedResponse(raw: RawFeedResponse): FeedResponse {
  return {
    schemaVersion: raw.schema_version,
    generatedAt: new Date(raw.generated_at),
    range: {
      from: new Date(raw.range.from),
      to: new Date(raw.range.to),
    },
    records: raw.records.map(parseRecord),
  };
}

/**
 * 育児記録1件の生JSONをクライアント側の型に変換する。
 *
 * @remarks
 * `type` の値によって、対応する記録種別の型（{@link BreastFeedingRecord}、
 * {@link FormulaRecord} など）に振り分ける。
 * 未知の `type` は {@link UnknownRecord} として扱う（将来のスキーマ拡張への耐性）。
 *
 * @param raw - 記録1件分の生オブジェクト
 * @returns 変換された {@link PiyoLogRecord}
 *
 * @see {@link https://www.piyolog.com/app/piyolog/data_feed/ja/#errors | 08 エラーと連携時の注意 - データ仕様の変更への備え}
 */
function parseRecord(raw: RawPiyoLogRecord): PiyoLogRecord {
  const eventId = raw.event_id;
  const datetime = new Date(raw.datetime);
  const memo = raw.memo;

  switch (raw.type) {
    /** 母乳 */
    case RecordType.BreastFeeding: {
      const record: BreastFeedingRecord = {
        eventId,
        datetime,
        memo,
        type: RecordType.BreastFeeding,
        last: raw.last,
        leftTime: raw.leftTime,
        rightTime: raw.rightTime,
      };
      return record;
    }

    /** ミルク */
    case RecordType.Formula: {
      const record: FormulaRecord = {
        eventId,
        datetime,
        memo,
        type: RecordType.Formula,
        value: raw.value as FormulaRecord["value"],
      };
      return record;
    }

    /** 搾母乳 */
    case RecordType.ExpressedBreastMilk: {
      const record: ExpressedBreastMilkRecord = {
        eventId,
        datetime,
        memo,
        type: RecordType.ExpressedBreastMilk,
        value: raw.value as ExpressedBreastMilkRecord["value"],
      };
      return record;
    }

    /** 搾乳 */
    case RecordType.Pumping: {
      const record: PumpingRecord = {
        eventId,
        datetime,
        memo,
        type: RecordType.Pumping,
        value: raw.value as PumpingRecord["value"],
      };
      return record;
    }

    /** 寝る */
    case RecordType.Sleep: {
      const record: SleepRecord = {
        eventId,
        datetime,
        memo,
        type: RecordType.Sleep,
      };
      return record;
    }

    /** 起きる */
    case RecordType.WakeUp: {
      const record: WakeUpRecord = {
        eventId,
        datetime,
        memo,
        type: RecordType.WakeUp,
      };
      return record;
    }

    /** おしっこ */
    case RecordType.Pee: {
      const record: PeeRecord = {
        eventId,
        datetime,
        memo,
        type: RecordType.Pee,
      };
      return record;
    }

    /** うんち */
    case RecordType.Poop: {
      const record: PoopRecord = {
        eventId,
        datetime,
        memo,
        type: RecordType.Poop,
        details: raw.details as PoopRecord["details"],
      };
      return record;
    }

    /** メモ */
    case RecordType.Memo: {
      const record: MemoRecord = {
        eventId,
        datetime,
        memo,
        type: RecordType.Memo,
      };
      return record;
    }

    default:
      return { eventId, datetime, memo, type: raw.type };
  }
}
