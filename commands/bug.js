const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("bug").setDescription("Report a bug"),
  async execute(interaction) {
    await interaction.reply({
      files: [
        "https://cdn.discordapp.com/attachments/1063164968721190974/1213895276784259092/bug-report-guide.png?ex=65f72313&is=65e4ae13&hm=c212dfa293cd5d5ef9c891649f7fbd3c1a20dab2b70eab443abf6d54828edc94&",
      ],
    });
  },
};
