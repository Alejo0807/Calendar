import { createSlice } from "@reduxjs/toolkit"
import { addHours, parseISO } from "date-fns";

const tempEvent = {
   id: new Date().getTime(),
   title: 'Title test312312',
   notes: 'Notes test',
   start: new Date(),
   end: addHours(new Date(), 1),
   bgColor: '#fafafa',
   user: {
     id: '123',
     name: 'Alejandro'
   }
};


export const calendarSlice = createSlice({
   name: 'calendar',
   initialState: {
      events: [],
      activeEvent: null,
      isLoadingEvents: false,
      isEventNew: true
   },
   reducers: {
      onOpenEmptyEvent: (state) => {
         state.isEventNew = true;
      },
      onSetActiveEvent: (state, { payload }) => {
         state.isEventNew = false;
         state.activeEvent = payload
      },
      onSetEvents: (state, { payload }) => {
         state.isLoadingEvents = false
         state.events = payload.map(event => {
            event.start = parseISO(event.start);
            event.end = parseISO(event.end);
            return event;
         });
      },
      onAddNewEvent: (state, {payload}) => {
         state.isEventNew = false;
         state.events.push(payload);
         state.activeEvent = null;
      },
      onUpdateEvent: (state, {payload}) => {
         state.events = state.events.map(event => {
            if (event.id === payload.id) {
               return payload
            }
            return event;
         });
      },
      onDeleteEvent: (state, {payload}) => {
         state.events = state.events.filter(event => event.id !== payload.id );
         state.activeEvent = null;
      },
      onLogoutCalendar: (state) => {
         state.events =  [],
         state.activeEvent =  null,
         state.isLoadingEvents =  false,
         state.isEventNew =  true
      }
   }
});

export const { onSetActiveEvent,
               onAddNewEvent,
               onUpdateEvent,
               onDeleteEvent,
               onSetEvents,
               onOpenEmptyEvent,
               onLogoutCalendar } = calendarSlice.actions;

