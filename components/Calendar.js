//Calendar Component houses all other related components
import React, {useEffect, useState} from 'react';
import CalendarHeader from './CalendarHeader';

const Calendar = () => {
    //state to hold month position in relation to current month
    const [monthNav, setMonthNav] = useState(0);
    const [days, setDays] = useState([]);
    const [dateDisplay, setDateDisplay] = useState('');
    const [dateClicked, setDateClicked] = usetState(false);
    const [events, setEvents] = useState([]);

    //function to filter events by selected date
    const eventsForDate = (date) => {
        events.filter(e => e.date === date)
    };
    
    //function to add date to event
    const addEvent = (event) => {
        setEvents([...events, event]);
        return events;
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
                    event: eventsForDate(dayString),
                    isCurrentDay: i - paddingDays === day && nav === 0,
                    date: day,
                    padding: false,
                })
            } else {
                daysArr.push({
                    value: daysInMonth - paddingDays + 1,
                    event: null,
                    isCurrentDay: false,
                    date: '',
                    padding: true,
                })
            }
            setDays(daysArr);
        }
    }, [events, monthNav]);

    return (
        <div id='calendar-container'>
            <CalendarHeader 
                dateDisplay={dateDisplay}
                onPrev={() => setMonthNav(monthNav - 1)}
                onNext={() => setMonthNav(monthNav + 1)}
            />
        </div>
    )
}

export default Calendar