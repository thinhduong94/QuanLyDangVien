BEGIN TRANSACTION;
DROP TABLE IF EXISTS 'chibo';
CREATE TABLE IF NOT EXISTS 'chibo' (
	'id' INTEGER PRIMARY KEY AUTOINCREMENT,
	'maChiBo' TEXT NOT NULL,
	'tenChiBo' TEXT NULL,
	'qdThanhLap' BLOB NULL,
	'ghiChu' TEXT NULL,
	'trangThai' INTEGER NULL
);
DROP TABLE IF EXISTS 'dangvien';
CREATE TABLE IF NOT EXISTS 'dangvien' (
	'id' INTEGER PRIMARY KEY AUTOINCREMENT,
	'gioiTinh' TEXT NULL,
	'dangBoTinh' TEXT NULL,
	'dangBoHuyen' TEXT NULL,
	'soLyLich' TEXT NULL,
	'soTheDangVien' TEXT NULL,
	'tenDangDung' TEXT NULL,
	'tenKhaiSinh' TEXT NULL,
	'noiSinh' TEXT NULL,
	'ngaySinh' TEXT NULL,
	'queQuan' TEXT NULL,
	'thuongTru' TEXT NULL,
	'tamTru' TEXT NULL,
	'danToc' TEXT NULL,
	'tonGiao' TEXT NULL,
	'thanhPhanGiaDinh' TEXT NULL,
	'ngheNghiep' TEXT NULL,
	'ngayVaoDang' TEXT NULL,
	'chiBoVaoDang' TEXT NULL,
	'ngayCapThamQuyenVaoDang' TEXT NULL,
	'ngayChinhThucVaoDang' TEXT NULL,
	'chiBoChinhThucVaoDang' TEXT NULL,
	'ngayDuocTuyen' TEXT NULL,
	'coQuanTuyenDung' TEXT NULL,
	'ngayVaoDoan' TEXT NULL,
	'thamGiaToChucXaHoi' TEXT NULL,
	'ngayNhapNgu' TEXT NULL,
	'ngayXuatNgu' TEXT NULL,
	'trinhDo' TEXT NULL,
	'tinhTrangSucKhoe' TEXT NULL,
	'soCmnd' TEXT NULL,
	'quaTrinhHoatDongVaCongTac' TEXT NULL,
	'daoTao' TEXT NULL,
	'khenThuong' TEXT NULL,
	'huyHieu' TEXT NULL,
	'danhHieu' TEXT NULL,
	'dacDiemLichSuBanThan' TEXT NULL,
	'quanHeNuocNgoai' TEXT NULL,
	'chiBoCoSo' TEXT NULL,
	'chiBo' TEXT NULL,
	'boPhan' TEXT NULL,
	'mienCongTacNgay' TEXT NULL,
	'ngayKhoiPhucDang' TEXT NULL,
	'biXuLyTheoPhapLuat' TEXT NULL,
	'lamViecTrongCheDoCu' TEXT NULL,
	'daDiNuocNgoai' TEXT NULL,
	'thamGiaToChucNuocNgoai' TEXT NULL,
	'coNguoiThanNuocNgoai' TEXT NULL,
	'tongThuNhap' TEXT NULL,
	'binhQuan' TEXT NULL,
	'loaiNhaDuocCap' TEXT NULL,
	'dienTichNhaDuocCap' TEXT NULL,
	'loaiNhaDuocMua' TEXT NULL,
	'dienTichNhaDuocMua' TEXT NULL,
	'datDuocCap' TEXT NULL,
	'datDuocMua' TEXT NULL,
	'hoatDongKinhTe' TEXT NULL,
	'dienTichDatTrangTrai' TEXT NULL,
	'soLaoDongThue' TEXT NULL,
	'taiSanCoGiaTri' TEXT NULL,
	'giaTriTaiSan' TEXT NULL,
	'ngayVaoDangLanHai' TEXT NULL,
	'chiBoVaoDangLanHai' TEXT NULL,
	'nguoiGioiThieuMot' TEXT NULL,
	'chucVuNguoiGioiThieuMot' TEXT NULL,
	'nguoiGioiThieuHai' TEXT NULL,
	'chucVuNguoiGioiThieuHai' TEXT NULL,
	'ngayChinhThucVaoLanHai' TEXT NULL,
	'chiBoChinhThucVaoDangLanHai' TEXT NULL,
	'kyLuat' TEXT NULL,
	'thoiGianBiXoa' TEXT NULL,
	'chiBoBiXoa' TEXT NULL,
	'quanHeGiaDinh' TEXT NULL,
	'trangThai' INTEGER NULL,
	'anh3x4' TEXT NULL
);
DROP TABLE IF EXISTS 'dangvien213';
CREATE TABLE IF NOT EXISTS 'dangvien213' (
	`id` INTEGER PRIMARY KEY AUTOINCREMENT,
	`maDv` TEXT NOT NULL,
	`tenDv` TEXT NULL,
	`ngaySinh` DATE NULL,
	`gioTinh` TEXT NULL,
	`diaChi` TEXT NULL,
	`noiCongTac` TEXT NULL,
	`tinhTrang` TEXT NULL,
	`ngayQuanLy` DATE NULL,
	`maChiDo` TEXT NULL,
	`ghiChu` TEXT NULL,
	`trangThai` INTEGER NULL
);
COMMIT;