import { SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder().setName("bug").setDescription("Report a bug"),
  async execute(interaction) {
    await interaction.reply({
      files: ["https://i.imgur.com/b1R7cAr.png"],
    });
  },
};
