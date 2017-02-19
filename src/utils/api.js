const API = '';

/* ***** *****  API call  ***** ******/

export const apiCall = (url, actionSuccess, actionFailure, method = 'GET', body = {}) => {
  return (dispatch) => {
    return fetch(`${API}${url}`, {
      method,
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        return response.json();
      })
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
  };
};
