import { Injectable } from "@angular/core";
import { TheDb } from "../model/thedb";
import { DangVienModel } from "../model/dangvien.model";

@Injectable({
  providedIn: "root",
})
export class DangVienService {
  public getBySoTheDangVien(soTheDangVien: number): Promise<DangVienModel> {
    const sql = "SELECT * FROM dangvien WHERE soTheDangVien = $soTheDangVien";
    const values = { $soTheDangVien: soTheDangVien };

    return TheDb.selectOne(sql, values).then((row) => {
      if (row) {
        return new DangVienService().fromRow(row);
      }
    });
  }

  public get(id: number): Promise<DangVienModel> {
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

  public getByChiBo(chiBo: string): Promise<DangVienModel[]> {
    const sql = "SELECT * FROM dangvien WHERE chiBo = $chiBo";
    const values = { $chiBo: chiBo };

    return TheDb.selectAll(sql, values).then((rows) => {
      const dangviens: DangVienModel[] = [];
      for (const row of rows) {
        const dangvien = new DangVienService().fromRow(row);
        dangviens.push(dangvien);
      }
      return dangviens;
    });
  }
  public getAll(): Promise<DangVienModel[]> {
    const sql = `SELECT * FROM dangvien where trangThai = 0`;
    const values = {};

    return TheDb.selectAll(sql, values).then((rows) => {
      const chibos: DangVienModel[] = [];
      for (const row of rows) {
        const dangvien = new DangVienService().fromRow(row);
        chibos.push(dangvien);
      }
      return chibos;
    });
  }

  public insert(obj: DangVienModel): Promise<void> {
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
        chiBoKhoiPhucDang,
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
        anh3x4,
        ngayQuyetDinhKetNap,
        giaoDucPhoThong,
        giaoDucNgheNghiep,
        giaoDucDaiHocVaSauDaiHoc,
        hocVi,
        hocHam,
        lyLuanChinhTri,
        ngoaiNgu,
        tinHoc,
        canCuocCongDan,
        nguoiGioiThieuMotLanHai,
        chucVuNguoiGioiThieuMotLanHai,
        nguoiGioiThieuHaiLanHai,
        chucVuNguoiGioiThieuHaiLanHai,
        thuongBinhLoai,
        giaDinhLietSi,
        giaDinhCoCongCachMang,
        tinhTrangQuanLy,
        trangThai,
        ngayKyLuat,
        ngayChuyenTinhTrangQuanLy)

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
          $chiBoKhoiPhucDang,
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
          $anh3x4,
          $ngayQuyetDinhKetNap,
          $giaoDucPhoThong,
          $giaoDucNgheNghiep,
          $giaoDucDaiHocVaSauDaiHoc,
          $hocVi,
          $hocHam,
          $lyLuanChinhTri,
          $ngoaiNgu,
          $tinHoc,
          $canCuocCongDan,
          $nguoiGioiThieuMotLanHai,
          $chucVuNguoiGioiThieuMotLanHai,
          $nguoiGioiThieuHaiLanHai,
          $chucVuNguoiGioiThieuHaiLanHai,
          $thuongBinhLoai,
          $giaDinhLietSi,
          $giaDinhCoCongCachMang,
          $tinhTrangQuanLy,
          $trangThai,
          $ngayKyLuat,
          $ngayChuyenTinhTrangQuanLy)`;

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
      $chiBoKhoiPhucDang: obj.chiBoKhoiPhucDang,
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
      $ngayQuyetDinhKetNap: obj.ngayQuyetDinhKetNap,
      $giaoDucPhoThong: obj.giaoDucPhoThong,
      $giaoDucNgheNghiep: obj.giaoDucNgheNghiep,
      $giaoDucDaiHocVaSauDaiHoc: obj.giaoDucDaiHocVaSauDaiHoc,
      $hocVi: obj.hocVi,
      $hocHam: obj.hocHam,
      $lyLuanChinhTri: obj.lyLuanChinhTri,
      $ngoaiNgu: obj.ngoaiNgu,
      $tinHoc: obj.tinHoc,
      $canCuocCongDan: obj.canCuocCongDan,
      $nguoiGioiThieuMotLanHai: obj.nguoiGioiThieuMotLanHai,
      $chucVuNguoiGioiThieuMotLanHai: obj.chucVuNguoiGioiThieuMotLanHai,
      $nguoiGioiThieuHaiLanHai: obj.nguoiGioiThieuHaiLanHai,
      $chucVuNguoiGioiThieuHaiLanHai: obj.chucVuNguoiGioiThieuHaiLanHai,
      $thuongBinhLoai: obj.thuongBinhLoai,
      $giaDinhLietSi: obj.giaDinhLietSi,
      $giaDinhCoCongCachMang: obj.giaDinhCoCongCachMang,
      $tinhTrangQuanLy: obj.tinhTrangQuanLy,
      $trangThai: 0,
      $anh3x4: obj.anh3x4,
      $ngayKyLuat: obj.ngayKyLuat,
      $ngayChuyenTinhTrangQuanLy: obj.ngayChuyenTinhTrangQuanLy,
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

  public update(obj: DangVienModel): Promise<void> {
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
        chiBoKhoiPhucDang = $chiBoKhoiPhucDang,
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
        anh3x4 = $anh3x4,
        ngayQuyetDinhKetNap = $ngayQuyetDinhKetNap,
        giaoDucPhoThong = $giaoDucPhoThong,
        giaoDucNgheNghiep = $giaoDucNgheNghiep,
        giaoDucDaiHocVaSauDaiHoc = $giaoDucDaiHocVaSauDaiHoc,
        hocVi = $hocVi,
        hocHam = $hocHam,
        lyLuanChinhTri = $lyLuanChinhTri,
        ngoaiNgu = $ngoaiNgu,
        tinHoc = $tinHoc,
        canCuocCongDan = $canCuocCongDan,
        nguoiGioiThieuMotLanHai = $nguoiGioiThieuMotLanHai,
        chucVuNguoiGioiThieuMotLanHai=  $chucVuNguoiGioiThieuMotLanHai,
        nguoiGioiThieuHaiLanHai=  $nguoiGioiThieuHaiLanHai,
        chucVuNguoiGioiThieuHaiLanHai=  $chucVuNguoiGioiThieuHaiLanHai,
        thuongBinhLoai = $thuongBinhLoai,
        giaDinhLietSi = $giaDinhLietSi,
        giaDinhCoCongCachMang = $giaDinhCoCongCachMang,
        tinhTrangQuanLy = $tinhTrangQuanLy,
        ngayKyLuat = $ngayKyLuat,
        ngayChuyenTinhTrangQuanLy = $ngayChuyenTinhTrangQuanLy
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

  public fromRow(row: object): DangVienModel {
    const obj = row as DangVienModel;
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
      $chiBoKhoiPhucDang: obj.chiBoKhoiPhucDang,
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
      $ngayQuyetDinhKetNap: obj.ngayQuyetDinhKetNap,
      $giaoDucPhoThong: obj.giaoDucPhoThong,
      $giaoDucNgheNghiep: obj.giaoDucNgheNghiep,
      $giaoDucDaiHocVaSauDaiHoc: obj.giaoDucDaiHocVaSauDaiHoc,
      $hocVi: obj.hocVi,
      $hocHam: obj.hocHam,
      $lyLuanChinhTri: obj.lyLuanChinhTri,
      $ngoaiNgu: obj.ngoaiNgu,
      $tinHoc: obj.tinHoc,
      $canCuocCongDan: obj.canCuocCongDan,
      $nguoiGioiThieuMotLanHai: obj.nguoiGioiThieuMotLanHai,
      $chucVuNguoiGioiThieuMotLanHai: obj.chucVuNguoiGioiThieuMotLanHai,
      $nguoiGioiThieuHaiLanHai: obj.nguoiGioiThieuHaiLanHai,
      $chucVuNguoiGioiThieuHaiLanHai: obj.chucVuNguoiGioiThieuHaiLanHai,
      $thuongBinhLoai: obj.thuongBinhLoai,
      $giaDinhLietSi: obj.giaDinhLietSi,
      $giaDinhCoCongCachMang: obj.giaDinhCoCongCachMang,
      $tinhTrangQuanLy: obj.tinhTrangQuanLy,
      $ngayKyLuat: obj.ngayKyLuat,
      $ngayChuyenTinhTrangQuanLy: obj.ngayChuyenTinhTrangQuanLy,
    };
  }
}
