import { SlashCommandBuilder } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("tipee")
		.setDescription("About donations and tipee"),
	async execute(interaction) {
		await interaction.reply(
			"You can support the project on https://en.tipeee.com/pokemon-auto-chess. Pokemon Auto Chess is and will remain a non profit game. Every dollar of this tipee is used for server/database hosting together with commissions for spriters.",
		);
	},
};
