# URL Shortener

A simple URL shortening service. Takes long URLs and gives you short, shareable links.

Live demo: https://urlshortner-1-t52p.onrender.com/

## What it does

Paste a long URL, get a short one back. When someone visits the short link, they get redirected to the original URL. That's it.

Useful for sharing links on social media, in emails, or anywhere character count matters.

## Tech stack

**Backend:**
- Node.js + Express
- MongoDB for storing URLs
- Nanoid for generating short codes

**Frontend:**
- HTML/CSS/JavaScript
- Clean, minimal interface

## Running locally

**Backend setup:**
```bash
cd backend
npm install
```

Create `.env` file:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the server:
```bash
node server.js
```

**Frontend setup:**
```bash
cd frontend
npm install
npm start
```

Visit `http://localhost:3000`

## How it works

1. User submits a long URL
2. Server generates a random 6-character code
3. Stores URL + code in MongoDB
4. Returns shortened link
5. When someone visits the short link, server looks up the code and redirects

## API endpoints

**Shorten a URL:**
```
POST /api/shorten
Body: { "url": "https://example.com/very-long-url" }
Response: { "shortUrl": "abc123" }
```

**Redirect:**
```
GET /:code
Redirects to original URL
```

**Get stats (optional):**
```
GET /api/stats/:code
Response: { "url": "...", "clicks": 42 }
```

## Features you could add

- Custom short codes (let users choose their own)
- Click tracking and analytics
- QR code generation
- Expiring links
- Password-protected links
- User accounts
- Link management dashboard

## Deployment

Currently deployed on Render. You can deploy to:
- Render
- Heroku
- Vercel (frontend) + MongoDB Atlas (database)
- Any VPS with Node.js

Just make sure to set your environment variables.

## Common issues

**"Cannot connect to MongoDB"**
Check your connection string in the .env file. Make sure MongoDB is running and accessible.

**Links not redirecting**
Verify the short code exists in your database and the redirect route is working.

**CORS errors**
Make sure your backend allows requests from your frontend domain.

## License

MIT