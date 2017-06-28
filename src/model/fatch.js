import axios from 'axios';
import Auth from './auth'

export default function axiosConfig(method, url, obj) {
  let auth = new Auth();
  let headers = {};

  if (auth.getAccessToken()) {
    headers.Authorization = auth.getTokenType() + ' ' + auth.getAccessToken();
  }

  let config = {
    url: url,
    data: obj,
    method: method,
    headers: headers
  };

  let promise = new Promise(function (resolve, reject) {
    axios(config).then(function (res) {
      return resolve(res);
    }).catch(function (err) {
      return reject(err);
    });
  });

  return promise;
};
