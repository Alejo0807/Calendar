import { authSlice, onCheking, onClearErrorMessage, onLogin, onLogout, onRegister } from "../../../src/store/auth/authSlice"

describe('Test in authSlice', () => {

    let state = authSlice.getInitialState();
    let user = {
        id: '123',
        name: 'Test',
        email: 'test@test.com'
    }
  
    test('should have the initialState', () => {
    
        expect(authSlice.getInitialState()).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: ''
        })
    });

    test('should change when call onCheking', () => {

        state = authSlice.reducer(state, onCheking());
        expect(state.status).toEqual('checking');
    });

    test('should change when call onLogin', () => {
        
        state = authSlice.reducer(state, onLogin(user));
        expect(state).toEqual({
            status: 'authenticated',
            user,
            errorMessage: ''
        })
    });

    test('should change when call onRegister', () => {
        
        state = authSlice.reducer(state, onRegister(user));
        expect(state).toEqual({
            status: 'authenticated',
            user,
            errorMessage: ''
        })
    });

    test('should change when call onLogout', () => {
        
        state = authSlice.reducer(state, onLogout('Error test'));
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: 'Error test'
        })
    });

    test('should change when call onClearErrorMessage', () => {
        
        state = authSlice.reducer(state, onClearErrorMessage('Error test'));
        expect(state).toEqual({
            ...state,
            errorMessage: ''
        })
    });
    
})