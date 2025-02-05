import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
	.setName("meta")
	.setDescription("What is meta right now?");

const types = [
	":normal:",
	":grass:",
	":fire~1:",
	":water:",
	":electric:",
	":fighting:",
	":psychic:",
	":dark:",
	":steel:",
	":ground:",
	":poison:",
	":dragon~1:",
	":field:",
	":monster:",
	":human:",
	":aquatic:",
	":bug~1:",
	":flying:",
	":flora:",
	":rock~1:",
	":ghost~1:",
	":fairy~1:",
	":ice:",
	":fossil:",
	":sound~1:",
	":artificial:",
	":light:",
	":wild:",
	":baby~1:",
	":amorphous:",
];

export async function execute(interaction) {
	const randomType = types[Math.floor(Math.random() * types.length)];
	const variations = [
		`The current meta is all about ${randomType}`,
		`${randomType} is the new meta`,
		`You should force ${randomType} in the current meta`,
		`${randomType} is clearly over the top in the current meta`,
		`Don't listen to the haters, ${randomType} is the best in the current meta`,
		`Without hesitation, ${randomType} is the best in the current meta`,
	];
	const randomVariation =
		variations[Math.floor(Math.random() * variations.length)];
	await interaction.reply(randomVariation);
}
