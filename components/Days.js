import React from 'react';

const Days = ({day, events, selectDate}) => {
    const className = `${day.padding ? 'padding' : 'day'} ${day.isCurrentDay ? 'currentDay' : ''}`

    return (
        <div className={className} onClick={selectDate}>
            {day.value}
            {events.map((event, i) => {
                <p key={i} className='eventName'>{event.name}</p>
            })}
        </div>
    );
}

export default Days