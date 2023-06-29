import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, EventModal, Navbar, FabAddNew, FabDelete } from '../'
import { localizer } from '../../helpers/';
import { useState } from 'react';
import { useCalendarStore, useUiStore } from '../../hooks';


export const CalendarPage = () => {

    const { events, setActiveEvent } = useCalendarStore();
    const { openDateModal } = useUiStore();

    const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month')

    const eventStyleGetter = (event, start, end, isSelected) => {
      const style = {
        backgroundColor: '#347CF7',
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white'
      }

      return { style };
    }

    const onDoubleClick = (event) => {
      openDateModal();
    }

    const onClick = (event) => {
      setActiveEvent(event)
    }

    const onViewChanged = (event) => {
      localStorage.setItem('lastView', event)
    }


   return (
    <>
      <Navbar/>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onClick }
        onView= { onViewChanged }
      />

      <EventModal/>

      <FabAddNew/>
      <FabDelete/>

    </>
   )
 }
 