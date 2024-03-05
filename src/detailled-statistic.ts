import { Schema, model } from "mongoose";


const pokemon = new Schema({
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  items: [
    {
      type: String
    }
  ]
})

const statisticSchema = new Schema({
  playerId: {
    type: String
  },
  elo: {
    type: Number
  },
  time: {
    type: Number
  },
  name: {
    type: String
  },
  rank: {
    type: Number
  },
  avatar: {
    type: String
  },
  pokemons: [pokemon]
})

const DetailledStatistic = model(
  "DetailledStatisticV2",
  statisticSchema
)
export default DetailledStatistic;
