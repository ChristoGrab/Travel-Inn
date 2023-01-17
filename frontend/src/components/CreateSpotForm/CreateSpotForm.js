import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { createNewSpot } from '../../store/spots'
import { createImageThunk } from '../../store/spots';
import './CreateSpotForm.css'

// Form for Creating New Spot
function CreateSpotForm({hideModal}) {

  // list of state variables
  const dispatch = useDispatch();
  const history = useHistory();

  const [inputErrors, setInputErrors] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false)
  const formData = new FormData();

  // list of input functions
  const updateAddress = (e) => setAddress(e.target.value)
  const updateCity = (e) => setCity(e.target.value)
  const updateRegion = (e) => setRegion(e.target.value)
  const updateCountry = (e) => setCountry(e.target.value)
  const updateName = (e) => setName(e.target.value)
  const updateDescription = (e) => setDescription(e.target.value)
  const updatePrice = (e) => setPrice(e.target.value)

  // list of input errors
  useEffect(() => {
    
    let errors = []
    if (address.length <= 5) errors.push("Please provide a valid address")
    if (name.length <= 2) errors.push("Please provide a name for your listing")
    if (city.length <= 2) errors.push("Please provide a valid city")
    if (region.length <= 1) errors.push("Please provide at least 2 initials for your state")
    if (country.length <= 1) errors.push("Please provide at least 2 initials for your country")
    if (description.length <= 10) errors.push("Please provide at least a brief description of your listing (10 char min)")
    if (isNaN(price) || price < 10 || price > 10000) errors.push("Please provide a valid price per night within the $1-10000 range")
    setInputErrors(errors)
  }, [address, name, city, region, country, description, price])
  
  const validateImageUpload = (imageFile) => {
    
    let imageErrors = []
    
    if (!imageFile.files.length) {
      imageErrors.push("Please provide an image file for your listing")
      return setInputErrors(imageErrors)
    }
    
    let userImage = imageFile.files[0]
    
    if (userImage.type !== "image/jpeg" && userImage.type !== "image/png") {
      imageErrors.push("The provided filetype is not supported (jpg or png only)")
      return setInputErrors(imageErrors)
    }
    
    return;
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    setFormSubmitted(true)
    
    if (inputErrors.length) return
    
    const imageFile = document.querySelector("#imageInput")
    
    console.log(imageFile.files)
    
    validateImageUpload(imageFile)
    
    formData.append("image", imageFile.files[0])

    
    const picture = await csrfFetch('/api/spot-images/upload', {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
    
    const previewImage = await picture.json();
    
    console.log(previewImage)

    if (previewImage.errors) {
      return setInputErrors(previewImage.errors);
    }

    const payload = {
      address,
      city,
      state: region,
      country,
      name,
      description,
      price
    }
    
    setInputErrors([])

    const newSpot = await dispatch(createNewSpot(payload))
      .catch(async (response) => {

        const data = await response.json();
        
        console.log(data)

        // if new errors, return them
        if (data && data.errors) {
          setInputErrors(data.errors);
        }
      });
      
    const imgPayload = {
      url: previewImage.imageUrl,
      preview: true
    }
    
    console.log(imgPayload)

    const finalDispatch = await dispatch(createImageThunk(imgPayload, newSpot.id))
      .catch(async (response) => {
        
        const data = await response.json();
        
        if (data && data.errors) {
          setInputErrors(data.errors);
        }
      });

    // hideModal();
    // history.push(`/user/profile`)
  }

  // Component JSX
  
  return (
    <div className="create-spot-form-container">
      <form className="create-spot-form">
        <div className="create-spot-form-greeting">
          Ready to join our growing family of hosts?
        </div>
        {formSubmitted && <div className="create-spot-errors">
          <div className="spot-errors-list">
            {inputErrors.map((error, idx) => (
              <li key={idx} className="form-error">
                {error}
              </li>
            ))}
          </div>
        </div>}
        <label>
          Street Address
          <input className="create-spot-form-input"
            type="text"
            required
            value={address}
            onChange={updateAddress} />
        </label>
        <label>
          City
          <input className="create-spot-form-input"
            type="text"
            required
            value={city}
            onChange={updateCity} />
        </label>
        <label>
          State/Region
          <input className="create-spot-form-input"
            type="text"
            value={region}
            onChange={updateRegion} />
        </label>
        <label>
          Country
          <input className="create-spot-form-input"
            type="text"
            value={country}
            onChange={updateCountry} />
        </label>
        <label>
          Name - What should we call your listing?
          <input className="create-spot-form-input"
            type="text"
            value={name}
            onChange={updateName} />
        </label>
        <label>
          Description - Tell us about your listing!
          <textarea className="create-spot-form-textarea"
            type="text"
            value={description}
            onChange={updateDescription} />
        </label>
        <label>
          Price in USD per night ($10-10000)
          <input className="create-spot-form-input"
            type="number"
            value={price}
            onChange={updatePrice} />
        </label>
        <label>
          Preview Image - jpeg or png only
          <input className='create-spot-form-input'
            type='file'
            name="image"
            id="imageInput"
            encType="multipart/form-data"
          />
        </label>
        <button id="create-spot-submit-button"
          onClick={handleSubmit}>Add your listing!</button>
      </form>
    </div>
  )
}

export default CreateSpotForm;
