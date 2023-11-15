import "dotenv/config"
import {
    initBot, 
    login, 
    diablo_commands} from "./controller/bot.js"
import {
    diablo_site_helltide_data,
    diablo_site_legion_data,
    diablo_site_worldboss_data
} from "./controller/scrape.js"
import {
    MatrixClient,
    SimpleFsStorageProvider,
    AutojoinRoomsMixin
} from "matrix-bot-sdk";

const accessToken = await login(
    process.env.MATRIX_HOMESERVER,
    process.env.MATRIX_USER,
    process.env.MATRIX_PW
);

const client = initBot(
    process.env.MATRIX_HOMESERVER,
    accessToken,
    process.env.BOT_STORAGE
)

const message = diablo_commands(
    client,
    diablo_site_helltide_data,
    diablo_site_legion_data,
    diablo_site_worldboss_data
)