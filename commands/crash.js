const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("crash")
    .setDescription("Report a game crash"),
  async execute(interaction) {
    await interaction.reply("When a game crash, please press F12, go to the console tab, and take a screenshot of the errors. Don't forget to mention the timestamp of this game crash. Thanks a lot for your report, and sorry for the unconvenience.")
  },
}
