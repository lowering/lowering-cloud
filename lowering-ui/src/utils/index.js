import fetch from 'dva/fetch';

export const TOKEN_KEY = "_token";
export const REFRESH_TOKEN_KEY = "_refresh_token";
export const BASE_URL = "http://localhost:8103";
/**
 * 在指定时间后执行指定的函数
 * @param func
 * @param delay
 * @param immediate
 */
export function debounce(func, delay, immediate) {
    // immediate默认为false
    let timeout, args, context, timestamp, result;

    const later = function() {
        // 当delay指定的时间间隔期间多次调用debounce返回的函数，则会不断更新timestamp的值，导致last < delay && last >= 0一直为true，从而不断启动新的计时器延时执行func
        let last = Date.now() - timestamp;
        if (last < delay && last >= 0) {
            timeout = setTimeout(later, delay - last);
        } else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };

    return function() {
        context = this;
        args = arguments;
        timestamp = Date.now();
        // 第一次调用该方法时，且immediate为true，则调用func函数
        let immediate = immediate && !timeout;
        // 在delay指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
        if (!timeout) timeout = setTimeout(later, delay);
        if (immediate) {
            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    };
}


export function getPlainNode(nodes, path = '') {
    const arr = [];
    nodes.forEach((node) => {
        const item = node;
        item.path = `${path}/${item.path || ''}`.replace(/\/+/g, '/');
        item.exact = true;
        if (item.children && !item.component) {
            arr.push(...getPlainNode(item.children, item.path));
        } else {
            if (item.children && item.component) {
                item.exact = false;
            }
            arr.push(item);
        }
    });
    return arr;
}

/**
 * 获取Cookie
 * @param name Cookie名称
 * @returns string,null 返回Cookie的值  如果没有  就返回null
 */
export function getCookie(name) {
    if (!name || type(name) !== 'string'){
        return null;
    }
    let regexp = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    let cookies = document.cookie.match(regexp);
    if(cookies){
        return decodeURIComponent(cookies[2]);
    } else {
        return null;
    }

}

/**
 * 保存值到Cookie中
 * @param name Cookie的键
 * @param value Cookie的值
 * @param expire 过期时间 毫秒
 */
export function setCookie(name, value, expire) {
    if (!name || type(name) !== 'string'){
        return ;
    }
    let expires = '';
    if (type(expire) === 'number'){
        let date = new Date(Date.now() + expire);
        expires = `;expires=${date.toGMTString()}`;
    }
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}`;
}

/**
 * 删除Cookie
 * @param name
 */
export function removeCookie(name) {
    if (!name || type(name) !== 'string'){
        return ;
    }
    let value = getCookie(name);
    if (value != null) {
        setCookie(name,value,-1);
    }
}

/**
 * 判断给定的数据的类型
 * @param value
 * @returns {string}
 */
export function type(value) {
    if (value === null){
        return 'null';
    }
    if (value === undefined){
        return 'undefined';
    }
    return Object.prototype.toString.call(value).slice(8,-1).toLowerCase();
}

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
    return getCookie(TOKEN_KEY);
}

/**
 * 存储token
 * @param token
 */
export function storeToken(token) {
    setCookie(TOKEN_KEY,token);
}

/**
 * 删除token
 */
export function removeToken() {
    removeCookie(TOKEN_KEY);
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

/**
 * 发送ajax
 * @param url
 * @param options
 * @returns {*}
 */
export function promise(url, options = {}) {
    if (!options.headers){
        options.headers = {};
    }
    options.headers["Authorization"] = "Bearer " + obtainToken();
    options.headers["Content-Type"] = "application/json;charset=utf-8";
    return ajax(url,options);
}

/**
 * 发送ajax
 * @param url
 * @param options
 * @returns {*|Promise<T | {err: any}>}
 */
export function ajax(url,options) {
    let promise = fetch(url,options);
    return promise.then(checkStatus).then(parseJSON).then(data => data).catch(err => ({err}));
}

/**
 * 生成uuid
 * @returns {string}
 */
export function uuid() {
    let base = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return base.replace(/[xy]/g, function(matchs) {
        let random = Math.random()*16|0 ;
        let uuid = matchs === 'x' ? random : (random&0x3|0x8);
        return uuid.toString(16);
    });
}

