import request from '../utils/request';

export async function findAll() {
    return request("/account/users");
}
