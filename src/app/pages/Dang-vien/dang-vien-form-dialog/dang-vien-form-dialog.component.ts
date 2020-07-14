import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogData } from "../../ChiBo/daiolog/chibo.daiolog";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { DangVienService } from "src/app/service/dangvien.service";

@Component({
  selector: "dang-vien-form-dialog",
  templateUrl: "dang-vien-form-dialog.component.html",
  styleUrls: ["dang-vien-form-dialog.component.scss"],
})
export class DangVienFormDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DangVienFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public fb: FormBuilder,
    private dangVienService: DangVienService
  ) {}
  isUpdate = false;
  dangBoTinh = new FormControl("");
  dangBoHuyen = new FormControl("");
  soLyLich = new FormControl("");
  soTheDangVien = new FormControl("");
  tenDangDung = new FormControl("");
  tenKhaiSinh = new FormControl("");
  gioiTinh = new FormControl("");
  noiSinh = new FormControl("");
  ngaySinh = new FormControl("");
  queQuan = new FormControl("");
  thuongTru = new FormControl("");
  tamTru = new FormControl("");
  danToc = new FormControl("");
  tonGiao = new FormControl("");
  thanhPhanGiaDinh = new FormControl("");
  ngheNghiep = new FormControl("");
  ngayVaoDang = new FormControl("");
  chiBoVaoDang = new FormControl("");
  nguoiGioiThieu = new FormControl("");
  ngayCapThamQuyenVaoDang = new FormControl("");
  ngayChinhThucVaoDang = new FormControl("");
  chiBoChinhThucVaoDang = new FormControl("");
  ngayDuocTuyen = new FormControl("");
  coQuanTuyenDung = new FormControl("");
  ngayVaoDoan = new FormControl("");
  thamGiaToChucXaHoi = new FormControl("");
  ngayNhapNgu = new FormControl("");
  ngayXuatNgu = new FormControl("");
  trinhDo = new FormControl("");
  tinhTrangSucKhoe = new FormControl("");
  soCmnd = new FormControl("");
  quaTringHoatDongVaCongTac = new FormControl("");
  daoTao = new FormControl("");
  khenThuong = new FormControl("");
  huyHieu = new FormControl("");
  danhHieu = new FormControl("");
  dacDiemLichSuBanThan = new FormControl("");
  quanHeNuocNgoai = new FormControl("");
  trangThai = new FormControl("");
  dangVienForm: FormGroup;
  ngOnInit() {
    this.initForm();
    if (this.data.id) {
      this.dangVienService.get(this.data.id).then((foundDangVien) => {
        this.dangVienForm.patchValue({
          dangBoTinh: foundDangVien.dangBoTinh,
          dangBoHuyen: foundDangVien.dangBoHuyen,
          soLyLich: foundDangVien.soLyLich,
          soTheDangVien: foundDangVien.soTheDangVien,
          tenDangDung: foundDangVien.tenDangDung,
          tenKhaiSinh: foundDangVien.tenKhaiSinh,
          gioiTinh: foundDangVien.gioiTinh,
          noiSinh: foundDangVien.noiSinh,
          queQuan: foundDangVien.queQuan,
          thuongTru: foundDangVien.thuongTru,
          tamTru: foundDangVien.tamTru,
          danToc: foundDangVien.danToc,
          tonGiao: foundDangVien.tonGiao,
          thanhPhanGiaDinh: foundDangVien.thanhPhanGiaDinh,
          ngheNghiep: foundDangVien.ngheNghiep,
          ngayVaoDang: foundDangVien.ngayVaoDang,
          chiBoVaoDang: foundDangVien.chiBoVaoDang,
          nguoiGioiThieu: foundDangVien.nguoiGioiThieu,
          ngayCapThamQuyenVaoDang: foundDangVien.ngayCapThamQuyenVaoDang,
          ngayChinhThucVaoDang: foundDangVien.ngayChinhThucVaoDang,
          chiBoChinhThucVaoDang: foundDangVien.chiBoChinhThucVaoDang,
          ngayDuocTuyen: foundDangVien.ngayDuocTuyen,
          coQuanTuyenDung: foundDangVien.coQuanTuyenDung,
          ngayVaoDoan: foundDangVien.ngayVaoDoan,
          thamGiaToChucXaHoi: foundDangVien.thamGiaToChucXaHoi,
          ngayNhapNgu: foundDangVien.ngayNhapNgu,
          ngayXuatNgu: foundDangVien.ngayXuatNgu,
          trinhDo: foundDangVien.trinhDo,
          tinhTrangSucKhoe: foundDangVien.tinhTrangSucKhoe,
          soCmnd: foundDangVien.soCmnd,
          quaTringHoatDongVaCongTac: foundDangVien.quaTringHoatDongVaCongTac,
          daoTao: foundDangVien.daoTao,
          khenThuong: foundDangVien.khenThuong,
          huyHieu: foundDangVien.huyHieu,
          danhHieu: foundDangVien.danhHieu,
          dacDiemLichSuBanThan: foundDangVien.dacDiemLichSuBanThan,
          quanHeNuocNgoai: foundDangVien.quanHeNuocNgoai,
          trangThai: foundDangVien.trangThai,
        });
      });
    }
  }

  initForm() {
    this.dangVienForm = this.fb.group({
      dangBoTinh: this.dangBoTinh,
      dangBoHuyen: this.dangBoHuyen,
      soLyLich: this.soLyLich,
      soTheDangVien: this.soTheDangVien,
      tenDangDung: this.tenDangDung,
      tenKhaiSinh: this.tenKhaiSinh,
      gioiTinh: this.gioiTinh,
      noiSinh: this.noiSinh,
      queQuan: this.queQuan,
      thuongTru: this.thuongTru,
      tamTru: this.tamTru,
      danToc: this.danToc,
      tonGiao: this.tonGiao,
      thanhPhanGiaDinh: this.thanhPhanGiaDinh,
      ngheNghiep: this.ngheNghiep,
      ngayVaoDang: this.ngayVaoDang,
      chiBoVaoDang: this.chiBoVaoDang,
      nguoiGioiThieu: this.nguoiGioiThieu,
      ngayCapThamQuyenVaoDang: this.ngayCapThamQuyenVaoDang,
      ngayChinhThucVaoDang: this.ngayChinhThucVaoDang,
      chiBoChinhThucVaoDang: this.chiBoChinhThucVaoDang,
      ngayDuocTuyen: this.ngayDuocTuyen,
      coQuanTuyenDung: this.coQuanTuyenDung,
      ngayVaoDoan: this.ngayVaoDoan,
      thamGiaToChucXaHoi: this.thamGiaToChucXaHoi,
      ngayNhapNgu: this.ngayNhapNgu,
      ngayXuatNgu: this.ngayXuatNgu,
      trinhDo: this.trinhDo,
      tinhTrangSucKhoe: this.tinhTrangSucKhoe,
      soCmnd: this.soCmnd,
      quaTringHoatDongVaCongTac: this.quaTringHoatDongVaCongTac,
      daoTao: this.daoTao,
      khenThuong: this.khenThuong,
      huyHieu: this.huyHieu,
      danhHieu: this.danhHieu,
      dacDiemLichSuBanThan: this.dacDiemLichSuBanThan,
      quanHeNuocNgoai: this.quanHeNuocNgoai,
      trangThai: this.trangThai,
    });
  }

  onSaveClick() {
    const dangVienFormValue = this.dangVienForm.value;
    console.log("dangVienFormValue", dangVienFormValue);
    if (this.data.id) {
      dangVienFormValue.id = this.data.id;
      this.dangVienService.update(dangVienFormValue).then((response) => {
        console.log("response", response);
        this.dialogRef.close();
      });
    } else {
      this.dangVienService.insert(dangVienFormValue).then((response) => {
        console.log("response", response);
        this.dialogRef.close();
      });
    }
  }
}
