// Form for Creating New Spot
function CreateSpotForm() {

  return (
    <div className="create-spot-form-container">
      <form>
        <label>
          Address
          <input
            type="text"
          />
        </label>
        <label>
          City
          <input
            type="text"
          />
        </label>
        <label>
          State
          <input
            type="text"
          />
        </label>
        <label>
          Country
          <input
            type="text"
          />
        </label>
        <label>
          Latitude
          <input
            type="text"
          />
        </label>
        <label>
          Longitude
          <input
            type="text"
          />
        </label>
        <label>
          Name
          <input
            type="text"
          />
        </label>
        <label>
          Description
          <input
            type="text"
          />
        </label>
        <label>
          Price
          <input
            type="text"
          />
        </label>
      </form>
    </div>
  )
}

export default CreateSpotForm;
