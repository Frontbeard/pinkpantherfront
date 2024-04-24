import Item from "./Item";
import { PRODUCTS, RESOURCES, COMPANY } from "./Menus";

const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16">
      <Item Links={PRODUCTS} title="Menu" />
      <Item Links={RESOURCES} title="Ayuda" />
      <Item Links={COMPANY} title="Términos" />
      
    </div>
  );
};

export default ItemsContainer;