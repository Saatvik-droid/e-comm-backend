# E-Commerce Backend

A brief mock backend for a e-commerce website/app including auth

## Setup

- Create a `.env` file with variables for `PORT` (optional, default is 3000), `MONGO_URI`, `JWT_KEY`. 
- Make sure your MongoDB database connection is up and running and that your `MONGO_URI` points to a particular database such as `mongodb://127.0.0.1:27017/**e-comm**`.
- Install all the required packages through `npm ci` (`npm install` will modify `package-lock.json` so it is not recommended).  

## Usage

Run `npm run dev` for development and `npm run start` for production environments.
