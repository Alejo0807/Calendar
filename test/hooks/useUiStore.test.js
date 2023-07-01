const { renderHook, act } = require("@testing-library/react");
const { useUiStore } = require("../../src/hooks/useUiStore");
const { Provider } = require("react-redux");
const { configureStore } = require("@reduxjs/toolkit");
const { uiSlice } = require("../../src/store");


const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer,

        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}
describe('Test on useUiStore', () => {
    
    
    test('should return default values', () => {

        const mockStore = getMockStore({ isDateModalOpen: false })
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => 
                <Provider store={ mockStore }>
                    { children }
                </Provider>
        })
        expect(result.current.isDateModalOpen).toEqual(false)
    })
    
    
    test('should return isDateModalOpen true', () => {

        const mockStore = getMockStore({ isDateModalOpen: false })
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => 
                <Provider store={ mockStore }>
                    { children }
                </Provider>
        })

        const { openDateModal } = result.current;
        act(() => { 
            openDateModal()
        });
        expect(result.current.isDateModalOpen).toBeTruthy();
    })

    test('should return isDateModalOpen true', () => {

        const mockStore = getMockStore({ isDateModalOpen: true })
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => 
                <Provider store={ mockStore }>
                    { children }
                </Provider>
        })

        const { closeDateModal } = result.current;
        act(() => { 
            closeDateModal()
        });
        expect(result.current.isDateModalOpen).toBeFalsy()
    })
    
})
