import fetch from 'dva/fetch';

export const TOKEN_KEY = "_token";
export const REFRESH_TOKEN_KEY = "_refresh_token";
export const BASE_URL = "http://localhost:8103";


/**
 * 验证是否登录
 */
export function isAuthenticated() {
    let token = obtainToken();
    return isToken(token);
}

export function isToken(token){
    if (type(token) === 'string'){
        return /^[\w\d]{8}-[\w\d]{4}-[\w\d]{4}-[\w\d]{4}-[\w\d]{12}$/.test(token);
    }
    return false;
}

/**
 * 获取token
 * @returns {string | null}
 */
export function obtainToken() {
    return sessionStorage.getItem(TOKEN_KEY);
}

/**
 * 存储token
 * @param token
 */
export function storeToken(token) {
    sessionStorage.setItem(TOKEN_KEY,token);
}

/**
 * 删除token
 */
export function removeToken() {
    sessionStorage.removeItem(TOKEN_KEY);
}

function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}
export function type(value) {
    if (value === undefined) {
        return "undefined";
    }
    if (value === null){
        return "null";
    }
    return Object.prototype.toString.call(value).slice(8,-1).toLowerCase();
}
export function promise(url, options = {}) {
    if (!options.headers){
       options.headers = {};
    }
    options.headers["Authorization"] = "Bearer " + obtainToken();
    options.headers["Content-Type"] = "application/json;charset=utf-8";
    return ajax(url,options);
}
export function ajax(url,options) {
    let promise = fetch(url,options);
    return promise.then(checkStatus).then(parseJSON).then(data => data).catch(err => ({err}));
}
