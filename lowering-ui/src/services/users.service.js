import { promise,BASE_URL } from '../utils';

export async function findAll() {
    return promise(`${BASE_URL}/account/users`);
}

export async function findOne(id){
    return promise(`${BASE_URL}/account/users/${id}`);
}

