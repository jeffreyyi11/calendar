import React, {useState} from 'react';
import styles from '../public/css/styles.module.css';

const EventModal = ({addEvent, closeModal}) => {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [eventModal, setEventModal] = useState(styles.eventModalStyles);
    const [backDrop, setBackDrop] = useState(styles.modalBackDrop);

    const close = () => {
        setEventModal(styles.hideEventsModal);
        closeModal();
        setBackDrop('');
    }

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

    return (
        <div id='event-container'>
            <div id='newEvent' className={eventModal}>
                <h3>New Event</h3>
                <input
                    id='eventDate'
                    type='text'
                    placeholder='MM/DD/YYYY'
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