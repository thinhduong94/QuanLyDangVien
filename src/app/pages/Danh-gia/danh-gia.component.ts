import { Component, OnInit, OnDestroy } from "@angular/core";
import { DanhGiaService } from "src/app/service/danhgia.service";
import { DangVienService } from "src/app/service/dangvien.service";
import { ChiBoService } from "src/app/service/chibo.service";
import { DanhSachXepLoai } from "src/app/const/drop-down-data.const";
import { FormControl, FormGroup } from "@angular/forms";
import { ChangeDetectorRef } from "@angular/core";
import { Moment } from "moment";
import { Subscription, from } from "rxjs";
import { DanhGiaModel } from "src/app/model/danhgia.model";
import { cloneDeepWith } from "lodash";
@Component({
  selector: "danh-gia",
  templateUrl: "danh-gia.component.html",
  styleUrls: ["danh-gia.component.scss"],
})
export class DanhGiaComponent implements OnInit, OnDestroy {
  allDanhGia = [];
  selectedYear = "";
  displayData = [];
  danhSachXepLoai = DanhSachXepLoai;
  dynamicForm = {};
  isShow = false;
  danhGiaFormGroup = new FormGroup({});
  yearSubscription = new Subscription();
  constructor(
    private danhGiaService: DanhGiaService,
    private dangVienService: DangVienService,
    private chiBoService: ChiBoService,
    private ref: ChangeDetectorRef
  ) {}
  ngOnInit() {
    let currentYearDanhGia = [];
    this.yearSubscription = this.danhGiaService.dateEventEmitter.subscribe(
      (year: Moment) => {
        this.selectedYear = year.year().toString();
        this.loadDanhGiaByYear();
      }
    );
    this.selectedYear = new Date().getFullYear().toString();
    this.danhGiaService
      .getAll()
      .then((result) => {
        this.allDanhGia = result;

        currentYearDanhGia = this.allDanhGia.filter(
          (danhGia) => danhGia.namDanhGia === this.selectedYear
        );
        return this.dangVienService.getAll();
      })
      .then((allDangVien) => {
        this.displayData = this.displayData.concat(allDangVien);
        return this.chiBoService.getAll();
      })
      .then((allChiBo) => {
        this.displayData = this.displayData.concat(allChiBo);
        this.displayData.forEach((data) => {
          this.initSetValueForDanhGia("maChiBo", data, currentYearDanhGia);
          this.initSetValueForDanhGia(
            "soTheDangVien",
            data,
            currentYearDanhGia
          );
        });
        this.danhGiaFormGroup = new FormGroup(this.dynamicForm);
        this.isShow = true;
      });
  }

  initSetValueForDanhGia(type, data, currentYearDanhGia) {
    const currentDanhGia = currentYearDanhGia.find(
      (danhgia) => danhgia[type] === data[type]
    );
    this.dynamicForm[data[type]] = new FormControl("");
    if (currentDanhGia) {
      this.dynamicForm[data[type]].setValue(currentDanhGia.danhGia);
    }
  }
  ngOnDestroy() {
    this.yearSubscription.unsubscribe();
  }

  onSaveClick() {
    this.displayData.forEach((data) => {
      this.insertOrUpdateDanhGia(data);
    });
    this.danhGiaService.getAll().then((result) => (this.allDanhGia = result));
  }

  insertOrUpdateDanhGia(data: any) {
    const code = data.maChiBo || data.soTheDangVien;
    const type = data.maChiBo ? "maChiBo" : "soTheDangVien";
    this.danhGiaService
      .getByCode(type, code, this.selectedYear)
      .then((result) => {
        if (result) {
          result.danhGia = this.danhGiaFormGroup.controls[code].value;
          this.danhGiaService.update(result);
        } else {
          const danhGia = new DanhGiaModel();
          danhGia[type] = code;
          danhGia.namDanhGia = this.selectedYear;
          danhGia.danhGia = this.danhGiaFormGroup.controls[code].value;
          this.danhGiaService.insert(danhGia);
        }
      });
  }

  loadDanhGiaByYear() {
    const cloneData = cloneDeepWith(this.displayData);
    const currentYearDanhGia = this.allDanhGia.filter(
      (danhGia) => danhGia.namDanhGia === this.selectedYear
    );
    cloneData.forEach((data) => {
      const code = data.maChiBo || data.soTheDangVien;
      const foundDanhGia = currentYearDanhGia.find(
        (danhGia) => danhGia.maChiBo === code || danhGia.soTheDangVien === code
      );
      const value = foundDanhGia ? foundDanhGia.danhGia : "";
      this.danhGiaFormGroup.controls[code].setValue(value);
    });
    this.displayData = cloneData;
  }
}
