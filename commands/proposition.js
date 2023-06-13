const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("proposition")
    .setDescription("Proposition guidelines"),
  async execute(interaction) {
    await interaction.reply("Your pokemon proposition MUST includes all statistics, rarity, synergies, ability with detailed effect, attack animations name. You must also check sprite availability at https://sprites.pmdcollab.org/. If you find attack sprites (for example, a fireball for a flamethrower ability), it is very much appreciated. You can find attack sprites here: https://www.spriters-resource.com/ds_dsi/pokemonranger2shadowsofalmia/ https://www.spriters-resource.com/ds_dsi/pokemonmysterydungeonexplorersofsky/sheet/85692/ https://www.spriters-resource.com/ds_dsi/pokemonranger3guardiansigns/sheet/41335/")
  },
}
