BEGIN TRANSACTION;
DROP TABLE IF EXISTS `chibo`;
CREATE TABLE IF NOT EXISTS `chibo` (
	`id`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`maChiBo`	TEXT NOT NULL,
	`tenChiBo`	TEXT NULL,
	`qdThanhLap`	BLOB NULL,
	`ghiChu`	TEXT NULL,
	`trangThai`	INTEGER NULL,
	PRIMARY KEY(`id`)
);
COMMIT;
