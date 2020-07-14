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
	'ten' TEXT NULL,
	'tuoi' TEXT NULL,
	'gioitinh' TEXT NULL,
	'dangBoTinh' TEXT NULL,
	'dangBoHuyen' TEXT NULL,
	'soLyLich' TEXT NULL,
	'soTheDangVien' TEXT NULL,
	'tenDangDung' TEXT NULL,
	'tenKhaiSinh' TEXT NULL,
	'noiSinh' TEXT NULL,
	'queQuan' TEXT NULL,
	'thuongTru' TEXT NULL,
	'tamTru' TEXT NULL,
	'danToc' TEXT NULL,
	'tonGiao' TEXT NULL,
	'thanhPhanGiaDinh' TEXT NULL,
	'ngheNghiep' TEXT NULL,
	'ngayVaoDang' TEXT NULL,
	'chiBoVaoDang' TEXT NULL,
	'nguoiGioiThieu' TEXT NULL,
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
	'quaTringHoatDongVaCongTac' TEXT NULL,
	'daoTao' TEXT NULL,
	'khenThuong' TEXT NULL,
	'huyHieu' TEXT NULL,
	'danhHieu' TEXT NULL,
	'dacDiemLichSuBanThan' TEXT NULL,
	'quanHeNuocNgoai' TEXT NULL,
	'trangThai' INTEGER NULL
);
DROP TABLE IF EXISTS `dangvien213`;
CREATE TABLE IF NOT EXISTS `dangvien213` (
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