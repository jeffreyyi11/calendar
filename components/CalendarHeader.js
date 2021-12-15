import React from 'react';

const CalendarHeader = ({dateDisplay, onPrev, onNext}) => {
    return (
        <div id='header-container'>
            <div id='display'>{dateDisplay}</div>
            <div id='month-nav'>
                <button onClick={onPrev}>Prev</button>
                <button onClick={onNext}>Next</button>
            </div>
        </div>
    )
}

export default CalendarHeader;