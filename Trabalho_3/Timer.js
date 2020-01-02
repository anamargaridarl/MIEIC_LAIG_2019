let lasttime = Date.parse(new Date());

function starttime() {
    let t = Date.parse(new Date()) - lasttime;
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));

    document.getElementById('d').innerHTML = days;
    document.getElementById('h').innerHTML = hours;
    document.getElementById('m').innerHTML = minutes;
    document.getElementById('s').innerHTML = seconds;

}