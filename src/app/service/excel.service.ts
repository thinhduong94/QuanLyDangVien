import { Injectable } from "@angular/core";
import * as FileSaver from "file-saver";
import * as xlsx from "xlsx";
import { DangVienExcelMapping } from "../const/dang-vien-excel-mapping.const";

const Excel_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const Excel_EXTENSION = ".xlsx";
@Injectable({
  providedIn: "root",
})
export class ExcelService {
  constructor() {}

  public exportAsExcelFile(json: any[], sheet: string): void {
    const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet(json);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    if (sheet === "DangVien") {
      DangVienExcelMapping.forEach((mapping) => {
        ws[`${mapping.header}1`].v = mapping.display;
      });
    }
    xlsx.utils.book_append_sheet(wb, ws, sheet);
    xlsx.writeFile(wb, "quanlydangvien.xlsx");
  }

  public excelFileToData(fileName: string, sheetName: string): Array<any> {
    const workbook = xlsx.readFile(fileName);
    const sheet_name_list = workbook.SheetNames;
    let data = [];
    sheet_name_list
      .filter((name) => name === sheetName)
      .forEach(function (name) {
        const worksheet = workbook.Sheets[name];
        const headers = {};
        for (let z in worksheet) {
          if (z[0] === "!") continue;
          //parse out the column, row, and value
          const col = z.substring(0, 1);
          const row = parseInt(z.substring(1));
          const value = worksheet[z].v;

          //store header names
          if (row == 1) {
            headers[col] = value;
            continue;
          }

          if (!data[row]) data[row] = {};
          data[row][headers[col]] = value;
        }
        data.shift();
        data.shift();
      });
    return data;
  }

  public getDangVienDataFromExcel(fileName: string, sheetName: string): any {
    const workbook = xlsx.readFile(fileName);
    const dangVienSheet = workbook.Sheets[sheetName] || {};
    let data = [];
    if (Object.keys(dangVienSheet).length) {
      const valueLength = +dangVienSheet["!ref"].slice(-1);
      // loop through row
      for (let i = 2; i <= valueLength; i++) {
        //loop thourgh colum base on db field
        const dangVienValue = {};
        DangVienExcelMapping.forEach((mapping) => {
          if (dangVienSheet[`${mapping.header}${i}`]) {
            const cellValue = dangVienSheet[`${mapping.header}${i}`].v;
            dangVienValue[mapping.column] = cellValue;
          }
        });
        data.push(dangVienValue);
      }
    }
    console.log("dangvien", data);
    return data;
  }

  private getDataFromCell() {}
}
