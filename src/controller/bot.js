import {
    MatrixClient,
    SimpleFsStorageProvider,
    AutojoinRoomsMixin,
    MatrixAuth,
} from "matrix-bot-sdk"

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

export function diablo_commands(client, helltide, boss, legion) {
    client.on("room.message", async (roomId, event) => {

        if (! event["content"]) return;
        
        const sender = event["sender"];
        const body = event["content"]["body"];

        const current_date = new Date().getTime()

        console.log(`${roomId}: ${sender} says '${body}`);

        if (body.startsWith("diablo -w")) {
        }
        else if (body.startsWith("diablo -h")) {
            const helltide_data = await helltide()
            console.log(helltide_data)

            const event_start = helltide_data.timestamp * 1000
            const time_span = (current_date - event_start) / 1000 / 60
            const event_start_hours = new Date(helltide_data.timestamp / 1000).getHours()
            const event_start_minutes = new Date(helltide_data.timestamp / 1000).getMinutes()

            const body = `Zone = ${helltide_data.zone}
Time = ${event_start_hours}h ${event_start_minutes}min
Remaining = ${time_span.toFixed(0)}min`
            if (helltide_data.refresh > 0) {
                client.sendMessage(roomId,{
                    "msgtype": "m.text",
                    "body": body,
                })
            }
            else {
                client.sendMessage(roomId, {
                    "msgtype": "m.text",
                    "body": "Helltide is active! See: https://helltides.com/"
                })
            }
        }
        else if (body.startsWith("diablo -l")) {
            const legion_data = legion
            console.log(legion)
        }
        else if (body.startsWith("diablo -w")) {
             console.log(await boss())
        }
    })
}

function diablo_help(client, roomId) {
    client.sendMessage(roomId, {
        "msgtype": "m.text",
        "body": "-w = Is diablo worthy to play",
    })
}
async function diablo_worthy(client, roomId, helltide, boss, legion) {
    client.sendMessage(roomId, {
        "msgtype": "m.text",
        "body": "worthy function coming...",
    })
    //console.log(await diablo_site_data())
    return diablo_site_helltide_data
}