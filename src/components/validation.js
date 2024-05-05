const regexName = /^[a-zA-Z]{1,35}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPassword = /^.{6,}$/;
const regexDate = /^\d{4}-\d{2}-\d{2}$/;
const regexNumbers = /^\d{1,15}$/;
const regexPhoneNumber = /^\+?\d{1,3}[- ]?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;


//const regexCharacteristic = /^(?!0)\d{1,3}$/
//const regexImage = /^(ftp|http|https):\/\/[^ "]+$/

function validation(data) {
  const errors = {};
  //if(!regexID.test(data.id)) errors.id = 'Enter a valid ID'
  //if(!expresionRegular.test(data.id)) errors.id = '1 to 35 characters length required'
  //if(!regexName.test(data.name)) errors.name = 'Name must contain at least one number and a length of 6 to 10 characters'


  if (!regexName.test(data.name)) {
    errors.name = "Only letters accepted (Maximum 35)";
  }
  if (!regexName.test(data.firstName)) {
    errors.firstName = "Only letters accepted (Maximum 35)";
  }
  if (!regexName.test(data.lastName)) {
    errors.lastName = "Only letters accepted (Maximum 35)";
  }
  if (!regexName.test(data.city)) {
    errors.city = "Only letters accepted (Maximum 35)";
  }
  if (!regexName.test(data.street)) {
    errors.street = "Only letters accepted (Maximum 35)";
  }
  if (!regexEmail.test(data.email)) errors.email = "Enter a valid email";
  if (!regexPassword.test(data.password))
    errors.password = "Password must be at least 6 characters";
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords do not match";
  if (!regexDate.test(data.birthdate))
    errors.birthdate = "Date must be in YYY-MM-DD format";
  if (!regexNumbers.test(data.DNI))
    errors.DNI = "Only numbers accepted (Maximum 35)";
  if (!regexNumbers.test(data.streetNumber))
    errors.streetNumber = "Only numbers accepted (Maximum 35)";
  if (!regexPhoneNumber.test(data.telephone))
    errors.telephone = "Only valid telephone numbers";


  //if(!regexImage.test(data.image)) errors.image = 'Only valid http links accepted'
  //   console.log("errores", errors);
  return errors;
}

export default validation;
