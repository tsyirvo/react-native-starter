const API = 'http://jsonplaceholder.typicode.com';
const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const checkStatus = (res) => {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }
  const error = new Error(res.statusText);

  error.res = res;
  throw error;
};

const parseJSON = (res) => {
  return res.json();
};

export async function get(url) {
  try {
    const res = await fetch(`${API}${url}`, defaultHeaders);
    const checkedRes = await checkStatus(res);
    const data = await parseJSON(checkedRes);

    console.log('Get res', data); // eslint-disable-line
    return data;
  } catch (error) {
    console.log('Get error', error); // eslint-disable-line
    return error;
  }
}

export async function post(url, body) {
  console.log('Post body', body); // eslint-disable-line

  try {
    const res = await fetch(`${API}${url}`, {
      ...defaultHeaders,
      method: 'POST',
      body,
    });
    const checkedRes = await checkStatus(res);
    const data = await parseJSON(checkedRes);

    console.log('Post res', data); // eslint-disable-line
    return data;
  } catch (error) {
    console.log('Post error', error); // eslint-disable-line
    return error;
  }
}

export async function put(url, body) {
  console.log('Put body', body); // eslint-disable-line

  try {
    const res = await fetch(`${API}${url}`, {
      ...defaultHeaders,
      method: 'PUT',
      body,
    });
    const checkedRes = await checkStatus(res);
    const data = await parseJSON(checkedRes);

    console.log('Put res', data); // eslint-disable-line
    return data;
  } catch (error) {
    console.log('Put error', error); // eslint-disable-line
    return error;
  }
}

export async function del(url) {
  try {
    const res = await fetch(`${API}${url}`, defaultHeaders);
    const checkedRes = await checkStatus(res);
    const data = await parseJSON(checkedRes);

    console.log('Del res', data); // eslint-disable-line
    return data;
  } catch (error) {
    console.log('Del error', error); // eslint-disable-line
    return error;
  }
}
