import React, {useEffect} from 'react';
import styles from '../public/css/styles.module.css';

const Days = ({day, events, selectDate}) => {
    const className = `${day.padding ? styles.padding: styles.day} 
                       ${day.isCurrentDay ? styles.currentDay : ''}`;

    useEffect(() => {
        console.log(events);
    }, []);

    return (
        <div className={className} onClick={selectDate}>
            {day.value}
            {day.events && day.events.map((event, i) => {
                <p key={i}>{event.description}</p>
            })}
        </div>
    );
}

export default Days