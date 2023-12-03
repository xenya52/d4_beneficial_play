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
            const time_current = Date.now() / 1000
            const time_span = 8100
            const event = time_current % time_span
            const event_time_remaining = event
            const helltide_active = (time_span - event_time_remaining) / 60 - 60
            const helltide_inactive = (time_span - event_time_remaining + 900) / 60

            const body_active = `
<!!!HELLTIDE_ACTIVE!!!>
current Zone    = ${current_zone}
remaining time  = ${helltide_active.toFixed(0)}m
More infos?     = https://helltides.com/
`
            const body_inactive = `
<...HELLTIDE_INACTIVE...>
is unactive    
Zone            = ${current_zone}
remaining time  = ${helltide_inactive.toFixed(0)}m
`
            if(helltide_active > 0) {
                client.sendMessage(roomId, {
                    "msgtype": "m.text",
                    "body": body_active,
                })
            }
            else {
                client.sendMessage(roomId, {
                    "msgtype": "m.text",
                    "body": body_inactive,
                })
            }
                
        }

        else if (body.startsWith("diablo -l")) {
            const legion_data = await legion()
            console.log(legion_data)

            const current_zone = legion_data.zone
            console.log(current_zone)
            
            //Time calculation
            const time_current = Date.now() / 1000
            const time_span = 1500
            const event = time_current % time_span
            const event_time_remaining = event
            const legion_active = (time_span - event_time_remaining) / 60 
            const legion_inactive = (time_span - event_time_remaining - 330) / 60

            const body_active = `
<!!!LEGION_ACTIVE!!!>
current zone    = ${current_zone}
More infos?     = https://helltides.com/
`
            const body_inactive = `
<...LEGION_INACTIVE...>
Zone            = ${current_zone}
remaining time  = ${legion_inactive.toFixed(0)}
`
            if(legion_inactive < 0) {
                client.sendMessage(roomId, {
                    "msgtype": "m.text",
                    "body": body_active,
                })
            }
            else {
                client.sendMessage(roomId, {
                    "msgtype": "m.text",
                    "body": body_inactive,
                })
            }
        }
        else if (body.startsWith("diablo -b")) {
            const boss_data = await boss()
            console.log(boss_data)

            const current_zone = boss_data.zone
            console.log(current_zone)

            const time_current = Date.now() / 1000
            const timestamp_next = boss_data.nextExpected
            const boss_activity = (timestamp_next - time_current + 3870) / 60

             const body_inactive = `
<...WORLDBOSS_INACTIVE...>
Zone           = ${current_zone}
time remaining = ${boss_activity.toFixed(0)}m
`
            const body_active = `
<!!!WORLDBOSS_AKTIVE!!!>
Zone = ${current_zone}
`
            if(boss_activity < 0) {
                client.sendMessage(roomId, {
                    "msgtype": "m.text",
                    "body": body_active,
                })
            }
            else {
                client.sendMessage(roomId, {
                    "msgtype": "m.text",
                    "body": body_inactive,
                })
            }
        }
        else if (body.startsWith("diablo")) {
            diablo_help(client,roomId);
        }
    })
}

function diablo_help(client, roomId) {
    const body = `
diablo -w | Is diablo worthy to play?
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