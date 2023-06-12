# ChatXo

The ChatXo is a Next.js application that allows two users to communicate with each other through real-time chat. It provides features such as friend management, allowing users to add, delete, and search for friends. The application supports authentication through social media platforms

## Demo

Check out the [live demo](https://chat-xo.vercel.app/) of the application.

## Backend Repository

You can find the frontend source code in the [ChatXo-backend](https://github.com/mahmodghnaj/chatXo-backend) repository.

## Features

- Real-time Chat: Users can engage in real-time chat with each other, sending and receiving messages instantly.
- Friend Management: Users can add friends, delete friends, and search for friends to initiate chats with them.
- Last Seen Date: The application displays the last seen date of each user, indicating when they were last active.
- User Status: Users' online/offline status is shown, indicating whether they are currently active or not.
- Message Receipt: The application provides flags to indicate whether a message has been received or not.
- Social Media Authentication: Users can log in or register using their Google or GitHub accounts for seamless authentication.
- Middleware authentication in Next.js (server-side)
- State Management: Redux Toolkit is used for efficient state management in the application.
- UI Design: The application uses Tailwind CSS for a responsive and visually appealing user interface.

## Technologies Used

- [Next.js](https://nextjs.org/): A React framework for building server-side rendered and statically generated applications.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom user interfaces.
- [Socket.IO](https://socket.io/): A library that enables real-time, bidirectional, and event-based communication between the browser and the server.
- [Redux Toolkit](https://redux-toolkit.js.org/): A package that simplifies Redux state management and provides utilities for efficient development.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run dev



# production mode
$ npm run build
```
