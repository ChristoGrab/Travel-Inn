import { csrfFetch } from "../../store/csrf";
import { getOneSpot, createImageThunk } from "../../store/spots";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Upload = () => {
  
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    let imageFile = document.querySelector("input[type='file']");
    
    formData.append("image", imageFile.files[0]);
    
    console.log(spotId)
    
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
        url: imageUrlObj.url,
        preview: false
      }
      
      dispatch(createImageThunk(new_image, spotId))

    } catch (err) {
      const data = await err.json();
      console.log(data);
      return data;
    }
    
  };
  
  return (
    <form>
      <label>Image Upload Test</label>
      <input type="file" />
      <button onClick={handleUpload}>Upload</button>
    </form>
  )
}

export default Upload;
