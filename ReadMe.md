To set up the bot its important to have docker installed and to set up you own dotenv config

First Dotenv:
1. `sudo vim .env``
2. Write following content
MATRIX_USER=[Your usr/bot name]                 //The name on what ac the bot should run
MATRIX_PW=[Your user/bot password]              //The password on what ac the bot should run
MATRIX_ROOMID=[Your room id]                    //The room id where the bot should listen
MATRIX_HOMESERVER=[Your matrix homeserver]      //I use "https://matrix.org"
BOT_STORAGE= [Your json file]                   //My preverence "bot.json"
API_URL="https://d4armory.io/api/events/recent" //The api that i use to get the requests

At the end it should look like this:

`MATRIX_USER="my_bot_name"`
`MATRIX_PW="password123"`
`MATRIX_ROOMID="dadadadadadaddadadda:matrix.org"`
`MATRIX_HOMESERVER="https://matrix.org"`
`BOT_STORAGE="bot.json"`
`API_URL="https://d4armory.io/api/events/recent"`

Second Docker:
1. sudo docker build ./         //Build the Dockerfile
2. sudo docker images           //Check the ImageID (third col)
3. sudo docker run [ImageID]    //Run docker image as container on you executing os

Thats all