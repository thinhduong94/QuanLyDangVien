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
  currentYearDanhGia = [];
  selectedChiBo = new FormControl("");
  xepLoaiChiBo = new FormControl("");
  chiBos = [];
  constructor(
    private danhGiaService: DanhGiaService,
    private dangVienService: DangVienService,
    private chiBoService: ChiBoService,
    private ref: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.yearSubscription = this.danhGiaService.dateEventEmitter.subscribe(
      (year: Moment) => {
        this.selectedYear = year.year().toString();
        this.loadDanhGiaByYear();
      }
    );
    this.selectedYear = new Date().getFullYear().toString();

    this.chiBoService
      .getAll()
      .then((allChiBo) => {
        this.chiBos = allChiBo;
        this.selectedChiBo.setValue(allChiBo.length ? allChiBo[0].maChiBo : "");
        return this.danhGiaService.getDanhGiaChiBoByYear(
          this.selectedChiBo.value,
          this.selectedYear
        );
      })
      .then((currentDanhGiaChiBo) => {
        this.xepLoaiChiBo.setValue(
          currentDanhGiaChiBo ? currentDanhGiaChiBo.danhGia : ""
        );
        return this.dangVienService.getByChiBo(this.selectedChiBo.value);
      })
      .then((allDangVien) => {
        this.displayData = allDangVien;
        this.displayData.forEach((data) => {
          this.dynamicForm[data.soTheDangVien] = new FormControl("");
        });
        this.danhGiaFormGroup = new FormGroup(this.dynamicForm);
        this.isShow = true;
        return this.danhGiaService.getDanhGiaByYear(this.selectedYear);
      })
      .then((allDanhGia) => {
        this.loadDanhGia(allDanhGia);
      });
  }

  ngOnDestroy() {
    this.yearSubscription.unsubscribe();
  }

  onSaveClick() {
    this.upsertDanhGia();
  }

  upsertDanhGia() {
    this.currentYearDanhGia.forEach((data) => {
      if (data.maChiBo && data.maChiBo === this.selectedChiBo.value) {
        data.danhGia = this.xepLoaiChiBo.value;
      }
      if (data.soTheDangVien) {
        const danhGiaControl = this.danhGiaFormGroup.controls[
          data.soTheDangVien
        ];
        data.danhGia = danhGiaControl ? danhGiaControl.value : "";
      }
      data.namDanhGia = this.selectedYear;
    });
    this.currentYearDanhGia = [];
    this.displayData.forEach((data) => {
      if (
        !this.currentYearDanhGia.find(
          (danhGia) => danhGia.soTheDangVien === data.soTheDangVien
        )
      ) {
        const newDanhGia = new DanhGiaModel();
        const danhGiaControl = this.danhGiaFormGroup.controls[
          data.soTheDangVien
        ];
        newDanhGia.danhGia = danhGiaControl
          ? danhGiaControl.value
          : newDanhGia.danhGia;
        newDanhGia.soTheDangVien = data.soTheDangVien;
        newDanhGia.namDanhGia = this.selectedYear;
        this.currentYearDanhGia.push(newDanhGia);
      }
    });

    this.danhGiaService.upsertDanhGiaList(this.currentYearDanhGia);
  }

  loadDanhGiaByYear() {
    this.danhGiaService.getDanhGiaByYear(this.selectedYear).then((danhGia) => {
      this.loadDanhGia(danhGia);
    });
  }

  loadDanhGia(allDanhGia) {
    this.currentYearDanhGia = allDanhGia;
    const danhGiaChiBo = this.currentYearDanhGia.find(
      (danhgia) => danhgia.maChiBo === this.selectedChiBo.value
    );
    if (danhGiaChiBo) {
      this.xepLoaiChiBo.setValue(danhGiaChiBo.danhGia);
    } else {
      this.xepLoaiChiBo.setValue("");
    }
    if (!allDanhGia.length) {
      this.displayData.forEach((data) => {
        const control = this.danhGiaFormGroup.controls[data.soTheDangVien];
        if (control) {
          control.setValue("");
        }
      });
    } else {
      allDanhGia.forEach((danhgia) => {
        if (danhgia.soTheDangVien) {
          const control = this.danhGiaFormGroup.controls[danhgia.soTheDangVien];
          if (control) {
            control.setValue(danhgia.danhGia);
          }
        }
      });
    }
  }

  onChiBoChange($event) {
    const chibo = $event.value;
    if (chibo) {
      this.dangVienService.getByChiBo(chibo).then((allDangVien) => {
        this.displayData = allDangVien;
        if (allDangVien.length) {
          this.dynamicForm = {};
          this.displayData.forEach((data) => {
            this.dynamicForm[data.soTheDangVien] = new FormControl("");
          });
          this.danhGiaFormGroup = new FormGroup(this.dynamicForm);
        }
        this.loadDanhGiaByYear();
      });
    }
  }
}
