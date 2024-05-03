import React, { useState } from "react";

const AddingImages = ({ setProduct, productData }) => {
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    const uploadImage = async (event) => {
        const files = event.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "images");
        setLoading(true);
        try {
            const res = await fetch(
                "https://api.cloudinary.com/v1_1/dtjizedfr/image/upload",
                {
                    method: "POST",
                    body: data
                }
            );
            const file = await res.json();
            setImage(file.secure_url);
            setProduct({ ["photo"]: file.secure_url })
        } catch (error) {
            console.error("Error uploading image: ", error); 
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <div style={{ textAlign: "left" }}>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={uploadImage}
                    style={{ marginBottom: "10px" }}
                />
                {loading && <p>Cargando imagen...</p>}
                <img src={image} width="200px"/>
            </div>
        </div>
    );
};

export default AddingImages;
