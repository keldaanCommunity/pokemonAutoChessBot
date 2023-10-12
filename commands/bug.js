const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bug")
    .setDescription("Report a bug"),
  async execute(interaction) {
    await interaction.reply({files: ["https://cdn.discordapp.com/attachments/737244224688226346/1151470210084257853/bug-report-guide.png?ex=6538f333&is=65267e33&hm=8d14208b78731a60d07688b6dbcb27159a18b60def0ddc7f76949c494f47a06a&"]})
  },
}
