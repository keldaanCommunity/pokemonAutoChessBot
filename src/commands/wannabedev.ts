import { SlashCommandBuilder } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("wannabedev")
		.setDescription("About coding suggestions"),
	async execute(interaction) {
		await interaction.reply(
			`You are not authorized to write random code keyword telling me 'you should do something like that'. Don't tell me how to code my game. If you want to help, everything is open source and pull requests are welcome (https://github.com/keldaanInteractive/pokemonAutoChess).`,
		);
	},
};
