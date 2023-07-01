import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice";

describe('Test in uiSlice', () => {
  
    test('should return the initialState', () => {

        expect(uiSlice.getInitialState()).toEqual({
            isDateModalOpen: false
        });
    });


    test('should change isDateModalOpen to true', () => {
        
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer(state, onOpenDateModal());

        expect(state.isDateModalOpen).toBeTruthy();
    })
    

    test('should change isDateModalOpen to true', () => {
        
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer(state, onCloseDateModal());

        expect(state.isDateModalOpen).toBeFalsy();
    })
    
    
})