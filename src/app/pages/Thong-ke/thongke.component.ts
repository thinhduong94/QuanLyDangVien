import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ThongKeService, PhieuDangVienModel, PhieuDangVienOptionModel, SoLieuModel } from 'src/app/service/thongke.service';
import { ExcelService } from 'src/app/service/excel.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SlowBuffer } from 'buffer';
import { ChiBoService } from 'src/app/service/chibo.service';
import { DanhSachKyLuat, DanhSachTinhTrangDangVien , DanhSachXepLoai , XepLoai, DangQuanLi, QuanLy, KhongQuanLy, LyLuanChinhTri, DanToc, DanhSachTinhTrangQuanLy } from 'src/app/const/drop-down-data.const';
@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.css']
})
export class thongkeComponent implements OnInit {
  @ViewChild('phieuDangVienRef', { static: false }) phieuDangVienRef: ElementRef;
  @ViewChild('tkDangVienRefBM2', { static: false }) tkDangVienRefBM2: ElementRef;
  @ViewChild('tkDangVienRefBM3', { static: false }) tkDangVienRefBM3: ElementRef;
  @ViewChild('tkSoLieuDangVienRefBM5', { static: false }) tkSoLieuDangVienRefBM5: ElementRef;
  @ViewChild('tkDsNhanHuyHieuDangRef', { static: false }) tkDsNhanHuyHieuDangRef: ElementRef;
  phieuDangVienModels : PhieuDangVienModel[] = [];
  tkDangVienDangQuanLyModels : PhieuDangVienModel[] = [];
  tkDangVienDangQuanLyDataBM3 : PhieuDangVienModel[] = [];
  tkDangVienDangQuanLyDataBM2 : PhieuDangVienModel[] = []; 
  tkDsNhanHuyHieuDang : PhieuDangVienModel[] = [];  
  phieuDangVienOptionModel = {} as PhieuDangVienOptionModel;
  monthCurrent = new Date().getMonth();
  soLieuModel = {} as SoLieuModel;
  soLieuModels : SoLieuModel[] = [];
  chibos = [];
  tuoiDangTron = [10,15,20,25,30,35,40,45,50,55,60,65,70];
  danhSachKyLuat = [];
  tinhTrangDangVien = [];
  xepLoai = [];
  constructor(
    private thongKeService : ThongKeService,
    private chiBoService : ChiBoService,
    private excelService: ExcelService,
    private fb: FormBuilder
  ){

  }
  ngOnInit(): void {
    this.getPhieuDangVien();
    this.getTkDangVienDangQuanLy();
    this.getSoLieuChiBo();
    this.loadDropDown();
  }
  getPhieuDangVien(){
    this.thongKeService.getPhieuDangVien().then(data=>{
      this.phieuDangVienModels = data;
    })
  }
  getTkDangVienDangQuanLy(){
    const option = {};
    this.thongKeService.getTkDangVienDangQuanLy(option).then(data=>{
      this.caculateTuoiDang(data);
      this.tkDangVienDangQuanLyModels = data;
      this.tkDangVienDangQuanLyDataBM3 = data;
      this.tkDangVienDangQuanLyDataBM2 = data;
      this.tkDsNhanHuyHieuDang = this.filterDsNhanHuyHieuDang(data);
    })
  }
  filterDsNhanHuyHieuDang(ds){
    return ds.filter((item)=>this.tuoiDangTron.includes(item.tuoiDang));
  }
  caculateTuoiDang(data){
    const getAge = (ngayVaoDang) => Math.floor((new Date().getTime() - new Date(ngayVaoDang).getTime()) / 3.15576e+10);
    data.forEach(dv => {
      dv.tuoiDang = getAge(dv.ngayVaoDang);
    });
  }
  phieuDangVien(){
    this.excelService.exportAsExcelFile(null,'phieuDangVien','html',this.phieuDangVienRef.nativeElement);
  }
  tkDangVienBM2(){
    this.excelService.exportAsExcelFile(null,'tkDangVienBM2','html',this.tkDangVienRefBM2.nativeElement);
  }
  tkDangVienBM3(){
    this.excelService.exportAsExcelFile(null,'tkDangVienBM3','html',this.tkDangVienRefBM3.nativeElement);
  }
  tkSoLieuDangVien(){
    this.excelService.exportAsExcelFile(null,'tkSoLieuDangVien','html',this.tkSoLieuDangVienRefBM5.nativeElement);
  }
  tkDanhSachNhanHuyHieuDang(){
    this.excelService.exportAsExcelFile(null,'tkDanhSachNhanHuyHieuDang','html',this.tkDsNhanHuyHieuDangRef.nativeElement);
  }
  chayBaoCaoBM3(){
    let temp = [...this.tkDangVienDangQuanLyDataBM3];
    let option = this.phieuDangVienOptionModel;
    console.log(this.phieuDangVienOptionModel);
    const _temp = temp.filter((item)=>
      ((option.chiBo && option.chiBo !== "") ? option.chiBo === item.chiBo : true) &&
      ((option.gioiTinh && option.gioiTinh !== "") ? option.gioiTinh === item.gioiTinh : true) &&
      ((option.danToc && option.danToc !== "") ? option.danToc === item.danToc : true ) &&
      ((option.kyLuat && option.kyLuat !== "") ? option.kyLuat === item.kyLuat : true)
    );
   this.tkDangVienDangQuanLyModels = _temp;
  }
  chayBaoCaoBM2(){
    const TinhTrangQianlyMappingFunc = (tinhtrang) => tinhtrang === DangQuanLi ? QuanLy : KhongQuanLy;
    let temp = [...this.tkDangVienDangQuanLyDataBM2];
    let option = this.phieuDangVienOptionModel;
    console.log(this.phieuDangVienOptionModel);
    const _temp = temp.filter((item)=>
      ((!option.chiBo || option.chiBo === "") ? true : option.chiBo === item.chiBo) &&
      ((!option.tuoiDang) ? true : option.tuoiDang.toString() === item.tuoiDang.toString()) &&
      ((!option.tinhTrangDangVien || option.tinhTrangDangVien === "") ? true : option.tinhTrangDangVien === TinhTrangQianlyMappingFunc(item.tinhTrangQuanLy)) &&
      ((!option.xepLoaiDangVien || option.xepLoaiDangVien === "") ? true : option.xepLoaiDangVien === item['xepLoaiDangVien'])
    );
   this.tkDangVienDangQuanLyModels = _temp;
  }
  getSoLieuChiBo(){
    this.chiBoService.getAll().then(items=>{
      items.forEach(item=>{
        let soLuongCapUy = 0;
        let nu = 0;
        let danTocKhac = 0;
        let duBi = 0;
        let soLuongDangVien = 0;
        let dangVienDuBi = 0;
        let huyHieuDang = 0;
        let soCap = 0; 
        let trungCap = 0; 
        let caoCap = 0;
        let hoanThanhXuatSac = 0; 
        let hoanThanhTot = 0; 
        let hoanThanh = 0;
        let khongHoanThanh = 0;
        this.tkDangVienDangQuanLyDataBM2.forEach(dv=>{
          if(dv.chiBo == item.maChiBo){
            soLuongDangVien++;
            if(["BT","PBT","CUV"].includes(dv['chucVuDang'])){
              soLuongCapUy++;
            }
            if(dv.gioiTinh === 'Nu'){
              nu++;
            }
            if(dv.danToc !== DanToc.Kinh){
              danTocKhac++;
            }
            if(dv.ngayChinhThucVaoDang === ''){
              dangVienDuBi++;
            }
            if(dv.huyHieu !== ''){
              huyHieuDang++;
            }
            if(dv.lyLuanChinhTri === LyLuanChinhTri.CaoCap){
              caoCap++;
            }
            if(dv.lyLuanChinhTri === LyLuanChinhTri.TrungCap){
              trungCap++;
            }
            if(dv.lyLuanChinhTri === LyLuanChinhTri.SoCap){
              soCap++;
            }
            if(dv['xepLoaiDangVien'] === XepLoai.HoanThanh){
              hoanThanh++;
            }
            if(dv['xepLoaiDangVien'] === XepLoai.HoanThanhTot){
              hoanThanhTot++;
            }
            if(dv['xepLoaiDangVien'] === XepLoai.HoanThanhXuatSac){
              hoanThanhXuatSac++;
            }
            if(dv['xepLoaiDangVien'] === XepLoai.KhongHoanThanh){
              khongHoanThanh++;
            }
          }
        });
        const obj = {} as SoLieuModel;
        obj.chibo = item.tenChiBo;
        obj.danTocKhac = danTocKhac;
        obj.dangVienDuBi = dangVienDuBi;
        obj.dangSo = soLuongDangVien;
        obj.dangVienNhanHuyHieuDang = huyHieuDang;
        obj.duBi = duBi;
        obj.nu = nu;
        obj.soLuongCapUy = soLuongCapUy;
        obj.caoCap = caoCap;
        obj.trungCap = trungCap;
        obj.soCap = soCap;
        obj.hoanThanh = hoanThanh;
        obj.hoanThanhTot = hoanThanhTot;
        obj.hoanThanhXuatSac = hoanThanhXuatSac;
        obj.khongHoanThanh = khongHoanThanh;
        this.soLieuModels.push(obj);
      })
    });
  }
  getTrinhDo(item : PhieuDangVienModel){
    let trinhgDo = [];
    if(item.trinhDo && item.trinhDo !== ""){
      trinhgDo.push(item.trinhDo);
    }
    if(item.hocHam && item.hocHam !== ""){
      trinhgDo.push(item.hocHam);
    }
    if(item.hocVi && item.hocVi !== ""){
      trinhgDo.push(item.hocVi);
    }
    return trinhgDo.join(',');
  }
  loadDropDown() {
    this.danhSachKyLuat = DanhSachKyLuat;
    this.tinhTrangDangVien = DanhSachTinhTrangQuanLy;
    this.xepLoai = DanhSachXepLoai;
    this.chiBoService.getAll().then((result) => {
      this.chibos = result;
      this.chibos.push({
        maChiBo:'',
        tenChiBo:'Chọn tất cả'
      })
    });
  }
}
