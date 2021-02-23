const months = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
] as const

const weekdays = [
  "ПОНЕДЕЛЬНИК",
  "ВТОРНИК",
  "СРЕДА",
  "ЧЕТВЕРГ",
  "ПЯТНИЦА",
  "СУББОТА",
  "ВОСКРЕСЕНЬЕ",
] as const

const lessonTimes = [
  "8.30-9.10",
  "9.20-10.00",
  "10.15-10.55",
  "11.10-11.50",
  "12.00-12.40",
  "12.50-13.30",
] as const

const mainHeader = [
  ["А", "Пара"],
  ["Б", "Урок"],
  ["В", "Время"],
] as const

const baseHeight = {
  small: 25,
  big: 55
} as const

const baseAlignment = {
  horizontal: "center",
  vertical: "middle",
  wrapText: true,
} as const

const fillPatterns = {
  gray: {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFA6A6A6" },
  },
} as const

export default {
  months,
  weekdays,
  lessonTimes,
  mainHeader,
  baseAlignment,
  fillPatterns,
  baseHeight
}
