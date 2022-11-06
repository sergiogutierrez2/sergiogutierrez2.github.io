const form = document.querySelector("form");
const nextBtn = form.querySelector(".nextBtn");
const backBtn = form.querySelector(".backBtn");
const submitBtn = form.querySelector(".submitBtn");
const allInput = form.querySelectorAll(".first input, .first select");
const totalInput = form.querySelectorAll(".second input, .second select");
const emailValidator = document.getElementById('emailValidator');        
const iconCheck = form.querySelectorAll('.fas fa-check-circle');


nextBtn.addEventListener("click", ()=> {
    let cond = 0;
    for (let i = 0; i < allInput.length; i++) {
        console.log(totalInput[i].value);
        if(allInput[i].value != "" && i !== 9){
            cond++;
        }
    }
    emailString = emailValidator.value.trim();

    if (!isEmail(emailString)){
      cond--;
      allInput[5].value = "";
    }    

    if (cond === 11){
        form.classList.add('secActive');
    }
    else{
        form.classList.remove('secActive');
    }
})

submitBtn.addEventListener("click", ()=> {
    let cond = 0;
    for (let i = 0; i < totalInput.length; i++) {
        console.log(totalInput[i].value);
        if((totalInput[i].value != "") && (i !== 4) && (i !== 11)){
            cond++;
        }
    }

    if (cond === 10){
        form.querySelector('.invi').style.visibility = "visible";
        backBtn.disabled = true;
        submitBtn.disabled = true;
        backBtn.style.backgroundColor = "Gray";
        submitBtn.style.backgroundColor = "Gray";
    }
})

backBtn.addEventListener("click", () => form.classList.remove('secActive'));

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1-3}\.[0-9]{1,3}\.[0-9]{1-3}])|(([a-zA-z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
 } 
