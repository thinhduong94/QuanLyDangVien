import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DangVien213 } from 'src/app/model/dangvien213.model';
import { DangVien213Service } from 'src/app/service/dangvien213.service';
import { TheDb } from 'src/app/model/thedb';
import { MatSort } from '@angular/material/sort';
import { dangvien213CreateDaiolog } from './daiolog/dangvien213.daiolog';
import { imageComponent } from '../share/image/image.component';
import { ExcelService } from 'src/app/service/excel.service';
import { alertComponent } from '../share/alert/alert.component';
import { importExcelComponent } from '../share/importExcel/importExcel.component';
import { GioiTinh } from 'src/app/const/drop-down-data.const';
@Component({
  selector: 'app-dangvien213',
  templateUrl: './dangvien213.component.html',
  styleUrls: ['./dangvien213.component.css']
})
export class DangVien213Component implements OnInit {
  displayedColumns: string[] = ['id','maDv', 'tenDv', 'ngaySinh', 'gioTinh','diaChi','noiCongTac','tinhTrang','ngayQuanLy','maChiDo','ghiChu','action'];
  dataSource = new MatTableDataSource<DangVien213>([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  animal: string;
  name: string;
  dangVien213: DangVien213;
  dangVien213s: DangVien213[] = [];
  constructor(
    public dialog: MatDialog,
    protected dangVien213Service: DangVien213Service,
    protected excelService : ExcelService) { }
  ngOnInit() {
    const checkDB = setInterval(()=>{
      if(TheDb.db){
        this.getDangVien213();
        clearInterval(checkDB);
      }
    },10)
   
  }
  openDialog(id?:number): void {
    const dialogRef = this.dialog.open(dangvien213CreateDaiolog, {
      data: {id: id || null}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getDangVien213();
    });
  }
  public getDangVien213() {
    this.dangVien213Service.getAll()
        .then((dangVien213s) => {
            console.log(dangVien213s);
            this.dangVien213s = dangVien213s;
            this.loadData();
        });
  }
  public loadData(){
    this.dataSource = new MatTableDataSource<DangVien213>(this.dangVien213s);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public selectItem(id:number){
    this.openDialog(id);
  }
  public removeItem(id:number){
    this.dangVien213Service.delete(id).then(()=>{
      this.getDangVien213();
    })
  }
  public openImgDialog(img?:string): void {
    const dialogRef = this.dialog.open(imageComponent, {
      data: {img: img || null}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  exportToExcel() {
    this.excelService.exportAsExcelFile(this.dangVien213s,'DangVien213');
   }
   showAlert(mess:string){
    const dialogRef = this.dialog.open(alertComponent, {
      width: '500px',
      data: {mess: mess || null}
    });
   }
   importExcel(){
    const dialogRef = this.dialog.open(importExcelComponent, {
      width: '500px',
      data: {sheet : 'DangVien213'}
    });
    dialogRef.afterClosed().subscribe(result => {
      let arrayCallCheckChiBo = [];
      (result as []).forEach((item:DangVien213)=>{
        arrayCallCheckChiBo.push(this.dangVien213Service.checkDangVien213BeforInsert(item));
      });
      Promise.all(arrayCallCheckChiBo).then(arr=>{
        const cbs = (arr as []).filter(item=>item);
        let arrayCallInsert = [];
        cbs.forEach(cb=>{
          arrayCallInsert.push(this.dangVien213Service.insert(cb));
        });
        Promise.all(arrayCallInsert).then(a=>{
          this.getDangVien213();
        });
      });
    });
   }
   applyFilter(filterValue: string) {
    filterValue = filterValue.trim()
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
