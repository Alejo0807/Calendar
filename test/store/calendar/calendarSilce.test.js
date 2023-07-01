import { parseISO } from "date-fns";
import { calendarSlice, onAddNewEvent, onDeleteEvent, onLogoutCalendar, onOpenEmptyEvent, onSetActiveEvent, onSetEvents, onUpdateEvent } from "../../../src/store/calendar/calendarSlice";

const user = {
    id: '123',
    name: 'Test',
    email: 'test@test.com'
}

const event = {
    id: '123',
    title: 'Title test312312',
    notes: 'Notes test',
    start: "1970-01-01T00:00:00.001Z",
    end: "1970-01-01T00:00:10.000Z",
    bgColor: '#fafafa',
    user
 };

describe('Test in calendarSlice', () => {
  

    let state = calendarSlice.getInitialState();
    let stateWithEvents = {
        events: [event],
        activeEvent: null,
        isLoadingEvents: false,
        isEventNew: true
    }

    test('should have the initialState', () => {
    
        expect(calendarSlice.getInitialState()).toEqual({
            events: [],
            activeEvent: null,
            isLoadingEvents: false,
            isEventNew: true
        })
    });
  
    test('should change when call onOpenEmptyEvent', () => {
    
        state = calendarSlice.reducer(state, onOpenEmptyEvent());
        expect(state).toEqual({
            ...state,
            isEventNew: true
        })
    });
    
    test('should change when call onSetActiveEvent', () => {
    
        state = calendarSlice.reducer(state, onSetActiveEvent(event));
        expect(state).toEqual({
            ...state,
            isEventNew: false,
            activeEvent: event
        })
    });
    
    test('should change when call onSetEvents', () => {

        let events = [{
            id: '123',
            title: 'Title test312312',
            notes: 'Notes test',
            start: "1970-01-01T00:00:00.001Z",
            end: "1970-01-01T00:00:10.000Z",
            bgColor: '#fafafa',
            user
        }]
        state = calendarSlice.reducer(state, onSetEvents(events));
        expect(state).toEqual({
            ...state,
            events: [
                {
                    id: '123',
                    title: 'Title test312312',
                    notes: 'Notes test',
                    start: parseISO("1970-01-01T00:00:00.001Z"),
                    end: parseISO("1970-01-01T00:00:10.000Z"),
                    bgColor: '#fafafa',
                    user
                }
            ],
            isLoadingEvents: false
        })
    });
    
    test('should change when call onAddNewEvent', () => {
    
        let state = calendarSlice.getInitialState();

        state = calendarSlice.reducer(state, onAddNewEvent(event));
        expect(state).toEqual({
            ...state,
            events: [event],
            activeEvent: null,
            isEventNew: false
        })
    });
    
    test('should change when call onUpdateEvent', () => {

        let events = [{ 
            id: '123',
            title: 'Title test312312',
            notes: 'Notes test',
            start: "1970-01-01T00:00:00.001Z",
            end: "1970-01-01T00:00:10.000Z",
            bgColor: '#fafafa',
            user
        }]

        state = calendarSlice.reducer(state, onSetEvents(events));
    

        let event = { 
            id: '123',
            title: 'Changed',
            notes: 'Notes test',
            start: "1970-01-01T00:00:00.001Z",
            end: "1970-01-01T00:00:10.000Z",
            bgColor: '#fafafa',
            user
        }
        state = calendarSlice.reducer(stateWithEvents, onUpdateEvent(event));
        expect(state).toEqual({
            ...state,
            events: [{
                id: '123',
                title: 'Changed',
                notes: 'Notes test',
                start: "1970-01-01T00:00:00.001Z",
                end: "1970-01-01T00:00:10.000Z",
                bgColor: '#fafafa',
                user
            }],
        })

    });
    
    test('should change when call onDeleteEvent', () => {
        let events = [{ 
            id: '123',
            title: 'Title test312312',
            notes: 'Notes test',
            start: "1970-01-01T00:00:00.001Z",
            end: "1970-01-01T00:00:10.000Z",
            bgColor: '#fafafa',
            user
        }]

        state = calendarSlice.reducer(state, onSetEvents(events));
    

        let event = { 
            id: '123',
            title: 'Changed',
            notes: 'Notes test',
            start: "1970-01-01T00:00:00.001Z",
            end: "1970-01-01T00:00:10.000Z",
            bgColor: '#fafafa',
            user
        }

        state = calendarSlice.reducer(state, onDeleteEvent(event));
        expect(state).toEqual({
            events: [],
            activeEvent: null,
            isLoadingEvents: false,
            isEventNew: true
        })
    });
    
    test('should change when call onLogoutCalendar', () => {
    
        state = calendarSlice.reducer(state, onLogoutCalendar());
        expect(state).toEqual({
            events: [],
            activeEvent: null,
            isLoadingEvents: false,
            isEventNew: true
        })
    });
    
})