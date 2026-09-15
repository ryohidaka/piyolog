import { describe, it, expect } from "vite-plus/test";
import type { FeedResponse, FetchFeedParams, PiyoLogPeriod, PiyoLogRecord } from "@/index";
import { PiyoLog } from "@/index";

describe("index.tsのexport", () => {
  it("必要な型・クラスがindex.ts経由でimportできる", () => {
    const period: PiyoLogPeriod = "24h";
    const params: FetchFeedParams = { period, feedId: "id", secret: "sec" };
    const record: PiyoLogRecord = { eventId: "e1", datetime: new Date(), type: "BreastFeeding" };
    const response: FeedResponse = {
      schemaVersion: 1,
      generatedAt: new Date("2026-09-09T03:00:00.000Z"),
      range: {
        from: new Date("2026-09-08T03:00:00.000Z"),
        to: new Date("2026-09-09T03:00:00.000Z"),
      },
      records: [record],
    };

    expect(period).toBe("24h");
    expect(params.feedId).toBe("id");
    expect(response.records).toHaveLength(1);
    expect(new PiyoLog()).toBeInstanceOf(PiyoLog);
  });
});
