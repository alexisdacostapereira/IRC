const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const msgSend = document.getElementById('messageBar');

const roomNameMobile = document.getElementById('room-name-mobile');

const userListMobile = document.getElementById('users-mobile');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io('http://localhost:30/');


// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
    msgSend.placeholder = 'Enter for send a message in #' + room;

});

// Message from server
socket.on('message', message => {
    outputMessage(message);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
//change with just enter input
// Get the input field
var inputMsg = document.getElementById("messageBar");

// Execute a function when the user releases a key on the keyboard
inputMsg.addEventListener("keyup", function(event) {

    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        // Get message text
        let msg = inputMsg.value;

        msg = msg.trim();
        if (!msg) {
            return false;
        }

        // Emit message to server
        socket.emit('chatMessage', msg);

        // Clear input
        inputMsg.value = '';
        inputMsg.focus();
    }
});
/*
chatForm.addEventListener('submit', e => {
    e.preventDefault();

    // Get message text
    let msg = e.target.elements.msg.value;

    msg = msg.trim();

    if (!msg) {
        return false;
    }

    // Emit message to server
    socket.emit('chatMessage', msg);

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});*/

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerHTML = message.username;
    p.innerHTML += ` <span>${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerHTML = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
    roomNameMobile.innerText = room
}

// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.innerText = user.username;
        userList.appendChild(li);
    });
    userListMobile.innerHTML = '';
    users.forEach(user => {
        const liMobile = document.createElement('li');
        liMobile.innerText = user.username;
        userListMobile.appendChild(liMobile);
    });
}

function newChan() {
    console.log("show modal")
}