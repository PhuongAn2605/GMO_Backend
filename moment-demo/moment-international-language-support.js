const moment = require('moment');

moment.locale('vn', {
  months : 'thang 1_thang 2_thang 3_thang 4_thang 5_thang 6_thang 7_thang 8_thang 9_thang 10_thang 11_thang 12'.split('_'),
  weekdays : 'thu hai_thu ba_thu tu_thu nam_thu sau_thu bay_chu nhat'.split('_'),
  relativeTime : {
      future : '%s sau',
      past : '%s truoc',
      s : 'giay',
      mm : '%d phut',
      hh : '%d gio',
      dd : '%d ngay',
      MM : '%d thang',
      yy : '%d nam'
  }
});

moment.locale('vn');

console.log(moment(1316116057185).fromNow());
// il y a une heure

console.log(moment().format('dddd Do MMMM, YYYY'));
// jeudi 9e janvier, 2020