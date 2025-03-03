import { SlashCommandBuilder } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("tipee")
		.setDescription("About donations and tipee"),
	async execute(interaction) {
		await interaction.reply(
			"Are you experiencing technical problems playing pokemon auto chess? Before you get too excited, take a few seconds to ask yourself how such a game works. Pokemon Auto Chess servers may not be the most stable or the most efficient. Why can't they be? Because hosting a game with over 10,000 daily users costs money (all server costs are public https://discord.com/channels/737230355039387749/1268146688313266288). How is this financed ? With donations. You can support the project on https://en.tipeee.com/keldaan/. Pokemon Auto Chess is and will remain a non profit game. Every dollar of this tipee is used for server/database hosting.",
		);
	},
};
