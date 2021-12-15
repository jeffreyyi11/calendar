import React from 'react';
import styles from '../public/css/styles.module.css';

const Days = ({day, events}) => {
    const className = `${day.padding ? styles.padding: styles.day} ${day.isCurrentDay ? styles.currentDay : ''}`;
    return (
        <div className={className}>
            {day.value}
            {day.events && day.events.map((event, i) => {
                <p key={i}>{event.description}</p>
            })}
        </div>
    );
}

export default Days