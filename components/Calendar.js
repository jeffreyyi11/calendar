//Calendar Component houses all other related components
import React, {useEffect, useState} from 'react';
import CalendarHeader from './CalendarHeader';
import Days from './Days';
import styles from '../public/css/styles.module.css';
import EventModal from './EventModal';

const Calendar = () => {
    //state to hold month position in relation to current month
    const [monthNav, setMonthNav] = useState(0);
    const [days, setDays] = useState([]);
    const [dateDisplay, setDateDisplay] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [events, setEvents] = useState([
        {
            date: '12/21/2021',
            description: 'test event 1',
        },
        {
            date: '12/21/2021',
            description: 'test event 2',
        },
        {
            date: '12/31/2021',
            description: 'test event 3',
        },
        {
            date: '12/05/2021',
            description: 'test event 4'
        }
    ]);

    //function to filter events by selected date
    const eventsForDate = (date) => {
        return events.filter(e => e.date === date);
    };
    
    //function to add date to event
    const addEvent = (event) => {
        setEvents([...events, event]);
        return events;
    }

    const selectDate = (day) => {
        setSelectedDate(day.date);
        console.log(selectedDate);
    }

    //useEffect to load day cards for current selected month, will rerun on monthNav change or adding an event
    useEffect(() => {
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
            const dayString = `${month + 1}/${i - paddingDays}/${year}`;
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
            {selectedDate}
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
                        selectDate={() => {
                            if (selectedDate) {
                                setSelectedDate('');
                            }
                            else if (!d.padding) {
                                setSelectedDate(d.date);
                            }
                        }}
                    />
                ))}
            </div>
            <div id='events'>
                {
                    // selectedDate ?
                    // eventsForDate(selectedDate.date).map((event, i) => {
                    //     return (<p key={i}>{event.date} - {event.description}</p>)
                    // })
                    // :
                    events.sort((a, b) => new Date(a.date) - new Date(b.date))
                          .map((event, i) => {
                            return (<p key={i}>{event.date} - {event.description}</p>)
                    })
                }
            </div>
            <div id='event-modal'>
                {selectedDate && <EventModal addEvent={addEvent} />}
            </div>
        </div>
    )
}

export default Calendar