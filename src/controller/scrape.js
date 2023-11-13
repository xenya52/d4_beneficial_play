import axios from "axios";
import "dotenv/config"

export function diablo_site_data() {
    const url = process.env.API_URL
    console.log(url)
    const helltide = axios.get(url) // Request.body.ashava oder so...
    return helltide
}