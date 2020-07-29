import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ThongKeService, PhieuDangVienModel, PhieuDangVienOptionModel, SoLieuModel } from 'src/app/service/thongke.service';
import { ExcelService } from 'src/app/service/excel.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SlowBuffer } from 'buffer';
import { ChiBoService } from 'src/app/service/chibo.service';
@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.css']
})
export class thongkeComponent implements OnInit {
  @ViewChild('phieuDangVienRef', { static: false }) phieuDangVienRef: ElementRef;
  @ViewChild('tkDangVienRefBM2', { static: false }) tkDangVienRefBM2: ElementRef;
  @ViewChild('tkDangVienRefBM3', { static: false }) tkDangVienRefBM3: ElementRef;
  phieuDangVienModels : PhieuDangVienModel[] = [];
  tkDangVienDangQuanLyModels : PhieuDangVienModel[] = [];
  tkDangVienDangQuanLyDataBM3 : PhieuDangVienModel[] = [];
  tkDangVienDangQuanLyDataBM2 : PhieuDangVienModel[] = [];  
  phieuDangVienOptionModel = {} as PhieuDangVienOptionModel;
  soLieuModel = {} as SoLieuModel;
  soLieuModels : SoLieuModel[] = [];
  constructor(
    private thongKeService : ThongKeService,
    private chiBoService : ChiBoService,
    private excelService: ExcelService,
    public fb: FormBuilder,
  ){

  }
  ngOnInit(): void {
    this.getPhieuDangVien();
    this.getTkDangVienDangQuanLy();
  }
  getPhieuDangVien(){
    this.thongKeService.getPhieuDangVien().then(data=>{
      this.phieuDangVienModels = data;
    })
  }
  getTkDangVienDangQuanLy(){
    const option = {};
    this.thongKeService.getTkDangVienDangQuanLy(option).then(data=>{
      this.tkDangVienDangQuanLyModels = data;
      this.tkDangVienDangQuanLyDataBM3 = data;
      this.tkDangVienDangQuanLyDataBM2 = data;
    })
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
    let temp = [...this.tkDangVienDangQuanLyDataBM2];
    let option = this.phieuDangVienOptionModel;
    console.log(this.phieuDangVienOptionModel);
    const _temp = temp.filter((item)=>
      ((!option.chiBo || option.chiBo === "") ? true : option.chiBo === item.chiBo) &&
      ((!option.tuoiDang || option.tuoiDang === "") ? true : option.tuoiDang === item['tuoiDang']) &&
      ((!option.tinhTrangDangVien || option.tinhTrangDangVien === "") ? true : option.tinhTrangDangVien === item['tinhTrangDangVien']) &&
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
        this.tkDangVienDangQuanLyDataBM2.forEach(dv=>{
          if(dv.chiBo == item.maChiBo){
            soLuongDangVien++;
            if(["BT","PBT","CUV"].includes(dv['chucVuDang'])){
              soLuongCapUy++;
            }
            if(dv.gioiTinh === 'Nu'){
              nu++;
            }
            if(dv.danToc !== 'Kinh'){
              danTocKhac++;
            }
            if(dv.ngayChinhThucVaoDang === ''){
              dangVienDuBi++;
            }
            if(dv.huyHieu !== ''){
              huyHieuDang++;
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
}
