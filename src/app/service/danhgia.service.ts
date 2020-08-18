import { TheDb } from "../model/thedb";
import { DanhGiaModel } from "../model/danhgia.model";
import { Injectable, EventEmitter } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class DanhGiaService {
  dateEventEmitter = new EventEmitter();
  public get(id: number): Promise<DanhGiaModel> {
    const sql = "SELECT * FROM danhgia WHERE id = $id";
    const values = { $id: id };

    return TheDb.selectOne(sql, values).then((row) => {
      if (row) {
        return new DanhGiaService().fromRow(row);
      } else {
        throw new Error("Expected to find 1 danhgia. Found 0.");
      }
    });
  }

  public getByCode(
    type: string,
    code: string,
    namDanhGia: string
  ): Promise<DanhGiaModel> {
    const sqlChiBo = `SELECT * FROM danhgia WHERE maChiBo = $MaChiBo AND namDanhGia = $namDanhGia`;
    const sqlDangVien = `SELECT * FROM danhgia WHERE soTheDangVien = $soTheDangVien AND namDanhGia = $namDanhGia`;
    const valuesChiBo = { $maChiBo: code, $namDanhGia: namDanhGia };
    const valuesDangVien = { $soTheDangVien: code, $namDanhGia: namDanhGia };
    const values = type === `maChiBo` ? valuesChiBo : valuesDangVien;
    const sql = type === `maChiBo` ? sqlChiBo : sqlDangVien;
    return TheDb.selectOne(sql, values).then((row) => {
      if (row) {
        return new DanhGiaService().fromRow(row);
      }
    });
  }

  public getAll(): Promise<DanhGiaModel[]> {
    const sql = `SELECT * FROM danhgia`;
    const values = {};

    return TheDb.selectAll(sql, values).then((rows) => {
      const chibos: DanhGiaModel[] = [];
      for (const row of rows) {
        const danhgia = new DanhGiaService().fromRow(row);
        chibos.push(danhgia);
      }
      return chibos;
    });
  }

  public insert(obj: DanhGiaModel): Promise<void> {
    const sql = `
            INSERT INTO danhgia 
            (maChiBo,soTheDangVien,namDanhGia,danhGia)
            VALUES($maChiBo,$soTheDangVien,$namDanhGia,$danhGia)`;

    const values = {
      $maChiBo: obj.maChiBo,
      $soTheDangVien: obj.soTheDangVien,
      $namDanhGia: obj.namDanhGia,
      $danhGia: obj.danhGia,
    };

    return TheDb.insert(sql, values).then((result) => {
      if (result.changes !== 1) {
        throw new Error(
          `Expected 1 danhgia to be inserted. Was ${result.changes}`
        );
      } else {
        obj.id = result.lastID;
      }
    });
  }

  public update(obj: DanhGiaModel): Promise<void> {
    const sql = `
            UPDATE danhgia
            SET maChiBo = $maChiBo,
            soTheDangVien = $soTheDangVien,
            namDanhGia = $namDanhGia,
            danhGia = $danhGia
             WHERE id = $id`;
    const values = {
      $maChiBo: obj.maChiBo,
      $soTheDangVien: obj.soTheDangVien,
      $namDanhGia: obj.namDanhGia,
      $danhGia: obj.danhGia,
      $id: obj.id,
    };

    return TheDb.update(sql, values).then((result) => {
      if (result.changes !== 1) {
        throw new Error(
          `Expected 1 danhgia to be updated. Was ${result.changes}`
        );
      }
    });
  }

  public delete(id: number): Promise<void> {
    const sql = `
            UPDATE danhgia
                SET trangThai = 1
             WHERE id = $id`;

    const values = {
      $id: id,
    };

    return TheDb.delete(sql, values).then((result) => {
      if (result.changes !== 1) {
        throw new Error(
          `Expected 1 danhgia to be deleted. Was ${result.changes}`
        );
      }
    });
  }

  public fromRow(row: object): DanhGiaModel {
    const obj = row as DanhGiaModel;
    return obj;
  }
}
