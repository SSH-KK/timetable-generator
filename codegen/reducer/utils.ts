import { ActionTypePayloadDefenition } from "./assets"

export const capitalize = (str: string): string => str[0].toUpperCase() + str.slice(1)

export const camelCase = (tokens: string[] | readonly string[], pascal: boolean): string =>
  tokens
    .slice(1)
    .reduce(
      (collector, token) => collector + capitalize(token.toLowerCase()),
      pascal ? capitalize(tokens[0].toLowerCase()) : tokens[0].toLowerCase()
    )

export const upperSnakeCase = (tokens: string[] | readonly string[]): string =>
  tokens.reduce(
    (collector, token, index) => collector + (index ? "_" : "") + token.toUpperCase(),
    ""
  )

export const unpackPayload = (
  payload: ActionTypePayloadDefenition[] | readonly ActionTypePayloadDefenition[]
): string => {
  if (payload.length == 0) return "Record<string, never>"

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    payload.reduce<string>(
      (coll, prop, index, arr) =>
        coll + prop.name + ": " + prop.type + (index == arr.length - 1 ? " " : "; "),
      "{ "
    ) + "}"
  )
}
