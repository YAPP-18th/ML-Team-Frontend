
## 🎥 Live Service

[https://www.studeep.com](https://www.studeep.com/)

## **✈️ Tech stacks**

### **Core**

- React 17
- TypeScript
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

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c4ad1c3a-e91d-4d79-b4e6-0512512d2a4b/Studyroom1.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c4ad1c3a-e91d-4d79-b4e6-0512512d2a4b/Studyroom1.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fb77a234-f739-4181-a2dd-4212739daef7/Studyroom2.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fb77a234-f739-4181-a2dd-4212739daef7/Studyroom2.png)

When you enter the study room, Tensorflow.js will be operated for the registered webcam.

Recognize the user's hand and movement with **Hand Detection** technology to determine whether the user is studying, is dozing off, or is away.

It also uses **Object Detection** technology to recognize your smartphone and verify that you are using it.

And through **WebSocket(Socket.IO)** technology, you can share your study status among users who are connected to the study room.

### Study Report — Data Visualization

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dba57636-cb60-46b2-9989-9df590d49b81/Authentication.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dba57636-cb60-46b2-9989-9df590d49b81/Authentication.png)

We visualize the study timeline of the day and distraction factors as a chart.

If you hover your cursor on the bar displaying your spending time in one study room, you can see the tooltip that shows all information about your study (such as when did you start and end to study, how long you distracted, how many times you distracted...).

### My Study

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/aeecb131-b5e5-414f-843c-3fbe2d9990b4/mystudy.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/aeecb131-b5e5-414f-843c-3fbe2d9990b4/mystudy.png)

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
