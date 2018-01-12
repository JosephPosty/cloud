import axios from 'axios';

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                alert('Api--ok');
                resolve(res.data);
            })
            .catch((error) => {
                console.log(err);
                reject(error);
            })
    })
}