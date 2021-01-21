const patterns = [
  RegExp('^https://dantri.com.vn/event/.+$'),
  RegExp('^https://dantri.com.vn/video/.+$'),
  RegExp('^https://tuoitre.vn/.*(?<!-\\d{17}.htm)$'),
  RegExp('^https://tuoitre.vn/lang-kinh-24g-.+$'),
  RegExp('^https://vietnamnet.vn/.*(?<!.html)$'),
  RegExp('^https://vietnamnet.vn/vn/su-kien/.+$'),
  RegExp('^https://vnexpress.net/.*(?<!.html)$'),
  RegExp('^https://vnexpress.net/tac-gia/.+$')
]

const urls = [
  'https://dantri.com.vn/',
  'https://dantri.com.vn/an-sinh.htm',
  'https://dantri.com.vn/ban-doc.htm',
  'https://dantri.com.vn/ban-doc/dieu-tra.htm',
  'https://dantri.com.vn/ban-doc/hoi-am.htm',
  'https://dantri.com.vn/ban-doc/tu-van-phap-luat.htm',
  'https://dantri.com.vn/bat-dong-san.htm',
  'https://dantri.com.vn/bat-dong-san/du-an.htm',
  'https://dantri.com.vn/bat-dong-san/nhip-song-do-thi.htm',
  'https://dantri.com.vn/bat-dong-san/sac-mau-nhat-ban.htm',
  'https://dantri.com.vn/bat-dong-san/song-xanh.htm',
  'https://dantri.com.vn/bat-dong-san/thi-truong.htm',
  'https://dantri.com.vn/blog.htm',
  'https://dantri.com.vn/chuyen-la.htm',
  'https://dantri.com.vn/dien-dan.htm',
  'https://dantri.com.vn/dien-dan/giao-duc.htm',
  'https://dantri.com.vn/dien-dan/the-gioi.htm',
  'https://dantri.com.vn/dien-dan/xa-hoi.htm',
  'https://dantri.com.vn/doi-song.htm',
  'https://dantri.com.vn/doi-song/bao-ve-gia-dinh-viet.htm',
  'https://dantri.com.vn/doi-song/cong-dong.htm',
  'https://dantri.com.vn/doi-song/nha-dep.htm',
  'https://dantri.com.vn/du-hoc.htm',
  'https://dantri.com.vn/du-hoc/co-hoi-du-hoc.htm',
  'https://dantri.com.vn/du-hoc/tai-tri-viet.htm',
  'https://dantri.com.vn/du-hoc/the-gioi-du-hoc.htm',
  'https://dantri.com.vn/du-lich.htm',
  'https://dantri.com.vn/du-lich/kham-pha.htm',
  'https://dantri.com.vn/du-lich/mon-ngon-diem-dep.htm',
  'https://dantri.com.vn/du-lich/tin-tuc.htm',
  'https://dantri.com.vn/du-lich/tour-hay-khuyen-mai.htm',
  'https://dantri.com.vn/du-lich/video-anh.htm',
  'https://dantri.com.vn/event.htm',
  'https://dantri.com.vn/giai-tri.htm',
  'https://dantri.com.vn/giai-tri/chau-a.htm',
  'https://dantri.com.vn/giai-tri/hollywood.htm',
  'https://dantri.com.vn/giai-tri/sao-viet.htm',
  'https://dantri.com.vn/giai-tri/thoi-trang.htm',
  'https://dantri.com.vn/giai-tri/xem-an-choi.htm',
  'https://dantri.com.vn/giao-duc-huong-nghiep.htm',
  'https://dantri.com.vn/giao-duc-huong-nghiep/giao-duc-nghe-nghiep.htm',
  'https://dantri.com.vn/giao-duc-huong-nghiep/guong-sang.htm',
  'https://dantri.com.vn/giao-duc-huong-nghiep/khuyen-hoc.htm',
  'https://dantri.com.vn/giao-duc-huong-nghiep/tin-tuyen-sinh.htm',
  'https://dantri.com.vn/khoa-hoc-cong-nghe.htm',
  'https://dantri.com.vn/khoa-hoc-cong-nghe/khoa-hoc-do-day.htm',
  'https://dantri.com.vn/khoa-hoc-cong-nghe/the-gioi-tu-nhien.htm',
  'https://dantri.com.vn/kinh-doanh.htm',
  'https://dantri.com.vn/kinh-doanh/bao-hiem.htm',
  'https://dantri.com.vn/kinh-doanh/bao-ve-ntd.htm',
  'https://dantri.com.vn/kinh-doanh/doanh-nghiep.htm',
  'https://dantri.com.vn/kinh-doanh/khoi-nghiep.htm',
  'https://dantri.com.vn/kinh-doanh/nha-dat.htm',
  'https://dantri.com.vn/kinh-doanh/quoc-te.htm',
  'https://dantri.com.vn/kinh-doanh/tai-chinh-dau-tu.htm',
  'https://dantri.com.vn/kinh-doanh/thi-truong.htm',
  'https://dantri.com.vn/lao-dong-viec-lam.htm',
  'https://dantri.com.vn/lao-dong-viec-lam/chinh-sach.htm',
  'https://dantri.com.vn/lao-dong-viec-lam/chung-toi-noi.htm',
  'https://dantri.com.vn/lao-dong-viec-lam/dao-tao.htm',
  'https://dantri.com.vn/lao-dong-viec-lam/goi-an-sinh-62000-ty-dong.htm',
  'https://dantri.com.vn/lao-dong-viec-lam/viec-lam.htm',
  'https://dantri.com.vn/lao-dong-viec-lam/xuat-khau-lao-dong.htm',
  'https://dantri.com.vn/nhip-song-tre.htm',
  'https://dantri.com.vn/nhip-song-tre/nguoi-viet-tre.htm',
  'https://dantri.com.vn/nhip-song-tre/phong-su-tre.htm',
  'https://dantri.com.vn/nhip-song-tre/teen-dep.htm',
  'https://dantri.com.vn/o-to-xe-may.htm',
  'https://dantri.com.vn/o-to-xe-may/bang-gia-o-to.htm',
  'https://dantri.com.vn/o-to-xe-may/dua-xe.htm',
  'https://dantri.com.vn/o-to-xe-may/gia-xe.htm',
  'https://dantri.com.vn/o-to-xe-may/thi-truong-xe.htm',
  'https://dantri.com.vn/o-to-xe-may/tu-van-xe.htm',
  'https://dantri.com.vn/o-to-xe-may/van-hoa-xe.htm',
  'https://dantri.com.vn/phap-luat.htm',
  'https://dantri.com.vn/su-kien.htm',
  'https://dantri.com.vn/suc-khoe.htm',
  'https://dantri.com.vn/suc-khoe/benh-gan.htm',
  'https://dantri.com.vn/suc-khoe/dai-dich-covid-19.htm',
  'https://dantri.com.vn/suc-khoe/kien-thuc-gioi-tinh.htm',
  'https://dantri.com.vn/suc-khoe/lam-dep.htm',
  'https://dantri.com.vn/suc-khoe/ngay-thay-thuoc-viet-nam.htm',
  'https://dantri.com.vn/suc-khoe/tu-van.htm',
  'https://dantri.com.vn/suc-khoe/ung-thu.htm',
  'https://dantri.com.vn/suc-manh-so.htm',
  'https://dantri.com.vn/suc-manh-so/di-dong-vien-thong.htm',
  'https://dantri.com.vn/suc-manh-so/dien-may.htm',
  'https://dantri.com.vn/suc-manh-so/nghe-nhin.htm',
  'https://dantri.com.vn/suc-manh-so/phan-mem-bao-mat.htm',
  'https://dantri.com.vn/suc-manh-so/thi-truong-cong-nghe.htm',
  'https://dantri.com.vn/suc-manh-so/thu-thuat.htm',
  'https://dantri.com.vn/suc-manh-so/vi-tinh.htm',
  'https://dantri.com.vn/tam-long-nhan-ai.htm',
  'https://dantri.com.vn/tam-long-nhan-ai/danh-sach-ket-chuyen.htm',
  'https://dantri.com.vn/tam-long-nhan-ai/danh-sach-ung-ho.htm',
  'https://dantri.com.vn/tam-long-nhan-ai/hoan-canh.htm',
  'https://dantri.com.vn/the-gioi.htm',
  'https://dantri.com.vn/the-gioi/bau-cu-tong-thong-my-2020.htm',
  'https://dantri.com.vn/the-gioi/chau-a.htm',
  'https://dantri.com.vn/the-gioi/chau-my.htm',
  'https://dantri.com.vn/the-gioi/diem-nong.htm',
  'https://dantri.com.vn/the-gioi/eu-nga.htm',
  'https://dantri.com.vn/the-gioi/kieu-bao.htm',
  'https://dantri.com.vn/the-gioi/tu-lieu.htm',
  'https://dantri.com.vn/the-thao.htm',
  'https://dantri.com.vn/the-thao/bong-da-chau-au.htm',
  'https://dantri.com.vn/the-thao/bong-da-trong-nuoc.htm',
  'https://dantri.com.vn/the-thao/cac-mon-the-thao-khac.htm',
  'https://dantri.com.vn/the-thao/hau-truong.htm',
  'https://dantri.com.vn/the-thao/tennis.htm',
  'https://dantri.com.vn/the-thao/vo-thuat.htm',
  'https://dantri.com.vn/tinh-yeu-gioi-tinh.htm',
  'https://dantri.com.vn/tinh-yeu-gioi-tinh/chuyen-cua-toi.htm',
  'https://dantri.com.vn/tinh-yeu-gioi-tinh/gia-dinh.htm',
  'https://dantri.com.vn/tinh-yeu-gioi-tinh/tinh-yeu.htm',
  'https://dantri.com.vn/tuyen-sinh.htm',
  'https://dantri.com.vn/tuyen-sinh/bi-quyet-hoc-va-thi.htm',
  'https://dantri.com.vn/tuyen-sinh/chi-tieu-diem-chuan.htm',
  'https://dantri.com.vn/tuyen-sinh/de-thi-dap-an.htm',
  'https://dantri.com.vn/van-hoa.htm',
  'https://dantri.com.vn/van-hoa/am-nhac.htm',
  'https://dantri.com.vn/van-hoa/dien-anh.htm',
  'https://dantri.com.vn/van-hoa/doi-song-van-hoa.htm',
  'https://dantri.com.vn/van-hoa/hat-giong-tam-hon.htm',
  'https://dantri.com.vn/van-hoa/huong-vi-viet.htm',
  'https://dantri.com.vn/van-hoa/san-khau-dan-gian.htm',
  'https://dantri.com.vn/van-hoa/tet-doan-vien.htm',
  'https://dantri.com.vn/van-hoa/van-hoc.htm',
  'https://dantri.com.vn/video-page.htm',
  'https://dantri.com.vn/xa-hoi.htm',
  'https://dantri.com.vn/xa-hoi/chinh-tri.htm',
  'https://dantri.com.vn/xa-hoi/dai-hoi-dang.htm',
  'https://dantri.com.vn/xa-hoi/giao-thong.htm',
  'https://dantri.com.vn/xa-hoi/ho-so.htm',
  'https://dantri.com.vn/xa-hoi/moi-truong.htm',
  'https://dantri.com.vn/xa-hoi/phong-su-ky-su.htm',
  'https://vietnamnet.vn/',
  'https://vnexpress.net/'
]

const blacklist = { patterns, urls }

export default blacklist
