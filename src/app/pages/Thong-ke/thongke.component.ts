import { Component, OnInit, ViewChild } from '@angular/core';
import { ThongKeService, PhieuDangVienModel } from 'src/app/service/thongke.service';
@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.css']
})
export class thongkeComponent implements OnInit {
  phieuDangVienModels : PhieuDangVienModel[] = [];
  tkDangVienDangQuanLyModels : PhieuDangVienModel[] = [];
  constructor(
    private thongKeService : ThongKeService
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
    })
  }
}
