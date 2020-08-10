const emailField = document.getElementById('email');
const nameField = document.getElementById('name');
const contactField =  document.getElementById('contact');
const form = document.getElementById('form');
const err =document.getElementById('error');

form.addEventListener('submit',(e)=>{cd
        var child = err.lastElementChild;  
        while (child) { 
            err.removeChild(child); 
            child = err.lastElementChild; 
    }
    event.preventDefault();
    const nameRegex = /^[a-zA-Z ]*$/ ;
    const contactRegex = /^\d+$/;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if(contactField.value.length!==10){
        let childErr = document.createElement('p');
        childErr.innerHTML = "Contact no. not valid!!"; 
        childErr.setAttribute('class','error__p');
        err.appendChild(childErr);
    }
    if(!nameRegex.test(nameField.value) && !contactRegex.test(contactField.value) && contactField.value.length===10 && !emailRegex.test(emailField.value) ){
        let childErr = document.createElement('p');
        childErr.innerHTML = "All fields are invalid 😥"; 
        childErr.setAttribute('class','error__p');
        err.appendChild(childErr);
    }
    else if(!nameRegex.test(nameField.value) &&   !contactRegex.test(contactField.value) && contactField.value.length===10){
        err.style.visibility = 'visible';
        let childErr = document.createElement('p');
        childErr.innerHTML = "Name should be text and Contact No. should be numeric 🙄"; 
        childErr.setAttribute('class','error__p');
        err.appendChild(childErr);
    }else if(!contactRegex.test(contactField.value) && !emailRegex.test(emailField.value) && contactField.value.length===10 ){
        err.style.visibility = 'visible';
        let childErr = document.createElement('p');
        childErr.innerHTML = "Email is not valid and Contact No. should be numeric 🙄";
        childErr.setAttribute('class','error__p');
        err.appendChild(childErr); 
    }else if(!nameRegex.test(nameField.value) && !emailRegex.test(emailField.value) && contactField.value.length===10){
        err.style.visibility = 'visible';
        let childErr = document.createElement('p');
        childErr.innerHTML = "Email is not valid and Name should be text 😶";
        childErr.setAttribute('class','error__p');
        err.appendChild(childErr);
    }   
    else{
        if(!nameRegex.test(nameField.value)){
            err.style.visibility = 'visible';
            let childErr = document.createElement('p');
            childErr.innerHTML = "Name should be text 😶"; 
            childErr.setAttribute('class','error__p');
            err.appendChild(childErr); 
        }
        if(!contactRegex.test(contactField.value)){
            err.style.visibility = 'visible';
            let childErr = document.createElement('p');
            childErr.innerHTML = "Contact No. should be numeric 🙄";
            childErr.setAttribute('class','error__p');
            err.appendChild(childErr); 
        }
        
        if(!emailRegex.test(emailField.value)){
            err.style.visibility = 'visible';
            let childErr = document.createElement('p');
            childErr.innerHTML = "Email is not valid!!";
            childErr.setAttribute('class','error__p');
            err.appendChild(childErr); 
        }
    }
    
})