import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Form for Creating New Spot
function CreateSpotForm() {
  
  // list of state variables
  const dispatch = useDispatch();
  const history = useHistory();
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
  const updateCountry = (e) => setAddress(e.target.value)
  const updateLatitude = (e) => setLatitude(e.target.value)
  const updateLongitude = (e) => setLongitude(e.target.value)
  const updateName = (e) => setName(e.target.value)
  const updateDescription = (e) => setDescription(e.target.value)
  const updatePrice = (e) => setPrice(e.target.value)

  return (
    <div className="create-spot-form-container">
      <form className="create-spot-form">
        <label>
          Address
          <input
            type="text"
            required
            value={address}
            onChange={updateAddress}/>
        </label>
        <label>
          City
          <input
            type="text"
            required
            value={city}
            onChange={updateCity}/>
        </label>
        <label>
          State
          <input
            type="text"
            value={region}
            onChange={updateRegion}/>
        </label>
        <label>
          Country
          <input
            type="text"
            value={country}
            onChange={updateCountry}/>
        </label>
        <label>
          Latitude
          <input
            type="text"
            value={latitude}
            onChange={updateLatitude}/>
        </label>
        <label>
          Longitude
          <input
            type="text"
            value={longitude}
            onChange={updateLongitude}/>
        </label>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={updateName}/>
        </label>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={updateDescription}/>
        </label>
        <label>
          Price
          <input
            type="text"
            value={price}
            onChange={updatePrice}/>
        </label>
      </form>
    </div>
  )
}

export default CreateSpotForm;
