This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Run the development server:

```bash
#first run
npm run setupDB
# then
npm run dev
# or just
docker-compose up
```

The first thing you might notice about this coding challenge is that I did not make the backend with a JVM
This is because I am more familiar with Nextjs and I had an existing project that could quickly modify as the backed.

Even with taking this shortcut I still pushed past the 5 hours limit.

I did not have time to add tests, but I would have used jest and react testing library.

Frontend wise, I guess noteworthy things are
* The use of context to retain the GuestUsername from the localhost:3000/ page to the chats page. 
* The use of websockets to ensure the chat keeps up to date (no need to refresh the page for the latest messages)
* The use of a custom hook to handle the websocket connection
* if the chat is "too wide" it's because i thought that the width of it was supposed to be flexible. 
a simple max width would keep it slim  

Backend wise, noteworthy things are
* the sqlite database and its dao is in the /db folder
* pages/api/socket.ts is the websocket server, and is placed in the older router, as websockets are not supported in the approuter yet it seems




Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
