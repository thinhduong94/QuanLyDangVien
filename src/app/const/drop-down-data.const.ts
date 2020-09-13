export const DanhSachHuyHieu = [
  { value: "30", display: "30 năm" },
  { value: "40", display: "40 năm" },
  { value: "45", display: "45 năm" },
  { value: "50", display: "50 năm" },
  { value: "55", display: "55 năm" },
  { value: "60", display: "60 năm" },
  { value: "65", display: "65 năm" },
  { value: "70", display: "70 năm" },
  { value: "75", display: "75 năm" },
  { value: "80", display: "80 năm" },
  { value: "85", display: "85 năm" },
  { value: "90", display: "90 năm" },
  { value: "", display: "Tất cả" },
];
export const DanhSachKyLuat = [
  { value: "khientrach", display: "Khiển trách" },
  { value: "canhcao", display: "Cảnh cáo" },
  { value: "cachchuc", display: "Cách chức" },
  { value: "khaitru", display: "Khai trừ" },
  { value: "khong", display: "Không" },
  { value: "", display: "Tất cả" }
];
export const DanhSachTinhTrangQuanLy = [
  { value: "dangquanlihientai", display: "Đang quản lí(hiện tại)" },
  { value: "dangquanliketnap", display: "Đang quản lí(kết nạp)" },
  { value: "dangquanlichuyenden", display: "Đang quản lí(chuyển đến)" },
  { value: "chuyendi", display: "Chuyển đi" },
  { value: "khaitru", display: "Khai trừ" },
  { value: "xoaten", display: "Xóa tên" },
  { value: "xinrakhoidang", display: "Xin ra khỏi đảng" },
  { value: "chet", display: "Chết" },
  { value: "", display: "Tất cả" },
];
export const DanhSachDanToc = [
  { value: "kinh", display: "Kinh" },
  { value: "hoa", display: "Hoa" },
  { value: "khac", display: "Khác" },
  { value: "", display: "Tất cả" },
];
export const DanhSachLyLuanChinhTri = [
  { value: "socap", display: "Sơ cấp" },
  { value: "trungcap", display: "Trung cấp" },
  { value: "caocap", display: "Cao cấp" },
  { value: "", display: "Tất cả" },
];
export const DanhSachTinhTrangDangVien = [
  { value: "quanly", display: "Quản lí" },
  { value: "khongquanly", display: "Không còn quản lí" },
  { value: "", display: "Tất cả" },
];
export const DanhSachXepLoai = [
  { value: "hoanthanhxuatsac", display: "Hoàn thành xuất sắc" },
  { value: "hoanthanhtot", display: "Hoàn thành tốt" },
  { value: "hoanthanh", display: "Hoàn thành" },
  { value: "khonghoanthanh", display: "Không hoàn thành" },
  { value: "", display: "Tất cả" },
];
export const DanhSachMienSinhHoat = [
  { value: "mienSinhHoat", display: "Miễn sinh hoạt" },
  { value: "sinhHoat", display: "Sinh hoạt" },
  { value: "", display: "Tất cả" }
];
export const MienSinhHoat = "mienSinhHoat";
export const SinhHoat = "sinhHoat";
export const DangQuanLi = "dangquanli";
export const QuanLy = "quanly";
export const KhongQuanLy = "khongquanly";
export const Dangquanlihientai = "dangquanlihientai";
export const Dangquanliketnap = "dangquanliketnap";
export const Dangquanlichuyenden = "dangquanlichuyenden";
export enum LyLuanChinhTri {
  SoCap = "socap",
  TrungCap = "trungcap",
  CaoCap = "caocap",
}
export enum DanToc {
  Khac = "khac",
  Hoa = "hoa",
  Kinh = "kinh",
  displaykinh = "Kinh",
  displayhoa = "Hoa",
  displaykhac = "Khac",
}
export enum XepLoai {
  HoanThanhXuatSac = "hoanthanhxuatsac",
  HoanThanhTot = "hoanthanhtot",
  HoanThanh = "hoanthanh",
  KhongHoanThanh = "khonghoanthanh",
}
export const DotTangHuyHieuDang = [
  { value: "02/28", display: "Đợt 1: 1/12 - 28/2", text: "Đợt 1(3 tháng 2)"},
  { value: "05/31", display: "Đợt 2: 1/3 - 31/5", text: "Đợt 2( 30 tháng 4)"},
  { value: "09/30", display: "Đợt 3: 1/6 - 30/9", text: "Đợt 3 (2 tháng 9)"},
  { value: "11/30", display: "Đợt 4: 1/10 - 30/11", text: "Đợt 4 (7 tháng 11)"},
];
export const Dot1 = "02/28";
export const DotTangHuyHieuDangPhuong = [
  { value: "06/30", display: "Đợt 1: 1/1 - 30/6", text: "Đợt 1(1/1 - 30/6)"},
  { value: "12/31", display: "Đợt 2: 1/7 - 31/12", text: "Đợt 2(1/7 - 31/12)"}
];
export const DanhSachGioiTinh = [
  { value: "nam", display: "Nam" },
  { value: "nu", display: "Nữ" },
  { value: "", display: "Tất cả" },
];

export enum GioiTinh {
  Nam = "nam",
  Nu = "nu",
  displaynam = "Nam",
  displaynu = "Nữ",
}
