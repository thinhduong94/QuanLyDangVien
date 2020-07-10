import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ChiBo } from 'src/app/model/chibo.model';
import { ChiBoService } from 'src/app/service/chibo.service';
import { TheDb } from 'src/app/model/thedb';
import { MatSort } from '@angular/material/sort';
import { chiboCreateDaiolog } from './daiolog/chibo.daiolog';
import { imageComponent } from '../share/left-menu/image/image.component';
@Component({
  selector: 'app-chibo',
  templateUrl: './chibo.component.html',
  styleUrls: ['./chibo.component.css']
})
export class ChiBoComponent implements OnInit {
  displayedColumns: string[] = ['id','maChiBo', 'tenChiBo', 'ghiChu', 'qdThanhLap','action'];
  dataSource = new MatTableDataSource<ChiBo>([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  animal: string;
  name: string;
  chibo: ChiBo;
  chibos: ChiBo[] = [];
  constructor(
    public dialog: MatDialog,
    protected chiBoService: ChiBoService) { }
  ngOnInit() {
    const checkDB = setInterval(()=>{
      if(TheDb.db){
        this.getChidos();
        clearInterval(checkDB);
      }
    },10)
   
  }
  openDialog(id?:number): void {
    const dialogRef = this.dialog.open(chiboCreateDaiolog, {
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
    this.dataSource = new MatTableDataSource<ChiBo>(this.chibos);
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
