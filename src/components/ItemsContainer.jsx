import Item from "./Item";
import { PRODUCTS, RESOURCES, COMPANY, SUPPORT } from "./Menus";

const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16">
      <Item Links={PRODUCTS} title="PRODUCTOS" />
      <Item Links={RESOURCES} title="RECURSOS" />
      <Item Links={COMPANY} title="EMPRESA" />
      <Item Links={SUPPORT} title="SOPORTE" />
    </div>
  );
};

export default ItemsContainer;