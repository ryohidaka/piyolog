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

    describe("BreastFeeding(母乳)", () => {
      it("変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-002",
              datetime: "2026-09-08T10:00:00.000Z",
              type: "BreastFeeding",
              last: "right" as const,
              leftTime: 300,
              rightTime: 240,
            },
          ],
        };

        const result = parseFeedResponse(raw);
        const record = result.records[0];

        expect(record).toMatchObject({
          eventId: "example-002",
          type: "BreastFeeding",
          last: "right",
          leftTime: 300,
          rightTime: 240,
        });
        expect(record.datetime).toEqual(new Date("2026-09-08T10:00:00.000Z"));
      });

      it("last/leftTime/rightTimeが省略された場合もundefinedで変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-002",
              datetime: "2026-09-08T07:00:00.000Z",
              type: "BreastFeeding",
            },
          ],
        };

        const record = parseFeedResponse(raw).records[0];
        expect(record).toMatchObject({ type: "BreastFeeding", last: undefined });
      });
    });

    describe("Formula(ミルク)", () => {
      it("変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-001",
              datetime: "2026-09-08T07:00:00.000Z",
              type: "Formula",
              value: { value: 120, unit: "ml" },
            },
          ],
        };

        const result = parseFeedResponse(raw);
        const record = result.records[0];

        expect(record).toMatchObject({
          eventId: "example-001",
          type: "Formula",
          value: { value: 120, unit: "ml" },
        });
        expect(record.datetime).toEqual(new Date("2026-09-08T07:00:00.000Z"));
      });

      it("valueが省略された場合もundefinedで変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-001",
              datetime: "2026-09-08T07:00:00.000Z",
              type: "Formula",
            },
          ],
        };

        const record = parseFeedResponse(raw).records[0];
        expect(record).toMatchObject({ type: "Formula", value: undefined });
      });
    });

    describe("ExpressedBreastMilk(搾母乳)", () => {
      it("変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-004",
              datetime: "2026-09-08T09:00:00.000Z",
              type: "ExpressedBreastMilk",
              value: { value: 80, unit: "ml" },
            },
          ],
        };

        const result = parseFeedResponse(raw);
        const record = result.records[0];

        expect(record).toMatchObject({
          eventId: "example-004",
          type: "ExpressedBreastMilk",
          value: { value: 80, unit: "ml" },
        });
        expect(record.datetime).toEqual(new Date("2026-09-08T09:00:00.000Z"));
      });

      it("valueが省略された場合もundefinedで変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-004",
              datetime: "2026-09-08T09:00:00.000Z",
              type: "ExpressedBreastMilk",
            },
          ],
        };

        const record = parseFeedResponse(raw).records[0];
        expect(record).toMatchObject({ type: "ExpressedBreastMilk", value: undefined });
      });
    });

    describe("Pumping(搾乳)", () => {
      it("変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-005",
              datetime: "2026-09-08T11:00:00.000Z",
              type: "Pumping",
              value: { value: 60, unit: "ml" },
            },
          ],
        };

        const result = parseFeedResponse(raw);
        const record = result.records[0];

        expect(record).toMatchObject({
          eventId: "example-005",
          type: "Pumping",
          value: { value: 60, unit: "ml" },
        });
        expect(record.datetime).toEqual(new Date("2026-09-08T11:00:00.000Z"));
      });

      it("valueが省略された場合もundefinedで変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-005",
              datetime: "2026-09-08T11:00:00.000Z",
              type: "Pumping",
            },
          ],
        };

        const record = parseFeedResponse(raw).records[0];
        expect(record).toMatchObject({ type: "Pumping", value: undefined });
      });
    });

    describe("未対応のtype", () => {
      it("typeを保持したまま共通項目のみで変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-999",
              datetime: "2026-09-08T07:00:00.000Z",
              type: "Sleep",
            },
          ],
        };

        const record = parseFeedResponse(raw).records[0];

        expect(record).toMatchObject({
          eventId: "example-999",
          type: "Sleep",
        });
        expect(record.datetime).toEqual(new Date("2026-09-08T07:00:00.000Z"));
      });
    });
  });
});
