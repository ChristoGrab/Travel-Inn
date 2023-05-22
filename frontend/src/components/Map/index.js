import GoogleMapReact from 'google-map-react';
import Geocode from 'react-geocode';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { getKey } from '../../store/map'
import './Map.css'

// By passing the coordinates to the LocationPin component, the pin will be fixed to the location specified
const LocationPin = ({ lat, lng }) => (
  <div className="pin" lat={lat} lng={lng}>
    <i className="fa-solid fa-house" />
  </div>
)

const Map = ({ address }) => {
  const dispatch = useDispatch();
  const key = useSelector(state => state.map.key)
  const [center, setCenter] = useState({ lat: 0, lng: 0 })

  const defaultProps = {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 16
  };

  // If the Google API key is not already in the store, fetch it
  useEffect(() => {
    if (!key) {
      dispatch(getKey())
    }
  }, [])

  // If the Google API key is in the store, set the key, regional settings, and parse the address
  useEffect(() => {
    if (key) {
      Geocode.setApiKey(key)
      Geocode.setLanguage('en')
      Geocode.setRegion('us')

      Geocode.fromAddress(address).then(
        response => {
          let newlat = response.results[0].geometry.location.lat;
          let newlng = response.results[0].geometry.location.lng;
          setCenter({ lat: newlat, lng: newlng })
        },
        error => {
          console.error(error);
        }
      );
    }
  }, [address, key])

  // Don't render the map if the Google API key is not in the store
  if (!key) return null;

  return (
    <div className="map">
      <div className="google-map" style={{ height: '450px', width: '80%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: key,
            language: 'en'
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          center={center}>
             <LocationPin lat={center.lat} lng={center.lng} />
        </GoogleMapReact>
      </div>
    </div>
  )
}

export default Map;
