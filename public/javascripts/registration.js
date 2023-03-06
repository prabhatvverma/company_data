const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cnfpassword = document.getElementById('cnfpassword');

form.addEventListener('submit', bfrsubvalidation => {
    bfrsubvalidation.preventDefault();
    validateinputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querSelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querSelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error')
}

const validateinputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const cnfpasswordValue = cnfpassword.value.trim();

    if (usernameValue === '') {
        setError(username, 'Usersname is required');
    } else {
        setSuccess(username);
    }

    if(emailValue === ''){
        setError(email ,'Email is required');
    } else {
        setSuccess(email);
    }

    if(password === ''){
        setError(password, 'Password is required')
    }
    // else if (password.length<8){
    //     setError(password,'Password must be at least 8 charecter')
    // }
    else{
        setSuccess(password);
    }

    if(cnfpassword === ''){
        setError(cnfpassword, 'Please conferm your password');
    }else if(cnfpasswordValue !== passwordValue){
        setError(cnfpassword ,"Passowrds Doesn't match");
    }else{
        setSuccess(cnfpassword);
    }
};