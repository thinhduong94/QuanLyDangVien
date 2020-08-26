import { TheDb } from "../model/thedb";
import { ChiBo } from "../model/chibo.model";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class ChiBoService {
  public get(id: number): Promise<ChiBo> {
    const sql = "SELECT * FROM chibo WHERE id = $id";
    const values = { $id: id };

    return TheDb.selectOne(sql, values).then((row) => {
      if (row) {
        return new ChiBoService().fromRow(row);
      } else {
        throw new Error("Expected to find 1 chibo. Found 0.");
      }
    });
  }
  public checkChiBoBeforInsert(chibo:ChiBo) : Promise<ChiBo> {
    const sql = "SELECT * FROM chibo WHERE maChiBo = $maChiBo";
    const values = { $maChiBo: chibo.maChiBo };
    return TheDb.selectOne(sql, values).then((row) => {
      if (row) {
        return null;
      } else {
        return chibo;
      }
    });
  }
  public getByMaChiBo(maChiBo: string): Promise<ChiBo> {
    const sql = "SELECT * FROM chibo WHERE maChiBo = $maChiBo";
    const values = { $maChiBo: maChiBo };

    return TheDb.selectOne(sql, values).then((row) => {
      if (row) {
        return new ChiBoService().fromRow(row);
      } else {
        return null;
      }
    });
  }

  public getAll(): Promise<ChiBo[]> {
    const sql = `SELECT * FROM chibo WHERE trangThai = 0`;
    const values = {};

    return TheDb.selectAll(sql, values).then((rows) => {
      const chibos: ChiBo[] = [];
      for (const row of rows) {
        const chibo = new ChiBoService().fromRow(row);
        chibos.push(chibo);
      }
      return chibos;
    });
  }

  public insert(obj: ChiBo): Promise<void> {
    const sql = `
            INSERT INTO chibo (tenChiBo,maChiBo,qdThanhLap,ghiChu,trangThai)
            VALUES($tenChiBo,$maChiBo,$qdThanhLap,$ghiChu,$trangThai)`;

    const values = {
      $tenChiBo: obj.tenChiBo,
      $maChiBo: obj.maChiBo,
      $qdThanhLap: obj.qdThanhLap,
      $ghiChu: obj.ghiChu,
      $trangThai: 0,
    };

    return TheDb.insert(sql, values).then((result) => {
      if (result.changes !== 1) {
        throw new Error(
          `Expected 1 chibo to be inserted. Was ${result.changes}`
        );
      } else {
        obj.id = result.lastID;
      }
    });
  }

  public update(obj: ChiBo): Promise<void> {
    const sql = `
            UPDATE chibo
                SET tenChiBo = $tenChiBo,
                maChiBo = $maChiBo,
                qdThanhLap = $qdThanhLap,
                ghiChu = $ghiChu
             WHERE id = $id`;

    const values = {
      $id: obj.id,
      $tenChiBo: obj.tenChiBo,
      $maChiBo: obj.maChiBo,
      $qdThanhLap: obj.qdThanhLap,
      $ghiChu: obj.ghiChu,
    };

    return TheDb.update(sql, values).then((result) => {
      if (result.changes !== 1) {
        throw new Error(
          `Expected 1 chibo to be updated. Was ${result.changes}`
        );
      }
    });
  }

  public delete(id: number): Promise<void> {
    const sql = `
            UPDATE chibo
                SET trangThai = 1
             WHERE id = $id`;

    const values = {
      $id: id,
    };

    return TheDb.delete(sql, values).then((result) => {
      if (result.changes !== 1) {
        throw new Error(
          `Expected 1 chibo to be deleted. Was ${result.changes}`
        );
      }
    });
  }

  public fromRow(row: object): ChiBo {
    const obj = row as ChiBo;
    return obj;
  }
}
