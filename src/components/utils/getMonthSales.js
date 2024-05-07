export const getMonthSales = (sales, month) => {
    const monthSales = sales.filter(sale => {
        // Supongamos que las fechas de las ventas están en formato YYYY-MM-DD
        const saleDate = new Date(sale.orderDate);
        return saleDate.getMonth() === month;
    });
    return monthSales;
}
