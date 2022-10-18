import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSpot } from '../../store/spots'

function EditSpotForm() {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  
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
    
    console.log(payload)

    const updatedSpot = await dispatch(updateSpot(payload, spotId))

    history.push(`/spots/${spotId}`)
  }

  return (
    <div>
      <form>
        <div>
          Want to make some edits to your listing info? You're in the right place
        </div>
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
          <textarea
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
        <button 
        // disabled={!!inputErrors.length}
        onClick={handleSubmit}>Add your listing!</button>
      </form>
    </div>
  )
}

export default EditSpotForm;
