import { SlashCommandBuilder } from "discord.js"

export const data = new SlashCommandBuilder()
  .setName("mobile")
  .setDescription("About mobile release")
export async function execute(interaction) {
  await interaction.reply("There will never be a mobile release. Never.")
}
