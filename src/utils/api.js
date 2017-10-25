import Config from 'react-native-config';
import { Observable } from 'rxjs';

const { API } = Config;
const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const checkStatus = res => {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }
  const error = new Error(res.statusText);

  error.res = res;
  throw error;
};

const parseJSON = res => {
  return res.json();
};

export const getEpic = url => {
  const request = fetch(`${API}${url}`, defaultHeaders,
    )
    .then(res => checkStatus(res))
    .then(data => parseJSON(data));

  return Observable.fromPromise(request)
    .do(data => console.log('Get res', data))
};

export const postEpic = (url, body) => {
  console.log('Post content', body);		
  
  const request = fetch(`${API}${url}`, {
      ...defaultHeaders,
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then(res => checkStatus(res))
    .then(data => parseJSON(data));

  return Observable.fromPromise(request)
    .do(data => console.log('Post res', data))
};

export const putEpic = (url, body) => {
  const request = fetch(`${API}${url}`, {
      ...defaultHeaders,
    method: 'PUT',
    body: JSON.stringify(body),
  })
    .then(res => checkStatus(res))
    .then(data => parseJSON(data));

  return Observable.fromPromise(request)
    .do(data => console.log('Put res', data))
};

export const delEpic = url => {
  const request = fetch(`${API}${url}`, {
      ...defaultHeaders,
    method: 'DELETE',
  })
    .then(res => checkStatus(res))
    .then(checkedRes => parseJSON(checkedRes));

  return Observable.fromPromise(request)
    .do(data => console.log('Del res', data))
};
