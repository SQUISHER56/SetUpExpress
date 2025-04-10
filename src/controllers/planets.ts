import e, { Request, Response } from "express";
import Joi from "joi";

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  { id: 1, name: "Earth" },
  { id: 2, name: "Mars" },
];

const getAll = (req: Request, res: Response) => {
  res.status(200).json(planets);
};

const getOneById = (req: Request, res: Response) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));

  if (planet) {
      res.status(200).json(planet);
  } else {
    res.status(404).json({ msg: "[ERROR]:Planet Not Found"})
  }
};

const planetSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

const create = (req: Request, res: Response) => {
  const { id, name } = req.body;
  const newPlanet: Planet = { id, name };
  const validateNewPlanet = planetSchema.validate(newPlanet);

  if (validateNewPlanet.error) {
    return res
      .status(400)
      .json({ msg: validateNewPlanet.error.details[0].message });
  } else {
    planets = [...planets, newPlanet];
    res.status(201).json({ msg: "The planet was created." });
  }

  console.log(planets);
};

const updateById = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  planets = planets.map((planet) =>
    planet.id === Number(id) ? { ...planet, name } : planet
  );

  console.log(planets);

  res.status(200).json({ msg: "The planet was updated" });
};

const deleteById = (req: Request, res: Response) => {
  const { id } = req.params;
  planets = planets.filter((planet) => planet.id !== Number(id));

  res.status(200).json({ msg: "The planet was deleted." });
};

export { getAll, getOneById, create, updateById, deleteById };
