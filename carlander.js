//判断 是否是闰年
function runNian(_year) {
    if (_year % 400 === 0 || (_year % 4 === 0 && _year % 100 !== 0)) {
        return true;
    } else {
        return false;
    }
}
//判断 本月 多少天
function allDayNum(_year, _month) {
    var allDay = 0,
        y = _year - 1,
        i = 1;
    allDay = y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + 1;
    console.log(allDay);
    for (; i <= _month; i++) {
        switch (i) {
            case 1:
                allDay += 31;
                break;
            case 2:
                if (runNian(_year)) { allDay += 29; } else { allDay += 28 }
                break;
            case 3:
                allDay += 31;
                break;
            case 4:
                allDay += 30;
                break;
            case 5:
                allDay += 31;
                break;
            case 6:
                allDay += 30;
                break;
            case 7:
                allDay += 31;
                break;
            case 8:
                allDay += 31;
                break;
            case 9:
                allDay += 30;
                break;
            case 10:
                allDay += 31;
                break;
            case 11:
                allDay += 30;
                break;
            case 12:
                allDay += 31;
                break;
        }
    }
    console.log(allDay);
    return allDay;
}
// 日期对象
function _date() {
    var dateObj = new Date();
    var formatObj = {
        y: dateObj.getFullYear(),
        m: dateObj.getMonth() + 1,
        d: dateObj.getDate(),
        h: dateObj.getHours(),
        i: dateObj.getMinutes(),
        s: dateObj.getSeconds(),
        w: dateObj.getDay()
    }

    return formatObj;
}
//复制日期
function actionDateObj() {
    var _dateObj = _date();
    //curdateObj 初始化
    var curdateObj = {};
    for (var i in _dateObj) {
        curdateObj[i] = _dateObj[i];
    }
    console.log("copyDate" + JSON.stringify(curdateObj));
    return curdateObj;
}
//周日 是 几月 几号
function sunDay(_year, _month, _day) {
    var tmpdate = new Date(_year, _month - 1, _day);
    var curweek = tmpdate.getDay();
    //当前 日期 初始化
    var curdateObj = {};
    curdateObj.y = _year;
    curdateObj.m = _month;
    curdateObj.d = _day;
    curdateObj.sun = 0;

    if (_day - 1 < 1) {
        if (_month - 1 < 1) {
            curdateObj.m = 12;
            curdateObj.y -= 1;
            curdateObj.sun = _day - curweek + 31;

        } else {
            curdateObj.m -= 1;
            curdateObj.sun = allDayNum(_year, curdateObj.m) - curweek + _day;
        }
    } else {
        curdateObj.sun = curdateObj.d - curweek;
    }

    return curdateObj;
}
// 几天前 的 日期
function dayAgo(y, m, d, t) {
    var ss = t * 24 * 60 * 60 * 1000;
    var date_ = new Date().getTime();
    date_ -= ss;
    var dateObj = new Date(date_);
    var nowObj = {};
    nowObj.y = dateObj.getFullYear();
    nowObj.m = dateObj.getMonth() + 1;
    nowObj.d = dateObj.getDate();
    return nowObj;


}