export const formatCurrency = (value) => {
    // Verificar si el valor es válido
    if (typeof value === 'number' && !isNaN(value)) {
        // Formatear el valor como moneda
        return value.toLocaleString('pt-AR', { style: 'currency', currency: 'ARS' });
    } else {
        // Devolver el valor original si no es válido
        return value;
    }
}
