import React from 'react';
import styles from '../public/css/styles.module.css';

const CalendarHeader = ({dateDisplay, onPrev, onNext}) => {
    return (
        <div id='header-container' className={styles.header}>
            <div id='display' className={styles.monthDisplay}>{dateDisplay}</div>
            <div id='month-nav' className={styles.monthButtons}>
                <button onClick={onPrev}>Prev</button>
                <button onClick={onNext}>Next</button>
            </div>
        </div>
    )
}

export default CalendarHeader;