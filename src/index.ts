import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import Mongoose from "mongoose";
import fs from "node:fs";
import path from "node:path";

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
}) as ClientWithCommands;

Mongoose.connect(process.env.MONGO_URI!);

interface ClientWithCommands extends Client {
  commands: Collection<string, any>;
}

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
  console.log("Ready!");
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(process.env.BOT_TOKEN);
