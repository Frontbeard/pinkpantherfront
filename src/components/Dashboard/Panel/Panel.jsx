import React from "react";
import { useDispatch,useSelector } from "react-redux";

//aca iria la action
// import getAllOrders from "./../../../redux/actions/"


//muestra un resumen de las ventas mensuales y un gráfico de ventas por mes.

const Panel = () => {
    const dispatch = useDispatch();
    const allOrders = useSelector((state) => state.allOrders);
    const accessToken = useSelector((state) => state.accessToken);
  
    const months = [
      { name: "Enero", sales: getMonthSales(allOrders, 0) },
      { name: "Febrero", sales: getMonthSales(allOrders, 1) },
      { name: "Marzo", sales: getMonthSales(allOrders, 2) },
      { name: "Abril", sales: getMonthSales(allOrders, 3) },
      { name: "Mayo", sales: getMonthSales(allOrders, 4) },
      { name: "Junio", sales: getMonthSales(allOrders, 5) },
      { name: "Julio", sales: getMonthSales(allOrders, 6) },
      { name: "Agosto", sales: getMonthSales(allOrders, 7) },
      { name: "Septiembre", sales: getMonthSales(allOrders, 8) },
      { name: "Octubre", sales: getMonthSales(allOrders, 9) },
      { name: "Noviembre", sales: getMonthSales(allOrders, 10) },
      { name: "Diciembre", sales: getMonthSales(allOrders, 11) },
    ];
  
    useEffect(() => {
      dispatch(getAllOrders(accessToken));
    }, []);
  
    return (
      <div className="p-6">
        {/* <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <Resumen allOrders={allOrders} />
        </div> */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <Chart months={months} allOrders={allOrders} />
        </div>
      </div>
    );
  };
  
  export default Panel;