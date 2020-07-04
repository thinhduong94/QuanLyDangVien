import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ChiBoService } from 'src/app/service/chibo.service';
import { ChiBo } from 'src/app/model/chibo.model';
export interface DialogData {
    id: number;
}  
@Component({
    selector: 'chibo.daiolog',
    templateUrl: 'chibo.daiolog.html',
    styleUrls: ['chibo.daiolog.scss']
})
  export class chiboCreateDaiolog {
    chiBo: FormGroup;
    maChiBoControl = new FormControl('');
    tenChiBoControl = new FormControl('');
    qdThanhLapControl = new FormControl('');
    ghiChuControl = new FormControl('');
    qdThanhLapfile : string;
    title:string = "Tạo Mới Thông Tin Chi Bộ";
    constructor(
      public dialogRef: MatDialogRef<chiboCreateDaiolog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      public fb: FormBuilder,
      protected chiBoService: ChiBoService
      ) {
        this.createForm();
        if(data.id){
            this.title = "Thông Tin Chi Bộ";
            this.chiBoService.get(data.id).then(data=>{
                this.chiBo.patchValue({
                    maChiBo: data.maChiBo,
                    tenChiBo: data.tenChiBo,
                    ghiChu: data.ghiChu,
                });
                this.qdThanhLapfile = data.qdThanhLap;
            })
        }
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    save(){
        let chibo = this.chiBo.value as ChiBo;
        chibo.qdThanhLap = this.qdThanhLapfile;
        if(this.data.id){
            chibo.id = this.data.id;
            this.chiBoService.update(chibo).then(()=>{
                this.onNoClick();
            });
        }else{
            this.chiBoService.insert(chibo).then(()=>{
                this.onNoClick();
            });
        }
    }
    fileEvent(fileInput: Event){
        const target= event.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        if(file) {
                var reader = new FileReader();
                reader.onload = (event:any) => {
                    this.qdThanhLapfile = event.target.result;
                    console.log(event.target.result);
                }
                reader.readAsDataURL(file);
            }
        }
    createForm(){
        this.chiBo = this.fb.group({
            maChiBo: this.maChiBoControl,
            tenChiBo: this.tenChiBoControl,
            qdThanhLap: this.qdThanhLapControl,
            ghiChu: this.ghiChuControl
        });
    }
  }