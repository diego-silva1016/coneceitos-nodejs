const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repositorie);

  response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const indexRepositorio = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );

  if (indexRepositorio < 0)
    return response.status(400).json({ error: "Id não encontrado" });

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes: repositories[indexRepositorio].likes
  };

  repositories[indexRepositorio] = repositorie;

  return response.json(repositories[indexRepositorio]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const indexRepositorio = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );

  if (indexRepositorio < 0)
    return response.status(400).json({ error: "Id não encontrado" });

  repositories.splice(indexRepositorio, 1);

  response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const indexRepositorio = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );

  if (indexRepositorio < 0)
    return response.status(400).json({ error: "Id não encontrado" });

  repositories[indexRepositorio].likes += 1;

  return response.json(repositories[indexRepositorio]);
});

module.exports = app;