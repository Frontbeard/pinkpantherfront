const regexName = /^[a-z]{1,25}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPassword = /^.{6,}$/;
//const regexCharacteristic = /^(?!0)\d{1,3}$/
//const regexImage = /^(ftp|http|https):\/\/[^ "]+$/

function validation(data) {
  const errors = {};
  //if(!regexID.test(data.id)) errors.id = 'Enter a valid ID'
  //if(!expresionRegular.test(data.id)) errors.id = '1 to 35 characters length required'
  //if(!regexName.test(data.name)) errors.name = 'Name must contain at least one number and a length of 6 to 10 characters'

  if (!regexName.test(data.name)) {
    errors.name = "Only letters accepted (Maximum 25)";
  }
  if (!regexEmail.test(data.email)) errors.email = "Enter a valid email";
  if (!regexPassword.test(data.password))
    errors.password = "Password must be at least 6 characters";
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords do not match";

  //if(!regexImage.test(data.image)) errors.image = 'Only valid http links accepted'
  //   console.log("errores", errors);
  return errors;
}

export default validation;
