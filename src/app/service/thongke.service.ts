import { Injectable } from "@angular/core";
import { TheDb } from "../model/thedb";
import { DangVien } from "../model/dangvien.model";
export interface PhieuDangVienModel {
  tenChiBo : string;
  id: number;
  dangBoTinh: string;
  dangBoHuyen: string;
  soLyLich: string;
  soTheDangVien: string;
  tenDangDung: string;
  tenKhaiSinh: string;
  gioiTinh: string;
  noiSinh: string;
  ngaySinh: string;
  queQuan: string;
  thuongTru: string;
  tamTru: string;
  danToc: string;
  tonGiao: string;
  thanhPhanGiaDinh: string;
  ngheNghiep: string;
  ngayVaoDang: string;
  chiBoVaoDang: string;
  nguoiGioiThieu: string;
  ngayCapThamQuyenVaoDang: string;
  ngayChinhThucVaoDang: string;
  chiBoChinhThucVaoDang: string;
  ngayDuocTuyen: string;
  coQuanTuyenDung: string;
  ngayVaoDoan: string;
  thamGiaToChucXaHoi: string;
  ngayNhapNgu: string;
  ngayXuatNgu: string;
  trinhDo: string;
  tinhTrangSucKhoe: string;
  soCmnd: string;
  quaTrinhHoatDongVaCongTac: string;
  daoTao: string;
  khenThuong: string;
  huyHieu: string;
  danhHieu: string;
  dacDiemLichSuBanThan: string;
  quanHeNuocNgoai: string;
  trangThai: number;
  chiBoCoSo: string;
  chiBo: string;
  boPhan: string;
  mienCongTacNgay: string;
  ngayKhoiPhucDang: string;
  biXuLyTheoPhapLuat: string;
  lamViecTrongCheDoCu: string;
  daDiNuocNgoai: string;
  thamGiaToChucNuocNgoai: string;
  coNguoiThanNuocNgoai: string;
  tongThuNhap: string;
  binhQuan: string;
  loaiNhaDuocCap: string;
  dienTichNhaDuocCap: string;
  loaiNhaDuocMua: string;
  dienTichNhaDuocMua: string;
  datDuocCap: string;
  datDuocMua: string;
  hoatDongKinhTe: string;
  dienTichDatTrangTrai: string;
  soLaoDongThue: string;
  taiSanCoGiaTri: string;
  giaTriTaiSan: string;
  ngayVaoDangLanHai: string;
  chiBoVaoDangLanHai: string;
  nguoiGioiThieuMot: string;
  chucVuNguoiGioiThieuMot: string;
  nguoiGioiThieuHai: string;
  chucVuNguoiGioiThieuHai: string;
  ngayChinhThucVaoLanHai: string;
  chiBoChinhThucVaoDangLanHai: string;
  kyLuat: string;
  thoiGianBiXoa: string;
  chiBoBiXoa: string;
  quanHeGiaDinh: string;
  ngayQuyetDinhKetNap: string;
  giaoDucPhoThong: string;
  giaoDucNgheNghiep: string;
  giaoDucDaiHocVaSauDaiHoc: string;
  hocVi: string;
  hocHam: string;
  lyLuanChinhTri: string;
  ngoaiNgu: string;
  tinHoc: string;
  tuoiDang: number;
  ghiChu:string;
}
export interface PhieuDangVienOptionModel {
  chiBo: string;
  kyLuat: string;
  trinhDoChuyenMon: string;
  trinhDoChinhTri:string;
  gioiTinh:string;
  danToc:string;
  tuoiDang:number;
  tinhTrangDangVien:string;
  xepLoaiDangVien:string;
}
export interface SoLieuModel {
  chibo:string;
  soLuongCapUy:number;
  dangSo:number;
  nu:number;
  danTocKhac:number;
  duBi:number;
  mienSinhHoat:number;
  sinhHoatTam:number;
  dangVienDuBi:number;
  dangVienNhanHuyHieuDang:number;
  xuatSac:number;
  tot:number;
  hoanThanh:number;
  khongHoanThanh:number;
  soCap:number;
  trungCap:number;
  caoCap:number;
}
@Injectable({
  providedIn: "root",
})
export class ThongKeService {

  public getPhieuDangVien(): Promise<PhieuDangVienModel[]> {
    const sql = `SELECT 
    chibo.tenChiBo  ,
    dangvien.*
    FROM dangvien JOIN chibo ON dangvien.chiBo = chiBo.maChiBo
    WHERE dangvien.trangThai = 0`;
    const values = {};

    return TheDb.selectAll(sql, values).then((rows) => {
      const models: PhieuDangVienModel[] = [];
      for (const row of rows) {
        const dangvien = new ThongKeService().fromRowPhieuDangVien(row);
        models.push(dangvien);
      }
      return models;
    });
  }

  public getTkDangVienDangQuanLy(option:any): Promise<PhieuDangVienModel[]> {
    const sql = `SELECT 
    chibo.tenChiBo,
    dangvien.*
    FROM dangvien JOIN chibo ON dangvien.chiBo = chiBo.maChiBo
    WHERE dangvien.trangThai = 0`;
    const values = {};

    return TheDb.selectAll(sql, values).then((rows) => {
      const models: PhieuDangVienModel[] = [];
      for (const row of rows) {
        const dangvien = new ThongKeService().fromRowPhieuDangVien(row);
        models.push(dangvien);
      }
      return models;
    });
  }

  public fromRowPhieuDangVien(row: object): any {
    const obj = row as PhieuDangVienModel;
    return obj;
  }
}
