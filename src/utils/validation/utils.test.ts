import { getClassNumber } from "./utils";

test("Get 10th class for numbers under 6", () =>
  Array(6)
    .fill("")
    .forEach((_, index) => expect(getClassNumber(index)).toBe(10)));

test("Get 11th class for numbers higher then 6", () =>
  Array(6)
    .fill("")
    .forEach((_, index) => expect(getClassNumber(6 + index)).toBe(11)));
