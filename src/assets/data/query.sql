SELECT * FROM chiBo

SELECT 
chibo.tenChiBo,
dangvien.*
FROM dangvien JOIN chibo ON dangvien.chiBo = chiBo.maChiBo

SELECT 
chibo.tenChiBo  ,
dangvien.*
FROM dangvien JOIN chibo ON dangvien.chiBo = chiBo.maChiBo
WHERE dangvien.trangThai = 0