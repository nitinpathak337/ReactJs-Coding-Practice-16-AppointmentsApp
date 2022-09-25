// Write your code here
import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointmentDetails, addFavorite} = props
  const {id, title, date, isStarred} = appointmentDetails
  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const dateInFormat = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const onStarClick = () => {
    addFavorite(id)
  }

  return (
    <li className="list-item">
      <div className="title-star-container">
        <p className="para">{title}</p>
        <button
          className="star-button"
          type="button"
          onClick={onStarClick}
          testid="star"
        >
          <img src={starImage} alt="star" />
        </button>
      </div>
      <p className="date-text">Date: {dateInFormat}</p>
    </li>
  )
}

export default AppointmentItem
