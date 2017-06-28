let Auth = (function () {
  function Auth(name) {
    this.name = name || 'auth';
    this._auth = null;
  }

  Auth.prototype.getAccessToken = function () {
    return getToken.call(this, 'accessToken');
  };

  Auth.prototype.setAccessToken = function (token, expireIn) {
    setToken.call(this, 'accessToken', token, expireIn);
    return this;
  };

  Auth.prototype.getRefreshToken = function () {
    return getToken.call(this, 'refreshToken');
  };

  Auth.prototype.setRefreshToken = function (token, expireIn) {
    setToken.call(this, 'refreshToken', token, expireIn);
    return this;
  };

  Auth.prototype.getTokenType = function () {
    let auth = this.getAuth();
    return auth ? auth['tokenType'] : null;
  };

  Auth.prototype.setTokenType = function (tokenType) {
    let auth = this.getAuth() || {};
    auth['tokenType'] = tokenType ? tokenType : null;
    saveAuth.call(this, auth);
    return this;
  };

  Auth.prototype.getMobilePhone = function () {
    let auth = this.getAuth();
    return auth ? auth['mobilePhone'] : null;
  };

  Auth.prototype.setMobilePhone = function (mobilePhone) {
    let auth = this.getAuth() || {};
    auth['mobilePhone'] = mobilePhone ? mobilePhone : null;
    saveAuth.call(this, auth);
    return this;
  };

  Auth.prototype.getAuth = function () {
    return this._auth ? this._auth : (this._auth = getAuth.call(this));
  };

  Auth.prototype.clear = function () {
    this._auth = saveAuth.call(this, null);
  };

  function checkExpires(tokenObj) {
    if (tokenObj && tokenObj.token && (!tokenObj.expires || tokenObj.expires > new Date().valueOf())) {
      return tokenObj.token;
    }
    return null;
  }

  function getAuth() {
    let auth = localStorage[this.name];
    return auth ? JSON.parse(auth) : null;
  }

  function saveAuth(auth) {
    if (auth) {
      localStorage[this.name] = JSON.stringify(auth);
    } else {
      localStorage.removeItem(this.name);
    }
    return auth;
  }

  function getToken(tokenName) {
    let auth = this.getAuth();
    return auth ? checkExpires(auth[tokenName]) : null;
  }

  function setToken(tokenName, token, expireIn) {
    let auth = this.getAuth() || {};
    let expires = expireIn ? new Date().valueOf() + expireIn * 1000 : null;
    auth[tokenName] = token ? {token: token, expires: expires} : null;
    saveAuth.call(this, auth);
  }

  return Auth;
})();

export default Auth;

