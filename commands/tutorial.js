const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tutorial")
    .setDescription("Various tutorial links"),
  async execute(interaction) {
    await interaction.reply(`Here a collection of different tutorial that might be usefull:
    - How to make a lobby : https://youtu.be/Uq-r48kV0t0
    - Whats Pokemon Auto Chess (old version): https://www.youtube.com/watch?v=u39w9kZcbPg
    `)
  },
}
