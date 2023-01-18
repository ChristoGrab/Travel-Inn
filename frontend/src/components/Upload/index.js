import { csrfFetch } from "../../store/csrf";

const Upload = () => {

  const handleUpload = async (e) => {
    
    e.preventDefault();
    const formData = new FormData();
    
    let imageFile = document.querySelector("input[type='file']");
    
    formData.append("image", imageFile.files[0]);
    
    try {
      const res = await csrfFetch("/api/spot-images/upload", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
    } catch (err) {
      console.log(err);
      const data = await err.json();
      console.log(data)  
    }
    const data = await res.json();
    console.log(data);
  };
  
  return (
    <form>
      <label>Image Upload Test</label>
      <input type="file" />
      <button onClick={handleUpload}>Upload</button>
      { errors && errors.map((error, ind) => (
        <div key={ind}>{error}</div>
      ))}
    </form>
  )
}

export default Upload;
