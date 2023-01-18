import GoogleMapReact from 'google-map-react';
import Geocode from 'react-geocode';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { getKey } from '../../store/map'
import convertDecimal from '../../functions/convertDecimal';
import './Map.css'

// const LocationPin = () => (
//   <div className="pin">
//     <i className="fa-solid fa-house" />
//   </div>
// )

const Map = ( {lat, lng} ) => {
  const dispatch = useDispatch();
  const key = useSelector(state => state.map.key)
  const renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
      position: { lat, lng },
      map,
      title: 'Location is approximate. Exact location will be provided after booking.'
    });
    return marker;
  };
  
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
  
  Geocode.setApiKey(key)
  
  return (
  <div className="map">
    <div className="google-map" style={{ height: '450px', width: '80%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: key }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}>

      </GoogleMapReact>
    </div>
  </div>
)
}

export default Map;
