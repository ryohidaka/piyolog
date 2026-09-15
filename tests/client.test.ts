import { PiyoLog } from "@/client";
import { describe, it, expect } from "vite-plus/test";

describe("PiyoLog", () => {
  it("インスタンス化できること", () => {
    const piyolog = new PiyoLog();
    expect(piyolog).toBeInstanceOf(PiyoLog);
  });
});
