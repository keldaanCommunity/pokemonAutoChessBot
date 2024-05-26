import { SlashCommandBuilder } from "discord.js"

module.exports = {
	data: new SlashCommandBuilder()
		.setName("trailer")
		.setDescription("Game Trailer. Share it with everyone !"),
	async execute(interaction) {
		await interaction.reply(
			"https://youtu.be/3LJbX2v6ba8",
		);
	},
};
