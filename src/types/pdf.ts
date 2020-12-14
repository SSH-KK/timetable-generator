import { PageOrientation, Style, StyleDictionary } from "pdfmake/interfaces";

export type DocumentStylesT = {
  defaultStyle: Style;
  styles: StyleDictionary;
  pageOrientation: PageOrientation;
};
