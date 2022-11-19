import axios from "axios";

 export default async function axiosUtils (url) {
    let data = await axios.get(`${url}`);
    return data ;
}