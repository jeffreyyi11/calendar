import React from 'react';

const CalendarHeader = ({dateDisplay, onPrev, onNext}) => {
    return (
        <div id='header-container' className='calendarHeader'>
            <div id='display' className='monthDisplay'>{dateDisplay}</div>
            <div id='month-nav' className='monthButtons'>
                <button onClick={onPrev}>Prev</button>
                <button onClick={onNext}>Next</button>
            </div>
        </div>
    )
}

export default CalendarHeader;