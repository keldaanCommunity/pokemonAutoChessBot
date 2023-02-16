const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mobile")
    .setDescription("About mobile release"),
  async execute(interaction) {
    await interaction.reply("There will never be a mobile release. Never.")
  },
}
