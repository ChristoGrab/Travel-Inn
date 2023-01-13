import { csrfFetch } from "../../store/csrf";

const Upload = () => {

  const handleUpload = async (e) => {
    
    e.preventDefault();
    const formData = new FormData();
    
    let imageFile = document.querySelector("input[type='file']");
    
    formData.append("image", imageFile.files[0]);
    
    const res = await csrfFetch("/api/spot-images/upload", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
    const data = await res.json();
    console.log(data);
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
