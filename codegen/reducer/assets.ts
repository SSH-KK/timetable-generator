export type ActionTypePayloadDefenition = {
  name: string
  type: string
}

export type ActionTypeDefenition = {
  name_tokens: readonly string[]
  payload: readonly ActionTypePayloadDefenition[]
}

export const actionTypeNames: readonly ActionTypeDefenition[] = [
  { name_tokens: ["create", "subject"], payload: [{ name: "title", type: "string" }] },
  {
    name_tokens: ["create", "card"],
    payload: [
      { name: "subject", type: "number" },
      { name: "teacher", type: "number" },
      { name: "room", type: "number" },
    ],
  },
  { name_tokens: ["create", "day"], payload: [{ name: "date", type: "number" }] },
  { name_tokens: ["add", "event"], payload: [{ name: "dayID", type: "number" }] },
  {
    name_tokens: ["add", "teacher"],
    payload: [
      { name: "teacher", type: "string" },
      { name: "subjectID", type: "number" },
    ],
  },
  { name_tokens: ["delete", "subject"], payload: [{ name: "subjectID", type: "number" }] },
  {
    name_tokens: ["delete", "teacher"],
    payload: [
      { name: "subjectID", type: "number" },
      { name: "teacherID", type: "number" },
    ],
  },
  { name_tokens: ["delete", "card"], payload: [{ name: "cardID", type: "number" }] },
  {
    name_tokens: ["add", "lesson"],
    payload: [
      { name: "dayID", type: "number" },
      { name: "eventID", type: "number" },
      { name: "classNumber", type: "LessonsType" },
      { name: "groupID", type: "number" },
      { name: "isPair", type: "boolean" },
      { name: "lessonID", type: "number" },
      { name: "lessonNumber", type: "number" },
    ],
  },
  { name_tokens: ["change", "main", "date"], payload: [{ name: "newDate", type: "Date" }] },
  {
    name_tokens: ["set", "state", "from", "local", "storage"],
    payload: [{ name: "ldata", type: "string" }],
  },
  {
    name_tokens: ["delete", "event"],
    payload: [
      { name: "dayID", type: "number" },
      { name: "eventID", type: "number" },
    ],
  },
  { name_tokens: ["clear", "state"], payload: [] },
] as const
