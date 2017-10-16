import 'whatwg-fetch';
import Toast from '@components/Toast/index.js';

function errorToast(err = {}) {
	const message = (err.error && err.error.message) ? err.error.message : '点评去吃四喜小丸子了！';
	Toast(message);
}

export const get = (url, params = {}, direct, tip = true) => {
	return new Promise((resolve, reject) => {
		let extraUrl = '';
		if (params) {
			const paramUrls = [];
	    Object.keys(params).forEach((key) => {
				typeof params[key] !== 'undefined' && paramUrls.push(`${key}=${params[key]}`);
	    });
			if (paramUrls.length) extraUrl = `?${paramUrls.join('&')}`;
	  }
		fetch(url + extraUrl, {
			credentials: 'include'
		}).then(response => response.json())
		.then((res) => {
			// console.log('get res: ' + JSON.stringify(res));
			if (direct) {
				resolve(res);
			} else if (Number(res.code) === 200) {
				resolve(res.data);
			} else if (Number(res.status) === 0) {
				resolve(res.data);
			} else {
				errorToast(res);
				reject(res);
			}
		}, (err) => {
			errorToast(err)
			reject(err);
		}).catch((err) => {
			errorToast(err);
			reject(err);
		});
	});
}



export const post = (url = '', params = {}, direct, isForm) => {
	return new Promise((resolve, reject) => {
		const headers = {};
		let body = params;
		if (!isForm) {
			body = JSON.stringify(params);
			headers['Content-type'] = 'application/json;charset=utf-8';
		}
		fetch(url, {
			method: 'post', headers, body, credentials: 'include',
		}).then(response => response.json())
		.then((res) => {
      if (Number(res.code) === 200 || Number(res.status) === 0) {
        resolve(direct ? res : res.data);
      } else {
				errorToast(res);
        reject(res);
      }
		}, (err) => {
      errorToast(err);
      reject(err);
    }).catch((err) => {
      errorToast(err);
			reject(err);
		});
	});
};
