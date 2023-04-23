import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const MyCalendar = (props) => { 

    const localizer = momentLocalizer(moment);
    const currentdata = props.currentdata;


    return  ( 

        <div>
        <Calendar
        localizer={localizer}
        events = {currentdata}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "85vh" }}
        />
        </div>

    )

} 
export default MyCalendar; 
