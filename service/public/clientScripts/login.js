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

function getToken() {
  var loginUrl = "http://localhost:3000/users/login"
  var xhr = new XMLHttpRequest();
  var emailElement = document.getElementById('loginUserEmail');
  var passwordElement = document.getElementById('loginUserPassword');
  var tokenElement = document.getElementById('token');
  var user = emailElement.value;
  var password = passwordElement.value;

  xhr.open('POST', loginUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.addEventListener('load', function() {
    var responseObject = JSON.parse(this.response);
    console.log(responseObject);
    if (responseObject.user.token) {
      tokenElement.innerHTML = responseObject.user.token;
    } else {
      tokenElement.innerHTML = "No token received";
    }
  });

  var sendObject = JSON.stringify({email: user, password: password});

  console.log('going to send', sendObject);

  xhr.send(sendObject);
}
