// 日期对象
function formatDate(s) {
	var dateObj = s ? new Date(s) : new Date();
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

//判断 是否是闰年
function runNian(_year) {
	if(_year % 400 === 0 || (_year % 4 === 0 && _year % 100 !== 0)) {
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
	for(; i <= _month; i++) {
		switch(i) {
			case 1:
				allDay = 31;
				break;
			case 2:
				if(runNian(_year)) {
					allDay = 29;
				} else {
					allDay = 28;
				}
				break;
			case 3:
				allDay = 31;
				break;
			case 4:
				allDay = 30;
				break;
			case 5:
				allDay = 31;
				break;
			case 6:
				allDay = 30;
				break;
			case 7:
				allDay = 31;
				break;
			case 8:
				allDay = 31;
				break;
			case 9:
				allDay = 30;
				break;
			case 10:
				allDay = 31;
				break;
			case 11:
				allDay = 30;
				break;
			case 12:
				allDay = 31;
				break;
		}
	}
	console.log(allDay);
	return allDay;
}
//日期，超出，不合理，返回 正确日期对象(纠正日期超过30天，则不能format)
function overDate(_y, _m, _d) {
	var rightDate = {};
	var curDayNum = allDayNum(_y, _m);
	if(_d > curDayNum) {
		_m++;
		if(_m > 12) {
			_m = 1;
			_y++;
		}
		_d -= curDayNum;

	} else if(_d < 1) {
		_m--;
		if(_m < 1) {
			_m = 12;
			_y--;
		}
		_d = allDayNum(_y, _m) + _d + 1;
	}
	rightDate.y = _y;
	rightDate.m = _m;
	rightDate.d = _d;
	rightDate.w = getDateWeek(_y, _m, _d);
	return rightDate;
}

//指定日期，转成 星期几
function getDateWeek(_y, _m, _d) {
	var str = _y + "/" + _m + "/" + _d;
	var dataInfo = new Date(str);
	var week = "";
	switch(dataInfo.getDay()) {
		case 0:
			week = "日";
			break;
		case 1:
			week = "一";
			break;
		case 2:
			week = "二";
			break;
		case 3:
			week = "三";
			break;
		case 4:
			week = "四";
			break;
		case 5:
			week = "五";
			break;
		case 6:
			week = "六";
			break;
	}
	return week;
}
//复制日期
function actionDateObj() {
	var _dateObj = _date();
	//curdateObj 初始化
	var curdateObj = {};
	for(var i in _dateObj) {
		curdateObj[i] = _dateObj[i];
	}
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

	if(_day - 1 < 1) {
		if(_month - 1 < 1) {
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

//获取 今日 0:00 时间戳
function getDayTime() {
    let date = new Date();
    let times = date.getTime();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let dayTime = times - hour * 3600 * 1000 - minute * 60 * 1000 - second * 1000;
    return dayTime
}


// 数字 转 y m d
function calcDayYYYMMDD(day) {
    let _y = parseInt(day / 10000).toString();
    let _m = (parseInt(day / 100 % 100)).toString().padStart(2, "0");
    let _d = parseInt(day % 100).toString().padStart(2, "0");
    return [_y, _m, _d];
}

// 计算 day 所在天，的周一
function getDayFirstDate(day) {
    let [y, m, d] = calcDayYYYMMDD(day);
    let Nowdate = new Date(new Date(`${y}/${m}/${d}`).setHours(0, 0, 0, 0));
    let weekDay = Nowdate.getDay();
    weekDay = weekDay ? weekDay - 1 : 6;
    let _first_day = new Date(Nowdate.getTime() - weekDay * 86400000).getTime(); // 本周第一天
    let _first_date = formatDate(_first_day)
    return [_first_date.y, _first_date.m, _first_date.d];
}

// 计算 day 所在天，的周日
function getDayLastDate(day) {
    let [y, m, d] = calcDayYYYMMDD(day);
    let Nowdate = new Date(new Date(`${y}/${m}/${d}`).setHours(0, 0, 0, 0));
    let weekDay = Nowdate.getDay();
    weekDay = weekDay ? weekDay - 1 : 6;
    let _last_day = new Date(Nowdate.getTime() + (7 - weekDay) * 86400000 - 1).getTime(); // 本周第一天
    let _last_date = formatDate(_last_day)
    return [_last_date.y, _last_date.m, _last_date.d];
}

// 获取 几天前 0点的 timestamp
function getBeforedayStart(day) {
    let now = Date.now();
    return new Date(now - day * 86400000).setHours(0, 0, 0, 0);
}

// 获取 几天前 24点的 timestamp
function getBeforedayEnd(day) {
    let now = Date.now();
    return new Date(now - day * 86400000).setHours(23, 59, 59, 999);
}

// 获取某天的开始时间
function getOneDayStart([y, m, d]) {
    return new Date(y, m * 1 - 1, d).setHours(0, 0, 0, 0);
}
function getOneDayEnd([y, m, d]) {
    return new Date(y, m * 1 - 1, d).setHours(23, 59, 59, 999);
}

// 获取某月有多少天
function getMonthLength(year, month) {
    return new Date(year, month, 0).getDate();
}

// 获取某天的开始时间  by timestamp
function getDayStartByTimeStamp(d) {
    return new Date(d).setHours(0, 0, 0, 0);
}
function getDayEndByTimeStamp(d) {
    return new Date(d).setHours(23, 59, 59, 999);
}

