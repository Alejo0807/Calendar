import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

    const setActiveEvent = (eventClicked) => {
        dispatch(onSetActiveEvent(eventClicked));
    }

    const startSavingEvent = async(event) => {
        // Update event
        if(event._id) {
            dispatch(onUpdateEvent(event))
        } else {
            dispatch(onAddNewEvent({...event, _id: new Date().getTime()}));
        }
    }

    const startDeletingEvent = (event) => {
        dispatch(onDeleteEvent(event));
    }

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        startDeletingEvent,
        setActiveEvent,
        startSavingEvent
    }
}
