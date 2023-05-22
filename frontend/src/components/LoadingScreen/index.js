import "./LoadingScreen.css"

const LoadingScreen = () => {
  return (
    <main className="loading-screen-container">
      <div className="loading-screen-message">
        Please wait while we process your request
      </div>
      <i className="fa-solid fa-spinner" />
    </main>
  )
}

export default LoadingScreen;
