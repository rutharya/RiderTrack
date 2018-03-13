var auth_token;
function storageAvailable(type) {
  try {
    var storage = window[type],
      x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0;
  }
}

function init(){
  //ruthar: this will be our init script to ensure all the storage/browser versions and to add/remove landing page init features
  if (storageAvailable('localStorage')) {
    console.log('local storage is supported');
    if (localStorage.getItem('riderTrack')) {
      auth_token = JSON.parse(localStorage.getItem('riderTrack'));
    }
    else{
      //default user setting
      //auth token, not present, no need to do anything for now.
    }
}
}

init();
console.log(localStorage.getItem('riderTrack - init script loaded.'));

function onLogin(){
  var email = document.getElementById('user-email');
  var password = document.getElementById('user-pw').value;
  console.log('value of email and pwd');
  console.log(email.innerText);
  console.log(email.value);


}
