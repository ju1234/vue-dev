import KNB from '@dp/knb';

const isSupportWebp = !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;


 export const getNum = (str) => {
   if (!str) return '';
   str = String(str).trim().replace(/[^0-9]/ig, '');
   if (str) return Number(str) || '';
   return ''
 };

String.prototype.endWith=function(str){
  var reg=new RegExp(str+"$");
  return reg.test(this);
}

export const dpr = window.dpr || Number(document.documentElement.dataset.dpr || 1);
export const winWidth = window.innerWidth || document.documentElement.offsetWidtht;
export const winHeight = window.innerHeight || document.documentElement.offsetHeight;
export const picWidth = dpr * window.screen.width;

export const getTfsImg = (url, clip, width, height, quality) => {
  if (!url) return '';
  if (clip) {
    const splits = url.split('@');
    // let flag = splits.length === 1;
    // if (!flag) {
    //   const split = splits[splits.length - 1].split('_');
    //   flag = split.length !== 2 && split.length !== 3;
    // }
    const flag = splits[splits.length - 1].indexOf('_1e_1c') === -1;
    if (flag) {
      let suffix = [];
      if (width) suffix.push(`${width * dpr}w`);
      if (height) suffix.push(`${height * dpr}h`);
      if (quality) suffix.push(`${quality}q`);
      if (suffix.length) url += '@' + suffix.join('_') + '_1e_1c';
    }
    if (!isPC && isSupportWebp && url.indexOf('.webp') === -1) {
      url = `${url}.webp`;
    }
  }
  return url.replace('http://', 'https://');
  // res  = res.replace(/^http:/,"https:");
}


export const getMobileOS = (() => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if ((/iPhone/i).test(userAgent) || (/iPad/i).test(userAgent) || (/iPod/i).test(userAgent)) {
    return 'iOS';
  } else if ((/Android/i).test(userAgent)) {
    return 'Android';
  } else {
    return 'iOS';
  }
})();

export const isWeixinOrWeibo = (() => {
  const userAgent = window.navigator.userAgent;
  return (/MicroMessenger/i).test(userAgent) || (/WeiBo/i).test(userAgent);
})();

export const getUrlParamByName = (name) => {
	// const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
	const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
	const location = window.location.search === '' ? window.location.hash : window.location.search;
	const param = location.split('?');
	const r = param.length > 1 ? param[1].match(reg) : param[0].match(reg);
	if (r != null) return unescape(decodeURIComponent(r[2]));
	return null;
};

const isObject = (value) => {
	const type = typeof value;
	return value != null && (type === 'object' || type === 'function');
};

export const removeObjectEmptyValues = (obj) => {
	 if (typeof obj === 'undefined') return {};
	 const newObj = {};
	 Object.keys(obj).forEach((item) => {
		 if (obj[item] === null || obj[item] === '' || typeof obj[item] === 'undefined') {
			 return false;
		 }
		 if (isObject(obj[item])) {
			 return newObj[item] = removeObjectEmptyValues(obj[item]);
		 }
		 return newObj[item] = obj[item];
	 });
	 if (Array.isArray(obj)) {
		 newObj.length = obj.length;
		 return Array.from(newObj);
	 }
	 return newObj;
};



export const getStylePrefix = (style) => {
		const prefixs = [ 'webkit', 'Moz', 'ms', 'O' ];
    const dom = document.createElement('div').style;
    if (style in dom) return '';
    const newStyle = style.replace('-', ' ').replace(/(^|\s+)\w/g, s => s.toUpperCase()).replace(' ', '');
    // for (let i = 0; i < prefixs.length; i++) {
    for (const prefix of prefixs) {
        if ((prefix + newStyle) in dom) {
            return prefix;
        }
    }
    return null;
};

export const isSupportTransform3D = () =>
  window.Modernizr && window.Modernizr.csstransforms3d === true || (() => {
                const e = document.createElement('div').style;
                return 'webkitPerspective' in e || 'MozPerspective' in e || 'OPerspective' in e || 'MsPerspective' in e || 'perspective' in e;
            })();


export const clone = (source, dest) => {
	function _getType(obj) {
		const t = typeof obj;
    return (t === 'object' ? obj === null && 'null' || Object.prototype.toString.call(obj).slice(8, -1) : t).toLowerCase();
  }
	let destination = dest;
	if (!destination) {
    destination = _getType(source) === 'array' ? [] : {};
	}
  for (const key in source) {
		if ({}.hasOwnProperty.call(source, key)) {
			const type = _getType(source[key]);
      switch (type) {
        case 'array':
          !destination[key] && (destination[key] = []);
          clone(source[key], destination[key]);
          break;
        case 'object':
          !destination[key] && (destination[key] = {});
          clone(source[key], destination[key]);
          break;
        default:
          destination[key] = source[key];
      }
		}
  }
  return destination;
};

export const calculateDis = (lat1, lng1, lat2, lng2) => {
    const radLat1 = lat1 * Math.PI / 180.0;
    const radLat2 = lat2 * Math.PI / 180.0;
    const a = radLat1 - radLat2;
    const b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000; //1公里 = 1km
    return s
};

export const DateFormat = (date, fmt) => {
  let o = {
    "M+": date.getMonth() + 1, //月份
    "D+": date.getDate(), //日
    "H+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "s": date.getMilliseconds() //毫秒
  };
  if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

// 触发可监听事件
export const trigger = (e, detail) => {
    let event = null;
    try {
        event = new window.CustomEvent(e, {
            detail,
            bubbles: true,
            cancelable: true
        });
    } catch (err) {
        event = document.createEvent('Event');
        event.initEvent(e, true, true);
        event.detail = detail;
    }
    document.dispatchEvent(event);
};

export function isBrowerVisible() {
  if ('webkitHidden' in document) return !document.webkitHidden;
  if ('mozHidden' in document) return !document.mozHidden;
  if ('hidden' in document) return !document.hidden;
  return true;
}


// cookie
export function getCookie(name) {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  const arr = window.document.cookie.match(reg);
  if ( arr ) {
    return decodeURIComponent(arr[2]);
  } else {
    return null;
  }
}

// 登录
export function login() {
  return new Promise((resolve, reject) => {
    KNB.login({
      success: (user) => {
        if (user) {
          resolve(user.userId);
          // window.reload();
        } else {
          KNB.closeWebview({});
        }
      },
      fail: () => {
        KNB.closeWebview({});
      }
    });
  });
}