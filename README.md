# Full-Stack-Open
Personal repository for the Full Stack Open course.

## Redux-Bloglist
The final project of part 7 of the basic course is a list of blogs to be developed with React Query or Redux, for consistency it was decided to use Redux. The goal was to unite the backend developed previously in part 4 with a complete frontend (styles, routing and state management).

## Technologies Used

### Backend:
[![My Skills](https://skillicons.dev/icons?i=nodejs,express,mongo&theme=light)](https://skillicons.dev)
<br>
For the backend, `NodeJS` with `Express` was used to develop a `RESTful API` that communicates with `MongoDB` using the `Mongoose` ODM. `Bycrypt` is used for secure password hashing, authentication is token-based with the use of `JWT`.


### Frontend:
[![My Skills](https://skillicons.dev/icons?i=react,redux,mui,vite&theme=light)](https://skillicons.dev)
<br>
For the frontend, `Vite` is used to create a `React` project and manage the development environment. For routing the app is using `React-Router-Dom`. `Redux Toolkit` is used for state management, `Axios` for making HTTP requests to the backend. `Material UI` was used for styles and responsiveness.

### Features

<ul>
    <li>
    User authentication (login, signup, logout)
    </li>
    <li>
    Creation and management of blog posts
    </li>
    <li>
    Single Post view
    </li>
    <li>
    Commenting functionality
    </li>
    <li>
    Like/upvote system
    </li>
    <li>
    User profiles
    </li>
    <li>
    Responsive design
    </li>
</ul>

## Installation

Before you begin, make sure you have the following programs installed:

* **Node.js**: LTS version is recommended. You can download it from [nodejs.org](https://nodejs.org/).
* **npm** or **Yarn**: npm comes with Node.js, but you can also use Yarn.
    * For npm: `npm install npm@latest -g`
    * For Yarn: `npm install --global Yarn`
* **MongoDB**: You will need a MongoDB instance. You can install it locally or use a cloud service like MongoDB Atlas.

First, clone this repository to your local machine using Git:

```bash
git clone https://github.com/ArielSibaja91/Full-Stack-Open.git
cd Full-Stack-Open
```

Once cloned, you will have all the content of the Full Stack Open course. The Part 7 project is located within the following path: `part7/bloglist-redux`

```bash
cd part7/bloglist-redux
```

#### Backend Configuration

Navigate to the `backend` directory and install the dependencies:

```bash
cd backend
npm install
# or if you use Yarn:
# yarn install
```

Create a `.env` file in the `backend` directory with the following variables:

```
PORT=3001
MONGODB_URI=<your-mongodb-connection-string>
TEST_MONGODB_URI=<your-mongodb-test-connection-string>
SECRET=<your-jwt-secret-key>
```

Then, start the backend server:

```bash
npm run dev
# or yarn dev
```

#### Frontend Configuration

Navigate to the frontend directory and install the dependencies:

```bash
cd ../frontend # Assuming you are in the 'backend' directory
npm install
# or yarn install
```
Then, start the `vite` server:

```bash
npm run dev
# or yarn dev
```

The frontend application should open in your default browser, typically at `http://localhost:3000`

## Usage

Create a user on the registration page or log in if you already have an account, when you enter the app you will be able to see the list of blogs, create a new blog entry, see the users of the app, see a list of each user's posts and see each individual blog post.

### **Live Demo**

You can see the demo app deployed on Render on this link: https://blog-app-hk2v.onrender.com/
