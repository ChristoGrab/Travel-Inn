import GoogleMapReact from 'google-map-react';
import Geocode from 'react-geocode';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { getKey } from '../../store/map'
import './Map.css'

const LocationPin = () => (
    <i className="fa-solid fa-house" />
)

const Map = ( {address} ) => {
  const dispatch = useDispatch();
  const key = useSelector(state => state.map.key)
  const [center, setCenter] = useState({lat: 0, lng: 0})
  
  const defaultProps = {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 16
  };
  
  useEffect(() => {
    if (!key) {
      dispatch(getKey())
    }
  }, [])
  
  Geocode.setApiKey(key)
  
  if (Geocode.setApiKey) console.log('key set')
  Geocode.setLanguage('en')
  Geocode.setRegion('us')
  
  useEffect(() => {
  Geocode.fromAddress(address).then(
    response => {
      let newlat = response.results[0].geometry.location.lat;
      let newlng = response.results[0].geometry.location.lng;
      console.log(response.results[0].geometry.location)
      console.log(response.results[0].geometry.location.lat)
      console.log(response.results[0].geometry.location.lng)
      setCenter({lat: newlat, lng: newlng})
    },
    error => {
      console.error(error);
    }
  );
  }, [address, key])
  
  if (!key) return null;
  
  return (
  <div className="map">
    <div className="google-map" style={{ height: '450px', width: '80%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: key }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        maxZoom={defaultProps.zoom}
        minZoom={defaultProps.zoom}
        disableDefaultUI={true}
        center={center}
        yesIWantToUseGoogleMapApiInternals>
        <LocationPin lat={center.lat} lng={center.lng} />
      </GoogleMapReact>
    </div>
  </div>
)
}

export default Map;
