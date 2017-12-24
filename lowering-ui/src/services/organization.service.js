import { promise, BASE_URL } from "../utils";

export async function findAll(params){
    return promise(`${BASE_URL}/account/organizations`);
}
