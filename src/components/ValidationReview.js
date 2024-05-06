const regexTitle = /^[a-zA-Z\s\d!@#$%^&*()\-_=+{}\[\]:";'<>?,.\/]{3,40}$/;
const regexComment = /^[a-zA-Z\s\d!@#$%^&*()\-_=+{}\[\]:";'<>?,.\/]{10,100}$/;
const regexReview = /^[1-5]$/;

function validationReview(data) {
  const errors = {};
  if (!regexTitle.test(data.title)) {
    errors.title = "El titulo debe ser 3 caracteres minimo y 40 maximo";
  }
  if (!regexComment.test(data.comment))
    errors.comment =
      "La descripcion debe ser de 10 caracteres minimo y 100 maximo";
  if (!regexReview.test(data.review))
    errors.review = "La puntuacion es de 1 a 5, no puede estar vacia";

  return errors;
}

export default validationReview;
