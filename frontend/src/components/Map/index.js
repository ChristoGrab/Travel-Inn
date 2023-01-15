import GoogleMapReact from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { getKey } from '../../store/map'

const Map = () => {
  const dispatch = useDispatch();
  const key = useSelector(state => state.map.key)
  
  useEffect(() => {
    if (!key) {
      dispatch(getKey())
    }
  }, [dispatch, key])
  
  const defaultProps = {
    center: {
      lat: 35.9499506,
      lng: -79.053921
    },
    zoom: 16
  };
  
  if (!key) return null;
  
  return (
  <div className="map">
    <div className="google-map" style={{ height: '450px', width: '80%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: key }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        
      >
      </GoogleMapReact>
    </div>
  </div>
)
}

export default Map;
