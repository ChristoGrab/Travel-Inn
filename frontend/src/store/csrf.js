import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
  // set method to 'GET' if there is no method
  options.method = options.method || 'GET';
  // set headers to an empty object if there are none
  options.headers = options.headers || {};

  // if the options.method is not 'GET', set the "Content-Type" header to
  // "application/json", and set "XSRF-TOKEN" head to the value of the 
  // "XSRF-TOKEN" cookie
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] =
      options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }

  // call the default window's fetch with the url and the options passed in
  const response = await window.fetch(url, options);

  // if the response status code is 400 or above, then throw an error with the
  // error being the response
  if (response.status >= 400) throw response;

  // if the response status code is under 400, then return the response to the
  // next promise chain
  return response;
}