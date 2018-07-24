import isomorphicFetch from 'isomorphic-fetch';

function throwErrorIfStatusNotOk(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

async function parseJsonIfHeaderPresent(response) {
  const isJson = response.headers
    .get('content-type')
    .toLowerCase()
    .includes('application/json');

  if (isJson) {
    return response.json();
  } else {
    return response;
  }
}

function fetch(url, options = {}) {
  return isomorphicFetch(url, options)
    .then(throwErrorIfStatusNotOk)
    .then(parseJsonIfHeaderPresent);
}

export default fetch;
