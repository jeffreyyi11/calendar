import React, {useEffect, useState} from 'react';

const Events = ({events, monthYear}) => {
    const [eventsThisMonth, setEventsThisMonth] = useState();
    const month = monthYear[0] + 1;
    const year = monthYear[1];

    // run on month or year change to filter out events for that month
    // reruns on changes to events, month, year
    useEffect(() => {
        if (month < 10) {
            month = '0' + String(month);
        } else {
            month = String(month);
        }
        let filteredEvents = [];
        for (let i = 0; i < events.length; i++) {
            let event = events[i];
            if (event['date'].slice(0,2) === month && event['date'].slice(6) === String(year)) {
                filteredEvents.push(events[i]);
            };
        }
        setEventsThisMonth(filteredEvents);
    }, [events, month, year]);

    return(
        <div id='events-container'>
            {
                eventsThisMonth && 
                eventsThisMonth.sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((event, i) => {
                        return (<p key={i}>{event.date} - {event.description}</p>)
                    })
            }
        </div>
    )    
}

export default Events;