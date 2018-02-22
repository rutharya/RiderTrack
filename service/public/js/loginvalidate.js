var usernameerr = document.getElementById("usernameerror");
var passworderror = document.getElementById("passworderror");
var rpassworderror = document.getElementById("repeatpassworderror");
var emailerror = document.getElementById("emailerror");
var loginpwderror = document.getElementById("loginpassworderror");
var loginemailerror  = document.getElementById("loginemailerror");
var resetemailerror = document.getElementById("resetEmailerror");

var resetEmail = document.getElementById("resetEmail");

var loginuserpwd = document.getElementById("loginUserPassword");
var loginuseremail = document.getElementById("loginUserEmail");


var regemail = document.getElementById("signUpUserEmail");
var regpwd = document.getElementById("signUpUserPassword");
var reregpwd = document.getElementById("signUpUserRepeatPassword");
var username = document.getElementById("signUpUserName");

regemail.addEventListener("blur",emailVerify, true);
username.addEventListener("blur", usernameVerify, true);
regpwd.addEventListener("blur", passwordVerify, true);
reregpwd.addEventListener("blur", repeatPasswordVerify, true);
loginuserpwd.addEventListener("blur", loginpaswordVerify, true);
loginuseremail.addEventListener("blur", loginusernameVerify, true);

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

    if(flag == 0){
        return true;
    }
    else return false;

}


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

        if (!regpwd.value.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")) {
            regpwd.style.border = "1px solid red";
            passworderror.innerText = "Passwords must have at least 8 characters and contain at least one of the following: uppercase letters, lowercase letters, numbers, and symbols.";
        } else {
            console.log("herepwd")
            regpwd.style.border = "1px solid #ccc";
            passworderror.innerText = "";
        }


    }
    else if(regpwd.value === ""){

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
