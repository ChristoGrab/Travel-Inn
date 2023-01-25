import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSpot } from '../../store/spots'

function EditSpotForm() {

  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots.spotsList[spotId])

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
    if (typeof price !== "number" || price < 1 || price > 10000) errors.push("Please provide a price per night between $1-10000")
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
    <div className="create-spot-form-container">
      <form className="create-spot-form">
        <div className="create-spot-form-header">
          <h2>Please provide the updated listing information</h2>
        </div>

        {formSubmitted && <div className="create-spot-form-errors">
          {inputErrors.map((error, idx) => (
            <li key={idx} className="form-error">
              {error}
            </li>
          ))}
        </div>}

        <div className="create-spot-form-left">

          <div className="input-container">
            <input className="auth-form-input-top"
              type="text"
              required
              value={address}
              onChange={updateAddress} />
            <label className={address ? "filled" : "not-filled"} >
              Street Address <span className="small-text"></span>
            </label>
          </div>

          <div className="input-container">
            <input className="auth-form-input-middle"
              type="text"
              required
              value={city}
              onChange={updateCity} />
            <label className={city ? 'filled' : 'not-filled'}>City</label>
          </div>

          <div className="input-container">
            <input className="auth-form-input-middle"
              type="text"
              value={region}
              onChange={updateRegion} />
            <label className={region ? 'filled' : 'not-filled'}>
              State/Region
            </label>
          </div>

          <div className="input-container">
            <input className="auth-form-input-middle"
              type="text"
              value={country}
              onChange={updateCountry} />
            <label className={country ? 'filled' : 'not-filled'}>
              Country
            </label>
          </div>

          <div className="input-container">
            <input className="auth-form-input-bottom"
              type="text"
              value={name}
              onChange={updateName} />
            <label className={name ? 'filled' : 'not-filled'}>
              Name - What should we call your listing?
            </label>
          </div>
        </div>

        <div className="create-spot-form-right">
          <label>
            Description - Give your guests a brief overview of your listing <span className="small-text">(20 char min)</span>
          </label>
          <textarea
            className="create-spot-form-textarea"
            type="text"
            value={description}
            onChange={updateDescription} />
          <label>
            Price per night in US$ <span className="small-text">($10-10000)</span>
          </label>
          <input
            className="create-spot-form-price-input"
            type="number"
            value={price}
            onChange={updatePrice} />
        </div>
        <div className="create-spot-form-button">
          <button
            className="submit-button"
            onClick={handleSubmit}>Update your listing</button>
        </div>
      </form>
    </div>
  )
}

export default EditSpotForm;
