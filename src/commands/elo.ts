import { SlashCommandBuilder } from "discord.js"

module.exports = {
  data: new SlashCommandBuilder()
    .setName("elo")
    .setDescription("About elo complains"),
  async execute(interaction) {
    await interaction.reply("Arpad ELO wrote a very simple function: 1/(1+Math.pow(10,((b-a)/400))) to rate player a & b. Theres no 'i don't gain enough' or 'i loose too much' bug. Its just the DEFINITION of a simple math function. But you are lucky, in pokemon auto chess, you don't loose elo if you finish in the top 4.")
  },
}
