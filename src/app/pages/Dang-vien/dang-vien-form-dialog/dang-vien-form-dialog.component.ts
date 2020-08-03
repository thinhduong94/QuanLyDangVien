import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from "@angular/material/dialog";
import { DialogData } from "../../ChiBo/daiolog/chibo.daiolog";
import { FormGroup, FormControl, FormBuilder, FormArray } from "@angular/forms";
import { DangVienService } from "src/app/service/dangvien.service";
import { ChiBoService } from "src/app/service/chibo.service";
import * as html2pdf from "html2pdf.js";
import { DangVienPdf } from "../dang-vien-pdf/dang-vien-pdf.component";
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
    private dangVienService: DangVienService,
    private chiboService: ChiBoService,
    public dialog: MatDialog
  ) {}
  fileData: File = null;
  anh3x4: any = null;
  @ViewChild("topdf") toPdf: ElementRef;
  dangVienForm: FormGroup;
  chibos = [];
  danhSachHuyHieu = [
    { value: "30", display: "30 năm" },
    { value: "40", display: "40 năm" },
    { value: "45", display: "45 năm" },
    { value: "50", display: "50 năm" },
    { value: "55", display: "55 năm" },
    { value: "60", display: "60 năm" },
    { value: "65", display: "65 năm" },
    { value: "70", display: "70 năm" },
    { value: "75", display: "75 năm" },
    { value: "80", display: "80 năm" },
    { value: "85", display: "85 năm" },
    { value: "90", display: "90 năm" },
  ];
  ngOnInit() {
    this.initForm();
    this.loadChiBoDropDown();
    this.loadDangVienData();
  }

  loadDangVienData() {
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
          quaTrinhHoatDongVaCongTac: foundDangVien.quaTrinhHoatDongVaCongTac,
          daoTao: foundDangVien.daoTao,
          khenThuong: foundDangVien.khenThuong,
          huyHieu: foundDangVien.huyHieu,
          danhHieu: foundDangVien.danhHieu,
          dacDiemLichSuBanThan: foundDangVien.dacDiemLichSuBanThan,
          quanHeNuocNgoai: foundDangVien.quanHeNuocNgoai,
          chiBoCoSo: foundDangVien.chiBoCoSo,
          chiBo: foundDangVien.chiBo,
          boPhan: foundDangVien.boPhan,
          ngaySinh: foundDangVien.ngaySinh,
          mienCongTacNgay: foundDangVien.mienCongTacNgay,
          ngayKhoiPhucDang: foundDangVien.ngayKhoiPhucDang,
          biXuLyTheoPhapLuat: foundDangVien.biXuLyTheoPhapLuat,
          lamViecTrongCheDoCu: foundDangVien.lamViecTrongCheDoCu,
          daDiNuocNgoai: foundDangVien.daDiNuocNgoai,
          thamGiaToChucNuocNgoai: foundDangVien.thamGiaToChucNuocNgoai,
          coNguoiThanNuocNgoai: foundDangVien.coNguoiThanNuocNgoai,
          tongThuNhap: foundDangVien.tongThuNhap,
          binhQuan: foundDangVien.binhQuan,
          loaiNhaDuocCap: foundDangVien.loaiNhaDuocCap,
          dienTichNhaDuocCap: foundDangVien.dienTichNhaDuocCap,
          loaiNhaDuocMua: foundDangVien.loaiNhaDuocMua,
          dienTichNhaDuocMua: foundDangVien.dienTichNhaDuocMua,
          datDuocCap: foundDangVien.datDuocCap,
          datDuocMua: foundDangVien.datDuocMua,
          hoatDongKinhTe: foundDangVien.hoatDongKinhTe,
          dienTichDatTrangTrai: foundDangVien.dienTichDatTrangTrai,
          soLaoDongThue: foundDangVien.soLaoDongThue,
          taiSanCoGiaTri: foundDangVien.taiSanCoGiaTri,
          giaTriTaiSan: foundDangVien.giaTriTaiSan,
          thoiGianBiXoa: foundDangVien.thoiGianBiXoa,
          chiBoBiXoa: foundDangVien.chiBoBiXoa,
          ngayVaoDangLanHai: foundDangVien.ngayVaoDangLanHai,
          chiBoVaoDangLanHai: foundDangVien.chiBoVaoDangLanHai,
          nguoiGioiThieuMot: foundDangVien.nguoiGioiThieuMot,
          chucVuNguoiGioiThieuMot: foundDangVien.chucVuNguoiGioiThieuMot,
          nguoiGioiThieuHai: foundDangVien.nguoiGioiThieuHai,
          chucVuNguoiGioiThieuHai: foundDangVien.chucVuNguoiGioiThieuHai,
          ngayChinhThucVaoLanHai: foundDangVien.ngayChinhThucVaoLanHai,
          chiBoChinhThucVaoDangLanHai:
            foundDangVien.chiBoChinhThucVaoDangLanHai,
          kyLuat: foundDangVien.kyLuat,
          quanHeGiaDinh: foundDangVien.quanHeGiaDinh,
          ngayQuyetDinhKetNap: foundDangVien.ngayQuyetDinhKetNap,
          giaoDucPhoThong: foundDangVien.giaoDucPhoThong,
          giaoDucNgheNghiep: foundDangVien.giaoDucNgheNghiep,
          giaoDucDaiHocVaSauDaiHoc: foundDangVien.giaoDucDaiHocVaSauDaiHoc,
          hocVi: foundDangVien.hocVi,
          hocHam: foundDangVien.hocHam,
          lyLuanChinhTri: foundDangVien.lyLuanChinhTri,
          ngoaiNgu: foundDangVien.ngoaiNgu,
          tinHoc: foundDangVien.tinHoc,
          canCuocCongDan: foundDangVien.canCuocCongDan,
          nguoiGioiThieuMotLanHai: foundDangVien.nguoiGioiThieuMotLanHai,
          chucVuNguoiGioiThieuMotLanHai:
            foundDangVien.chucVuNguoiGioiThieuMotLanHai,
          nguoiGioiThieuHaiLanHai: foundDangVien.nguoiGioiThieuHaiLanHai,
          chucVuNguoiGioiThieuHaiLanHai:
            foundDangVien.chucVuNguoiGioiThieuHaiLanHai,
          thuongBinhLoai: foundDangVien.thuongBinhLoai,
          giaDinhLietSi: foundDangVien.giaDinhLietSi,
          giaDinhCoCongCachMang: foundDangVien.giaDinhCoCongCachMang,
        });
        this.anh3x4 = foundDangVien.anh3x4;
      });
    }
  }

  initForm() {
    this.dangVienForm = this.fb.group({
      dangBoTinh: new FormControl(""),
      dangBoHuyen: new FormControl(""),
      soLyLich: new FormControl(""),
      soTheDangVien: new FormControl(""),
      tenDangDung: new FormControl(""),
      tenKhaiSinh: new FormControl(""),
      gioiTinh: new FormControl(""),
      noiSinh: new FormControl(""),
      queQuan: new FormControl(""),
      thuongTru: new FormControl(""),
      tamTru: new FormControl(""),
      danToc: new FormControl(""),
      tonGiao: new FormControl(""),
      thanhPhanGiaDinh: new FormControl(""),
      ngheNghiep: new FormControl(""),
      ngayVaoDang: new FormControl(""),
      chiBoVaoDang: new FormControl(""),
      nguoiGioiThieu: new FormControl(""),
      ngayCapThamQuyenVaoDang: new FormControl(""),
      ngayChinhThucVaoDang: new FormControl(""),
      chiBoChinhThucVaoDang: new FormControl(""),
      ngayDuocTuyen: new FormControl(""),
      coQuanTuyenDung: new FormControl(""),
      ngayVaoDoan: new FormControl(""),
      thamGiaToChucXaHoi: new FormControl(""),
      ngayNhapNgu: new FormControl(""),
      ngayXuatNgu: new FormControl(""),
      trinhDo: new FormControl(""),
      tinhTrangSucKhoe: new FormControl(""),
      soCmnd: new FormControl(""),
      quaTrinhHoatDongVaCongTac: new FormControl(""),
      daoTao: new FormControl(""),
      khenThuong: new FormControl(""),
      huyHieu: new FormControl(""),
      danhHieu: new FormControl(""),
      dacDiemLichSuBanThan: new FormControl(""),
      quanHeNuocNgoai: new FormControl(""),
      chiBoCoSo: new FormControl(""),
      chiBo: new FormControl(""),
      boPhan: new FormControl(""),
      ngaySinh: new FormControl(""),
      mienCongTacNgay: new FormControl(""),
      ngayKhoiPhucDang: new FormControl(""),
      biXuLyTheoPhapLuat: new FormControl(""),
      lamViecTrongCheDoCu: new FormControl(""),
      daDiNuocNgoai: new FormControl(""),
      thamGiaToChucNuocNgoai: new FormControl(""),
      coNguoiThanNuocNgoai: new FormControl(""),
      tongThuNhap: new FormControl(""),
      binhQuan: new FormControl(""),
      loaiNhaDuocCap: new FormControl(""),
      dienTichNhaDuocCap: new FormControl(""),
      loaiNhaDuocMua: new FormControl(""),
      dienTichNhaDuocMua: new FormControl(""),
      datDuocCap: new FormControl(""),
      datDuocMua: new FormControl(""),
      hoatDongKinhTe: new FormControl(""),
      dienTichDatTrangTrai: new FormControl(""),
      soLaoDongThue: new FormControl(""),
      taiSanCoGiaTri: new FormControl(""),
      giaTriTaiSan: new FormControl(""),
      quanHeGiaDinh: new FormControl(""),
      thoiGianBiXoa: new FormControl(""),
      chiBoBiXoa: new FormControl(""),
      ngayVaoDangLanHai: new FormControl(""),
      chiBoVaoDangLanHai: new FormControl(""),
      nguoiGioiThieuMot: new FormControl(""),
      chucVuNguoiGioiThieuMot: new FormControl(""),
      nguoiGioiThieuHai: new FormControl(""),
      chucVuNguoiGioiThieuHai: new FormControl(""),
      ngayChinhThucVaoLanHai: new FormControl(""),
      chiBoChinhThucVaoDangLanHai: new FormControl(""),
      kyLuat: new FormControl(""),
      ngayQuyetDinhKetNap: new FormControl(""),
      giaoDucPhoThong: new FormControl(""),
      giaoDucNgheNghiep: new FormControl(""),
      giaoDucDaiHocVaSauDaiHoc: new FormControl(""),
      hocVi: new FormControl(""),
      hocHam: new FormControl(""),
      lyLuanChinhTri: new FormControl(""),
      ngoaiNgu: new FormControl(""),
      tinHoc: new FormControl(""),

      canCuocCongDan: new FormControl(""),
      nguoiGioiThieuMotLanHai: new FormControl(""),
      chucVuNguoiGioiThieuMotLanHai: new FormControl(""),
      nguoiGioiThieuHaiLanHai: new FormControl(""),
      chucVuNguoiGioiThieuHaiLanHai: new FormControl(""),
      thuongBinhLoai: new FormControl(""),
      giaDinhLietSi: new FormControl(""),
      giaDinhCoCongCachMang: new FormControl(""),
    });
  }

  onSaveClick() {
    const dangVienFormValue = this.dangVienForm.value;
    dangVienFormValue.anh3x4 = this.anh3x4;
    console.log("dangVienFormValue", dangVienFormValue);
    if (this.data.id) {
      dangVienFormValue.id = this.data.id;
      this.dangVienService.update(dangVienFormValue).then((response) => {
        this.dialogRef.close();
      });
    } else {
      this.dangVienService.insert(dangVienFormValue).then((response) => {
        this.dialogRef.close();
      });
    }
  }

  loadChiBoDropDown() {
    this.chiboService.getAll().then((result) => {
      this.chibos = result;
    });
  }
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.anh3x4 = reader.result;
    };

    const dialogRef = this.dialog.open(DangVienPdf, {
      data: { dangvien: this.dangVienForm.value },
    });
  }
}
