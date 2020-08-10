const emailField = document.getElementById('email');
const nameField = document.getElementById('name');
const contactField =  document.getElementById('contact');
const form = document.getElementById('form');

form.addEventListener('submit',(e)=>{
    event.preventDefault();
    const nameRegex = /^[a-zA-Z ]*$/ ;
    if(nameRegex.test(nameField.value)){
        nameField.parentNode.style.fontSize = "3rem";
        document.styleSheets[1].addRule('#namefield::after','background: green');
    }else{
        nameField.parentNode.style.fontSize = "0.2rem";
        document.styleSheets[1].addRule('#namefield::after',"background:#A80000");
    }
})