class XMLHttpRequestPromise {
  /**
   * XMLHttpRequest Constructor.
   * @returns {XMLHttpRequestPromise}
   */
  constructor() {
    this._xhr = new XMLHttpRequest();
    this._method = 'GET';
    this._url = '/';
    this._async = true;
    this._isOpen = false;
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
   * Gets the async status (Default: true).
   * @returns {boolean}
   */
  get async() {
    return this._async;
  }

  /**
   * Sets the HTTP Verb for the XMLHttpRequest.
   *
   * This value cannot be modified after the XMLHttpRequest is opened.
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
    if (this._isOpen) {
      throw Error(`XMLHttpRequestPromise: XMLHttpRequest is Open, with HTTP Verb ${this._method} going to URL ${this._url}`);
    }

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
   *
   * This value cannot be modified after the XMLHttpRequest is opened.
   * @param url
   * @returns {XMLHttpRequestPromise}
   */
  setUrl = (url: string): XMLHttpRequestPromise => {
    if (this._isOpen) {
      throw Error(`XMLHttpRequestPromise: XMLHttpRequest is Open, with HTTP Verb ${this._method} going to URL ${this._url}`);
    }

    this._url = url;
    return this;
  };

  /**
   * Sets Async value for the XMLHttpRequest.
   *
   * This value cannot be modified after the XMLHttpRequest is opened.
   * @param async
   *     true: XMLHttpRequest will be sent ASYNC
   *     false: XMLHttpRequest will be sent SYNCHRONOUSLY
   * @returns {XMLHttpRequestPromise}
   */
  setAsync = (async: boolean): XMLHttpRequestPromise => {
    if (this._isOpen) {
      throw Error(`XMLHttpRequestPromise: XMLHttpRequest is Open, with HTTP Verb ${this._method} going to URL ${this._url}`);
    }

    this._async = async;
    return this;
  };

  /**
   * Opens the XMLHttpRequest.
   *
   * Once open, HTTP Method, URL, and Async cannot be modified.
   * @returns {XMLHttpRequestPromise}
   */
  openRequest = (): XMLHttpRequestPromise => {
    if (this._isOpen) {
      throw Error(`XMLHttpRequestPromise: XMLHttpRequest is Open, with HTTP Verb ${this._method} going to URL ${this._url}`);
    }
    this.xhr.open(this.method, this.url, this.async);
    this._isOpen = true;
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
  setEventListener = (event: string, callback: Function, optionalCallback: Function|null, options?: boolean): XMLHttpRequestPromise => {
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
        throw Error(`XMLHttpRequestPromise: Event function ${event} not implemented.`);
      case 'loadstart':
        throw Error(`XMLHttpRequestPromise: Event function ${event} not implemented.`);
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
        throw Error(`XMLHttpRequestPromise: Event function ${event} not implemented.`);
      case 'readystatechange':
        throw Error(`XMLHttpRequestPromise: Event function ${event} not implemented.`);
      default:
        throw Error(`XMLHttpRequestPromise: Invalid listener event property ${event}.`);
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
  setUploadEventListener = (event: string, callback: Function, optionalCallback: Function|null, options?: boolean): XMLHttpRequestPromise => {
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
        throw Error(`XMLHttpRequestPromise: Event function ${event} not implemented.`);
      case 'loadstart':
        throw Error(`XMLHttpRequestPromise: Event function ${event} not implemented.`);
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
        throw Error(`XMLHttpRequestPromise: Event function ${event} not implemented.`);
      case 'readystatechange':
        throw Error(`XMLHttpRequestPromise: Event function ${event} not implemented.`);
      default:
        throw Error(`XMLHttpRequestPromise: Invalid listener event property ${event}.`);
    }

    this.upload.addEventListener(event, _function, options);
    return this;
  };

  /**
   *
   * @param body
   */
  sendRequest(body: String|Object|FormData) {
    if (!this._isOpen) {
      throw Error(`XMLHttpRequestPromise: XMLHttpRequest is not open.`);
    }

    /**
     * Inner function used to build the Promise.
     * @param request: XMLHttpRequestPromise (this).
     * @param requestBody: The Body of the XMLHttpRequest.
     *    URI Encoded String    -- GET
     *    Object                -- POST/PUT
     *    FormData              -- POST/PUT
     * @returns {Promise<any>}
     */
    let makeRequest = function (request: XMLHttpRequestPromise, requestBody: String|Object|FormData) {
      return new Promise((resolve, reject) => {
        request.xhr.onload = () => {
          if (request.xhr.status >= 200 && request.xhr.status < 300) {
            resolve(request.xhr.response);
          } else {
            reject({
              status: request.xhr.status,
              statusText: request.xhr.statusText,
            });
          }
        };
        request.xhr.onerror = () => {
          reject({
            status: request.xhr.status,
            statusText: request.xhr.statusText,
          });
        };

        request.xhr.send(requestBody);
      });
    };

    return makeRequest(this, body);
  }
}

export default XMLHttpRequestPromise;
