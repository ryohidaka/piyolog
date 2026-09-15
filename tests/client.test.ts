import { PiyoLog } from "@/client";
import { FeedResource } from "@/resources/feed";
import { describe, it, expect } from "vite-plus/test";

describe("PiyoLog", () => {
  it("インスタンス化できること", () => {
    expect(new PiyoLog()).toBeInstanceOf(PiyoLog);
  });

  it("feedプロパティにFeedResourceのインスタンスを持つこと", () => {
    const piyolog = new PiyoLog();
    expect(piyolog.feed).toBeInstanceOf(FeedResource);
  });
});
