# EventHub – Book and Cancel Test (Playwright)

This test creates a booking through the EventHub API, checks it in the UI, cancels it through the API, and confirms it's gone from the UI.

## Application

- App: https://eventhub.rahulshettyacademy.com
- API: https://api.eventhub.rahulshettyacademy.com/api

## What the test does

1. **Login (API)**: logs in once in `test.beforeAll` and saves the token.
2. **API context**: creates an API context with `baseURL` and the token as a default `Authorization` header.
3. **Pick an event**: gets live events from `GET /events` and picks an upcoming event with at least 2 seats. No hard-coded event id.
4. **Create booking**: books 2 tickets with fixed customer name, email, and phone (`POST /bookings`).
5. **Check create response**: saves the booking id, reference code, and expected total.
6. **Look up by reference**: calls `GET /bookings/ref/{ref}` and checks that id, reference, quantity, and total match the create response.
7. **Open browser with token**: adds the token to localStorage with `page.addInitScript()` before the first page opens.
8. **My Bookings**: finds the booking card by reference and checks the event title, 2 tickets, and total.
9. **Details page**: clicks View Details and checks the URL, reference, event title, category, city, total, and customer email.
10. **Cancel booking**: deletes the booking with `DELETE /bookings/{id}`.
11. **Check it's gone (API)**: looks up the reference again and expects a `404`.
12. **Check it's gone (UI)**: opens My Bookings again and checks that no card shows the reference.
13. **Cleanup**: disposes the API context in `test.afterAll`.

## APIs used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/auth/login` | Login and get token |
| GET | `/events` | Get live events |
| POST | `/bookings` | Create booking |
| GET | `/bookings/ref/{bookingRef}` | Find booking by reference |
| DELETE | `/bookings/{bookingId}` | Cancel booking |

Add your EventHub login in the test file:

```javascript
const loginPayload = { email: 'your-email@example.com', password: 'YourPassword' };
```

## Run the test

```bash
npx playwright test 
```

## Notes

- API responses are wrapped in `data`, so the code reads `(await response.json()).data`.
- The token is stored in localStorage under the key `eventhub_token`.