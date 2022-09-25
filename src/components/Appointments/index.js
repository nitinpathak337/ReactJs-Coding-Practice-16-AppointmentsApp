// Write your code here
import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import './index.css'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentList: [],
    title: '',
    date: '',
    starred: false,
  }

  titleChange = event => {
    this.setState({title: event.target.value})
  }

  dateChange = event => {
    this.setState({date: event.target.value})
  }

  addAppointment = event => {
    event.preventDefault()

    const {title, date} = this.state
    if (title !== '' && date !== '') {
      const newAppointment = {
        id: uuidv4(),
        title,
        date,
        isStarred: false,
      }
      this.setState(prevState => ({
        appointmentList: [...prevState.appointmentList, newAppointment],
        title: '',
        date: '',
      }))
    }
  }

  addFavorite = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  filter = () => {
    this.setState(prevState => ({
      starred: !prevState.starred,
    }))
  }

  render() {
    const {appointmentList, title, date, starred} = this.state
    let list = []
    const classStarredButton = starred
      ? 'starred-button-active'
      : 'starred-button'
    if (starred === true) {
      list = appointmentList.filter(eachItem => eachItem.isStarred === true)
    } else {
      list = appointmentList
    }
    return (
      <div className="bg">
        <div className="card">
          <div className="upper-section">
            <form className="form-details">
              <h1 className="heading">Add Appointment</h1>

              <label className="label" htmlFor="title">
                Title
              </label>
              <input
                value={title}
                placeholder="Title"
                className="input"
                type="text"
                id="title"
                onChange={this.titleChange}
              />
              <label className="label" htmlFor="date">
                Date
              </label>
              <input
                className="input"
                type="date"
                id="date"
                onChange={this.dateChange}
                value={date}
              />
              <button
                type="submit"
                className="button"
                onClick={this.addAppointment}
              >
                Add
              </button>
            </form>
            <div className="image-container">
              <img
                className="image"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="heading-button-container">
            <h1>Appointments</h1>
            <button
              className={classStarredButton}
              type="button"
              onClick={this.filter}
            >
              Starred
            </button>
          </div>
          <ul className="list-container">
            {list.map(eachItem => (
              <AppointmentItem
                key={eachItem.id}
                appointmentDetails={eachItem}
                addFavorite={this.addFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
