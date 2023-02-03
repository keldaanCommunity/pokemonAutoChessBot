const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nintendo")
    .setDescription("About The Pokemon Company Copyrights"),
  async execute(interaction) {
    await interaction.reply("All rights to the Pokemon Company. Pokemon Auto Chess can stop at any time, whenever The Pokemon Company wants. Play it while you can.There is no point in discussing this topic.")
  },
}
