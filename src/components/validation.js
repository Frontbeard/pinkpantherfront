const regexName = /^[a-z]{1,25}$/
//const regexCharacteristic = /^(?!0)\d{1,3}$/
//const regexImage = /^(ftp|http|https):\/\/[^ "]+$/

function validation(data){
    const errors = {}
    //if(!regexID.test(data.id)) errors.id = 'Enter a valid ID'
    //if(!expresionRegular.test(data.id)) errors.id = '1 to 35 characters length required'
    //if(!regexName.test(data.name)) errors.name = 'Name must contain at least one number and a length of 6 to 10 characters'

    if(!regexName.test(data.name)) errors.name = 'Only letters accepted (Maximum 25)'
    //if(!regexImage.test(data.image)) errors.image = 'Only valid http links accepted'

    return errors

}

export default validation