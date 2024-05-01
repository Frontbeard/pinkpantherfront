const charsRegex = /^[a-zA-Z\s]+$/;

function validation(data) {
    const errors = {};
    
    if (!data.name) {
        errors.name = "El nombre del producto es requerido.";
    } else if (!charsRegex.test(data.name)) {
        errors.name = "El nombre del producto no puede contener caracteres especiales.";
    }
    
    if (!data.color) {
        errors.color = "El color es requerido.";
    } else if (!charsRegex.test(data.color)) {
        errors.color = "El color no puede contener caracteres especiales.";
    }
   
    if (isNaN(data.priceEfectivo) || data.priceEfectivo <= 0) {
        errors.priceEfectivo = "El precio efectivo debe ser un número positivo.";
    }
    
    if (isNaN(data.priceCuotas) || data.priceCuotas <= 0) {
        errors.priceCuotas = "El precio en cuotas debe ser un número positivo.";
    }
  
    if (!data.size) {
        errors.size = "El talle es requerido.";
    }
 
    if (isNaN(data.quantity) || data.quantity <= 0) {
        errors.quantity = "La cantidad debe ser un número positivo.";
    }

    if (!data.supplier) {
        errors.supplier = "La fábrica es requerida.";
    }

    if (!data.Categories || data.Categories.length === 0) {
        errors.Categories = "Debes seleccionar al menos una categoría.";
    }
 
    if (!data.photo) {
        errors.photo = "Debes agregar al menos una imagen del producto.";
    }
    
    return errors;
}

export default validation;
