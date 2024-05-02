import { Button, Switch, Table, Card } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons";
import EditProductModal from "../../../components/EditPorductModal/EditPorductModal";
// import updateProduct from "../../../redux/Actions/Product/updateProduct";
import { useMediaQuery } from "react-responsive";
import getAllProducts from "../../../redux/actions/Product/getAllProducts";

const ProductsTable = () => {
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const minMobile = useMediaQuery({ maxWidth: 500 });
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProductsAdmin);
  const allCatgories = useSelector((state) => state.allCategories);
  const accessToken = useSelector((state) => state.accessToken);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productUpdate, setProductUpdate] = useState({});

  const sortedProducts = products?.sort((a, b) => a.name.localeCompare(b.name));

  const handleActive = async (value, product) => {
    try {
      const response = await dispatch(
        updateProduct(
          {
            id: product.id,
            name: product.name,
            price: product.price,
            priceOnSale: product.priceOnSale || product.price,
            unitsSold: product.unitsSold,
            image: product.image,
            category: product.category,
            stock: product.stock,
            active: value,
          },
          accessToken
        )
      );
      if (response.message === "Producto editado correctamente")
        message.success("Producto editado correctamente", [2]);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(getAllProducts(accessToken));
    }
  };

  const columns = [
    {
      title: "Imagen",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} className="productsTableImage" alt="Product" />,
    },
    {
      title: "Nombre",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      key: "name",
      render: (text) => <p>{text.toUpperCase()}</p>,
    },
    {
      title: "Acciones",
      dataIndex: "",
      key: "action",
      render: (cell) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          size="small"
          onClick={() => {
            setShowEditModal(true), setProductUpdate(cell);
          }}
        />
      ),
    },
    {
      title: "Activo",
      dataIndex: "",
      key: "active",
      render: (cell) => (
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked={cell.active === true ? true : false}
          onChange={() =>
            handleActive(cell.active === true ? false : true, cell)
          }
        />
      ),
    },
  ];

  if (!isMobile) {
    // Si no es un dispositivo móvil, agregamos las columnas "Categoria", "Precio" y "Unidades Vendidas"
    columns.splice(2, 0, {
      title: "Categoria",
      dataIndex: "Category",
      key: "Category",
      render: (category) => <p>{category.name}</p>,
    });
    columns.splice(3, 0, {
      title: "Precio",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => <p>${price}</p>,
    });
    columns.splice(4, 0, {
      title: "Unidades Vendidas",
      dataIndex: "unitsSold",
      key: "unitsSold",
      render: (stock) => <p>{stock}</p>,
    });
  }

  return (
    <div>
      {productUpdate && showEditModal && (
        <EditProductModal
          visible={showEditModal}
          onClose={() => setShowEditModal(false)}
          product={productUpdate}
        />
      )}
      {minMobile ? (
        sortedProducts.map((product, index) => (
          <Card
            key={index}
            title={product.name}
            bordered={false}
            hoverable={true}
            style={{
              width: "100%",
              marginBottom: "10px",
              marginTop: "10px",
              backgroundColor: "#f5f5f5",
            }}
          >
            <div className="w-full flex justify-center">
              <img className="productsTableImageMobile" src={product.image} alt="Product" />
            </div>
            <div className="flex flex-col items-center">
              <p>Unidades Vendidas: {product.unitsSold}</p>
              <div className="flex items-center">
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  size="small"
                  onClick={() => {
                    setShowEditModal(true), setProductUpdate(product);
                  }}
                />
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked={product.active === true ? true : false}
                  onChange={() =>
                    handleActive(product.active === true ? false : true, product)
                  }
                />
              </div>
            </div>
          </Card>
        ))
      ) : (
        <Table dataSource={sortedProducts} columns={columns} />
      )}
    </div>
  );
};

export default ProductsTable;