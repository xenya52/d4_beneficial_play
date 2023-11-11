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
    const client = new MatrixClient(homeserverUrl, accessToken);
  
    AutojoinRoomsMixin.setupOnClient(client);
  
    client.start().then(() => console.log("Client started!"));
    return client;
}