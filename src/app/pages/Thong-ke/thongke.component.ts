import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ThongKeService, PhieuDangVienModel, PhieuDangVienOptionModel, SoLieuModel } from 'src/app/service/thongke.service';
import { ExcelService } from 'src/app/service/excel.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SlowBuffer } from 'buffer';
import { ChiBoService } from 'src/app/service/chibo.service';
import { DanhSachKyLuat, DanhSachTinhTrangDangVien , DanhSachXepLoai , XepLoai, DangQuanLi, QuanLy, KhongQuanLy, LyLuanChinhTri, DanToc, DanhSachTinhTrangQuanLy, DotTangHuyHieuDang, GioiTinh, DanhSachGioiTinh, DanhSachDanToc, DanhSachLyLuanChinhTri } from 'src/app/const/drop-down-data.const';
import { DanhGiaService } from 'src/app/service/danhgia.service';
import { forkJoin } from 'rxjs';
import { DanhGiaModel } from 'src/app/model/danhgia.model';
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
  @ViewChild('tkXepLoaiDangVienRef', { static: false }) tkXepLoaiDangVienRef: ElementRef;
  @ViewChild('tkSoXepLoaiChiBoRef', { static: false }) tkSoXepLoaiChiBoRef: ElementRef;
  phieuDangVienModels : PhieuDangVienModel[] = [];
  tkDangVienDangQuanLyModels : PhieuDangVienModel[] = [];
  tkDangVienDangQuanLyDataBM3 : PhieuDangVienModel[] = [];
  tkDangVienDangQuanLyDataBM2 : PhieuDangVienModel[] = []; 
  tkDangVienDangQuanLyDataBM1 : PhieuDangVienModel[] = []; 
  tkDsNhanHuyHieuDang : PhieuDangVienModel[] = [];  
  phieuDangVienOptionModel = {} as PhieuDangVienOptionModel;
  monthCurrent = new Date().getMonth();
  soLieuModel = {} as SoLieuModel;
  soLieuModels : SoLieuModel[] = [];
  xepLoaiChiBoData : SoLieuModel[] = [];
  tkXepLoaiDangVienData : PhieuDangVienModel[] = []; 
  xepLoaiChiBoDataOriginal : SoLieuModel[] = [];
  tkXepLoaiDangVienDataOriginal : PhieuDangVienModel[] = []; 
  chibos = [];
  tuoiDangTron = [10,15,20,25,30,35,40,45,50,55,60,65,70];
  danhSachKyLuat = [];
  tinhTrangDangVien = [];
  xepLoai = [];
  dotTangHuyHieuDang = [];
  gioiTinh = [];
  nam =[];
  displayChiBoText = '';
  displayKyLuatText = '';
  displayTinhTrangDangVienText = '';
  displayXepLoaiDangVienText = '';
  displayGioiTinhText = '';
  gioiTinhNam = GioiTinh.Nam;
  gioiTinhNu = GioiTinh.Nu;
  constructor(
    private thongKeService : ThongKeService,
    private chiBoService : ChiBoService,
    private excelService: ExcelService,
    private fb: FormBuilder,
    private danhGiaService: DanhGiaService
  ){

  }
  ngOnInit(): void {
    this.phieuDangVienOptionModel.nam = new Date().getFullYear().toString();
    this.getPhieuDangVien();
    this.getTkDangVienDangQuanLy();
    this.loadDropDown();
  }
  getPhieuDangVien(){
    this.thongKeService.getPhieuDangVien().then(data=>{
      this.phieuDangVienModels = data;
    })
  }
  getTkDangVienDangQuanLy(){
    const option = {};
    this.thongKeService.getTkDangVienDangQuanLy(option).then(dangvien=>{
      this.danhGiaService.getAll().then(danhgia=>{
        this.caculateTuoiDang(dangvien);
        this.megreDangGiaWithDangVien(dangvien,danhgia);
        this.tkDangVienDangQuanLyModels = dangvien;
        this.tkDangVienDangQuanLyDataBM3 = dangvien;
        this.tkDangVienDangQuanLyDataBM2 = dangvien;
        this.tkDangVienDangQuanLyDataBM1 = dangvien;
        this.tkDsNhanHuyHieuDang = dangvien;
        this.tkXepLoaiDangVienDataOriginal = dangvien;
        this.tkXepLoaiDangVienData = [...this.tkXepLoaiDangVienDataOriginal];
        this.getSoLieuChiBo(danhgia);
      });
    })
  }
  megreDangGiaWithDangVien(dangvien : Array<PhieuDangVienModel> ,danhgia : Array<DanhGiaModel>){
    dangvien.forEach(dv => {
      const xepLoaiDv = danhgia.find(dg=>dg.soTheDangVien === dv.soTheDangVien && dg.namDanhGia === this.phieuDangVienOptionModel.nam) || {} as DanhGiaModel;
      dv.xepLoai = xepLoaiDv.danhGia;
      dv.namXepLoai = xepLoaiDv.namDanhGia;
    });
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
  tkXepLoaiChiBo(){
    this.excelService.exportAsExcelFile(null,'tkXepLoaiChiBo','html',this.tkXepLoaiDangVienRef.nativeElement);
  }
  tkXepLoaiDangVien(){
    this.excelService.exportAsExcelFile(null,'tkXepLoaiDangVien','html',this.tkXepLoaiDangVienRef.nativeElement);
  }
  chayXepLoaiDangVien(){
    let temp = [...this.tkXepLoaiDangVienDataOriginal];
    let option = this.phieuDangVienOptionModel;
    console.log(this.phieuDangVienOptionModel);
    const _temp = temp.filter((item)=>
      ((!option.chiBo || option.chiBo === "") ? true : option.chiBo === item.chiBo) &&
      ((!option.nam || option.nam === "") ? true : option.nam == item.namXepLoai) &&
      ((!option.xepLoaiDangVien || option.xepLoaiDangVien === "") ? true : option.xepLoaiDangVien === item.xepLoai)
    );
   this.tkXepLoaiDangVienData = _temp;
  }
  chayXepLoaiChiBo(){
    let temp = [...this.xepLoaiChiBoDataOriginal];
    let option = this.phieuDangVienOptionModel;
    console.log(this.phieuDangVienOptionModel);
    const _temp = temp.filter((item)=>
      ((!option.chiBo || option.chiBo === "") ? true : option.chiBo === item.maChiBo) &&
      ((!option.nam || option.nam === "") ? true : option.nam == item.namXepLoai) &&
      ((!option.xepLoaiDangVien || option.xepLoaiDangVien === "") ? true : option.xepLoaiDangVien === item.xepLoai)
    );
   this.xepLoaiChiBoData = _temp;
  }
  chayBaoCaoBM3(){
    let temp = [...this.tkDangVienDangQuanLyModels];
    let option = this.phieuDangVienOptionModel;
    console.log(this.phieuDangVienOptionModel);
    const _temp = temp.filter((item)=>
      ((option.chiBo && option.chiBo !== "") ? option.chiBo === item.chiBo : true) &&
      ((option.gioiTinh && option.gioiTinh !== "") ? option.gioiTinh === item.gioiTinh : true) &&
      ((option.danToc && option.danToc !== "") ? option.danToc === item.danToc : true ) &&
      ((option.kyLuat && option.kyLuat !== "") ? option.kyLuat === item.kyLuat : true)
    );
   this.tkDangVienDangQuanLyDataBM3 = _temp;
  }
  chayBaoCaoBM2(){
    const TinhTrangQianlyMappingFunc = (tinhtrang) => tinhtrang === DangQuanLi ? QuanLy : KhongQuanLy;
    let temp = [...this.tkDangVienDangQuanLyModels];
    let option = this.phieuDangVienOptionModel;
    console.log(this.phieuDangVienOptionModel);
    const _temp = temp.filter((item)=>
      ((!option.chiBo || option.chiBo === "") ? true : option.chiBo === item.chiBo) &&
      ((!option.tuoiDang) ? true : option.tuoiDang.toString() === item.tuoiDang.toString()) &&
      ((!option.tinhTrangDangVien || option.tinhTrangDangVien === "") ? true : option.tinhTrangDangVien === TinhTrangQianlyMappingFunc(item.tinhTrangQuanLy)) &&
      ((!option.xepLoaiDangVien || option.xepLoaiDangVien === "") ? true : option.xepLoaiDangVien === item.xepLoai)
    );
   this.tkDangVienDangQuanLyDataBM2 = _temp;
  }
  chayBaoCaoBM1(){
    const TinhTrangQianlyMappingFunc = (tinhtrang) => tinhtrang === DangQuanLi ? QuanLy : KhongQuanLy;
    let temp = [...this.tkDangVienDangQuanLyModels];
    let option = this.phieuDangVienOptionModel;
    console.log(this.phieuDangVienOptionModel);
    const _temp = temp.filter((item)=>
      ((!option.chiBo || option.chiBo === "") ? true : option.chiBo === item.chiBo) &&
      ((!option.tuoiDang) ? true : option.tuoiDang.toString() === item.tuoiDang.toString()) &&
      ((!option.tinhTrangDangVien || option.tinhTrangDangVien === "") ? true : option.tinhTrangDangVien === TinhTrangQianlyMappingFunc(item.tinhTrangQuanLy)) &&
      ((!option.xepLoaiDangVien || option.xepLoaiDangVien === "") ? true : option.xepLoaiDangVien === item.xepLoai)
    );
   this.tkDangVienDangQuanLyDataBM1 = _temp;
  }
  chayBaoCaoDanhHieuDang(){
    let temp = [...this.tkDangVienDangQuanLyModels];
    let option = this.phieuDangVienOptionModel;
    let date = `${option.dot}/${option.nam}`;
    const _temp = [];
    if(option.dot !== "" && option.nam !== ""){
      const getAge = (ngayVaoDang) => Math.floor((new Date(date).getTime() - new Date(ngayVaoDang).getTime()) / 3.15576e+10);
      temp.forEach(dv=>{
        dv.tuoiDang = getAge(dv.ngayVaoDang).toString();
        if(dv.tuoiDang !== dv.huyHieu && this.tuoiDangTron.includes(Number.parseInt(dv.tuoiDang))){
          _temp.push(dv);
        }
      });
    }
    this.tkDsNhanHuyHieuDang = _temp;
  }
  getSoLieuChiBo(danhgia){
    this.chiBoService.getAll().then(items=>{
      items.forEach(item=>{
        const xepLoaiCb = danhgia.find(dg=>dg.maChiBo === item.maChiBo && dg.namDanhGia === this.phieuDangVienOptionModel.nam) || {} as DanhGiaModel;
        let xepLoai = xepLoaiCb.danhGia;
        let namXepLoai = xepLoaiCb.namDanhGia;
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
            if(!dv.ngayChinhThucVaoDang || dv.ngayChinhThucVaoDang === ''){
              dangVienDuBi++;
            }
            if(dv.huyHieu && dv.huyHieu !== ''){
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
            if(dv.xepLoai === XepLoai.HoanThanh){
              hoanThanh++;
            }
            if(dv.xepLoai === XepLoai.HoanThanhTot){
              hoanThanhTot++;
            }
            if(dv.xepLoai === XepLoai.HoanThanhXuatSac){
              hoanThanhXuatSac++;
            }
            if(dv.xepLoai === XepLoai.KhongHoanThanh){
              khongHoanThanh++;
            }
          }
        });
        const obj = {} as SoLieuModel;
        obj.maChiBo = item.maChiBo;
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
        obj.xepLoai = xepLoai;
        obj.namXepLoai = namXepLoai;
        this.soLieuModels.push(obj);
        this.xepLoaiChiBoDataOriginal.push(obj);
        this.xepLoaiChiBoData.push(obj);
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
    this.tinhTrangDangVien = DanhSachTinhTrangDangVien;
    this.xepLoai = DanhSachXepLoai;
    this.dotTangHuyHieuDang = DotTangHuyHieuDang;
    this.gioiTinh = DanhSachGioiTinh;
    this.nam = this.createArrayYear();
    this.chiBoService.getAll().then((result) => {
      this.chibos = result;
      this.chibos.push({
        maChiBo:'',
        tenChiBo:'Chọn tất cả'
      })
    });
  }
  createArrayYear (){
    let start = 1900;
    let duration = 1000;
    let array = [];
    for(let i = 0;i<duration;i++){
      start++;
      const text = start.toString();
      array.push(text);
    }
    return array;
  }
  selectChiBo(){
    this.displayChiBoText = this.chibos.find(item=>item.maChiBo === this.phieuDangVienOptionModel.chiBo)?.tenChiBo || '';
  }
  selectKyLuat(){
    this.displayKyLuatText = this.danhSachKyLuat.find(item=>item.value === this.phieuDangVienOptionModel.kyLuat)?.display || '';
  }
  selectTinhTrangDangVien(){
    this.displayTinhTrangDangVienText = this.tinhTrangDangVien.find(item => item.value === this.phieuDangVienOptionModel.tinhTrangDangVien)?.display || '';
  }
  selectXepLoaiDangVien(){
    this.displayXepLoaiDangVienText = this.xepLoai.find(item => item.value === this.phieuDangVienOptionModel.xepLoaiDangVien)?.display || '';
  }
  selectGioiTinh(){
    this.displayGioiTinhText = this.gioiTinh.find(item => item.value === this.phieuDangVienOptionModel.gioiTinh)?.display || '';
  }
  isQuanLy(tinhtrang:string){
    return tinhtrang === DangQuanLi ? true : false;
  }
  getTextXepLoai(xepLoai:string){
    return this.xepLoai.find(item => item.value === xepLoai)?.display || '';
  }
  getTextKyLuat(kyLuat:string){
    return this.danhSachKyLuat.find(item=>item.value == kyLuat)?.display || '';
  }
  getTextGioiTinh(gioTinh:string){
    return this.gioiTinh.find(item=>item.value === gioTinh)?.display || '';
  }
  getTextDanToc(danToc:string){
    return DanhSachDanToc.find(item=>item.value === danToc)?.display || '';
  }
  getTextLyLuanChinhTri(lyLuan:string){
    return DanhSachLyLuanChinhTri.find(item=>item.value === lyLuan)?.display || '';
  }
  getTextTinhTrangQuanLy(tinhTrang:string){
    return DanhSachTinhTrangQuanLy.find(item=>item.value === tinhTrang)?.display || '';
  }
}
