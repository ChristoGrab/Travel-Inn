import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createImageThunk } from '../../../store/spots'

function AddPreviewImage() {

  const dispatch = useDispatch();
  const history = useHistory();
  const [url, setUrl] = useState('');
  // const [dataLoaded, setDataLoaded] = useState(false)
  const updateUrl = (e) => setUrl(e.target.value);
  const newSpot = useSelector(state => state.spots.singleSpot)

  console.log("adding preview image: ", newSpot)
  if (!newSpot.id) return null;

  
  let spotId;
  if (newSpot.id) {
    spotId = newSpot.id
  }
  
  console.log("This is my spotId: ", spotId)
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      url,
      preview: true,
      spotId
    }
    
    console.log("SpotId in handleSubmit for SpotImage: ", spotId)

    dispatch(createImageThunk(payload, spotId)).then(() => history.push('/'))
  }

  return (
    <>
      <h2>Everything looks good so far!</h2>
      <p>Now let's add some flair to your post by setting a preview image of your lovely location</p>
      <input
        type="text"
        required
        value={url}
        onChange={updateUrl} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}

export default AddPreviewImage;
