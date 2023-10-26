const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("proposition")
    .setDescription("Proposition guidelines"),
  async execute(interaction) {
    await interaction.reply(`To get your favorite pokemon in the game, your proposal must contain all of the following elements (will be deleted otherwise):
    - Sprite links for every form/evolution (you can check availability at https://sprites.pmdcollab.org/). If sprites are not available, proposition will be deleted.
    - For every form/evolution, write the name of the animation you want for Attack/Ability/Emote. Missing animations proposition will be deleted.
    - Every pokemon statistics for every form/evolution: Additional pool ?, Rarity, Heath, Attack, Defense Special, Defense, Attack range, PP. Missing statistic proposition will be deleted.
    - Take a look at what are the statistic of similar pokemons. Non sense statistic will be deleted.
    - Precise description of the ability, including every evolution damage, evolution scaling, and every other possible effects. Incomplete ability will be delted.
    - Be creative with your ability idea. Low effort idea will be deleted.
    - If your pokemon has a passive, write the most precise description of it.
    - Bonus if you can find attack particles sprites. (https://github.com/PMDCollab/RawAsset/tree/master/Particle, https://www.spriters-resource.com/ds_dsi/pokemonmysterydungeonexplorersofsky/sheet/85692/)
    `)
  },
}
