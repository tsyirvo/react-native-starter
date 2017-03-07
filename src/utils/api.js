const API = '';

/* ***** *****  API call  ***** ******/

export function apiCall(url, actionSuccess, actionFailure, method = 'GET', body = {}) { // eslint-disable-line
  return dispatch => fetch(
    `${API}${url}`,
    {
      method,
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => response.json())
    .then((response) => {
      dispatch(actionSuccess(response));
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response); // eslint-disable-line no-console
      } else {
        console.log(error); // eslint-disable-line no-console
      }
      dispatch(actionFailure(error));
    });
}
