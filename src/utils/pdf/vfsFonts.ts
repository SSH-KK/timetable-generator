import regular from "@fonts/PTSerif-Regular.ttf"
import bold from "@fonts/PTSerif-Bold.ttf"

import pdfFonts from "pdfmake/build/vfs_fonts"

pdfFonts.pdfMake.vfs["PTSerifRegular.ttf"] = regular.slice(regular.indexOf(","))

pdfFonts.pdfMake.vfs["PTSerifBold.ttf"] = bold.slice(bold.indexOf(","))

export default pdfFonts.pdfMake.vfs
