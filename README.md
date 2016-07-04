# Teluva
Internal study code for react js and redux.
(Originals from https://github.com/raineroviir/react-redux-socketio-chat)

## Use Guide
```
git clone https://github.com/GVNSoft/Teluva.git
cd Teluva
npm install
```

### Setting up MongoDB

You need MongoDB set up and running to run the code locally. [Installation instructions](https://docs.mongodb.org/manual/installation/)

Once you've installed MongoDB start up the MongoDB server in a new terminal with the following commands:

```
mkdir db
mongod --dbpath=./db --smallfiles
```

Then open a new terminal and type in `mongo` and type in `use chat_dev`
This is your database interface.  You can query the database for records for example: `db.users.find()` or `db.stats()`.

Now that you've done all that, you can go go ahead and code away!

### Development

```
npm run dev
```
And then point your browser to `localhost:3000`

Note:
This program comes with [redux-dev tools](https://github.com/gaearon/redux-devtools)
* To hide the dev tool panel press ctrl+h
* To change position press ctrl+m

### Production

```
npm run build
npm start
```
And then point your browser to `localhost:3000`
