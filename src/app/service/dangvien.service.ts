import { Injectable } from "@angular/core";
import { TheDb } from "../model/thedb";
import { DangVien } from "../model/dangvien.model";

@Injectable({
  providedIn: "root",
})
export class DangVienService {
  public get(id: number): Promise<DangVien> {
    const sql = "SELECT * FROM dangvien WHERE id = $id";
    const values = { $id: id };

    return TheDb.selectOne(sql, values).then((row) => {
      if (row) {
        return new DangVienService().fromRow(row);
      } else {
        throw new Error("Expected to find 1 dangvien Found 0.");
      }
    });
  }

  public getAll(): Promise<DangVien[]> {
    const sql = `SELECT * FROM dangvien where trangThai = 0`;
    const values = {};

    return TheDb.selectAll(sql, values).then((rows) => {
      const chibos: DangVien[] = [];
      for (const row of rows) {
        const dangvien = new DangVienService().fromRow(row);
        chibos.push(dangvien);
      }
      return chibos;
    });
  }

  public insert(obj: DangVien): Promise<void> {
    const sql = `
        INSERT INTO dangvien
        (dangBoTinh,
        dangBoHuyen,
        soLyLich,
        soTheDangVien,
        tenDangDung,
        tenKhaiSinh,
        gioiTinh,
        noiSinh,
        queQuan,
        thuongTru,
        tamTru,
        danToc,
        tonGiao,
        thanhPhanGiaDinh,
        ngheNghiep,
        ngayVaoDang,
        chiBoVaoDang,
        nguoiGioiThieu,
        ngayCapThamQuyenVaoDang,
        ngayChinhThucVaoDang,
        chiBoChinhThucVaoDang,
        ngayDuocTuyen,
        coQuanTuyenDung,
        ngayVaoDoan,
        thamGiaToChucXaHoi,
        ngayNhapNgu,
        ngayXuatNgu,
        trinhDo,
        tinhTrangSucKhoe,
        soCmnd,
        quaTringHoatDongVaCongTac,
        daoTao,
        khenThuong,
        huyHieu,
        danhHieu,
        dacDiemLichSuBanThan,
        quanHeNuocNgoai,
        trangThai)

        VALUES

        ($dangBoTinh,
        $dangBoHuyen,
        $soLyLich,
        $soTheDangVien,
        $tenDangDung,
        $tenKhaiSinh,
        $gioiTinh,
        $noiSinh,
        $queQuan,
        $thuongTru,
        $tamTru,
        $danToc,
        $tonGiao,
        $thanhPhanGiaDinh,
        $ngheNghiep,
        $ngayVaoDang,
        $chiBoVaoDang,
        $nguoiGioiThieu,
        $ngayCapThamQuyenVaoDang,
        $ngayChinhThucVaoDang,
        $chiBoChinhThucVaoDang,
        $ngayDuocTuyen,
        $coQuanTuyenDung,
        $ngayVaoDoan,
        $thamGiaToChucXaHoi,
        $ngayNhapNgu,
        $ngayXuatNgu,
        $trinhDo,
        $tinhTrangSucKhoe,
        $soCmnd,
        $quaTringHoatDongVaCongTac,
        $daoTao,
        $khenThuong,
        $huyHieu,
        $danhHieu,
        $dacDiemLichSuBanThan,
        $quanHeNuocNgoai,
        $trangThai)`;

    const values = {
      $dangBoTinh: obj.dangBoTinh,
      $dangBoHuyen: obj.dangBoHuyen,
      $soLyLich: obj.soLyLich,
      $soTheDangVien: obj.soTheDangVien,
      $tenDangDung: obj.tenDangDung,
      $tenKhaiSinh: obj.tenKhaiSinh,
      $gioiTinh: obj.gioiTinh,
      $noiSinh: obj.noiSinh,
      $queQuan: obj.queQuan,
      $thuongTru: obj.thuongTru,
      $tamTru: obj.tamTru,
      $danToc: obj.danToc,
      $tonGiao: obj.tonGiao,
      $thanhPhanGiaDinh: obj.thanhPhanGiaDinh,
      $ngheNghiep: obj.ngheNghiep,
      $ngayVaoDang: obj.ngayVaoDang,
      $chiBoVaoDang: obj.chiBoVaoDang,
      $nguoiGioiThieu: obj.nguoiGioiThieu,
      $ngayCapThamQuyenVaoDang: obj.ngayCapThamQuyenVaoDang,
      $ngayChinhThucVaoDang: obj.ngayChinhThucVaoDang,
      $chiBoChinhThucVaoDang: obj.chiBoChinhThucVaoDang,
      $ngayDuocTuyen: obj.ngayDuocTuyen,
      $coQuanTuyenDung: obj.coQuanTuyenDung,
      $ngayVaoDoan: obj.ngayVaoDoan,
      $thamGiaToChucXaHoi: obj.thamGiaToChucXaHoi,
      $ngayNhapNgu: obj.ngayNhapNgu,
      $ngayXuatNgu: obj.ngayXuatNgu,
      $trinhDo: obj.trinhDo,
      $tinhTrangSucKhoe: obj.tinhTrangSucKhoe,
      $soCmnd: obj.soCmnd,
      $quaTringHoatDongVaCongTac: obj.quaTringHoatDongVaCongTac,
      $daoTao: obj.daoTao,
      $khenThuong: obj.khenThuong,
      $huyHieu: obj.huyHieu,
      $danhHieu: obj.danhHieu,
      $dacDiemLichSuBanThan: obj.dacDiemLichSuBanThan,
      $quanHeNuocNgoai: obj.quanHeNuocNgoai,
      $trangThai: 0,
    };

    return TheDb.insert(sql, values).then((result) => {
      if (result.changes !== 1) {
        throw new Error(
          `Expected 1 dangvien to be inserted. Was ${result.changes}`
        );
      } else {
        obj.id = result.lastID;
      }
    });
  }

  public update(obj: DangVien): Promise<void> {
    const sql = `
        UPDATE dangvien
            SET 
            dangBoTinh = $dangBoTinh,
            dangBoHuyen = $dangBoHuyen,
            soLyLich = $soLyLich,
            soTheDangVien = $soTheDangVien,
            tenDangDung = $tenDangDung,
            tenKhaiSinh = $tenKhaiSinh,
            gioiTinh = $gioiTinh,
            noiSinh = $noiSinh,
            queQuan = $queQuan,
            thuongTru = $thuongTru,
            tamTru = $tamTru,
            danToc = $danToc,
            tonGiao = $tonGiao,
            thanhPhanGiaDinh = $thanhPhanGiaDinh,
            ngheNghiep = $ngheNghiep,
            ngayVaoDang = $ngayVaoDang,
            chiBoVaoDang = $chiBoVaoDang,
            nguoiGioiThieu = $nguoiGioiThieu,
            ngayCapThamQuyenVaoDang = $ngayCapThamQuyenVaoDang,
            ngayChinhThucVaoDang = $ngayChinhThucVaoDang,
            chiBoChinhThucVaoDang = $chiBoChinhThucVaoDang,
            ngayDuocTuyen = $ngayDuocTuyen,
            coQuanTuyenDung = $coQuanTuyenDung,
            ngayVaoDoan = $ngayVaoDoan,
            thamGiaToChucXaHoi = $thamGiaToChucXaHoi,
            ngayNhapNgu = $ngayNhapNgu,
            ngayXuatNgu = $ngayXuatNgu,
            trinhDo = $trinhDo,
            tinhTrangSucKhoe = $tinhTrangSucKhoe,
            soCmnd = $soCmnd,
            quaTringHoatDongVaCongTac = $quaTringHoatDongVaCongTac,
            daoTao = $daoTao,
            khenThuong = $khenThuong,
            huyHieu = $huyHieu,
            danhHieu = $danhHieu,
            dacDiemLichSuBanThan = $dacDiemLichSuBanThan,
            quanHeNuocNgoai = $quanHeNuocNgoai
         WHERE id = $id`;

    const values = {
      $id: obj.id,
      $dangBoTinh: obj.dangBoTinh,
      $dangBoHuyen: obj.dangBoHuyen,
      $soLyLich: obj.soLyLich,
      $soTheDangVien: obj.soTheDangVien,
      $tenDangDung: obj.tenDangDung,
      $tenKhaiSinh: obj.tenKhaiSinh,
      $gioiTinh: obj.gioiTinh,
      $noiSinh: obj.noiSinh,
      $queQuan: obj.queQuan,
      $thuongTru: obj.thuongTru,
      $tamTru: obj.tamTru,
      $danToc: obj.danToc,
      $tonGiao: obj.tonGiao,
      $thanhPhanGiaDinh: obj.thanhPhanGiaDinh,
      $ngheNghiep: obj.ngheNghiep,
      $ngayVaoDang: obj.ngayVaoDang,
      $chiBoVaoDang: obj.chiBoVaoDang,
      $nguoiGioiThieu: obj.nguoiGioiThieu,
      $ngayCapThamQuyenVaoDang: obj.ngayCapThamQuyenVaoDang,
      $ngayChinhThucVaoDang: obj.ngayChinhThucVaoDang,
      $chiBoChinhThucVaoDang: obj.chiBoChinhThucVaoDang,
      $ngayDuocTuyen: obj.ngayDuocTuyen,
      $coQuanTuyenDung: obj.coQuanTuyenDung,
      $ngayVaoDoan: obj.ngayVaoDoan,
      $thamGiaToChucXaHoi: obj.thamGiaToChucXaHoi,
      $ngayNhapNgu: obj.ngayNhapNgu,
      $ngayXuatNgu: obj.ngayXuatNgu,
      $trinhDo: obj.trinhDo,
      $tinhTrangSucKhoe: obj.tinhTrangSucKhoe,
      $soCmnd: obj.soCmnd,
      $quaTringHoatDongVaCongTac: obj.quaTringHoatDongVaCongTac,
      $daoTao: obj.daoTao,
      $khenThuong: obj.khenThuong,
      $huyHieu: obj.huyHieu,
      $danhHieu: obj.danhHieu,
      $dacDiemLichSuBanThan: obj.dacDiemLichSuBanThan,
      $quanHeNuocNgoai: obj.quanHeNuocNgoai,
    };

    return TheDb.update(sql, values).then((result) => {
      if (result.changes !== 1) {
        throw new Error(
          `Expected 1 dangvien to be updated. Was ${result.changes}`
        );
      }
    });
  }

  public delete(id: number): Promise<void> {
    const sql = `
        UPDATE dangvien
            SET trangThai = 1
         WHERE id = $id`;

    const values = {
      $id: id,
    };

    return TheDb.delete(sql, values).then((result) => {
      if (result.changes !== 1) {
        throw new Error(
          `Expected 1 dangvien to be deleted. Was ${result.changes}`
        );
      }
    });
  }

  public fromRow(row: object): DangVien {
    const obj = row as DangVien;
    return obj;
  }
}
