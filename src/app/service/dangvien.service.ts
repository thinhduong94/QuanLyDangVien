import { Injectable } from "@angular/core";
import { TheDb } from "../model/thedb";
import { DangVien } from "../model/dangvien.model";

@Injectable({
  providedIn: "root",
})
export class DangVienService {
  public getBySoTheDangVien(soTheDangVien: number): Promise<DangVien> {
    const sql = "SELECT * FROM dangvien WHERE soTheDangVien = $soTheDangVien";
    const values = { $soTheDangVien: soTheDangVien };

    return TheDb.selectOne(sql, values).then((row) => {
      if (row) {
        return new DangVienService().fromRow(row);
      }
    });
  }

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
        ngaySinh,
        queQuan,
        thuongTru,
        tamTru,
        danToc,
        tonGiao,
        thanhPhanGiaDinh,
        ngheNghiep,
        ngayVaoDang,
        chiBoVaoDang,
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
        quaTrinhHoatDongVaCongTac,
        daoTao,
        khenThuong,
        huyHieu,
        danhHieu,
        dacDiemLichSuBanThan,
        quanHeNuocNgoai,
        chiBoCoSo,
        chiBo,
        boPhan,
        mienCongTacNgay,
        ngayKhoiPhucDang,
        biXuLyTheoPhapLuat,
        lamViecTrongCheDoCu,
        daDiNuocNgoai,
        thamGiaToChucNuocNgoai,
        coNguoiThanNuocNgoai,
        tongThuNhap,
        binhQuan,
        loaiNhaDuocCap,
        dienTichNhaDuocCap,
        loaiNhaDuocMua,
        dienTichNhaDuocMua,
        datDuocCap,
        datDuocMua,
        hoatDongKinhTe,
        dienTichDatTrangTrai,
        soLaoDongThue,
        taiSanCoGiaTri,
        giaTriTaiSan,
        ngayVaoDangLanHai,
        chiBoVaoDangLanHai,
        nguoiGioiThieuMot,
        chucVuNguoiGioiThieuMot,
        nguoiGioiThieuHai,
        chucVuNguoiGioiThieuHai,
        ngayChinhThucVaoLanHai,
        chiBoChinhThucVaoDangLanHai,
        kyLuat,
        thoiGianBiXoa,
        chiBoBiXoa,
        quanHeGiaDinh,
        trangThai,
        anh3x4)

        VALUES

        ($dangBoTinh,
          $dangBoHuyen,
          $soLyLich,
          $soTheDangVien,
          $tenDangDung,
          $tenKhaiSinh,
          $gioiTinh,
          $noiSinh,
          $ngaySinh,
          $queQuan,
          $thuongTru,
          $tamTru,
          $danToc,
          $tonGiao,
          $thanhPhanGiaDinh,
          $ngheNghiep,
          $ngayVaoDang,
          $chiBoVaoDang,
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
          $quaTrinhHoatDongVaCongTac,
          $daoTao,
          $khenThuong,
          $huyHieu,
          $danhHieu,
          $dacDiemLichSuBanThan,
          $quanHeNuocNgoai,
          $chiBoCoSo,
          $chiBo,
          $boPhan,
          $mienCongTacNgay,
          $ngayKhoiPhucDang,
          $biXuLyTheoPhapLuat,
          $lamViecTrongCheDoCu,
          $daDiNuocNgoai,
          $thamGiaToChucNuocNgoai,
          $coNguoiThanNuocNgoai,
          $tongThuNhap,
          $binhQuan,
          $loaiNhaDuocCap,
          $dienTichNhaDuocCap,
          $loaiNhaDuocMua,
          $dienTichNhaDuocMua,
          $datDuocCap,
          $datDuocMua,
          $hoatDongKinhTe,
          $dienTichDatTrangTrai,
          $soLaoDongThue,
          $taiSanCoGiaTri,
          $giaTriTaiSan,
          $ngayVaoDangLanHai,
          $chiBoVaoDangLanHai,
          $nguoiGioiThieuMot,
          $chucVuNguoiGioiThieuMot,
          $nguoiGioiThieuHai,
          $chucVuNguoiGioiThieuHai,
          $ngayChinhThucVaoLanHai,
          $chiBoChinhThucVaoDangLanHai,
          $kyLuat,
          $thoiGianBiXoa,
          $chiBoBiXoa,
          $quanHeGiaDinh,
          $trangThai,
          $anh3x4)`;

    const values = {
      $dangBoTinh: obj.dangBoTinh,
      $dangBoHuyen: obj.dangBoHuyen,
      $soLyLich: obj.soLyLich,
      $soTheDangVien: obj.soTheDangVien,
      $tenDangDung: obj.tenDangDung,
      $tenKhaiSinh: obj.tenKhaiSinh,
      $gioiTinh: obj.gioiTinh,
      $noiSinh: obj.noiSinh,
      $ngaySinh: obj.ngaySinh,
      $queQuan: obj.queQuan,
      $thuongTru: obj.thuongTru,
      $tamTru: obj.tamTru,
      $danToc: obj.danToc,
      $tonGiao: obj.tonGiao,
      $thanhPhanGiaDinh: obj.thanhPhanGiaDinh,
      $ngheNghiep: obj.ngheNghiep,
      $ngayVaoDang: obj.ngayVaoDang,
      $chiBoVaoDang: obj.chiBoVaoDang,
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
      $quaTrinhHoatDongVaCongTac: obj.quaTrinhHoatDongVaCongTac,
      $daoTao: obj.daoTao,
      $khenThuong: obj.khenThuong,
      $huyHieu: obj.huyHieu,
      $danhHieu: obj.danhHieu,
      $dacDiemLichSuBanThan: obj.dacDiemLichSuBanThan,
      $quanHeNuocNgoai: obj.quanHeNuocNgoai,
      $chiBoCoSo: obj.chiBoCoSo,
      $chiBo: obj.chiBo,
      $boPhan: obj.boPhan,
      $mienCongTacNgay: obj.mienCongTacNgay,
      $ngayKhoiPhucDang: obj.ngayKhoiPhucDang,
      $biXuLyTheoPhapLuat: obj.biXuLyTheoPhapLuat,
      $lamViecTrongCheDoCu: obj.lamViecTrongCheDoCu,
      $daDiNuocNgoai: obj.daDiNuocNgoai,
      $thamGiaToChucNuocNgoai: obj.thamGiaToChucNuocNgoai,
      $coNguoiThanNuocNgoai: obj.coNguoiThanNuocNgoai,
      $tongThuNhap: obj.tongThuNhap,
      $binhQuan: obj.binhQuan,
      $loaiNhaDuocCap: obj.loaiNhaDuocCap,
      $dienTichNhaDuocCap: obj.dienTichNhaDuocCap,
      $loaiNhaDuocMua: obj.loaiNhaDuocMua,
      $dienTichNhaDuocMua: obj.dienTichNhaDuocMua,
      $datDuocCap: obj.datDuocCap,
      $datDuocMua: obj.datDuocMua,
      $hoatDongKinhTe: obj.hoatDongKinhTe,
      $dienTichDatTrangTrai: obj.dienTichDatTrangTrai,
      $soLaoDongThue: obj.soLaoDongThue,
      $taiSanCoGiaTri: obj.taiSanCoGiaTri,
      $giaTriTaiSan: obj.giaTriTaiSan,
      $ngayVaoDangLanHai: obj.ngayVaoDangLanHai,
      $chiBoVaoDangLanHai: obj.chiBoVaoDangLanHai,
      $nguoiGioiThieuMot: obj.nguoiGioiThieuMot,
      $chucVuNguoiGioiThieuMot: obj.chucVuNguoiGioiThieuMot,
      $nguoiGioiThieuHai: obj.nguoiGioiThieuHai,
      $chucVuNguoiGioiThieuHai: obj.chucVuNguoiGioiThieuHai,
      $ngayChinhThucVaoLanHai: obj.ngayChinhThucVaoLanHai,
      $chiBoChinhThucVaoDangLanHai: obj.chiBoChinhThucVaoDangLanHai,
      $kyLuat: obj.kyLuat,
      $thoiGianBiXoa: obj.thoiGianBiXoa,
      $chiBoBiXoa: obj.chiBoBiXoa,
      $quanHeGiaDinh: obj.quanHeGiaDinh,
      $trangThai: 0,
      $anh3x4: obj.anh3x4,
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
        ngaySinh = $ngaySinh,
        queQuan = $queQuan,
        thuongTru = $thuongTru,
        tamTru = $tamTru,
        danToc = $danToc,
        tonGiao = $tonGiao,
        thanhPhanGiaDinh = $thanhPhanGiaDinh,
        ngheNghiep = $ngheNghiep,
        ngayVaoDang = $ngayVaoDang,
        chiBoVaoDang = $chiBoVaoDang,
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
        quaTrinhHoatDongVaCongTac = $quaTrinhHoatDongVaCongTac,
        daoTao = $daoTao,
        khenThuong = $khenThuong,
        huyHieu = $huyHieu,
        danhHieu = $danhHieu,
        dacDiemLichSuBanThan = $dacDiemLichSuBanThan,
        quanHeNuocNgoai = $quanHeNuocNgoai,
        chiBoCoSo = $chiBoCoSo,
        chiBo = $chiBo,
        boPhan = $boPhan,
        mienCongTacNgay = $mienCongTacNgay,
        ngayKhoiPhucDang = $ngayKhoiPhucDang,
        biXuLyTheoPhapLuat = $biXuLyTheoPhapLuat,
        lamViecTrongCheDoCu = $lamViecTrongCheDoCu,
        daDiNuocNgoai = $daDiNuocNgoai,
        thamGiaToChucNuocNgoai = $thamGiaToChucNuocNgoai,
        coNguoiThanNuocNgoai = $coNguoiThanNuocNgoai,
        tongThuNhap = $tongThuNhap,
        binhQuan = $binhQuan,
        loaiNhaDuocCap = $loaiNhaDuocCap,
        dienTichNhaDuocCap = $dienTichNhaDuocCap,
        loaiNhaDuocMua = $loaiNhaDuocMua,
        dienTichNhaDuocMua = $dienTichNhaDuocMua,
        datDuocCap = $datDuocCap,
        datDuocMua = $datDuocMua,
        hoatDongKinhTe = $hoatDongKinhTe,
        dienTichDatTrangTrai = $dienTichDatTrangTrai,
        soLaoDongThue = $soLaoDongThue,
        taiSanCoGiaTri = $taiSanCoGiaTri,
        giaTriTaiSan = $giaTriTaiSan,
        ngayVaoDangLanHai = $ngayVaoDangLanHai,
        chiBoVaoDangLanHai = $chiBoVaoDangLanHai,
        nguoiGioiThieuMot = $nguoiGioiThieuMot,
        chucVuNguoiGioiThieuMot = $chucVuNguoiGioiThieuMot,
        nguoiGioiThieuHai = $nguoiGioiThieuHai,
        chucVuNguoiGioiThieuHai = $chucVuNguoiGioiThieuHai,
        ngayChinhThucVaoLanHai = $ngayChinhThucVaoLanHai,
        chiBoChinhThucVaoDangLanHai = $chiBoChinhThucVaoDangLanHai,
        kyLuat = $kyLuat,
        thoiGianBiXoa = $thoiGianBiXoa,
        chiBoBiXoa = $chiBoBiXoa,
        quanHeGiaDinh = $quanHeGiaDinh,
        anh3x4 = $anh3x4
         WHERE id = $id`;

    const values = this.getValueObject(obj);
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

  getValueObject(obj): any {
    return {
      $id: obj.id,
      $dangBoTinh: obj.dangBoTinh,
      $dangBoHuyen: obj.dangBoHuyen,
      $soLyLich: obj.soLyLich,
      $soTheDangVien: obj.soTheDangVien,
      $tenDangDung: obj.tenDangDung,
      $tenKhaiSinh: obj.tenKhaiSinh,
      $gioiTinh: obj.gioiTinh,
      $noiSinh: obj.noiSinh,
      $ngaySinh: obj.ngaySinh,
      $queQuan: obj.queQuan,
      $thuongTru: obj.thuongTru,
      $tamTru: obj.tamTru,
      $danToc: obj.danToc,
      $tonGiao: obj.tonGiao,
      $thanhPhanGiaDinh: obj.thanhPhanGiaDinh,
      $ngheNghiep: obj.ngheNghiep,
      $ngayVaoDang: obj.ngayVaoDang,
      $chiBoVaoDang: obj.chiBoVaoDang,
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
      $quaTrinhHoatDongVaCongTac: obj.quaTrinhHoatDongVaCongTac,
      $daoTao: obj.daoTao,
      $khenThuong: obj.khenThuong,
      $huyHieu: obj.huyHieu,
      $danhHieu: obj.danhHieu,
      $dacDiemLichSuBanThan: obj.dacDiemLichSuBanThan,
      $quanHeNuocNgoai: obj.quanHeNuocNgoai,
      $chiBoCoSo: obj.chiBoCoSo,
      $chiBo: obj.chiBo,
      $boPhan: obj.boPhan,
      $mienCongTacNgay: obj.mienCongTacNgay,
      $ngayKhoiPhucDang: obj.ngayKhoiPhucDang,
      $biXuLyTheoPhapLuat: obj.biXuLyTheoPhapLuat,
      $lamViecTrongCheDoCu: obj.lamViecTrongCheDoCu,
      $daDiNuocNgoai: obj.daDiNuocNgoai,
      $thamGiaToChucNuocNgoai: obj.thamGiaToChucNuocNgoai,
      $coNguoiThanNuocNgoai: obj.coNguoiThanNuocNgoai,
      $tongThuNhap: obj.tongThuNhap,
      $binhQuan: obj.binhQuan,
      $loaiNhaDuocCap: obj.loaiNhaDuocCap,
      $dienTichNhaDuocCap: obj.dienTichNhaDuocCap,
      $loaiNhaDuocMua: obj.loaiNhaDuocMua,
      $dienTichNhaDuocMua: obj.dienTichNhaDuocMua,
      $datDuocCap: obj.datDuocCap,
      $datDuocMua: obj.datDuocMua,
      $hoatDongKinhTe: obj.hoatDongKinhTe,
      $dienTichDatTrangTrai: obj.dienTichDatTrangTrai,
      $soLaoDongThue: obj.soLaoDongThue,
      $taiSanCoGiaTri: obj.taiSanCoGiaTri,
      $giaTriTaiSan: obj.giaTriTaiSan,
      $ngayVaoDangLanHai: obj.ngayVaoDangLanHai,
      $chiBoVaoDangLanHai: obj.chiBoVaoDangLanHai,
      $nguoiGioiThieuMot: obj.nguoiGioiThieuMot,
      $chucVuNguoiGioiThieuMot: obj.chucVuNguoiGioiThieuMot,
      $nguoiGioiThieuHai: obj.nguoiGioiThieuHai,
      $chucVuNguoiGioiThieuHai: obj.chucVuNguoiGioiThieuHai,
      $ngayChinhThucVaoLanHai: obj.ngayChinhThucVaoLanHai,
      $chiBoChinhThucVaoDangLanHai: obj.chiBoChinhThucVaoDangLanHai,
      $kyLuat: obj.kyLuat,
      $thoiGianBiXoa: obj.thoiGianBiXoa,
      $chiBoBiXoa: obj.chiBoBiXoa,
      $quanHeGiaDinh: obj.quanHeGiaDinh,
      $anh3x4: obj.anh3x4,
    };
  }
}
