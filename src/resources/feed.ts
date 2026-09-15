import type { FeedResponse, FetchFeedParams } from "@/types";
import { parseFeedResponse, type RawFeedResponse } from "@/parse";

/**
 * データフィードリソース。育児記録の取得を担う。
 *
 * @see {@link https://www.piyolog.com/app/piyolog/data_feed/ja/ | データフィード — 使い方とデータ仕様}
 * @public
 */
export class FeedResource {
  /**
   * 育児記録を取得する。
   *
   * @remarks
   * エラーを「記録が0件」として扱ってはならない。正常なレスポンスを
   * 受け取った場合だけ連携先のデータを更新すること。
   * 通信エラーやAPIエラーは汎用の `Error` としてそのまま送出する。
   *
   * @param params - フィードURLを構成するパラメータ（period / feedId / secret）
   * @returns 取得した育児記録を含むレスポンス
   *
   * @throws {@link Error}
   * リクエストが失敗した場合、またはサーバーが `200` 以外を返した場合。
   *
   * @see {@link https://www.piyolog.com/app/piyolog/data_feed/ja/#errors | 08 エラーと連携時の注意}
   */
  async list(params: FetchFeedParams): Promise<FeedResponse> {
    const { period, feedId, secret } = params;
    const url = `https://feed.piyolog.com/v1/feed/${period}/${feedId}/${secret}`;

    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`データフィードの取得に失敗しました: HTTP ${res.status}`);
      }

      const raw = (await res.json()) as RawFeedResponse;
      return parseFeedResponse(raw);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(`データフィードの取得に失敗しました: ${message}`);
    }
  }
}
