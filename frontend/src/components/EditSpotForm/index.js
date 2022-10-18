import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSpot } from '../../store/spots'

function EditSpotForm() {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  
  // list of state variables
  const [inputErrors, setInputErrors] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  
  const updateAddress = (e) => setAddress(e.target.value)
  const updateCity = (e) => setCity(e.target.value)
  const updateRegion = (e) => setRegion(e.target.value)
  const updateCountry = (e) => setCountry(e.target.value)
  const updateLat = (e) => setLat(e.target.value)
  const updateLng = (e) => setLng(e.target.value)
  const updateName = (e) => setName(e.target.value)
  const updateDescription = (e) => setDescription(e.target.value)
  const updatePrice = (e) => setPrice(e.target.value)
  
  useEffect(() => {
    let errors = []
    if (address.length <= 5) errors.push("Please provide a valid address")
    if (name.length <= 2) errors.push("Please provide a valid name")
    if (city.length <= 2) errors.push("Please provide a valid city")
    if (region.length <= 1) errors.push("Please provide a valid state")
    if (country.length <= 1) errors.push("Please provide a valid country")
    if (lat < -90 || lat > 90) errors.push("Please provide a valid latitude")
    if (lng < -180 || lng > 180) errors.push("please provide a valid longitude")
    if (description.length <= 12) errors.push("Please provide a brief description of your listing that is at least 12 characters long")
    if (price <= 0) errors.push("Please provide a valid numerical price per night")
    setInputErrors(errors)
  }, [address, name, city, region, country, lat, lng, description, price])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      address,
      city,
      state: region,
      country,
      lat,
      lng,
      name,
      description,
      price
    }

    const updatedSpot = await dispatch(updateSpot(payload, spotId))

    history.push(`/spots/${spotId}`)
  }

  return (
    <div>
      <form>
        <div>
          Want to make some edits to your listing info? You're in the right place
        </div>
        <div className="edit-spot-errors">
          <ul>
            {inputErrors.map((error) => (
              <li>
                {error}
              </li>
            ))}
          </ul>
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
            value={lat}
            onChange={updateLat}/>
        </label>
        <label>
          Longitude
          <input
            type="text"
            value={lng}
            onChange={updateLng}/>
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
