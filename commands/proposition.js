const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("proposition")
    .setDescription("Proposition guidelines"),
  async execute(interaction) {
    await interaction.reply({files: ["https://cdn.discordapp.com/attachments/1146829002493923338/1162004328547102811/keldaan.png?ex=653a5bdc&is=6527e6dc&hm=1b7445f89dc506430ffdfabca38ec55b688b72777ea8d9e1980a1a0eee2991eb&"]})
  },
}
