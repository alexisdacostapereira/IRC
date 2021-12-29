const path = require('path');
const http = require('http');
const express = require("express");
cors = require("cors");
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const Chat = require("./db/schema/chatSchema");
const User = require("./db/auth/userShema");
const Channel = require("./db/schema/channelSchema");
/*en test*/
const connect = require("./db/dbConnection");
const routes = require('./db/route')
    /*    */
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('./utils/users');

const app = express();
const server = http.createServer(app);

const io = socketio(server);

// Set static folder (middleware)
app.use(express.static(path.join(__dirname, 'public')));
//name bot
const botName = 'Discord Bot ' + ' <span class="botTagRegular botTag remBot"><svg aria-label="Bot certifié" class="botTagVerified" aria-hidden="false" width="16" height="16" viewBox="0 0 16 15.2"><path d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z" fill="currentColor"></path></svg><span>SYSTÈME</span></span>';

const myUser = [];
// Run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {;
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
        //add user in list user actif
        myUser.push(user.username);
        // Welcome user
        socket.emit('message', formatMessage(botName, 'Welcome user!'));

        //info when user connect the room
        socket.broadcast
            .to(user.room)
            .emit(
                'message',
                formatMessage(botName, `${user.username} has joined`)
            );

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    // Listen message
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);
        //TODO change switch en if et add les cmds
        switch (msg) {
            case "/users":
                io.to(user.room).emit('message', formatMessage(botName, myUser));
                //db.utilisateur;
                let chatMessage = new Chat({ message: "/users", sender: user.username, channel: user.room, command: true });
                chatMessage.save();
                break;

            default:
                io.to(user.room).emit('message', formatMessage(user.username, msg))
                    //save chat to the database
                connect.then(db => {
                    console.log("Request message: " + msg + " in: " + user.room);
                    let chatMessage = new Chat({ message: msg, sender: user.username, channel: user.room, command: false });
                    chatMessage.save();
                });
                break;
        }
    });

    // client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            //remove user in list user actif
            removeMe = user.username;
            nb = myUser.indexOf(removeMe);
            myUser.splice(nb, 1);
            io.to(user.room).emit(
                'message',
                formatMessage(botName, `${user.username} has left the chat`)
            );
            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});
app.use(cors());

const PORT = process.env.PORT || 30
app.use(express.json());

const PORTapi = 60;

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
routes(app)


app.listen(PORTapi, () => {
    console.log(`api running on port: ${PORTapi}`);
})
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));