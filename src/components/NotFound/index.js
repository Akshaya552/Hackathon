import './index.css'

const NotFound = () => (
  <div className="notfound-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="nojob-image"
    />
    <h1 className="failure-heading">Page Not Found</h1>
    <p className="failure-description">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
