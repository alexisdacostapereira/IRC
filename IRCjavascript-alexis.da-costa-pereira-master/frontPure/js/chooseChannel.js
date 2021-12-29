const urlChannelApi = ipServer + "/channel";
const roomChoose = document.getElementById('room');

$.ajax({
    type: 'GET',
    dataType: 'json',
    url: urlChannelApi,
    success: function(value) {
        value.forEach(element => {
            if (element.name == "JavaScript") {
                roomChoose.innerHTML += "<option value=" + element.name + " selected>" + element.name + "</option>";
            } else {
                roomChoose.innerHTML += "<option value=" + element.name + ">" + element.name + "</option>";
            }
        });
    }
});