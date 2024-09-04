const form = document.getElementById('form');
const usernameValidator = document.getElementById('usernameValidator');
const emailValidator = document.getElementById('emailValidator');
const passwordValidator = document.getElementById('passwordValidator');
const confirmPasswordValidator = document.getElementById('confirmPasswordValidator');

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

function checkInputs() {
        console.log('here')
        const usernameValue = usernameValidator.value.trim();
        const emailValue = emailValidator.value.trim();
        const passwordValue = passwordValidator.value.trim();
        const confirmPasswordValue = confirmPasswordValidator.value.trim();
        
    if (usernameValue === '') {
           setErrorFor(usernameValidator, 'Username cannot be blank');
    }  else {   
        setSuccessFor(usernameValidator);
    }


    if (emailValue === '') {
        setErrorFor(emailValidator, 'Email cannot be Blank');
    }else if(!isEmail(emailValue)){
    setErrorFor(emailValidator, 'Email is not valid');
    } else {
    setSuccessFor(emailValidator);
    } 


    if(passwordValue === '') {
        setErrorFor(passwordValidator, 'Password cannot be blank');
       } else {
       setSuccessFor(passwordValidator);
     }

     if(confirmPasswordValue === '') {
        setErrorFor(confirmPasswordValidator, 'Field cannot be left blank');
       } else if(passwordValue !== confirmPasswordValue){
        setErrorFor(confirmPasswordValidator, 'Must match the password field');
       }
       else {
       setSuccessFor(confirmPasswordValidator);
     }
        
}
        
function setErrorFor(input, message) {
         const formControl = input.parentElement; //.form-control
         const small = formControl.querySelector('small');
         formControl.className = 'form-control error';
         //Add error message inside small
         small.innerText = message;
}        

function setSuccessFor(input){

    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1-3}\.[0-9]{1,3}\.[0-9]{1-3}])|(([a-zA-z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  //return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
 } 