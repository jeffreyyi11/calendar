//Calendar Component houses all other related components
import React, {useEffect, useState} from 'react';
import CalendarHeader from './CalendarHeader';
import Days from './Days';
import styles from '../public/css/styles.module.css';
import EventModal from './EventModal';
import Events from './Events';
import getObjects from '../minio_functions/getObjects';

const Calendar = () => {
    //state to hold month position in relation to current month
    const [monthNav, setMonthNav] = useState(0);
    const [days, setDays] = useState([]);
    const [dateDisplay, setDateDisplay] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [monthYear, setMonthYear] = useState([]);
    const [events, setEvents] = useState([]);

    //function to filter events by selected date
    const eventsForDate = (date) => {
        let filteredEvents = events.filter(event => event.date === String(date));
        return filteredEvents;
    };
    
    //function to add date to event
    const addEvent = (event) => {
        setEvents([...events, event]);
        return events;
    }

    //useEffect to load day cards for current selected month, will rerun on monthNav change or adding an event
    useEffect(() => {
        //Grab all the events from minio bucket and set state
        let eventsFromMinio = getObjects();
        if (eventsFromMinio) setEvents(eventsFromMinio);

        //create array for the day label
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        //create a new day object and use for to get month, year, and set dates for the month
        const dt = new Date();
        
        //set month based on currently selected monnth
        if (monthNav !== 0) {
            dt.setMonth(new Date().getMonth() + monthNav);
        };

        //getting the day, month, and year from current selected month
        const day = dt.getDate();
        const month = dt.getMonth();
        const year = dt.getFullYear();
        setMonthYear([month, year]);

        //find the first day of the current selected month;
        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric', 
            day: 'numeric'
        });

        //set Display for current Month and Year
        setDateDisplay(`${dt.toLocaleDateString('en-us', {month:'long'})} ${year}`);

        //figure out how many padding days before the first day of month
        const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

        //array object to hold a day component for each day of current month
        const daysArr = [];

        //create day component for each day and each padding day in current selected month
        for (let i = 1; i <= paddingDays + daysInMonth; i++) {
            let formattedDay;
            if ((i - paddingDays > 0) && (i - paddingDays < 10)) {
                formattedDay = '0' + String(`${i - paddingDays}`);
            } else {
                formattedDay = i - paddingDays;
            }
            const dayString = `${month + 1}/${formattedDay}/${year}`;
            if (i > paddingDays) {
                daysArr.push({
                    value: i - paddingDays,
                    events: eventsForDate(dayString),
                    isCurrentDay: i - paddingDays === day && monthNav === 0,
                    date: dayString,
                    padding: false,
                })
                
            } else {
                daysArr.push({
                    value: daysInMonth - paddingDays + i,
                    events: null,
                    isCurrentDay: false,
                    date: '',
                    padding: true,
                })
            }
            setDays(daysArr);
        }
    }, [events, monthNav]);

    return (
        <div id='calendar-container' className={styles.container}>
            <CalendarHeader 
                dateDisplay={dateDisplay}
                onPrev={() => setMonthNav(monthNav - 1)}
                onNext={() => setMonthNav(monthNav + 1)}
            />
            <div className={styles.days}>
                <div>Sunday</div>
                <div>Monday</div>
                <div>Tuesday</div>
                <div>Wednesday</div>
                <div>Thursday</div>
                <div>Friday</div>
                <div>Saturday</div>
            </div>
            <div className={styles.calendar}>
                {days.map((d, index) => (
                    <Days
                        key={index}
                        day={d}
                        events={eventsForDate(d.date)}
                        selectDate={() => {  ///select a day to bring up modal to add event and view events for that day
                            if (!d.padding) {
                                setSelectedDate(d.date);
                            }
                        }}
                    />
                ))}
            </div>
            <div id='events'>
                <Events 
                    events={events}
                    monthYear={monthYear}
                />
            </div>
            <div id='event-modal'>
                {selectedDate && 
                <EventModal
                    events={events}
                    today={selectedDate}
                    addEvent={addEvent}
                    closeModal={() => setSelectedDate(null)} 
                />
                }
            </div>
        </div>
    )
}

export default Calendar