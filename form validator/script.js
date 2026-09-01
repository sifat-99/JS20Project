const form = document.getElementById('form');
const password1El = document.getElementById('password1');
const password2El = document.getElementById('password2');

const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');

let isValid = false;
let passwordMatch = false;

function processFormData(e) {
    e.preventDefault();
    validateForm();
    if (isValid && passwordMatch) {
        storeFormData();
    }
}

function storeFormData() {
    const user = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        website: form.website.value,
        password: form.password.value,
    }
    console.log(user);
    form.reset();


}


function validateForm() {
    isValid = form.checkValidity();
    // console.log(isValid);
    if (!isValid) {
        message.textContent = 'Please fill out all fields!!'
        message.style.color = 'red';
        messageContainer.style.borderColor = 'red';
        return;
    }

    if (password1El.value == password2El.value) {
        passwordMatch = true;
        password1El.style.borderColor = 'green';
        password2El.style.borderColor = 'green';
    }
    else {
        passwordMatch = false;
        message.textContent = 'Make sure your passwords match!!';
        message.style.color = 'red';
        messageContainer.style.borderColor = 'red';
        return;
    }

    if (isValid && passwordMatch) {
        message.textContent = 'Form submitted successfully';
        message.style.color = 'green';
        messageContainer.style.borderColor = 'green';
    }
}





form.addEventListener('submit', processFormData)