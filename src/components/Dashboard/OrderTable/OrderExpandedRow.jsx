import React from 'react'
import { Card, Row, Col, Image } from 'antd';
import { getColorName } from '../../utils/getColorName';

const OrderExpandedRow = ({ products }) => {
  return (
    <div>
      <h3 className="mb-4">Productos</h3>
      <div className="flex flex-wrap">
        {products.map((product) => (
          <Card
            bordered={false}
            hoverable={true}
            className="w-full md:w-2/5 lg:w-1/4 mx-2 my-2"
            key={product.id}
            name={product.size}
          >
            <Row justify="center">
              <Col span={24} className="mb-2">
                <div className="text-center">Nombre<br />{product.name}</div>
              </Col>
              <Col span={24} className="mb-2">
                <div className="flex justify-center"><Image alt={product.name} src={product.image && product.image} width={35} /></div>
              </Col>
              <Col span={24} className="mb-2">
                <div className="text-center">Color<br />{getColorName(product.color)}</div>
              </Col>
              <Col span={24} className="mb-2">
                <div className="text-center">Cant.<br />{product.quantity}</div>
              </Col>
              <Col span={24} className="mb-2">
                <div className="text-center">Precio x unidad<br />${product.price}</div>
              </Col>
              <Col span={24} className="mb-2">
                <div className="text-center">Total<br />${product.price * product.quantity}</div>
              </Col>
            </Row>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default OrderExpandedRow
