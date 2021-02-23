import { camelCase, capitalize, unpackPayload, upperSnakeCase } from "./utils"

describe("capitalize function", () => {
  test("Capitalizes sring", () => {
    expect(capitalize("hello")).toEqual("Hello")
    expect(capitalize("Hello")).toEqual("Hello")
    expect(capitalize("пока")).toEqual("Пока")
    expect(capitalize("TEST")).toEqual("TEST")
  })
})

describe("camel case string formatter", () => {
  test("Generates camelCase string from array of strings", () => {
    expect(camelCase(["foo"], false)).toEqual("foo")
    expect(camelCase(["foo", "bar"], false)).toEqual("fooBar")
  })
  test("Manages with unneded uppercase letters", () =>
    expect(camelCase(["tEsT", "onE"], false)).toEqual("testOne"))
  test("Sets first letter as capitalized if `pas` parameter is true", () =>
    expect(camelCase(["foo", "bar"], true)).toEqual("FooBar"))
})

describe("Upper snake case string formatter", () => {
  test("Generates UPPER_SNAKE_CASE string form array of strings", () => {
    expect(upperSnakeCase(["foo"])).toEqual("FOO")
    expect(upperSnakeCase(["foo", "bar"])).toEqual("FOO_BAR")
  })
})
