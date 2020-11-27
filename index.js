require('dotenv').config();
const Discord = require("discord.js");
const Mongoose = require("mongoose");
const client = new Discord.Client();
const User = require('@colyseus/social').User;

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

  else if (command === "help") {
    message.reply(`Bzz bzz, I am a Pokemon Auto Chess bot. Im currently under development. !help, !ping !stats`);
  }

  else if(command == "stats"){
    let email = args[0];
    Mongoose.connect(process.env.MONGO_URI , (err) => {
      User.find({email: email}, (err, users)=> {
          if(err){
            message.reply(`Bzz bzz, ERROR connecting to the database, proceed to self destruction.`);
          }
          else{
            if(users.length == 0){
              message.reply(`Bzz bzz, No users found with email ${email}.`);
            }
            else{
              users.forEach(usr => {
                // inside a command, event listener, etc.

                const exampleEmbed = {
                  color: 0x0099ff,
                  title: usr.email,
                  author: {
                    name: 'Pokemon Auto Chess',
                    icon_url:  'https://raw.githubusercontent.com/arnaudgregoire/pokemonAutoChess/master/app/public/dist/assets/ui/logo-pac.png',
                    url: 'https://pokemon-auto-chess.herokuapp.com/',
                  },
                  description: `Level ${usr.metadata.level}`,
                  thumbnail: {
                    url: `https://raw.githubusercontent.com/arnaudgregoire/pokemonAutoChess/master/app/public/dist/assets/avatar/${usr.metadata.avatar}.png`,
                  },
                  fields: [
                    {
                      name: 'Total Wins',
                      value: `${usr.metadata.wins} / 500`,
                    },
                    {
                      name: 'Magma Cavern',
                      value: `${usr.metadata.mapWin.FIRE} / 100`,
                      inline: true,
                    },
                    {
                      name: 'Frosty Forest',
                      value: `${usr.metadata.mapWin.ICE} / 100`,
                      inline: true,
                    },
                    {
                      name: 'Stormy Sea',
                      value: `${usr.metadata.mapWin.WATER} / 100`,
                      inline: true,
                    },
                    {
                      name: 'Tiny Woods',
                      value: `${usr.metadata.mapWin.NORMAL} / 100`,
                      inline: true,
                    },
                    {
                      name: 'Hidden Highlands',
                      value: `${usr.metadata.mapWin.GRASS} / 100`,
                      inline: true,
                    },
                    {
                      name: 'Glimmer Desert',
                      value: `${usr.metadata.mapWin.GROUND} / 100`,
                      inline: true,
                    },
                  ],
                  timestamp: new Date(),
                  footer: {
                    text: 'Pokemon Auto Chess',
                    icon_url: 'https://raw.githubusercontent.com/arnaudgregoire/pokemonAutoChess/master/app/public/dist/assets/ui/logo-pac.png',
                  },
                };
                
                message.reply({ embed: exampleEmbed });
            });
            }
          }
      });
    });
  }
  else if(command == "leaderboard"){
    let email = args[0];
    Mongoose.connect(process.env.MONGO_URI , (err) => {
      User.find({'metadata.level': { $gte: 1 }}, (err, users)=> {
        if(err){
          message.reply(`Bzz bzz, ERROR connecting to the database, proceed to self destruction.`);
        }
        else{
          if(users.length == 0){
            message.reply(`Bzz bzz, No users found with email ${email}.`);
          }
          users.sort(function(a, b) {
            return b.metadata.level - a.metadata.level;
          });
        }

        let userNames = '';
        let levels = '';
        let wins = '';
        for (let i = 0; i < 10; i++) {
          const user = users[i];

          userNames += `\`${i + 1}\` ${user.email.split('@')[0]}\n`;
          levels += `\`${user.metadata.level}\`\n`;
          wins += `\`${user.metadata.wins}\`\n`;
        }

        const embed = new Discord.MessageEmbed()
          .setAuthor('Pokemon Auto Chess Leaderboard', 'https://raw.githubusercontent.com/arnaudgregoire/pokemonAutoChess/master/app/public/dist/assets/ui/logo-pac.png','https://pokemon-auto-chess.herokuapp.com/')
          .addFields({ name: 'Top 10', value: userNames, inline: true },
            { name: 'Level', value: levels, inline: true },
            { name: 'Wins', value: wins, inline: true })
          .setTimestamp()
          .setFooter('Pokemon Auto Chess','https://raw.githubusercontent.com/arnaudgregoire/pokemonAutoChess/master/app/public/dist/assets/ui/logo-pac.png');
    
        message.channel.send(embed);
      });
    });
  }
});