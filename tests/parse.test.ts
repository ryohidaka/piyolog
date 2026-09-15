import { parseFeedResponse } from "@/parse";
import { describe, it, expect } from "vite-plus/test";

describe("parseFeedResponse", () => {
  it("snake_caseをlowerCamelCaseに変換する", () => {
    const raw = {
      schema_version: 1,
      generated_at: "2026-09-09T03:00:00.000Z",
      range: {
        from: "2026-09-08T03:00:00.000Z",
        to: "2026-09-09T03:00:00.000Z",
      },
      records: [],
    };

    const result = parseFeedResponse(raw);

    expect(result.schemaVersion).toBe(1);
  });

  it("日時文字列をDate型に変換する", () => {
    const raw = {
      schema_version: 1,
      generated_at: "2026-09-09T03:00:00.000Z",
      range: {
        from: "2026-09-08T03:00:00.000Z",
        to: "2026-09-09T03:00:00.000Z",
      },
      records: [],
    };

    const result = parseFeedResponse(raw);

    expect(result.generatedAt).toEqual(new Date("2026-09-09T03:00:00.000Z"));
    expect(result.range.from).toEqual(new Date("2026-09-08T03:00:00.000Z"));
    expect(result.range.to).toEqual(new Date("2026-09-09T03:00:00.000Z"));
  });

  describe("records", () => {
    it("recordsが空でも正常に処理する", () => {
      const raw = {
        schema_version: 1,
        generated_at: "2026-09-09T03:00:00.000Z",
        range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
        records: [],
      };

      expect(parseFeedResponse(raw).records).toEqual([]);
    });
  });
});
