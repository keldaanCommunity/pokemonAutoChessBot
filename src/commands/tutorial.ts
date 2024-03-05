import { SlashCommandBuilder } from "discord.js"

export const data = new SlashCommandBuilder()
  .setName("tutorial")
  .setDescription("Various tutorial links")
export async function execute(interaction) {
  await interaction.reply(`Here a collection of different tutorial that might be usefull:
    - How to make a lobby : https://youtu.be/Uq-r48kV0t0
    - Whats Pokemon Auto Chess (old version): https://www.youtube.com/watch?v=u39w9kZcbPg
    `)
}
