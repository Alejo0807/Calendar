const { renderHook, act } = require("@testing-library/react");
const { Provider } = require("react-redux");
const { configureStore } = require("@reduxjs/toolkit");
const { authSlice } = require("../../src/store");
const { useAuthStore } = require("../../src/hooks/useAuthStore");


// status: 'not-authenticated', // authenticated
//         user: {},
//         errorMessage: ''

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,

        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
}
describe('Test on useAuthStore', () => {
    
    
    test('should return default values', () => {

        const mockStore = getMockStore({ status: 'not-authenticated' })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => 
                <Provider store={ mockStore }>
                    { children }
                </Provider>
        })

        expect(result.current).toEqual({
            status: 'not-authenticated',
            errorMessage: undefined,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            startLogout: expect.any(Function),
            checkAuthToken: expect.any(Function)
        })
    })
    
    
    test('should return isDateModalOpen true', async() => {
        localStorage.clear();

        const credentials = {
            email: 'test7@test.com',
            password: 'Hola'
        }

        const mockStore = 
            getMockStore({ 
                status: 'not-authenticated' ,
                user: {},
                errorMessage: undefined
            });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => 
                <Provider store={ mockStore }>
                    { children }
                </Provider>
        })

        const { startLogin } = result.current;
        await act(async() => { 
            await startLogin(credentials)
        });
        
        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }). toEqual({
            errorMessage: '',
            status: 'authenticated',
            user: {
                name: "Alejandro",
                uid: undefined,
            }
        });

    })

    test('should return isDateModalOpen true', () => {

    })
    
})
