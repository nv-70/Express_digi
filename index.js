import express from "express";
// 🗣️ What it does:
// This line is importing the Express module.

// 📦 Express is a library (like a toolkit) that helps you build web servers easily using JavaScript and Node.js.

// 🔧 Think of it like calling an electrician. You’re saying, “Hey Express, I need your help to build a server!”

// 📌 Note: For this import style to work, your package.json must have:
const app = express();
// 🗣️ What it does:
// This line creates an Express application — your own mini web server.

// 💡 Think of app as your restaurant 🏪. Express gives you a building (express()) and now app is the manager that handles customer (user) orders.
const port = 5000;
// 🗣️ What it does:
// Defines the port number where your server will listen for requests.

// 📍 A port is like a door number to your server. When someone opens http://localhost:5000, they are knocking on door 5000 of your computer to talk to your app.

// app.get("/", (req, res) => {
//   res.send("what type of tea you like");
// });
// app.get("/ice-tea", (req, res) => {
//   res.send("which type of ice-tea");
// });
// app.get("/twitter", (req, res) => {
//   res.send("nitindotcom");
// });

// 🗣️ What it does:
// This sets up a route handler.

// 📬 Whenever a user sends a GET request to the root path / (like going to localhost:5000/), this function runs.

// 🔧 Breakdown:

// app.get = Listen for GET requests.

// "/" = URL path to watch for (the homepage).

// (req, res) => { ... } = A callback function that runs when someone visits that path.

// req = request from the user

// res = response you send back

// 📢 res.send("what type of tea you like");
// → Sends the message "what type of tea you like" to the user’s browser.
app.use(express.json());
let teaData = [];
let nextid = 1;

//add new data
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  let newData = {
    id: nextid++,
    name,
    price,
  };
  teaData.push(newData);
  res.status(201).send(newData);
});

// read all tea data
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});
// read data by id
app.get("/teas/:id", ( req,res) => {
  let tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("tea not found");
  }
  res.status(200).send(tea);
});
// updata data
app.put("/teas/:id", ( req,res) => {
  let tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

// app delete

app.delete("/teas/:id", (req,res) => {
  let ind = teaData.find((tea) => tea.id === parseInt(req.params.id));
  if (ind === -1) {
    return res.status(404).send("tea not found");
  }
  teaData.splice(ind, 1);
  res.status(200).send("deleted");
});

app.listen(port, () => {
  console.log(`Server is running at port:${port}...`);
});
// 🗣️ What it does:
// Starts the server and tells it to listen for requests on the defined port.

// 📞 This is like opening the restaurant's door at 9:00 AM and telling people, “We're open on port 5000!”

// 🖨️ Inside console.log(...), you’re printing a message so you know your server has started successfully.
