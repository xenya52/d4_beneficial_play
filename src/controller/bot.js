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

            //Time calculation
            const time_current = Date.now()
            const time_begin = 1700328600 * 1000
            const time_span = 8100 * 1000
            const time_after = time_begin + time_span

            const body_active = `<!!!HELLTIDE!!!>
is active
remaining time  = 
current zone    = ${current_zone}
More infos?     = https://helltides.com/`
            const body_unactive = `<HELLTIDE>
is unactive    
Zone    = ${current_zone}
current = ${time_current}
begin   = ${time_begin}
span    = ${time_span}
after   = ${time_after}`
            if (time_current > time_begin) { //helltide is active
                client.sendMessage(roomId, {
                    "msgtype": "m.text",
                    "body": body_unactive,
                })
            }
            else { //helltide is not active

            }
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