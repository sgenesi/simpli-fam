import React, { Fragment, useState, useEffect } from 'react'
import './calendar.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import RevoCalendar from 'revo-calendar'
import 'revo-calendar/dist/index.css'

function CalendarApp() {
    
  
    const [eventList, setEvents] = useState([

    ])
  
    const [displayColorPicker, setDisplayColorPicker] = useState(0)
    const [showAddEventModal, setShowAddEventModal] = useState(false)
  
    const [openDetailsOnDateSelection, setOpenDetailsOnDateSelection] = useState(
      true
    )
    const [timeFormat24, setTimeFormat24] = useState(true)
    const [showAllDayLabel, setShowAllDayLabel] = useState(false)
    const [detailDateFormat, setDetailDateFormat] = useState('DD/MM/YYYY')
  
    const [newEventName, setNewEventName] = useState('')
    const [newEventDate, setNewEventDate] = useState(new Date())
    const [newEventAllDay, setNewEventAllDay] = useState(false)
    const [newEventIcon, setNewEventIcon] = useState('')
    const [newEventText, setNewEventText] = useState('')
  
    function deleteEvent(i) {
      var temp = eventList
      temp.splice(i, 1)
      setEvents(temp)
    }
  
    function addEvent() {
      setShowAddEventModal(true)
      var newEvent = {
        name: newEventName,
        date: newEventDate,
        allday: newEventAllDay,
        extra: {
          icon: newEventIcon,
          text: newEventText
        }
      }
      var temp = eventList
      temp.push(newEvent)
      setEvents([...temp])
    }
  
    useEffect(() => {
      var deleteEventFunction = `
      var temp = eventList
      temp.splice(i, 1)
      setEvents(temp)`
  
      var addEventFunction = `
      var newEvent = {
        name: newEventName,
        date: newEventDate,
        allday: newEventAllDay,
        extra: {
          icon: newEventIcon,
          text: newEventText
        }
      };
      var temp = eventList;
      temp.push(newEvent);
      setEvents([...temp]);`
  
      console.log(
        `%cfunction %cdeleteEvent %c() {\n`,
        'color: #f777c9',
        'color: #67fd6e',
        'color: #D7D7D7',
        deleteEventFunction,
        `\n}`
      )
      console.log(
        `%cfunction %caddEvent %c() {\n`,
        'color: #f777c9',
        'color: #67fd6e',
        'color: #D7D7D7',
        addEventFunction,
        `\n}`
      )
    }, [])
  
    useEffect(() => {
      console.log('%cEventList: ', 'color: #b788f4', eventList)
    }, [eventList])
  
    return (
        <Fragment>
        <div className='calendar-margin'>
          <RevoCalendar
            events={eventList}
            style={{
              borderRadius: '5px',
              border: '5px solid var(--primaryColor)'
            }}
            date={new Date()}
            deleteEvent={deleteEvent}
            highlightToday={true}
            lang="en"
            primaryColor="#023047"
            secondaryColor="#ffffff"
            todayColor="#3B3966"
            textColor="#fb8500"
            indicatorColor="#8ecae6"
            animationSpeed={300}
            sidebarWidth={180}
            detailWidth={280}
            showDetailToggler={true}
            showSidebarToggler={true}
            onePanelAtATime={false}
            allowDeleteEvent={true}
            allowAddEvent={true}
            openDetailsOnDateSelection={true}
            timeFormat24={true}
            showAllDayLabel={false}
            detailDateFormat="MM/DD/YYYY"
            addEvent={(date) => {
              setNewEventDate(date)
              setShowAddEventModal(true)
            }}
          />
        </div>
        {showAddEventModal && (
          <div className='addEventModal'>
            <h2>Add your own event: </h2>
            <div className='options'>
              <code>
                <pre>
                  <span className='codePink'></span>{ }
                </pre>
                <pre className='tab'>
                  Event Name:
                  <input
                    type='text'
                    value={newEventName}
                    onChange={(e) => setNewEventName(e.target.value)}
                  ></input>

                </pre>
                <pre className='tab'>
                  Date and Time:
                  <DatePicker
                    id='datePicker'
                    selected={newEventDate}
                    onChange={(date) => {
                      setNewEventDate(date)
                    }}
                    showTimeSelect
                    dateFormat='MM/dd/yy'
                  />
                  <label className='timeDisplay' htmlFor='datePicker'>{`${newEventDate.getHours() <= 9
                    ? '0' + newEventDate.getHours()
                    : newEventDate.getHours()
                    }:${newEventDate.getMinutes() <= 9
                      ? '0' + newEventDate.getMinutes()
                      : newEventDate.getMinutes()
                    }`}</label>
                  <span className='comment'>{ }</span>
                </pre>
                <pre className='tab'>
                  All Day Event:
                  <input
                    type='checkbox'
                    checked={newEventAllDay}
                    onChange={(e) => setNewEventAllDay(e.target.checked)}
                  />
                </pre>
                <pre className='tab2'>
                  Details:
                  <input
                    type='text'
                    value={newEventText}
                    onChange={(e) => setNewEventText(e.target.value)}
                  ></input>
                </pre>
                <pre>{ }</pre>
                <div className='addEvent'>
                  <button
                    className='colorPickerBtn'
                    disabled={newEventName === ''}
                    onClick={addEvent}
                  >
                    Submit
                  </button>
                </div>
              </code>
            </div>
            <div onClick={() => setShowAddEventModal(false)}></div>
          </div>
        )}
      </Fragment>
    )
  }
  
  export default CalendarApp