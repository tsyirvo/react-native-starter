function serialize(obj) {
  const str = [];
  Object.keys(obj).filter((key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      str.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
    }
    return key;
  });
  return str.join('&');
}

function goTo(action, store, next, payload, meta) {
  if (typeof action !== 'function') {
    /* eslint-disable no-console */
    console.error('fetchMiddleware require a function for onStart, onSuccess, onFailure');
    /* eslint-enable no-console */
    return;
  }

  const res = action(payload, meta, store.dispatch, store.getState);
  if (res) {
    next(res);
  }
}

let config = {
  base: '',
  onRequest: null,
  defaultParams: null,
};

const fetchMiddleware = store => next => (action) => {
  if (!action.url) {
    return next(action);
  }
  let request = {
    url: action.url,
    method: action.method || 'GET',
    headers: action.headers,
    body: action.body,
    mode: action.mode || 'cors',
  };

  if (config.defaultParams || action.params) {
    request.params = { ...config.defaultParams, ...(action.params || {}) };
  }

  if (config.onRequest) {
    request = { ...request, ...config.onRequest(request, store.getState(), action) };
  }

  if (action.onStart) {
    goTo(action.onStart, store, next);
  }

  const baseUrl = action.base || config.base;
  const params = request.params ? `?${serialize(request.params)}` : '';
  const { headers, body, method, mode } = request;
  fetch(`${baseUrl}${request.url}${params}`, {
    method,
    headers,
    body: JSON.stringify(body),
    mode,
  })
  .then((response) => {
    return response.json().then((result) => {
      return { status: response.status, ok: response.ok, body: result };
    }).catch(() => {
      return { status: response.status, ok: response.ok, body: {} };
    });
  })
  .then((response) => {
    if (response.ok) {
      if (action.onSuccess) {
        goTo(action.onSuccess, store, next, response.body);
      }
    } else {
      const result = response.body;
      if (!response.body.error) {
        result.error = 'UnknownError';
      }

      if (action.onError) {
        goTo(action.onError, store, next, result, { httpCode: response.status });
      }
    }
  }, (response) => {
    if (action.onError) {
      goTo(action.onError, store, next, response.body, { httpCode: response.status });
    }
  });
  return null;
};

export default function (customConfig) {
  config = { ...config, ...customConfig };
  return fetchMiddleware;
}
