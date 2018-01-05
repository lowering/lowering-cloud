import { promise,BASE_URL } from '../utils';

export async function findAll() {
    return promise(`${BASE_URL}/account/roles`);
}
