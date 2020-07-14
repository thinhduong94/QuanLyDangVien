import { TheDb } from '../model/thedb';
import { Injectable } from '@angular/core';
import { DangVien213 } from '../model/dangvien213.model';
@Injectable({
    providedIn: 'root',
})
export class DangVien213Service {
    public get(id: number): Promise<DangVien213> {
        const sql = 'SELECT * FROM dangvien213 WHERE id = $id';
        const values = { $id: id };

        return TheDb.selectOne(sql, values)
            .then((row) => {
                if (row) {
                    return new DangVien213Service().fromRow(row);
                } else {
                    throw new Error('Expected to find 1 dangvien213. Found 0.');
                }
            });
    }

    public getAll(): Promise<DangVien213[]> {
        const sql = `SELECT * FROM dangvien213 WHERE trangThai = 0`;
        const values = {};

        return TheDb.selectAll(sql, values)
            .then((rows) => {
                const dangvien213s : DangVien213[] = [];
                for (const row of rows) {
                    const dangvien213 = new DangVien213Service().fromRow(row);
                    dangvien213s.push(dangvien213);
                }
                return dangvien213s;
            });
    }

    public insert(obj:DangVien213): Promise<void> {
        const sql = `
            INSERT INTO dangvien213 (maDv,tenDv,ngaySinh,gioTinh,diaChi,noiCongTac,tinhTrang,ngayQuanLy,maChiDo,ghiChu,trangThai)
            VALUES($maDv,$tenDv,$ngaySinh,$gioTinh,$diaChi,$noiCongTac,$tinhTrang,$ngayQuanLy,$maChiDo,$ghiChu,$trangThai)`;

        const values = {
            $maDv : obj.maDv,
            $tenDv : obj.tenDv,
            $ngaySinh : obj.ngaySinh,
            $gioTinh : obj.gioTinh,
            $diaChi : obj.diaChi,
            $noiCongTac : obj.noiCongTac,
            $tinhTrang: obj.tinhTrang,
            $ngayQuanLy : obj.ngayQuanLy,
            $maChiDo : obj.maChiDo,
            $ghiChu : obj.ghiChu,
            $trangThai : 0
        };

        return TheDb.insert(sql, values)
            .then((result) => {
                if (result.changes !== 1) {
                    throw new Error(`Expected 1 dangvien213 to be inserted. Was ${result.changes}`);
                } else {
                    obj.id = result.lastID;
                }
            });
    }

    public update(obj:DangVien213): Promise<void> {
        const sql = `
            UPDATE dangvien213
                SET maDv : $maDv,
                tenDv : $tenDv,
                ngaySinh : $ngaySinh,
                gioTinh : $gioTinh,
                diaChi : $diaChi,
                noiCongTac : $noiCongTac,
                tinhTrang: $tinhTrang,
                ngayQuanLy : $ngayQuanLy,
                maChiDo : $maChiDo,
                ghiChu : $ghiChu
             WHERE id = $id`;

        const values = {
            $id : obj.id,
            $maDv : obj.maDv,
            $tenDv : obj.tenDv,
            $ngaySinh : obj.ngaySinh,
            $gioTinh : obj.gioTinh,
            $diaChi : obj.diaChi,
            $noiCongTac : obj.noiCongTac,
            $tinhTrang: obj.tinhTrang,
            $ngayQuanLy : obj.ngayQuanLy,
            $maChiDo : obj.maChiDo,
            $ghiChu : obj.ghiChu
        };

        return TheDb.update(sql, values)
            .then((result) => {
                if (result.changes !== 1) {
                    throw new Error(`Expected 1 dangvien213 to be updated. Was ${result.changes}`);
                }
            });
    }

    public delete(id:number): Promise<void> {
        const sql = `
            UPDATE dangvien213
                SET trangThai = 1
             WHERE id = $id`;

        const values = {
            $id : id
        };

        return TheDb.delete(sql, values)
            .then((result) => {
                if (result.changes !== 1) {
                    throw new Error(`Expected 1 dangvien213 to be deleted. Was ${result.changes}`);
                }
            });
    }

    public fromRow(row: object): DangVien213 {
        const obj = row as DangVien213;
        return obj;
    }
}
