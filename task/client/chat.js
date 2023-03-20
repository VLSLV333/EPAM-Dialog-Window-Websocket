const ws = new WebSocket('ws://localhost:8080')
let userName = prompt('Please, provide your name')
while(!userName){
    userName = prompt('Please, provide your name')
}
ws.addEventListener('message', ev => {
    const {userName, inputToSend} = JSON.parse(ev.data)
    showMessage(inputToSend, userName, formatAMPM(new Date()))
})
document.querySelector('form').onsubmit = ev => {
    ev.preventDefault()
    const input = document.querySelector('input')
    const inputToSend = input.value;
    ws.send(JSON.stringify({
        userName, inputToSend
    }))
    showMessage(input.value, userName, formatAMPM(new Date()), true)
    input.value = ''
}
function showMessage(text, userName, time, isMine = false){
    document.getElementById('messages').innerHTML += `
    <div class='message-row ${isMine?'mine':'theirs'}'>
        <div class='user-name'>${userName}</div> 
        <div class='bubble'>${text}</div>
        <div class='time'>${time}</div>
    </div>
    `
}
function formatAMPM(date) {
    let hoursTillPM = 12;
    let secondsOneNum = 10;
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours >= hoursTillPM ? 'PM' : 'AM';
    hours = hours % hoursTillPM;
    hours = hours ? hours : hoursTillPM;
    minutes = minutes < secondsOneNum ? '0'+minutes : minutes;
    seconds = seconds < secondsOneNum ? '0'+seconds : seconds;
    let strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return strTime;
  }