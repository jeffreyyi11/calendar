import React, {useState, useEffect} from 'react';
import styles from '../public/css/styles.module.css';

const EventModal = ({events, today, addEvent, closeModal}) => {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [eventsForToday, setEventsForToday] = useState([]);
    const [eventModal, setEventModal] = useState(styles.eventModalStyles);
    const [backDrop, setBackDrop] = useState(styles.modalBackDrop);

    //function to close event modal and return to normal view
    const close = () => {
        setEventModal(styles.hideEventsModal);
        closeModal();
        setBackDrop('');
    }

    //create a new event
    const createEvent = () => {
        const event = {
            date: date,
            description: description,
        }
        console.log(event);
        setDate('');
        setDescription('');
        addEvent(event);
        close();
    };
    
    //filter events for the day of selected date and format date to mm/dd/yyyy
    useEffect(() => {
        let month = today.slice(0,2);
        let restOfToday = today.slice(2);
        if (parseInt(month) < 10) {
            month = '0' + month;
            today = month + restOfToday;
        }
        console.log(today);
        let filteredEvents = [];
        for (let i = 0; i < events.length; i++) {
            let event = events[i];
            if (event['date'] === today) {
                filteredEvents.push(event);
            }
        }
        console.log(filteredEvents);
        setEventsForToday(filteredEvents);
        console.log(eventsForToday);
    }, [])

    return (
        <div id='event-container'>
            <div id='newEvent' className={eventModal}>
                {today}
                <div id='events'>
                    {
                        eventsForToday.map((event, i) => {
                            return (<p key={i}>{event.description}</p>)
                        })
                    }
                </div>
                <h3>New Event</h3>
                <input
                    id='eventDate'
                    type='text'
                    value={today}
                    onChange={e => setDate(e.target.value)}
                />
                <input
                    id='eventDescription'
                    type='text'
                    placeholder='Description'
                    onChange={e => setDescription(e.target.value)}
                />
                <div>
                    <button onClick={createEvent}>Add Event</button>
                    <button onClick={close}>Cancel</button>
                </div>
            </div>
            <div className={backDrop}></div>
        </div>
    )
}

export default EventModal;