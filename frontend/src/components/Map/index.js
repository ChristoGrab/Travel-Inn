const Map = ( {lat, lng} ) => {
  
  
  
  return (
    <iframe
  className="spot-page-map"
  width="80%"
  height="450px"
  loading="lazy"
  allowFullScreen
  referrerPolicy="no-referrer-when-downgrade"
  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG-PUmSFM0AoQe7tuf7BrSUfiTGGQ2eUM&q=Space+Needle,Seattle+WA">
</iframe>
  )
}

export default Map;
