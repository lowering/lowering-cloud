import { promise,ajax } from '../utils';

export async function findAll() {
    return promise("http://localhost:8103/account/users");
}

export async function login(params){
    console.log({...params,"grant_type":"password"});
    return ajax("http://localhost:8103/account/oauth/token",{
        method: 'POST',
        headers: {
            "Authorization": "Basic dWk6dWk=",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: {"username":"admin","password":"admin","grant_type":"password"}
    })
}
