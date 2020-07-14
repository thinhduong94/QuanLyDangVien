import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DangVien213Service } from 'src/app/service/dangvien213.service';
import { DangVien213 } from 'src/app/model/dangvien213.model';
export interface DialogData {
    id: number;
}  
@Component({
    selector: 'dangvien213.daiolog',
    templateUrl: 'dangvien213.daiolog.html',
    styleUrls: ['dangvien213.daiolog.scss']
})
  export class dangvien213CreateDaiolog {
    models: FormGroup;
    maDvControl = new FormControl('');
    tenDvControl = new FormControl('');
    ngaySinhControl = new FormControl('');
    gioTinhControl = new FormControl('');
    diaChiControl = new FormControl('');
    noiCongTacControl = new FormControl('');
    tinhTrangControl = new FormControl('');
    ngayQuanLyControl = new FormControl('');
    maChiDoControl = new FormControl('');
    ghiChuControl = new FormControl('');
    title:string = "Tạo Mới Thông Tin Đảng viên 213";
    constructor(
      public dialogRef: MatDialogRef<dangvien213CreateDaiolog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      public fb: FormBuilder,
      protected DangVien213Service: DangVien213Service,
      public dialog: MatDialog,
      ) {
        this.createForm();
        if(data.id){
            this.title = "Thông Tin Đảng viên 213";
            this.DangVien213Service.get(data.id).then(data=>{
                this.models.patchValue({
                    maDv: data.maDv,
                    tenDv: data.tenDv,
                    ngaySinh: data.ngaySinh,
                    gioTinh : data.gioTinh,
                    diaChi: data.diaChi,
                    noiCongTac : data.noiCongTac,
                    tinhTrang : data.tinhTrang,
                    ngayQuanLy : data.ngayQuanLy,
                    maChiDo : data.maChiDo,
                    ghiChu: data.ghiChu
                });
            });
        }
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    save(){
        let dangVien213 = this.models.value as DangVien213;
        if(this.data.id){
            dangVien213.id = this.data.id;
            this.DangVien213Service.update(dangVien213).then(()=>{
                this.onNoClick();
            });
        }else{
            this.DangVien213Service.insert(dangVien213).then(()=>{
                this.onNoClick();
            });
        }
    }
    createForm(){
        this.models = this.fb.group({
            maDv: this.maDvControl,
            tenDv: this.tenDvControl,
            ngaySinh: this.ngaySinhControl,
            gioTinh : this.gioTinhControl,
            diaChi: this.diaChiControl,
            noiCongTac : this.noiCongTacControl,
            tinhTrang : this.tinhTrangControl,
            ngayQuanLy : this.ngayQuanLyControl,
            maChiDo : this.maChiDoControl,
            ghiChu: this.ghiChuControl,
        });
    }
  }
