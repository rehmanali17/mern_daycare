export const patterns = {
    email: /^([a-zA-Z0-9.-])+@([a-zA-Z])+\.([a-zA-Z]{2,8})$/ ,
    password: /^[a-zA-Z0-9 ]{6,}$/,
    phone: /^03[0-4]\d{8}$/,
    name: /^([a-zA-Z ])+$/,
    address: /^([\w-. ])+$/
};

export const validate = (field, regex)=>{
    if(regex.test(field.value)){
        field.classList.remove('invalid')
        field.classList.add('valid')
    }else{
        field.classList.remove('valid')
        field.classList.add('invalid')
    }
}

export const handleFormSubmit = (inputs)=>{
    let checkResult = true;
    // try{
    //     const textarea = document.querySelector('textarea');
    //     if(textarea.value === ""){
    //         textarea.style.borderColor = "red";
    //         const parentElement = textarea.parentElement
    //         if(parentElement.childElementCount > 1){
    //             parentElement.lastChild.remove()
    //         }
    //         parentElement.innerHTML += "<p class='invalidfile'>Message field cannnot be empty</p>";
    //         checkResult = false;
    //     }
    // }catch(error){
    //     //
    // }
    for(let input of inputs) {
        if(input.classList.contains('invalid')){
            checkResult = false;
        }else if(input.value === ''){
                console.log(input.type)
                input.classList.add('invalid');
                checkResult = false    
        }
    }
    return checkResult;
}
