import GoogleMapReact from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { getKey } from '../../store/map'
import './Map.css'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'


const LocationPin = ({ text }) => (
  <div className="pin">
  </div>
)

const Map = ( {lat, lng} ) => {
  const dispatch = useDispatch();
  const key = useSelector(state => state.map.key)
  
  useEffect(() => {
    if (!key) {
      dispatch(getKey())
    }
  }, [dispatch, key])
  
  const defaultProps = {
    center: {
      lat,
      lng
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
        yesIWantToUseGoogleMapApiInternals>
          <LocationPin
            lat={lat}
            lng={lng}
            text="My Marker"
          />
      </GoogleMapReact>
    </div>
  </div>
)
}

export default Map;
