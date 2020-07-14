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
  chibo: DangVien213;
  chibos: DangVien213[] = [];
  constructor(
    public dialog: MatDialog,
    protected chiBoService: DangVien213Service) { }
  ngOnInit() {
    const checkDB = setInterval(()=>{
      if(TheDb.db){
        this.getChidos();
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
      this.getChidos();
    });
  }
  public getChidos() {
    this.chiBoService.getAll()
        .then((chibos) => {
            console.log(chibos);
            this.chibos = chibos;
            this.loadData();
        });
  }
  public loadData(){
    this.dataSource = new MatTableDataSource<DangVien213>(this.chibos);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public selectItem(id:number){
    this.openDialog(id);
  }
  public removeItem(id:number){
    this.chiBoService.delete(id).then(()=>{
      this.getChidos();
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
}
