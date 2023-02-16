const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("proposition")
    .setDescription("Proposition guidelines"),
  async execute(interaction) {
    await interaction.reply("Your pokemon proposition MUST includes all statistics, rarity, synergies, ability with detailed effect. You must also check sprite availability at  https://sprites.pmdcollab.org/ .")
  },
}
