const regexTitle = /^.{3,40}$/;
const regexDescription = /^.{10,100}$/;
const regexPoints = /.+/;

function validationReview(data) {
  const errors = {};
  if (!regexTitle.test(data.title)) {
    errors.title = "El titulo debe ser 3 caracteres minimo y 40 maximo";
  }
  if (!regexDescription.test(data.description))
    errors.description =
      "La descripcion debe ser de 10 caracteres minimo y 100 maximo";
  if (!regexPoints.test(data.points))
    errors.points = "La puntuacion no debe estar vacia";

  return errors;
}

export default validationReview;
