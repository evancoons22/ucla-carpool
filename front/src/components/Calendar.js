import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const MyCalendar = () => { 

    const localizer = momentLocalizer(moment)

    const myEventsList = [
            {
                start: moment().toDate(),
                end: moment()
                .add(1, "days")
                .toDate(),
                title: "Some title"
            }
    ];

    return  ( 
        <div>
        <Calendar
            localizer={localizer}
            events = {myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "80vh" }}
        />
        </div>
    )

} 
export default MyCalendar; 
