import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onOpenEmptyEvent, onSetActiveEvent, onSetEvents, onUpdateEvent } from "../store";
import { calendarApi } from "../api";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent, isEventNew } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const startEmptyEvent = () => {
        dispatch(onOpenEmptyEvent());
    }

    const setActiveEvent = (event) => {
        dispatch(onSetActiveEvent(event));
    }

    const startGettingEvents = async() => {
        try {
            const { data } = await calendarApi.get('/events')
            dispatch(onSetEvents(data.events))
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingEvent = async(event) => {

        try {
            // Update event
            const {title, note, start, end} = event;
            if(event.id) {
                await calendarApi.put(`/events/${ event.id }`, {title, note, start, end})
                dispatch(onUpdateEvent({...event, user}))
            } else {
                const { data } = await calendarApi.post(`/events`, event )
                dispatch(onAddNewEvent({...event, id: data.event.id, user }));
            }
        } catch (error) {
            console.log(error)
        }
    }

    const startDeletingEvent = async(event) => {

        try {
            await calendarApi.delete(`/events/${ event.id }`)
            dispatch(onDeleteEvent(event));
            Swal.fire('Event deleted', 'The event has been deleted successfully', 'success')
        } catch (error) {
            console.log(error);
        }
    }

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        isEventNew,

        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,
        startGettingEvents,
        startEmptyEvent
    }
}
