import React, { useState } from "react";

const AddingImages = (props) => {
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
        } catch (error) {
            console.error("Error uploading image: ", error); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div style={{ textAlign: "left" }}>
                <h1>Subir imagen de producto</h1>
                <form>
                <input
                    type="file"
                    name="imagen"
                    accept="image/*"
                    onChange={uploadImage}
                    style={{ marginBottom: "10px" }}
                />
                </form>
                <img src={image} width="200px"/>
            </div>
        </div>
    );
};

export default AddingImages;
