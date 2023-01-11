import "./LoadingScreen.css"

const LoadingScreen = () => {
  return (
    <div className="loading-screen-background">
      <div className="loading-screen-message">
        Please wait while we process your request
      </div>
      <i className="fa-solid fa-spinner" />
    </div>
  )
}

export default LoadingScreen;
