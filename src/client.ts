import { FeedResource } from "@/resources/feed";

/**
 * ぴよログ APIクライアント
 *
 * @example
 * ```ts
 * import { PiyoLog } from "piyolog"
 *
 * const piyolog = new PiyoLog();
 * ```
 *
 * @public
 */
export class PiyoLog {
  /** データフィードリソース。 */
  readonly feed: FeedResource;

  constructor() {
    this.feed = new FeedResource();
  }
}
