import { SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("contribution")
    .setDescription("Contribute to PMD Collab"),
  async execute(interaction) {
    await interaction.deferReply();
    try {
      await interaction.editReply("Keldaan is working on smth");
    } catch (error) {
      console.log(error);
      await interaction.editReply("Server error");
    }
  },
};
