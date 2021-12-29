const navMobile = document.getElementById('nav-mobile');
const nav = document.getElementById('nav-content-mobile');

function size() {
    if ($(window).width() < 700 || $(window).height() < 480) {
        navMobile.style.display = "block";

    } else {
        navMobile.style.display = "none";
    }
    document.getElementById('userConnected').innerText = username;
};
size();

window.addEventListener('resize', function() {
    size();
});


function openNav() {
    nav.style.display = "block"
    navMobile.style.display = "none";

}

function closeNav() {
    nav.style.display = "none"
    navMobile.style.display = "block";
}