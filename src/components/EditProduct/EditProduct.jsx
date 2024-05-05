import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productbyID } from "../../redux/actions/Product/productById";
import CreateProduct from "../formCreateProduct/CreateProduct";

const EditProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const productDetail = useSelector(state => state.details);

    useEffect(() => {
        setLoading(true);
        dispatch(productbyID(id))
            .then(() => {
                setLoading(false);
            });
    }, [dispatch, id]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <CreateProduct initialValues={productDetail} />
        </div>
    );
};

export default EditProduct;
