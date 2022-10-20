import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
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
    if (price <= 1 || price >= 10000) errors.push("Please provide a $ price per night between 1 and 10000")
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
      <form>
        <div className="edit-spot-form-greeting">
          Want to make some edits to your listing info? You're in the right place
        </div>
        {formSubmitted && <div className="edit-spot-errors">
          <h4>Uh oh! Looks like there were some errors. Please double check your inputs and try again</h4>
          <ul>
            {inputErrors.map((error, idx) => (
              <li key={idx}>
                {error}
              </li>
            ))}
          </ul>
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
          onClick={handleSubmit}>Add your listing!</button>
      </form>
    </div>
  )
}

export default EditSpotForm;
