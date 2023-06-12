const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("proposition")
    .setDescription("Proposition guidelines"),
  async execute(interaction) {
    await interaction.reply("Your pokemon proposition MUST includes all statistics, rarity, synergies, ability with detailed effect, attack animations name. You must also check sprite availability at  https://sprites.pmdcollab.org/. If you already find attack sprites (for example, a fireball for a flamethrower ability), it is very much appreciated.")
  },
}
