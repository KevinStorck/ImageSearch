const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const app = express();

const { validateBody } = require("./functions");
const { addToFavouritesSchema } = require("./schemas/userFavourite");
const PORT = process.env.PORT | 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/users/favourites/:id", async (req, res) => {
  let users = JSON.parse(await fs.readFile("./users.json", "utf-8"));
  let user = users.find((user) => user.id == req.params.id);
  res.status(200).json(user.favourites);
});

app.post(
  "/users/favourite/add",
  validateBody(addToFavouritesSchema),
  async (req, res) => {
    let users = JSON.parse(await fs.readFile("./users.json", "utf-8"));
    let found = false;
    users = users.map((user) => {
      if (user.id === req.body.id) {
        found = true;
        return {
          ...user,
          favourites: [...user.favourites, req.body.favourite],
        };
      } else return user;
    });
    if (!found)
      users.push({ id: req.body.id, favourites: [req.body.favourite] });
    await fs.writeFile("./users.json", JSON.stringify(users, null, 2));
    res.status(200).json("successful");
  }
);

app.listen(PORT, () => console.log("Server is active"));
