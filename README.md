# Weather App Backend

## Requirements

- Node.js
- Express.js
- PostgreSQL
- Prisma
- JWT
- Bcrypt
- Openweathermap Library
- Weatherbit Library

## Installation

1. Clone the repository
2. Create a `.env` file based on the `.env.sample`
3. Install dependencies: `npm install`
4. Generate Prisma Client: `npx prisma generate`
5. Migrate the database: `npx prisma migrate dev`
6. Format the Table Schema: `npm format`
7. Push Schema Changes: `npm dbpush`
8. Build the TypeScript files: `npm run build`
9. Start the server: `npm start`


## Postman Collection - 
- https://weather-app-3031.postman.co/workspace/Weather-App-Workspace~3e0ad570-47db-45cd-8a0b-f0157269e920/collection/23851930-3d149b94-1bd6-4330-8eb0-a10ec4f58516?action=share&creator=23851930


## API documentation -
- Openweathermap:
- https://openweathermap.org/current
- https://openweathermap.org/api/one-call-api

- Weatherbit:
  - https://dev.meteostat.net/api/point/daily.html#endpoint
  - https://www.weatherbit.io/account/dashboard
  - https://weatherbit.io/api

- Weather Visual Crossing: 
  - https://www.visualcrossing.com/account
  - https://www.visualcrossing.com/weather-api
  -https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/


## API Endpoints

### Auth

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate a user and return a JWT

### Weather

- `GET /api/weather/current?city={city}` - Get current weather for a city
- `GET /api/weather/forecast?city={city}` - Get 7-day weather forecast for a city
- `GET /api/weather/historical?city={city}` - Get historical weather data for the past 7 days for a city - This API did not provide historical data in the free. that's why I used weatherbit library.

### Favorites

- `POST /api/favorites` - Add a city to the user's favorites
- `GET /api/favorites` - Get the user's favorite cities and their weather data

## Error Handling

- Appropriate HTTP status codes and error messages are returned for validation errors and internal server errors.
