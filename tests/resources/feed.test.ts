import { FeedResource } from "@/resources/feed";
import { afterEach, describe, expect, it, vi } from "vite-plus/test";

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// APIが実際に返す生JSON（snake_case）
const validRawFeed = {
  schema_version: 1,
  generated_at: "2026-09-09T03:00:00.000Z",
  range: {
    from: "2026-09-08T03:00:00.000Z",
    to: "2026-09-09T03:00:00.000Z",
  },
  records: [
    {
      event_id: "example-002",
      datetime: "2026-09-08T10:00:00.000Z",
      type: "BreastFeeding",
      last: "right",
      leftTime: 300,
      rightTime: 240,
    },
  ],
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("FeedResource#list", () => {
  it("正しいURLでリクエストし、200時にlowerCamelCaseのFeedResponseを返す", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse(200, validRawFeed));

    const feed = new FeedResource();
    const result = await feed.list({ period: "24h", feedId: "feed-1", secret: "sec-1" });

    expect(result.schemaVersion).toBe(1);
    expect(result.generatedAt).toBeInstanceOf(Date);
    expect(result.range.from).toBeInstanceOf(Date);
    expect(result.records).toHaveLength(1);
    expect(result.records[0]).toMatchObject({
      eventId: "example-002",
      datetime: new Date("2026-09-08T10:00:00.000Z"),
      type: "BreastFeeding",
      last: "right",
      leftTime: 300,
      rightTime: 240,
    });
  });

  it("正しいURLでリクエストする", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(jsonResponse(200, validRawFeed));

    const feed = new FeedResource();
    await feed.list({ period: "24h", feedId: "feed-1", secret: "sec-1" });

    expect(fetchSpy).toHaveBeenCalledWith("https://feed.piyolog.com/v1/feed/24h/feed-1/sec-1");
  });

  it("recordsが空でも正常に処理する", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse(200, { ...validRawFeed, records: [] }),
    );

    const feed = new FeedResource();
    const result = await feed.list({ period: "24h", feedId: "feed-1", secret: "sec-1" });

    expect(result.records).toEqual([]);
  });

  it("200以外のレスポンスは汎用Errorを投げる", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse(404, {}));

    const feed = new FeedResource();
    await expect(feed.list({ period: "24h", feedId: "feed-1", secret: "sec-1" })).rejects.toThrow(
      "データフィードの取得に失敗しました",
    );
  });

  it("通信エラー時も汎用Errorとして送出する", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network down"));

    const feed = new FeedResource();
    await expect(feed.list({ period: "24h", feedId: "feed-1", secret: "sec-1" })).rejects.toThrow(
      "データフィードの取得に失敗しました: network down",
    );
  });

  it("Errorインスタンスでない例外もメッセージに変換して送出する", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue("network down");

    const feed = new FeedResource();
    await expect(feed.list({ period: "24h", feedId: "feed-1", secret: "sec-1" })).rejects.toThrow(
      "データフィードの取得に失敗しました: network down",
    );
  });
});
