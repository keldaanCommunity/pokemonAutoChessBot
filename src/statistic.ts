import { Schema, model } from "mongoose";

const statisticSchema = new Schema({
	time: {
		type: Number,
	},
	name: {
		type: String,
	},
	rank: {
		type: Number,
	},
	avatar: {
		type: String,
	},
	pokemons: [
		{
			type: String,
		},
	],
});

const Statistic = model("Statistic", statisticSchema);
export default Statistic;
