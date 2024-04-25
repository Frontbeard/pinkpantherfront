import React, { useState } from "react";

const AddingImages = (props) => {
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "imagenes-pinkpanther");
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
        } catch (error) {
            console.error("Error uploading image: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div style={{ textAlign: "left" }}>
                <h1>Subiendo Imágenes</h1>
                <input
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={uploadImage}
                    style={{ marginBottom: "10px" }}
                />
                {loading ? (
                    <h3>Cargando imágenes...</h3>
                ) : (
                    image && <img src={image} alt="uploaded" style={{ width: "300px" }} />
                )}
            </div>
        </div>
    );
};

export default AddingImages;
