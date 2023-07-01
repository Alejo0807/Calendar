import calendarApi from "../../src/api/calendarApi"

describe('Test in calendarApi', () => {
  
    test('should have default configuration', () => {
        expect(calendarApi.defaults.baseURL).toEqual(process.env.VITE_API_URL);
    })

    test('should have the x-token in header', async() => {
        localStorage.setItem('token', 'TEST');
        
        const res = await calendarApi
            .get("/auth")
            .then((res) => res)
            .catch((res) => res);
        expect(res.config.headers['x-token']).toBe('TEST');
    })
    
})
