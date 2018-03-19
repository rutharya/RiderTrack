// Error elements, to display error messages when UI field error occur
var usernameerr = document.getElementById("usernameerror");
var passworderror = document.getElementById("passworderror");
var rpassworderror = document.getElementById("repeatpassworderror");
var loginerror = document.getElementById("wrongpassword");
var signuperror  = document.getElementById("signuperror");
var emailerror = document.getElementById("emailerror");
var loginpwderror = document.getElementById("loginpassworderror");
var loginemailerror  = document.getElementById("loginemailerror");
var resetemailerror = document.getElementById("resetEmailerror");

// Element of the UI forms: Reset Form
var resetEmail = document.getElementById("resetEmail");

// Element of the UI forms: Login form
var loginuserpwd = document.getElementById("loginUserPassword");
var loginuseremail = document.getElementById("loginUserEmail");

// Element of the UI forms: Sign Form
var regemail = document.getElementById("signUpUserEmail");
var regpwd = document.getElementById("signUpUserPassword");
var reregpwd = document.getElementById("signUpUserRepeatPassword");
var username = document.getElementById("signUpUserName");

// Adding event listeners to UI fields of Sign up and Login form
regemail.addEventListener("blur",emailVerify, true);
username.addEventListener("blur", usernameVerify, true);
regpwd.addEventListener("blur", passwordVerify, true);
reregpwd.addEventListener("blur", repeatPasswordVerify, true);
loginuserpwd.addEventListener("blur", loginpaswordVerify, true);
loginuseremail.addEventListener("blur", loginusernameVerify, true);


// UI field validation for reset password form
function validateResetLink(){
    if(resetEmail.validity.typeMismatch || resetEmail.value == ""){
        console.log("ereser");
        resetEmail.style.border = "1px solid red";
        resetemailerror.innerText = "Please Enter a valid email address";
        return false;
    }
    {
        resetEmail.style.border = "1px solid #ccc";
        resetemailerror.innerText = "";
    }
    return true;
}


// UI field validations for login form on button click.
function validateLogin(){
    var flag = 0;
    if(loginuseremail.value === ""){
        loginuseremail.style.border = "1px solid red";
        loginemailerror.innerText = "Please fill out the username";
        flag = 1;
    }
    if(loginuserpwd.value === ""){
        loginuserpwd.style.border = "1px solid red";
        loginpwderror.innerText = "Please enter your password";
        flag = 1;

    }
    if(flag == 0) {
        return true;}
    else return false;

}


// UI field validations for Sign Up form on button click.
function validateForm(){
    var flag = 0;
    // Check for Username field
    if(username.value == ""){
        username.style.border = "1px solid red";
        usernameerr.innerText = "Username is required";
        username.focus();
        flag = 1;
    }

    // Check for Email field
    if(regemail.value == ""){
        regemail.style.border = "1px solid red";
        emailerror.innerText = "Email is required";
        regemail.focus();
        flag = 1;
    }

    // Check for Password field
    if(regpwd.value == ""){
        regpwd.style.border = "1px solid red";
        passworderror.innerText = "Password is required";
        regpwd.focus();
        flag = 1;

    }

    if(flag) return false;

    return true;

}

// Event listeners for UI fields
function usernameVerify(){
    if(username.value != ""){
        username.style.border = "1px solid #ccc";
        usernameerr.innerText = "";
    }
    else if(username.value === ""){
        username.style.border = "1px solid red";
        usernameerr.innerText = "Username is required";

    }
}

function loginpaswordVerify(){
    if(loginuserpwd.value != ""){
        loginuserpwd.style.border = "1px solid #ccc";
        loginpwderror.innerText = "";
    }
    else if(loginuserpwd.value === ""){
        loginuserpwd.style.border = "1px solid red";
        loginpwderror.innerText = "Please enter your password";

    }
}

function loginusernameVerify(){
    if(loginuseremail.value != ""){
        loginuseremail.style.border = "1px solid #ccc";
        loginemailerror.innerText = "";
    }
    else if(loginuseremail.value === ""){
        loginuseremail.style.border = "1px solid red";
        loginemailerror.innerText = "Username is required";

    }
}

function emailVerify(){
    if(regemail.value != ""){

        if (regemail.validity.typeMismatch) {
            regemail.style.border = "1px solid red";
            emailerror.innerText = "Email should be of the format someone@example.com";
        } else {
            regemail.style.border = "1px solid #ccc";
            emailerror.innerText = "";
        }


    }
    else if(regemail.value === ""){
        console.log("here");
        regemail.style.border = "1px solid red";
        emailerror.innerText = "Email is required";

    }

}



function passwordVerify(){

    if(regpwd.value != ""){

        // if (!regpwd.value.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")) {
        //     regpwd.style.border = "1px solid red";
        //     passworderror.innerText = "Passwords must have at least 8 characters and contain at least one of the following: uppercase letters, lowercase letters, numbers, and symbols.";
        // } else {
        //     console.log("herepwd")
            regpwd.style.border = "1px solid #ccc";
          passworderror.innerText = "";
        // }


    }
     if(regpwd.value === ""){

        regpwd.style.border = "1px solid red";
        passworderror.innerText = "Password is required";

    }
}

function repeatPasswordVerify(){
    if(reregpwd.value != regpwd.value){
        reregpwd.style.border = "1px solid red";
        rpassworderror.innerText = "Password does not match with original";
    }
    else{
        reregpwd.style.border = "1px solid #ccc";
        rpassworderror.innerText = "";
    }

}


// Listener to Sign up form with id: signupform, for event on Submit.
document.getElementById('signupform').addEventListener('submit', signUpRequest);
console.log('hereagain');

function signUpRequest(e) {
   console.log('here in axios for sign up');
   // Assign proper values to dbConnection variable with the uri for prod db
    axios.post('/users', {
        email: regemail.value,
        password: regpwd.value,
        username: username.value
    })
        .then(function (response) {
           // Code in case of successful sign up
            //localStorage['username'] = regemail.value;
            alert('hi ');
            //localStorage['username'] = '';
            console.log('sign up success');
        })
        .catch(function (error) {

            // Code in case of sign up error
            //setSignUpWarning(error);

                console.log(error.response.body);
                if(error.response.status == 500){
                    setSignUpWarning();

                }


        });

    e.preventDefault();
}



// Listener to log in form with id: login form, for event on Submit.
<<<<<<< HEAD
document.getElementById('loginform').addEventListener('submit', loginRequest);
=======
//document.getElementById('loginform').addEventListener('submit', loginRequest);
>>>>>>> angular-app

function loginRequest(e) {



    console.log('here in axios for log in');
    // Assign proper values to dbConnection variable with the uri for prod db
    axios.post('/users/login', {
        email: loginuseremail.value,
        password: loginuserpwd.value

    })
        .then(function (response) {

            alert('success');
            console.log('Login Success');
        })
        .catch(function (error) {

            // Code in case of sign up error
            // Set Up Error messages in error fields
            //setLoginWarning(error);

            if(error.response.status === 422){
                setLoginWarning();
            }

        });

    e.preventDefault();
}


// Function to set error fields in case of login failure displaying appropriate warning
function setLoginWarning(){
    loginerror.innerText = "Email or Password is incorrect. Please try again";

}Error handling for login/sign up failures


// Function to set error fields in case of sign up failure displaying appropriate warning
function setSignUpWarning(){
    signuperror.innerText = "Rider validation failed: email or username is already taken";
}
