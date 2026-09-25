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
              value: {
                value: 80,
                unit: "ml",
              },
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
          value: {
            value: 80,
            unit: "ml",
          },
        });
        expect(record.datetime).toEqual(new Date("2026-09-08T10:00:00.000Z"));
      });

      it("last/leftTime/rightTime/valueが省略された場合もundefinedで変換する", () => {
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

    describe("Sleep(寝る)", () => {
      it("変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-006",
              datetime: "2026-09-08T20:00:00.000Z",
              type: "Sleep",
            },
          ],
        };

        const result = parseFeedResponse(raw);
        const record = result.records[0];

        expect(record).toMatchObject({
          eventId: "example-006",
          type: "Sleep",
        });
        expect(record.datetime).toEqual(new Date("2026-09-08T20:00:00.000Z"));
      });
    });

    describe("WakeUp(起きる)", () => {
      it("変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-007",
              datetime: "2026-09-09T06:00:00.000Z",
              type: "WakeUp",
            },
          ],
        };

        const result = parseFeedResponse(raw);
        const record = result.records[0];

        expect(record).toMatchObject({
          eventId: "example-007",
          type: "WakeUp",
        });
        expect(record.datetime).toEqual(new Date("2026-09-09T06:00:00.000Z"));
      });
    });

    describe("Poop(うんち)", () => {
      it("変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-003",
              datetime: "2026-09-09T01:00:00.000Z",
              type: "Poop",
              details: {
                amount: "normal",
                hardness: "soft",
                color: "yellow",
              },
            },
          ],
        };

        const result = parseFeedResponse(raw);
        const record = result.records[0];

        expect(record).toMatchObject({
          eventId: "example-003",
          type: "Poop",
          details: {
            amount: "normal",
            hardness: "soft",
            color: "yellow",
          },
        });
        expect(record.datetime).toEqual(new Date("2026-09-09T01:00:00.000Z"));
      });

      it("detailsが省略された場合もundefinedで変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-003",
              datetime: "2026-09-09T01:00:00.000Z",
              type: "Poop",
            },
          ],
        };

        const record = parseFeedResponse(raw).records[0];
        expect(record).toMatchObject({ type: "Poop", details: undefined });
      });
    });

    describe("Pee(おしっこ)", () => {
      it("変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-008",
              datetime: "2026-09-08T13:00:00.000Z",
              type: "Pee",
            },
          ],
        };

        const result = parseFeedResponse(raw);
        const record = result.records[0];

        expect(record).toMatchObject({
          eventId: "example-008",
          type: "Pee",
        });
        expect(record.datetime).toEqual(new Date("2026-09-08T13:00:00.000Z"));
      });
    });

    describe("Memo(メモ)", () => {
      it("変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-004",
              datetime: "2026-09-09T02:00:00.000Z",
              type: "Memo",
              memo: "Packed a spare outfit.",
            },
          ],
        };

        const result = parseFeedResponse(raw);
        const record = result.records[0];

        expect(record).toMatchObject({
          eventId: "example-004",
          type: "Memo",
        });
        expect(record.datetime).toEqual(new Date("2026-09-09T02:00:00.000Z"));
      });
    });

    describe("Temperature(体温)", () => {
      it("変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-009",
              datetime: "2026-09-08T15:00:00.000Z",
              type: "Temperature",
              value: { value: 36.7, unit: "celsius" },
            },
          ],
        };

        const result = parseFeedResponse(raw);
        const record = result.records[0];

        expect(record).toMatchObject({
          eventId: "example-009",
          type: "Temperature",
          value: { value: 36.7, unit: "celsius" },
        });
        expect(record.datetime).toEqual(new Date("2026-09-08T15:00:00.000Z"));
      });

      it("valueが省略された場合もundefinedで変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-009",
              datetime: "2026-09-08T15:00:00.000Z",
              type: "Temperature",
            },
          ],
        };

        const record = parseFeedResponse(raw).records[0];
        expect(record).toMatchObject({ type: "Temperature", value: undefined });
      });
    });

    describe("Height(身長)", () => {
      it("変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-010",
              datetime: "2026-09-08T16:00:00.000Z",
              type: "Height",
              value: { value: 68.5, unit: "cm" },
            },
          ],
        };

        const result = parseFeedResponse(raw);
        const record = result.records[0];

        expect(record).toMatchObject({
          eventId: "example-010",
          type: "Height",
          value: { value: 68.5, unit: "cm" },
        });
        expect(record.datetime).toEqual(new Date("2026-09-08T16:00:00.000Z"));
      });

      it("valueが省略された場合もundefinedで変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-010",
              datetime: "2026-09-08T16:00:00.000Z",
              type: "Height",
            },
          ],
        };

        const record = parseFeedResponse(raw).records[0];
        expect(record).toMatchObject({ type: "Height", value: undefined });
      });
    });

    describe("Weight(体重)", () => {
      it("変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-011",
              datetime: "2026-09-08T17:00:00.000Z",
              type: "Weight",
              value: { value: 6.25, unit: "kg" },
            },
          ],
        };

        const result = parseFeedResponse(raw);
        const record = result.records[0];

        expect(record).toMatchObject({
          eventId: "example-011",
          type: "Weight",
          value: { value: 6.25, unit: "kg" },
        });
        expect(record.datetime).toEqual(new Date("2026-09-08T17:00:00.000Z"));
      });

      it("valueが省略された場合もundefinedで変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-011",
              datetime: "2026-09-08T17:00:00.000Z",
              type: "Weight",
            },
          ],
        };

        const record = parseFeedResponse(raw).records[0];
        expect(record).toMatchObject({ type: "Weight", value: undefined });
      });
    });

    describe("Head(頭囲)", () => {
      it("変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-012",
              datetime: "2026-09-08T18:00:00.000Z",
              type: "Head",
              value: { value: 42.1, unit: "cm" },
            },
          ],
        };

        const result = parseFeedResponse(raw);
        const record = result.records[0];

        expect(record).toMatchObject({
          eventId: "example-012",
          type: "Head",
          value: { value: 42.1, unit: "cm" },
        });
        expect(record.datetime).toEqual(new Date("2026-09-08T18:00:00.000Z"));
      });

      it("valueが省略された場合もundefinedで変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-012",
              datetime: "2026-09-08T18:00:00.000Z",
              type: "Head",
            },
          ],
        };

        const record = parseFeedResponse(raw).records[0];
        expect(record).toMatchObject({ type: "Head", value: undefined });
      });
    });

    describe("Chest(胸囲)", () => {
      it("変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-013",
              datetime: "2026-09-08T19:00:00.000Z",
              type: "Chest",
              value: { value: 40.2, unit: "cm" },
            },
          ],
        };

        const result = parseFeedResponse(raw);
        const record = result.records[0];

        expect(record).toMatchObject({
          eventId: "example-013",
          type: "Chest",
          value: { value: 40.2, unit: "cm" },
        });
        expect(record.datetime).toEqual(new Date("2026-09-08T19:00:00.000Z"));
      });

      it("valueが省略された場合もundefinedで変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-013",
              datetime: "2026-09-08T19:00:00.000Z",
              type: "Chest",
            },
          ],
        };

        const record = parseFeedResponse(raw).records[0];
        expect(record).toMatchObject({ type: "Chest", value: undefined });
      });
    });

    describe("memo", () => {
      it("memoが入力されている場合は変換する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-001",
              datetime: "2026-09-08T07:00:00.000Z",
              type: "Formula",
              memo: "Finished the bottle.",
            },
          ],
        };

        const record = parseFeedResponse(raw).records[0];
        expect(record).toMatchObject({ memo: "Finished the bottle." });
      });

      it("memoが省略された場合もundefinedで変換する", () => {
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
        expect(record).toMatchObject({ memo: undefined });
      });

      it("未対応のtypeでもmemoを保持する", () => {
        const raw = {
          schema_version: 1,
          generated_at: "2026-09-09T03:00:00.000Z",
          range: { from: "2026-09-08T03:00:00.000Z", to: "2026-09-09T03:00:00.000Z" },
          records: [
            {
              event_id: "example-999",
              datetime: "2026-09-08T07:00:00.000Z",
              type: "Height",
              memo: "3cm grew this month",
            },
          ],
        };

        const record = parseFeedResponse(raw).records[0];
        expect(record).toMatchObject({ type: "Height", memo: "3cm grew this month" });
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
              type: "Unknown",
            },
          ],
        };

        const record = parseFeedResponse(raw).records[0];

        expect(record).toMatchObject({
          eventId: "example-999",
          type: "Unknown",
        });
        expect(record.datetime).toEqual(new Date("2026-09-08T07:00:00.000Z"));
      });
    });
  });
});
