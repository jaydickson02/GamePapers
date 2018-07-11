var ipc = require('electron').ipcRenderer;
var username;
var loop = true;

//Functions
ActivateCW = function(username){
    if(username){
    loop = true;
    //Send message to main process to run CW function
    ipc.send('run-app', username);

  } else {
    console.log("No content in textbox")
  }
}

//Waits untill the user clicks the button
var subButton = document.getElementById('submit');

subButton.addEventListener('click', () => {
var textbox = document.getElementById('TextBox');
var username = textbox.value;

ActivateCW(username);

})
