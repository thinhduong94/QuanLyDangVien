import { Injectable } from "@angular/core";
import { TheDb } from "../model/thedb";
import { DangVien } from "../model/dangvien.model";

@Injectable({
  providedIn: "root",
})
export class ThongKeService {

  public getAll(): Promise<DangVien[]> {
    const sql = `SELECT * FROM dangvien JOIN chibo  ON dangvien.maChiBo=chibo.maChiBo where trangThai = 0`;
    const values = {};

    return TheDb.selectAll(sql, values).then((rows) => {
      const chibos: DangVien[] = [];
      for (const row of rows) {
        const dangvien = new ThongKeService().fromRow(row);
        chibos.push(dangvien);
      }
      return chibos;
    });
  }

  public fromRow(row: object): any {
    return row;
  }
}
