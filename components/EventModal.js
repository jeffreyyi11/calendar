import React, {useState, useEffect} from 'react';
import newEvent from './MinioCalls/newEvent';

const EventModal = ({events, today,closeModal}) => {
    const [date, setDate] = useState(today);
    const [description, setDescription] = useState('');
    const [eventName, setEventName] = useState('');
    const [todayEvents, setTodayEvents] = useState([]);
    const [eventModal, setEventModal] = useState('eventModalStyles');
    const [backDrop, setBackDrop] = useState('modalBackDrop');

    //function to close event modal and return to normal view
    const close = () => {
        setEventModal('hideEventsModal');
        closeModal();
        setBackDrop('');
    }

    //create a new event
    const createEvent = async() => {
        const event = {
            date: date,
            name: eventName,
            description: description,
        }
        let data = JSON.stringify(event);
        try {
            let created = newEvent(data);
            if (created) {
                console.log(created);
                setDate('');
                setDescription('');
                close();
            }
        }
        catch (err) {
            throw err;
        }
    };
    
    //filter events for the day of selected date and format date to mm/dd/yyyy
    useEffect(() => {
        let month = today.slice(0,2);
        let restOfToday = today.slice(2);
        if (parseInt(month) < 10) {
            month = '0' + month;
            today = month + restOfToday;
            setDate(String(today));
        }
        console.log(today);
        console.log(events);
        for (let i = 0; i < events.length; i++) {
            let event = events[i];
            if (event['date'] === today) {
                setTodayEvents([...todayEvents, event]);
            }
        }
        console.log(todayEvents);
    }, [events])

    return (
        <div id='event-container'>
            <div id='newEvent' className={eventModal}>
                {today}
                <h3>Events</h3>
                <div id='events'>
                    {
                        todayEvents.map((event, i) => {
                            return (<li key={i} className='eventDisplay'>{event.name} - {event.description}</li>)
                        })
                    }
                </div>
                <h3>New Event</h3>
                <input
                    id='eventDate'
                    type='text'
                    defaultValue={date}
                />
                <input
                    id='eventName'
                    type='text'
                    placeholder='Name'
                    onChange={e => setEventName(e.target.value)}
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