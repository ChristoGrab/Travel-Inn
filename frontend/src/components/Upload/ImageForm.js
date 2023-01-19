import { csrfFetch } from "../../store/csrf";
import { getOneSpot, createImageThunk } from "../../store/spots";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./ImageForm.css"

const ImageForm = () => {
  
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const [errors, setErrors] = useState([]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    let imageFile = document.querySelector("input[type='file']");
    
    formData.append("image", imageFile.files[0]);
    
    if (!imageFile.files.length) {
      setErrors(["Please provide an image file"])
      return
    }
    
    if (imageFile.files[0].type !== "image/jpeg" && imageFile.files[0].type !== "image/png") {
      setErrors(["Please provide a valid image file type (jpg/jpeg or png)"])
      return
    }
    
    try {
      const res = await csrfFetch("/api/spot-images/upload", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      
      const imageUrlObj = await res.json();
      
      const new_image = {
        url: imageUrlObj.imageUrl,
        preview: false
      }
      
      dispatch(createImageThunk(new_image, spotId))
      .then(window.location.reload())

    } catch (err) {
      const data = await err.json();
      console.log(data);
      return data;
    }
    
  };
  
  return (
    <form className="image-form">
      <label>Add Image (jpg/jpeg or png)</label>
      <input type="file" />
      <button className="action-button" onClick={handleUpload}>Upload</button>
      {errors && errors.map((error) => <div className="form-error">{error}</div>)}
    </form>
  )
}

export default ImageForm;
