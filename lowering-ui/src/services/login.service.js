import { ajax,BASE_URL } from '../utils';
import qs from 'qs';

export async function login(params){
    return ajax(`${BASE_URL}/account/oauth/token`,{
        method: 'POST',
        headers: {
            "Authorization": "Basic dWk6dWk=",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: qs.stringify({...params,"grant_type":"password"})
    })
}
