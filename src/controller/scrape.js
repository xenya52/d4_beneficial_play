import axios from "axios";
import "dotenv/config"

export async function diablo_site_helltide_data() {
    try {
        const url = process.env.API_URL
        //get whole json file
        const response = await axios.get(url); 
        //only return the helltide data
        return await response.data.helltide
        //If smth went wrong...
      } catch (error) {
        console.log(error);
      }
}

export async function diablo_site_worldboss_data() {
    try {
        const url = process.env.API_URL
        const response = await axios.get(url)
        return await response.data.boss
    } catch (error) {
        console.log(error)
    }
}


export async function diablo_site_legion_data() {
    try {
        const url = process.env.API_URL
        const response = await axios.get(url)
        return await response.data.legion
    } catch (error) {
        console.log(error)
    }
}