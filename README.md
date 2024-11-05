## Netflix-GPT 🎦 with React, Firebase & GPT-powered Search

This project is a Netflix clone built with React.js, Firebase, and GPT API for movie search functionality. The main aim was to explore the fundamentals of React, understand the website-building process, and develop a fully responsive web app. The app is deployed on Vercel, allowing users to browse and search for movies, sign up and log in, all within a Netflix-inspired interface.

## 💻 Demo

https://netflix-gpt-delta-pied.vercel.app/

## ✨ Features

- **User Authentication**: Leveraged Firebase services to enable secure login and signup functionalities.
- **GPT-Powered Movie Search**: Integrated GPT API to enhance movie search capabilities, making it easier for users to find specific titles or genres.
- **Responsive Design**: Ensured the app is responsive and accessible across various devices (desktops, tablets, and smartphones).

## 👩‍💻 Tech Stack

**Client:** React, Firebase, HTML5, CSS

## Installation and Setup

To run this project locally, follow these steps:

1. **Clone the repository**

```bash
  git clone https://github.com/issacsamalex/netflix-GPT
```

2. **Go to the project directory**

```bash
  cd netflix-GPT
```

3. **Install dependencies**

```bash
  npm install
```

4. **Set up Firebase**

- Create a Firebase project at Firebase Console.
- Enable authentication (email/password).
- Add your Firebase configuration to the project.(src/utils/firebase.js)

5. **Set up GPT API**

- Sign up for OpenAI API access at OpenAI's API.
- Add your GPT API key to the .env file:

```bash
  REACT_APP_GPT_API_KEY = your_gpt_api_key
```

6. **Run the application**

```bash
  npm start
```

The app will start at http://localhost:3000.
