import type { BaseRecord } from "@/records/base";

/**
 * 未対応の記録種別のためのフォールバック。
 *
 * @remarks
 * 既知の記録種別が持ちうるプロパティ（`last` / `leftTime` / `rightTime` など）を
 * `never` として明示することで、利用者が `switch` の `default` 節や
 * narrow前の状態でこれらのプロパティに触れてもコンパイルエラーにならないようにしている。
 */
export interface UnknownRecord extends BaseRecord {
  type: string;
  last?: never;
  leftTime?: never;
  rightTime?: never;
  value?: never;
}
