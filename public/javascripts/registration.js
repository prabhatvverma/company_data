const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const btn = document.getElementById('submit_btn');
let count1 = 1;
let count2 = 1;
let count3 = 1;
let count4 = 1;
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function uservar() {
    const usernameValue = username.value.trim();
    if (usernameValue === '') {
        count1++;
        setError(username, 'Username is required');
    } else {
        count1=0;
        setSuccess(username);
    }
}
function emailvar() {
    const emailValue = email.value.trim();
    if (emailValue === '') {
        count2++;
        setError(email, 'Email is required');
    } if (!isValidEmail(emailValue)) {
        count2++;
    } else {
        count2=0;
        setSuccess(email);
    }
}

function passwordvar() {
    const passwordValue = password.value.trim();
    if (passwordValue === '') {
        count3++;
        setError(password, 'Password is required');
        form.setAttribute('onsubmit', 'return false')
    } else if (passwordValue.length < 8) {
        count3++;
        setError(password, 'Password must be at least 8 character.')
    } else {
        count3=0;
        setSuccess(password);
    }
}

function cnfpassword() {
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    if (password2Value === '') {
        count4++;
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue ) {
        count4++;
        setError(password2, "Passwords doesn't match");
    } else {
        count4=0;
        setSuccess(password2);
    }
}

let temp = () => {

    // console.log("outer count ==", count1);
    if (count1 == 0 & count2 == 0 & count3 == 0 & count4 == 0) {
        form.setAttribute('onsubmit', 'return true')
    } else {
        form.setAttribute('onsubmit', 'return false')
    }
}
