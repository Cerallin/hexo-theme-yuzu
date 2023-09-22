(function () {
  "use strict";

  HTMLCollection.prototype.forEach = function (callback) {
    return [].forEach.call(this, callback);
  }

  HTMLCollection.prototype.map = function (callback) {
    return [].map.call(this, callback);
  }

  NodeList.prototype.forEach = function (callback) {
    return [].forEach.call(this, callback);
  }

  NodeList.prototype.map = function (callback) {
    return [].map.call(this, callback);
  }

  this.request = async function (url, options = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }) {
    class RequestError extends Error {
      constructor(statusCode = 500, message = '') {
        super(`Got response of status ${statusCode}` + message);
      }
    };
    class NotFoundError extends RequestError {
      constructor(message = '') {
        super(404, message)
      }
    };
    class MaxRedirectExceededError extends Error {
      constructor() {
        super('Max redirects exceeded.')
      }
    }
    class ContentTypeError extends TypeError {
      constructor(contentType) {
        super(`Unsupported content type: ${contentType}, use json instead.`)
      }
    }

    const maxRedirects = 5;
    var response;

    for (let i = 0; i < maxRedirects; i++) {
      response = await fetch(url, options);
      if (response.status === 301 || response.status === 302) {
        url = response.headers.get('Location');
        if (!url)
          throw new RequestError(response.status, 'Redirection header (Location) not found.');
        else
          continue;
      }

      const contentType = response.headers.get('content-type');

      if (response.status === 404)
        throw new NotFoundError(`URL not found: ${url}`);
      else if (response.status !== 200)
        throw new RequestError(response.status, `Failed fetching search meta, got status ${response.status}`);

      if (!contentType.match(/application\/json/i))
        throw new ContentTypeError(contentType);

      return await response.json();
    }

    throw new MaxRedirectExceededError();
  }

  // Debounce based on timer
  this.debounce = function (fun, delay = 500) {
    return function (...args) {
      clearTimeout(fun.id);
      fun.id = setTimeout(() => {
        fun.call(this, ...args)
      }, delay);
    }
  }

  // Initialize an empty 'container'
  this.Theme = {};
}.call(this));
