import { myConfig } from './config';

export const userService = {
    login
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${myConfig.apiUrl}`, requestOptions)
        .then(handleResponse)
        .then(data => {
            console.log(data);
            return data;
        });
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text;
        if (!response.ok) {
            if (response.status === 404) {
                const apinotfound = "cannot make connection with the post login api";
                return Promise.reject(apinotfound);
            }

            const error = data;
            return Promise.reject(error);
        }

        return data;
    });
}