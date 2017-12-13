import { promise } from '../utils';

export async function findAll() {
    return promise("http://localhost:8103//account/roles");
}
