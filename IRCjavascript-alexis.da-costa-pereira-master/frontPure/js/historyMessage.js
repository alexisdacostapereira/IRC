url = ipServer + "/show?channel=" + room;
window.addEventListener('load', function() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: url,
        success: function(value) {
            value.forEach(element => {
                messageMemory(element.message, element.sender, element.createdAt)
            });
        }
    });

})

function messageMemory(message, senders, time) {
time
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerHTML = senders;
    p.innerHTML += ` <span>${time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerHTML = message;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
}