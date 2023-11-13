import {
    MatrixClient,
    SimpleFsStorageProvider,
    AutojoinRoomsMixin,
    MatrixAuth,
} from "matrix-bot-sdk"
import { diablo_site_data } from "./scrape.js";

export async function login(homeserverUrl, username, password) {
    const auth = new MatrixAuth(homeserverUrl);
  const client = await auth.passwordLogin(username, password);

  return client.accessToken;
}

export function initBot(homeserverUrl, accessToken, storageFile) {
    const storage = new SimpleFsStorageProvider(storageFile);
    const client = new MatrixClient(homeserverUrl, accessToken, storage);
  
    AutojoinRoomsMixin.setupOnClient(client);
  
    client.start().then(() => console.log("Client started!"));
    return client;
}

export function diablo_commands(client) {
    client.on("room.message", (roomId, event) => {

        if (! event["content"]) return;
        
        const sender = event["sender"];
        const body = event["content"]["body"];

        console.log(`${roomId}: ${sender} says '${body}`);

        if (body.startsWith("diablo -h")) {
            diablo_help(client,roomId)
        }
        else if (body.startsWith("diablo -w")) {
            diablo_worthy(client,roomId)
        }
    })
}

function diablo_help(client, roomId) {
    client.sendMessage(roomId, {
        "msgtype": "m.text",
        "body": "-w = Is diablo worthy to play",
    })
}
async function diablo_worthy(client, roomId) {
    client.sendMessage(roomId, {
        "msgtype": "m.text",
        "body": "worthy function coming...",
    })
    console.log(await diablo_site_data())
}