import fetch from 'node-fetch';

 async function fetchGet_Utils (url) {
    let data = await fetch(`${url}`);
    return data.json()
}

export { fetchGet_Utils }