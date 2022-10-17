import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNewSpot } from '../../store/spots'
import './CreateSpotForm.css'

// Form for Creating New Spot
function CreateSpotForm() {
  
  // list of state variables
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputErrors, setInputErrors] = useState([])
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState(0.0000000);
  const [longitude, setLongitude] = useState(0.0000000);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  
  // list of input functions
  const updateAddress = (e) => setAddress(e.target.value)
  const updateCity = (e) => setCity(e.target.value)
  const updateRegion = (e) => setRegion(e.target.value)
  const updateCountry = (e) => setCountry(e.target.value)
  const updateLatitude = (e) => setLatitude(e.target.value)
  const updateLongitude = (e) => setLongitude(e.target.value)
  const updateName = (e) => setName(e.target.value)
  const updateDescription = (e) => setDescription(e.target.value)
  const updatePrice = (e) => setPrice(e.target.value)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      address,
      city,
      state: region,
      country,
      lat: latitude,
      lng: longitude,
      name,
      description,
      price
    }
    
    const newSpot = await dispatch(createNewSpot(payload))
    
    if (newSpot) {
      history.push('/')
    }
  }

  // Component JSX
  return (
    <div className="create-spot-form-container">
      <form className="create-spot-form">
        <div className="create-spot-form-greeting">
          Ready to join our growing family of hosts?
        </div>
        <label>
          Address
          <input className="create-spot-form-input"
            type="text"
            required
            value={address}
            onChange={updateAddress}/>
        </label>
        <label>
          City
          <input className="create-spot-form-input"
            type="text"
            required
            value={city}
            onChange={updateCity}/>
        </label>
        <label>
          State
          <input className="create-spot-form-input"
            type="text"
            value={region}
            onChange={updateRegion}/>
        </label>
        <label>
          Country
          <input className="create-spot-form-input"
            type="text"
            value={country}
            onChange={updateCountry}/>
        </label>
        <label>
          Latitude
          <input className="create-spot-form-input"
            type="text"
            value={latitude}
            onChange={updateLatitude}/>
        </label>
        <label>
          Longitude
          <input className="create-spot-form-input"
            type="text"
            value={longitude}
            onChange={updateLongitude}/>
        </label>
        <label>
          Name
          <input className="create-spot-form-input"
            type="text"
            value={name}
            onChange={updateName}/>
        </label>
        <label>
          Description
          <textarea className="create-spot-form-textarea"
            type="text"
            value={description}
            onChange={updateDescription}/>
        </label>
        <label>
          Price
          <input className="create-spot-form-input"
            type="text"
            value={price}
            onChange={updatePrice}/>
        </label>
        <button onClick={handleSubmit}>Add your listing!</button>
      </form>
    </div>
  )
}

export default CreateSpotForm;
