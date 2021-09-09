<div align="center">
    <img src="./images/logo.svg" />
</div>

## 🎥 Live Service

[https://www.studeep.com](https://www.studeep.com/)

## **✈️ Tech stacks**

### **Core**

- React 17
- TypeScript
- Recoil
- RxJS for Reactive Programming
- OAuth 2.0 for Access-Token handling
- Context API
- React Router
- Local Storage
- Craco for customizing CRA

### Data Fetching

- Axios for using RESTful API
- SWR

### **Styling**

- @emotion
- TailwindCSS
- twin.macro
- PostCSS 7
- autoprefixer
- node-sass for using SCSS

### **Data Visualization**

- Antd
- Own created Design System

### **Code Linting**

- ESLint
- Prettier
- @emotion/babel-preset-css-prop

### **CI**

- Firebase

## **🛰 Features**

### Study Room — Machine Learning

![studyroom1](./images/studyroom1.png)

![studyroom2](./images/studyroom2.png)

When you enter the study room, Tensorflow.js will be operated for the registered webcam.

Recognize the user's hand and movement with **Hand Detection** technology to determine whether the user is studying, is dozing off, or is away.

It also uses **Object Detection** technology to recognize your smartphone and verify that you are using it.

And through **WebSocket(Socket.IO)** technology, you can share your study status among users who are connected to the study room.

### Study Report — Data Visualization

![report](./images/report.png)

We visualize the study timeline of the day and distraction factors as a chart.

If you hover your cursor on the bar displaying your spending time in one study room, you can see the tooltip that shows all information about your study (such as when did you start and end to study, how long you distracted, how many times you distracted...).

### My Study

![mystudy](./images/mystudy.png)

You can make your own private or public study rooms.
In *OnAir Studyroom* section, you can find and participate in other study rooms.

### **Authentication**

- OAuth 2.0 Token Handling
    - When we toggle `Google Login Button`, this app requests authorization information to Google.
    - Then, we requests `Access Token` to our back-end server.
- Conditional Routes (natively functioned)
    - if you are not authenticated, any private routes **can't be accessed.**
    - In root, the conditional routes **prevent** users from `NOT AUTHENTICATED`.
- Onboarding Process
    - When you log in for the first time after signing up, user have to pass the onboarding process.
        - At the onboarding process, user inputs 'Nickname'.
        - After the process, user can use the application.

## 🏎 Getting Started

### Development

1. Clone this repository

    ```jsx
    $ git clone https://github.com/YAPP-18th/ML-Team-Frontend.git
    ```

2. Install node packages with npm

    ```jsx
    $ npm i
    ```

3. Start developing

    ```jsx
    $ npm start
    ```

## 🐛 Bug Report

[Issues](https://github.com/YAPP-18th/ML-Team-Frontend/issues)

## 💻 Contribution Guide

### Pull Request

### Forked strategy

```jsx
# Fork this repository to yours.
$ git clone https://github.com/CLUG-kr/Frontend_JANDI-s_VALUE.git
$ cd gatsby-starter-bee

# Install npm packages and start this project.
$ npm install
$ npm run start

# (Working on your own..!)

# After that
$ git commit [...]
$ git push origin [YOUR_REPOSITORY]

# Enroll pull-request!
```

### Commit message rules

Consider starting the commit message:

- `refactor:` prefix.
    - when setting new development environment or refactoring codes
- `feat:` prefix.
    - when creating new feature.
- `fix:` prefix.
    - when fixing a bug.

## LICENSE

Not yet decided.
