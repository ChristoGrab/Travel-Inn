import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { createNewSpot } from '../../store/spots'
import { createImageThunk } from '../../store/spots';
import LoadingScreen from '../LoadingScreen';
import './CreateSpotForm.css'

function CreateSpotForm() {

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
  const [loading, setLoading] = useState(false)
  const [correctFile, setCorrectFile] = useState(true)
  const [noFile, setNoFile] = useState(false)
  const [imageErrors, setImageErrors] = useState([])
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
    if (description.length <= 20) errors.push("Please provide at least a brief description of your listing (20 char min)")
    if (isNaN(price) || price < 10 || price > 10000) errors.push("Please provide a valid price per night within the $10-10000 range")
    if (correctFile === false) errors.push("Please provide a valid image file type (jpg/jpeg or png)")
    if (noFile === true) errors.push("Please provide an image file for your listing")
    setInputErrors(errors)
  }, [address, name, city, region, country, description, price, correctFile, noFile])

  
  useEffect(() => {
    if (inputErrors.length || imageErrors.length) {
      setLoading(false)
    }
  }, [inputErrors.length, imageErrors.length])

  const handleSubmit = async (e) => {

    e.preventDefault();
    setFormSubmitted(true)
    setImageErrors([])
    
    if (inputErrors.length) return inputErrors
    const imageFile = document.querySelector("#imageInput")
    setLoading(true)

    if (!imageFile.files.length) {
      setLoading(false)
      setImageErrors(["no file"])
      return imageErrors
    } else if (imageFile.files[0].type !== "image/jpeg" && imageFile.files[0].type !== "image/png") {
      setLoading(false)
      setImageErrors(["wrong file"])
      console.log("wrong file")
      return imageErrors
    }

    formData.append("image", imageFile.files[0])

    const picture = await csrfFetch('/api/spot-images/upload', {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })

    const previewImage = await picture.json();

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

        // if new errors, return them
        if (data && data.errors) {
          setLoading(false)
          return setInputErrors(data.errors);
        }
      });

    const imgPayload = {
      url: previewImage.imageUrl,
      preview: true
    }

    dispatch(createImageThunk(imgPayload, newSpot.id))
      .catch(async (response) => {
        
        const data = await response

        if (data && data.errors) {
          return setInputErrors(data.errors);
        }
      });

    history.push(`/user/profile`)
  }


  // Component JSX

  return (
    <div className="create-spot-form-container">
      {loading && <LoadingScreen />}
      <form className="create-spot-form">
        <div className="create-spot-form-header">
          <h2>What place will you be hosting with us?</h2>
        </div>
        
        {formSubmitted && <div className="create-spot-form-errors">
              {inputErrors.map((error, idx) => (
                <li key={idx} className="form-error">
                  {error}
                </li>
              ))}
            </div>}

        <div className="create-spot-form-left">
          <label>
            Street Address <span className="small-text"></span>
          </label>
            <input className="create-spot-form-input"
              type="text"
              required
              value={address}
              onChange={updateAddress} />

          <label>
            City
          </label>
            <input className="create-spot-form-input"
              type="text"
              required
              value={city}
              onChange={updateCity} />
          <label>
            State/Region
            </label>
            <input className="create-spot-form-input"
              type="text"
              value={region}
              onChange={updateRegion} />
          <label>
            Country
            </label>
            <input className="create-spot-form-input"
              type="text"
              value={country}
              onChange={updateCountry} />
        
          <label>
            Name - What should we call your listing?         
             </label>
            
            <input className="create-spot-form-input"
              type="text"
              value={name}
              onChange={updateName} />
          
        </div>

        <div className="create-spot-form-right">
          <label>
            Description - Give your guests a brief overview of your listing <span className="small-text">(20 char min)</span>
            </label>
            <textarea className="create-spot-form-textarea"
              type="text"
              value={description}
              onChange={updateDescription} />
          <label>
            Price in USD per night <span className="small-text">($10-10000)</span>
            </label>
            <input className="create-spot-form-price-input"
              type="number"
              value={price}
              onChange={updatePrice} />
          <label>
            Cover Photo - Pick an image to wow potential guests!<span className="small-text">Supported filetypes - jpg/jpeg or png</span>
            </label>
            <input className='create-spot-form-image-input'
              type='file'
              name="image"
              id="imageInput"
              encType="multipart/form-data"
            />
            {imageErrors && <div className="create-spot-form-errors">
              {imageErrors.map((error, idx) => (
                <li key={idx} className="form-error">
                  {error}
                </li>
              ))}
            </div>}
        </div>

        <div className="create-spot-form-button">
          <button className="submit-button"
            onClick={handleSubmit}>Add your listing!</button>
        </div>
      </form>
    </div>
  )
}

export default CreateSpotForm;
