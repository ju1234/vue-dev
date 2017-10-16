let API_URL = 'api';
let URL_PREFIX = 'https://m.51ping.com';

if (process.env.NODE_ENV === 'production') {
  const origin = window.location.origin;
  if (origin.indexOf('dianping') > -1)  {
    API_URL = 'https://m.dianping.com';
    URL_PREFIX = 'https://m.dianping.com'
  } else {
    API_URL = 'https://m.51ping.com';
    URL_PREFIX = 'https://m.51ping.com'
  }
} else {
}
export {
  API_URL,
  URL_PREFIX
};
