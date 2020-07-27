import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ThongKeService, PhieuDangVienModel, PhieuDangVienOptionModel } from 'src/app/service/thongke.service';
import { ExcelService } from 'src/app/service/excel.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SlowBuffer } from 'buffer';
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
  constructor(
    private thongKeService : ThongKeService,
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
    temp = temp.filter((item)=>{
      ((option.chiBo && option.chiBo === "") ? true : option.chiBo === item.chiBo) &&
      ((option.gioiTinh && option.gioiTinh === "") ? true : option.gioiTinh === item.gioiTinh) &&
      ((option.danToc && option.danToc === "") ? true : option.danToc === item.danToc) &&
      ((option.kyLuat && option.kyLuat === "") ? true : option.kyLuat === item.kyLuat)
    });
   this.tkDangVienDangQuanLyModels = temp;
  }
  chayBaoCaoBM2(){
    let temp = [...this.tkDangVienDangQuanLyDataBM2];
    let option = this.phieuDangVienOptionModel;
    console.log(this.phieuDangVienOptionModel);
    temp = temp.filter((item)=>{
      ((option.chiBo && option.chiBo === "") ? true : option.chiBo === item.chiBo) &&
      ((option.tuoiDang && option.tuoiDang === "") ? true : option.tuoiDang === item['tuoiDang']) &&
      ((option.tinhTrangDangVien && option.tinhTrangDangVien === "") ? true : option.tinhTrangDangVien === item['tinhTrangDangVien']) &&
      ((option.xepLoaiDangVien && option.xepLoaiDangVien === "") ? true : option.xepLoaiDangVien === item['xepLoaiDangVien'])
    });
   this.tkDangVienDangQuanLyModels = temp;
  }
}
