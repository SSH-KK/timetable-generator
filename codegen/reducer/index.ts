import { EnumMemberStructure, IndentationText, Project, QuoteKind, StructureKind } from "ts-morph"
import { SemicolonPreference } from "typescript"

import { actionTypeNames } from "./assets"
import { camelCase, unpackPayload, upperSnakeCase } from "./utils"

const project = new Project({
  manipulationSettings: {
    quoteKind: QuoteKind.Double,
    indentationText: IndentationText.TwoSpaces,
    useTrailingCommas: true,
    insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: true,
  },
})

const sourceFile = project.createSourceFile("src/types/reducer/index.ts", "", { overwrite: true })

sourceFile.addImportDeclaration({
  moduleSpecifier: "../timetable",
  namedImports: [{ name: "LessonsType" }],
})

sourceFile.addEnum({
  name: "ActionType",
  members: actionTypeNames.map<EnumMemberStructure>(actionType => ({
    name: upperSnakeCase(actionType.name_tokens),
    kind: StructureKind.EnumMember,
  })),

  isExported: true,
})

sourceFile.addInterface({
  name: "Action",
  properties: [{ name: "type", type: "ActionType" }],
})

sourceFile.addExportDeclaration({
  namedExports: [{ name: "Action", alias: "ReducerAction" }],
})

sourceFile.addInterfaces(
  actionTypeNames.map(actionType => ({
    name: camelCase(actionType.name_tokens, true) + "Action",
    extends: ["Action"],
    properties: [
      {
        name: "payload",
        type: unpackPayload(actionType.payload),
      },
    ],
    isExported: true,
  }))
)

actionTypeNames.forEach(actionType => {
  const func = sourceFile.addFunction({
    name: "is" + camelCase(actionType.name_tokens, true) + "Action",
    isExported: true,
    returnType: "action is " + camelCase(actionType.name_tokens, true) + "Action",
    parameters: [
      {
        name: "action",
        type: "Action",
      },
    ],
  })

  func.addBody()
  func.setBodyText("return action.type === ActionType." + upperSnakeCase(actionType.name_tokens))
})

sourceFile.formatText({
  semicolons: SemicolonPreference.Remove,
})

sourceFile.saveSync()
