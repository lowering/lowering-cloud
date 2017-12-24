import { promise, BASE_URL } from "../utils";

export async function findAll(param){
    return promise(`${BASE_URL}/account/menus`);
}
