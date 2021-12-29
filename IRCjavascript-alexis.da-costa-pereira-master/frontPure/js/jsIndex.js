function joinChat() {
    // Vibrate for 500ms
    const userRegister = document.getElementById('username').value();
    const userRoom = document.getElementById('room').value();
console.log(userRegister, userRoom)
localStorage.setItem('userRegister',userRegister);
localStorage.setItem('userRoom',userRoom);
    navigator.vibrate([500]);

}