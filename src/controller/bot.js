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
        console.log(`${roomId}: ${sender} says '${body}`);

        if (body.startsWith("diablo -w")) {
        }

        else if (body.startsWith("diablo -h")) {
            const helltide_data = await helltide()
            console.log(helltide_data)

            const current_zone = helltide_data.zone
            console.log(current_zone)

            const body = `<HELLTIDE>
Zone = ${current_zone}`
            client.sendMessage(roomId, {
                "msgtype": "m.text",
                "body": body,
            })
        }

        else if (body.startsWith("diablo -l")) {
            const legion_data = await legion()
            console.log(legion_data)

            const current_zone = legion_data.zone
            console.log(current_zone)

            const body = `<LEGION>
Zone = ${current_zone}`
            client.sendMessage(roomId, {
                "msgtype": "m.text",
                "body": body,
            })
        }
        
        else if (body.startsWith("diablo -b")) {
             const boss_data = await boss()
             console.log(boss_data)

             const current_zone = boss_data.zone
             console.log(current_zone)

             const body = `<WORLDBOSS>
Zone = ${current_zone}`
            client.sendMessage(roomId, {
                "msgtype": "m.text",
                "body": body,
            })
        }
        else if (body.startsWith("diablo")) {
            diablo_help(client, roomId)
        }
    })
}

function diablo_help(client, roomId) {
    const body = `diablo -w | Is diablo worthy to play?
diablo -h | Information about helltide!
diablo -l | Information about legion!
diablo -b | Information about worldboss! >..[o-o]`
    client.sendMessage(roomId, {
        "msgtype": "m.text",
        "body": body,
    })
    return 0
}

// https://www.youtube.com/watch?v=dQw4w9WgXcQ