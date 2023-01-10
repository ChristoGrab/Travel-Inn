import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSpot } from '../../store/spots'
import "./EditSpotForm.css"

function EditSpotForm() {

  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots.spots[spotId])

  // list of state variables
  const [inputErrors, setInputErrors] = useState([]);
  const [address, setAddress] = useState(`${spot.address}`);
  const [city, setCity] = useState(`${spot.city}`);
  const [region, setRegion] = useState(`${spot.state}`);
  const [country, setCountry] = useState(`${spot.country}`);
  const [name, setName] = useState(`${spot.name}`);
  const [description, setDescription] = useState(`${spot.description}`);
  const [price, setPrice] = useState(spot.price);
  const [formSubmitted, setFormSubmitted] = useState(false)

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
    if (name.length <= 2) errors.push("Please provide a valid name")
    if (city.length <= 2) errors.push("Please provide a valid city")
    if (region.length <= 1) errors.push("Please provide a valid state")
    if (country.length <= 1) errors.push("Please provide a valid country")
    if (description.length <= 12) errors.push("Please provide a brief description of your listing that is at least 12 characters long")
    if (price < 1 || price > 10000) errors.push("Please provide a price per night between $1-10000")
    setInputErrors(errors)
  }, [address, name, city, region, country, description, price])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true)
    if (inputErrors.length) return;

    const payload = {
      address,
      city,
      state: region,
      country,
      name,
      description,
      price
    }

    dispatch(updateSpot(payload, spotId))
    history.push(`/spots/${spotId}`)
  }

  return (
    <div>
      <form className="edit-spot-form">
        <div className="edit-spot-form-greeting">
          Please provide the updated listing information
        </div>
        {formSubmitted && <div className="form-error">
          <div>
            {inputErrors.map((error, idx) => (
              <li key={idx}>
                {error}
              </li>
            ))}
          </div>
        </div>}
        <label>
          Address
          <input
            type="text"
            required
            value={address}
            onChange={updateAddress} />
        </label>
        <label>
          City
          <input
            type="text"
            required
            value={city}
            onChange={updateCity} />
        </label>
        <label>
          State
          <input
            type="text"
            value={region}
            onChange={updateRegion} />
        </label>
        <label>
          Country
          <input
            type="text"
            value={country}
            onChange={updateCountry} />
        </label>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={updateName} />
        </label>
        <label>
          Description
          <textarea
            id="edit-spot-form-textarea"
            type="text"
            value={description}
            onChange={updateDescription} />
        </label>
        <label>
          Price
          <input
            type="text"
            value={price}
            onChange={updatePrice} />
        </label>
        <button
          className="edit-spot-button"
          onClick={handleSubmit}>Update your listing</button>
      </form>
    </div>
  )
}

export default EditSpotForm;
