class XMLHttpRequestPromise {
  /**
   *
   * @returns {XMLHttpRequestPromise}
   */
  constructor() {
    this._xhr = new XMLHttpRequest();
    this._method = 'GET';
    this._url = '/';
    return this;
  }

  /**
   * Gets the XMLHttpRequest Object.
   * @returns {XMLHttpRequest}
   */
  get xhr() {
    return this._xhr;
  }

  /**
   * Gets the XMLHttpRequestUpload Object.
   * @returns {XMLHttpRequestUpload}
   */
  get upload() {
    return this._xhr.upload;
  }

  /**
   * Gets the current set HTTP Verb (Default: GET).
   * @returns {string}
   */
  get method() {
    return this._method;
  };

  /**
   * Gets the target URL (Default: /).
   * @returns {string}
   */
  get url() {
    return this._url;
  };

  /**
   * Sets the HTTP Verb for the XMLHttpRequest.
   * @param method: HTTP Verb,
   *    GET  (*Constructor Default)
   *    HEAD
   *    POST
   *    PUT
   *    DELETE
   *    CONNECT
   *    OPTIONS
   *    TRACE
   *    PATCH
   * @returns {XMLHttpRequestPromise}
   */
  setMethod = (method: string): XMLHttpRequestPromise => {
    method = method.toUpperCase();
    switch(method) {
      case 'GET':
      case 'HEAD':
      case 'POST':
      case 'PUT':
      case 'DELETE':
      case 'CONNECT':
      case 'OPTIONS':
      case 'TRACE':
      case 'PATCH':
        this._method = method;
        break;
      default:
        throw Error('Invalid HTTP Verb.');
    }
    return this;
  };

  /**
   * Sets the target URL for the XMLHttpRequest.
   * @param url
   * @returns {XMLHttpRequestPromise}
   */
  setUrl = (url: string): XMLHttpRequestPromise => {
    this._url = url;
    return this;
  };

  /**
   * Sets a request header for the XMLHttpRequest.
   * @param headerName
   * @param headerValue
   * @returns {XMLHttpRequestPromise}
   */
  setXhrHeader = (headerName: string, headerValue: string): XMLHttpRequestPromise => {
    this.xhr.setRequestHeader(headerName, headerValue);
    return this;
  };

  /**
   *
   * @param event
   * @param callback
   * @param optionalCallback
   * @param options
   * @returns {XMLHttpRequestPromise}
   */
  setEventListener = (event: string, callback: Function, optionalCallback?: Function, options?: boolean): XMLHttpRequestPromise => {
    let _function;
    
    switch(event) {
      case 'abort':
        _function = (evt) => {
          callback(evt);
        };
        break;
      case 'error':
        _function = (evt) => {
          callback(evt);
        };
        break;
      case 'load':
        _function = (evt) => {
          if (evt.target.status === 200) {
            callback(evt);
          } else {
            optionalCallback(evt);
          }
        };
        break;
      case 'loadend':
        throw Error('Event function not implemented.');
      case 'loadstart':
        throw Error('Event function not implemented.');
      case 'progress':
        _function = (evt) => {
          if (evt.lengthComputable) {
            const progress = Math.floor((evt.loaded * 100) / evt.total);
            callback(progress, evt);
          } else {
            callback(0, evt);
          }
        };
        break;
      case 'timeout':
        throw Error('Event function not implemented.');
      case 'readystatechange':
        throw Error('Event function not implemented.');
      default:
        throw Error('Invalid listener event property.');
    }

    this.xhr.addEventListener(event, _function, options);
    return this;
  };

  /**
   *
   * @param event
   * @param callback
   * @param optionalCallback
   * @param options
   * @returns {XMLHttpRequestPromise}
   */
  setUploadEventListener = (event: string, callback: Function, optionalCallback?: Function, options?: boolean): XMLHttpRequestPromise => {
    let _function;

    switch(event) {
      case 'abort':
        _function = (evt) => {
          callback(evt);
        };
        break;
      case 'error':
        _function = (evt) => {
          callback(evt);
        };
        break;
      case 'load':
        _function = (evt) => {
          if (evt.target.status === 200) {
            callback(evt);
          } else {
            optionalCallback(evt);
          }
        };
        break;
      case 'loadend':
        throw Error('Event function not implemented.');
      case 'loadstart':
        throw Error('Event function not implemented.');
      case 'progress':
        _function = (evt) => {
          if (evt.lengthComputable) {
            const progress = Math.floor((evt.loaded * 100) / evt.total);
            callback(progress, evt);
          } else {
            callback(0, evt);
          }
        };
        break;
      case 'timeout':
        throw Error('Event function not implemented.');
      case 'readystatechange':
        throw Error('Event function not implemented.');
      default:
        throw Error('Invalid listener event property.');
    }

    this.upload.addEventListener(event, _function, options);
    return this;
  };

  /**
   *
   * @param body
   */
  build(body: Object|FormData) {
    /**
     *
     * @param request
     * @param requestBody
     * @returns {Promise<any>}
     */
    let makeRequest = function (request: XMLHttpRequestPromise, requestBody: Object|FormData) {
      return new Promise((resolve, reject) => {
        request.xhr.open(request.method, request.url, true);
        request.xhr.onload = () => {
          if (this.status >= 200 && this.status < 300) {
            resolve(request.xhr.response);
          } else {
            reject({
              status: this.status,
              statusText: request.xhr.statusText,
            });
          }
        };
        request.xhr.onerror = () => {
          reject({
            status: this.status,
            statusText: request.xhr.statusText,
          });
        };

        request.xhr.send(requestBody);
      });
    };

    return makeRequest(this, body);
  }
}
