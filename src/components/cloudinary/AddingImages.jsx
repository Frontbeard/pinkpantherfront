import React, { useState } from "react";

const AddingImages = (props) => {
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    const uploadImage = async (e) => {
        console.log("este es el e")
        console.log(e.target)
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "images");
        setLoading(true);
       /*  try { */
            const res = await fetch(
                "https://api.cloudinary.com/v1_1/dtjizedfr/image/upload",
                {
                    method: "POST",
                    body: data
                }
            );
            const file = await res.json();
            console.log("uploadImage ejecutado"); 

            setImage(file.secure_url);
       /*  } catch (error) {
            console.error("Error uploading image: ", error); */
       /*  } finally {
            setLoading(false);
        } */
    };

    return (
        <div>
            <div style={{ textAlign: "left" }}>
                <h1>Subiendo Imágenes</h1>
                <form>
                <input
                    id="image123"
                    type="file"
                    name="imagen"
                    accept="image/*"
                    onChange={uploadImage}
                    style={{ marginBottom: "10px" }}
                />
                </form>
            </div>
        </div>
    );
};

export default AddingImages;
