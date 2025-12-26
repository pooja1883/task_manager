TaskFlow Pro

TaskFlow Pro is a task manager built with React + Redux Toolkit.
All task actions run through Redux async thunks and persist using LocalStorage.


Login (Mock Auth)

Use these credentials:
Email: admin@test.com
Password: 123456


Features

Login / Logout (protected routes)
Add • Edit • Delete • View tasks
Filters + Search + Sort
Dark / Light theme
LocalStorage persistence

Tech

React • Redux Toolkit • Thunk • Router • LocalStorage • CSS/Bootstrap

Structure

src/
 ├── app/
 │   └── store.js
 │
 ├── features/
 │   ├── auth/
 │   │   └── authSlice.js
 │   ├── tasks/
 │   │   └── tasksSlice.js
 │   └── ui/
 │       └── uiSlice.js
 │
 ├── components/
 │   └── ProtectedRoute.jsx
 │
 ├── pages/
 │   ├── Login.jsx
 │   ├── Dashboard.jsx
 │   ├── Tasks.jsx
 │   ├── TaskDetails.jsx
 │   ├── AddTask.jsx
 │   └── EditTask.jsx
 │
 ├── App.jsx
 ├── index.js
 └── styles.css   (optional)


Redux Flow

1 Component dispatches thunk
2 Thunk reads/writes LocalStorage
3 Slice reducer updates store
4 UI updates via useSelector 