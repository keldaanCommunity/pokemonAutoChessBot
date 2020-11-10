require('dotenv').config();
const Discord = require("discord.js");

const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

const prefix = "!";

client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Bzz bzz, this message had a latency of ${timeTaken} ms.`);
  }

  if (command === "help") {
    message.reply(`Bzz bzz, I am a Pokemon Auto Chess bot. Im currently under development. !help, !ping`);
  }
});