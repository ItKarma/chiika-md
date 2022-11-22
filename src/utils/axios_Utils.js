import axios from "axios";

 export  async function axiosUtils (url) {
    let data = await axios.get(`${url}`);
    return data ;
}


export  async function axiosUtilsPost (url) {
    let data = await axios.post(`${url}`);
    return data ;
}