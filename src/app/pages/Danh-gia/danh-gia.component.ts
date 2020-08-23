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
          this.initSetValueForDanhGia(data, currentYearDanhGia);
        });
        this.danhGiaFormGroup = new FormGroup(this.dynamicForm);
        this.isShow = true;
      });
  }

  initSetValueForDanhGia(data, currentYearDanhGia) {
    ["maChiBo", "soTheDangVien"].forEach((type) => {
      if (data[type]) {
        const currentDanhGia = currentYearDanhGia.find(
          (danhgia) => danhgia[type] === data[type]
        );
        this.dynamicForm[data[type]] = new FormControl("");
        if (currentDanhGia) {
          this.dynamicForm[data[type]].setValue(currentDanhGia.danhGia);
        }
      }
    });
  }
  ngOnDestroy() {
    this.yearSubscription.unsubscribe();
  }

  onSaveClick() {
    this.upsertDanhGia();
    this.danhGiaService.getAll().then((result) => (this.allDanhGia = result));
  }

  upsertDanhGia() {
    const currentYearDanhGia = this.allDanhGia.filter(
      (danhGia) => danhGia.namDanhGia === this.selectedYear
    );
    currentYearDanhGia.forEach((data) => {
      const type = this.getRecordType(data);
      data.danhGia = this.danhGiaFormGroup.controls[data[type]].value;
      data.namDanhGia = this.selectedYear;
    });
    this.displayData.forEach((data) => {
      const type = this.getRecordType(data);
      const code = data.maChiBo || data.soTheDangVien;
      if (
        !currentYearDanhGia.find(
          (danhGia) =>
            danhGia.maChiBo === code || danhGia.soTheDangVien === code
        )
      ) {
        const newDanhGia = new DanhGiaModel();
        newDanhGia.danhGia = this.danhGiaFormGroup.controls[data[type]].value;
        newDanhGia[type] = data[type];
        newDanhGia.namDanhGia = this.selectedYear;
        currentYearDanhGia.push(newDanhGia);
      }
    });
    this.danhGiaService.upsertDanhGiaList(currentYearDanhGia);
  }

  getRecordType(data) {
    return data.maChiBo ? "maChiBo" : "soTheDangVien";
  }

  loadDanhGiaByYear() {
    const cloneData = cloneDeepWith(this.displayData);
    const currentYearDanhGia = this.allDanhGia.filter(
      (danhGia) => danhGia.namDanhGia === this.selectedYear
    );
    cloneData.forEach((data) => {
      const code = data.maChiBo || data.soTheDangVien;
      if (code && this.danhGiaFormGroup.controls[code]) {
        const foundDanhGia = currentYearDanhGia.find(
          (danhGia) =>
            danhGia.maChiBo === code || danhGia.soTheDangVien === code
        );
        const value = foundDanhGia ? foundDanhGia.danhGia : "";
        this.danhGiaFormGroup.controls[code].setValue(value);
      }
    });
    this.displayData = cloneData;
  }
}
