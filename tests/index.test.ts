import { PiyoLog } from "@/index";
import { describe, it, expectTypeOf } from "vite-plus/test";

describe("index.tsのexport", () => {
  it("PiyoLogをexportしている", () => {
    expectTypeOf(PiyoLog).toBeConstructibleWith();
  });
});
