# NOMAD-ME

A travel style social media application contained to remain a non-toxic environment, with light-hearted feedback on user's activities

---

[LIVE MVP DEV HERE](https://nomad-2aix.onrender.com/)

testing credentials:

medic1111
111111

---

![Home page](./home.png)
![Posts page](./posts.png)
![Post page](./post.png)
![User profile](./user.png)

---

## The Story:

During my Chingu.io Voyage I was matched with a team of originally 4 developers. Facing life challenges we ended up completing the 6-week program in two, with a PERN Stack MVP delivered within the deadline. Although the mission was accomplished, I wanted to come up with a personal refactored version of it, built with MERN. [Here's the original](https://github.com/chingu-voyages/v40-bears-team-29) and it has a link to the live demo.

## The Results

Same features plus an additional one (label filtering system), with TypeScript on the client, with around 60% less additions/deletions 🥳.

## Compromise

- Styling is not the focus of this project althought wider screens are perfomant, and mobile screens are functional

- One discussion we held heavily in the original app was how we were going to handle image uploads. We were to choose between implementing Multer to handle it, or a Markdown System that would take an Image URL and store it. I created the multer demo with full implementation but unfortunately most of the free hosting services (Heroku at the time) will destroy static files within 30 mins causing a bad impression during demo with broken Images. Therefore, using a image URL was the visually best option for demoing the concept, which was indeed implemented with a React package that generates a simple Markdown. In this version, a text editor is present but is not handling images. Images URL are passed to inputs instead. PS: Exploring alternatives.

## Tech Stack

- Frontend
  - React/Typescript
  - CSS
- Backend
  - NodeJS
  - Express.js
- Database
  - MongoDB

## Status

- Currently in development, with code-cleaning in process, along with techniques for optimization

## Running it

- Fork/Clone this project
- Run `npm install` at the root to install server dependencies
- Run `cd client` followed by `npm install` to install client dependencies
- Create a `.env` file and add the following keys: `SECRET_TOKEN=AstringOfYourChoiCeNoQuotes`, `DB_URI=YourMongoUriNoQuotes`
- On the root, run `node server/app.js` or user nodemon alternatively
- Then in a second terminal run `cd client` and `npm start`
