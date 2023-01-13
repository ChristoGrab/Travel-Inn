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
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };
  
  if (!key) return null;
  
  return (
  <div className="map">
    <h2 className="map-h2">Come Visit Us At Our Campus</h2>

    <div className="google-map" style={{ height: '350px', width: '80%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: key }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
      </GoogleMapReact>
    </div>
  </div>
)
}

export default Map;
