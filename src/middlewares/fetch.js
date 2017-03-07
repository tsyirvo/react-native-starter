function serialize(obj) {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    }
  }
  return str.join('&');
}

const goTo = (action, store, next, payload, meta) => {
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
};

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

  const baseUrl = action.base ? action.base : config.base;
  const params = request.params ? `?${serialize(request.params)}` : '';
  fetch(`${baseUrl}${request.url}${params}`, {
    method: request.method,
    headers: request.headers,
    body: JSON.stringify(request.body),
    mode: request.mode,
  })
  .then((response) => {
    return response.json().then((body) => {
      return { status: response.status, ok: response.ok, body };
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
      const body = response.body;
      if (!response.body.error) {
        body.error = 'UnknownError';
      }

      if (action.onError) {
        goTo(action.onError, store, next, body, { httpCode: response.status });
      }
    }
  }, (response) => {
    if (action.onError) {
      goTo(action.onError, store, next, response.body, { httpCode: response.status });
    }
  });
  return null;
};

export default function (custumConfig) {
  config = { ...config, ...custumConfig };
  return fetchMiddleware;
}
