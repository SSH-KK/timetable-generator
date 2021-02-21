import ExcelJS from "exceljs"
import { saveAs } from "file-saver"
import { LessonsType, TimetableT } from "@type/timetable"
import assets from "@assets/excel"
import {
  generateDayHeader,
  generateDocumentName,
  generateEventContent,
  getDate,
  getGroupNumber,
} from "./utils"

/**
 * FuUnction to join all content of excel
 * @param classNumber Class number
 * @param generation Generation
 * @param timetableState State returned by useTimetable hook
 * @param firstDay First day of week
 */
const generateDocument = (
  classNumber: number,
  generation: number,
  timetableState: TimetableT,
  firstDay: number
): Promise<ExcelJS.Buffer> => {
  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet("Расписание", {
    properties: {
      defaultColWidth: 25,
      defaultRowHeight: 55,
    },
  })
  assets.mainHeader.forEach((ob, obIndex) => {
    sheet.mergeCells(1, obIndex + 1, 2, obIndex + 1)
    sheet.getCell(1, obIndex + 1).value = ob[1]
    sheet.getCell(1, obIndex + 1).alignment = assets.baseAlignment
    sheet.mergeCells(1, 4 + 2 * obIndex, 1, 4 + 2 * obIndex + 1)
    sheet.getCell(1, 4 + 2 * obIndex).value = `${classNumber} «${ob[0]}» класс`
    sheet.getCell(1, 4 + 2 * obIndex).alignment = assets.baseAlignment
    sheet.getCell(2, 4 + 2 * obIndex).value = `${getGroupNumber(generation)}${
      2 * obIndex + 1
    } группа`
    sheet.getCell(2, 4 + 2 * obIndex).alignment = assets.baseAlignment
    sheet.getCell(2, 4 + 2 * obIndex + 1).value = `${getGroupNumber(generation)}${
      2 * obIndex + 2
    } группа`
    sheet.getCell(2, 4 + 2 * obIndex + 1).alignment = assets.baseAlignment
  })
  let celsUp = 0
  timetableState.days.forEach((day, dayIndex) => {
    sheet.mergeCells(3 + celsUp, 1, 3 + celsUp, 9)
    sheet.getCell(3 + celsUp, 1).value = generateDayHeader(firstDay, dayIndex)
    sheet.getCell(3 + celsUp, 1).alignment = assets.baseAlignment
    sheet.getCell(3 + celsUp, 1).fill = assets.fillPatterns.gray

    day.events.forEach((event, eventIndex) => {
      sheet.mergeCells(4 + celsUp + 2 * eventIndex, 1, 5 + celsUp + 2 * eventIndex, 1)
      const parNumCell = sheet.getCell(4 + celsUp + 2 * eventIndex, 1)
      parNumCell.value = eventIndex + 1
      parNumCell.alignment = assets.baseAlignment
      const lesNumCells = [
        sheet.getCell(4 + celsUp + 2 * eventIndex, 2),
        sheet.getCell(5 + celsUp + 2 * eventIndex, 2),
      ]
      const timeCells = [
        sheet.getCell(4 + celsUp + 2 * eventIndex, 3),
        sheet.getCell(5 + celsUp + 2 * eventIndex, 3),
      ]
      for (let i = 0; i < 2; i++) {
        lesNumCells[i].value = 2 * eventIndex + 1 + i
        lesNumCells[i].alignment = assets.baseAlignment
        timeCells[i].value = assets.lessonTimes[2 * eventIndex + i]
        timeCells[i].alignment = assets.baseAlignment
      }
      event[`lessons${classNumber}` as LessonsType][0].forEach((par, parIndex) => {
        if (parIndex % 2 == 0) {
          let allSame = 0
          const temp_cells: [ExcelJS.Cell, number][] = [
            [
              sheet.getCell(4 + celsUp + 2 * eventIndex, 4 + 2 * Math.trunc(parIndex / 2)),
              event[`lessons${classNumber}` as LessonsType][0][2 * Math.trunc(parIndex / 2)],
            ],
            [
              sheet.getCell(4 + celsUp + 2 * eventIndex, 5 + 2 * Math.trunc(parIndex / 2)),
              event[`lessons${classNumber}` as LessonsType][0][2 * Math.trunc(parIndex / 2) + 1],
            ],
            [
              sheet.getCell(5 + celsUp + 2 * eventIndex, 4 + 2 * Math.trunc(parIndex / 2)),
              event[`lessons${classNumber}` as LessonsType][1][2 * Math.trunc(parIndex / 2)],
            ],
            [
              sheet.getCell(5 + celsUp + 2 * eventIndex, 5 + 2 * Math.trunc(parIndex / 2)),
              event[`lessons${classNumber}` as LessonsType][1][2 * Math.trunc(parIndex / 2) + 1],
            ],
          ]
          temp_cells.forEach(temp_cell => {
            if (temp_cell[1] != -1) {
              temp_cell[0].value = generateEventContent(timetableState, temp_cell[1])
              temp_cell[0].alignment = assets.baseAlignment
            }
            if (temp_cell[1] == temp_cells[0][1]) {
              allSame += 1
            }
          })
          if (allSame == 4) {
            sheet.mergeCells(
              4 + celsUp + 2 * eventIndex,
              4 + 2 * Math.trunc(parIndex / 2),
              5 + celsUp + 2 * eventIndex,
              5 + 2 * Math.trunc(parIndex / 2)
            )
            console.log("ALL SAME")
          } else if (
            (temp_cells[0][1] == temp_cells[2][1] && temp_cells[0][1] != -1) ||
            (temp_cells[1][1] == temp_cells[3][1] && temp_cells[1][1] != -1)
          ) {
            if (temp_cells[0][1] == temp_cells[2][1] && temp_cells[0][1] != -1) {
              sheet.mergeCells(
                4 + celsUp + 2 * eventIndex,
                4 + 2 * Math.trunc(parIndex / 2),
                5 + celsUp + 2 * eventIndex,
                4 + 2 * Math.trunc(parIndex / 2)
              )
              console.log("s 1")
            }
            if (temp_cells[1][1] == temp_cells[3][1] && temp_cells[1][1] != -1) {
              sheet.mergeCells(
                4 + celsUp + 2 * eventIndex,
                5 + 2 * Math.trunc(parIndex / 2),
                5 + celsUp + 2 * eventIndex,
                5 + 2 * Math.trunc(parIndex / 2)
              )
              console.log("s 4")
            }
          } else {
            if (temp_cells[0][1] == temp_cells[1][1] && temp_cells[0][1] != -1) {
              sheet.mergeCells(
                4 + celsUp + 2 * eventIndex,
                4 + 2 * Math.trunc(parIndex / 2),
                4 + celsUp + 2 * eventIndex,
                5 + 2 * Math.trunc(parIndex / 2)
              )
              console.log("s 2")
            }
            if (temp_cells[2][1] == temp_cells[3][1] && temp_cells[1][1] != -1) {
              sheet.mergeCells(
                5 + celsUp + 2 * eventIndex,
                4 + 2 * Math.trunc(parIndex / 2),
                5 + celsUp + 2 * eventIndex,
                5 + 2 * Math.trunc(parIndex / 2)
              )
              console.log("s 3")
            }
          }
        }
      })
    })

    celsUp += day.events.length * 2 + 1
  })

  return workbook.xlsx.writeBuffer()
}

/**
 * Function for excel document generation
 * @param classNumber Class number
 * @param generation Generation
 * @param timetableState State returned by useTimetable hook
 * @param firstDay first day of week
 */
const createDocument = (
  classNumber: number,
  generation: number,
  timetableState: TimetableT,
  firstDay: number
): void => {
  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet("Расписание")
  generateDocument(classNumber, generation, timetableState, firstDay).then(buffer => {
    saveAs(new Blob([new Uint8Array(buffer)]), generateDocumentName(classNumber))
  })
}

export { createDocument }
