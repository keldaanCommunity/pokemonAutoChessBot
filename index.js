require('dotenv').config();
const Discord = require("discord.js");
const Mongoose = require("mongoose");
//const Cron = require('cron');
const client = new Discord.Client();
const User = require('@colyseus/social').User;
const QuickChart = require('quickchart-js');
const GameStats = require('./game-stats');

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
    message.reply(`Bzz bzz, I am a Pokemon Auto Chess bot. Im currently under development. !help, !ping !stats !whoisthebestdev !leaderboard !activity`);
  }

  else if(command == "activity"){
    let days = [0,0,0,0,0,0,0,0,0,0];
    let daysString = ['','','','','','','','','','']; 
    Mongoose.connect(process.env.MONGO_URI , (err) => {
      let now = Date.now();
      GameStats.find({'time': { $gt: now - 86400000 * 10 }}, async (err, datas)=> {
        for (let i = 10; i > 0; i--) {
          let dateHier;
          let dateDemain;
          datas.forEach(data=>{
            let dateTime = new Date(data.time);
            dateHier = new Date(now - 86400000 * i);
            dateDemain = new Date(now - 86400000 * i + 86400000);

            if(dateTime > dateHier && dateTime < dateDemain){
              //console.log('true');
              days[10-i] += 1;
            }
          });
          daysString[10-i] = dateDemain.toUTCString().slice(0,9);
        }
        //console.log(days);
        const chart = new QuickChart();
        chart.setBackgroundColor('rgba(54, 57, 63, 1)');
        chart
          .setConfig({
            type: 'line',
            data:
            {
                labels: daysString,
                datasets: [{
                  label: 'Games played',
                    data: days,
                    backgroundColor:'rgba(104, 130, 158, 0.5)',
                    borderColor:'rgba(89,130,52,1)',
                    pointBackgroundColor:'rgba(174,189,56,1)'
                }]
            },
            options:{
              legend:{
                labels:{
                  fontColor: 'white'
                }
              },
            scales: {
              yAxes: [{
                  ticks: {
                      fontColor: "white",
                      beginAtZero: true
                  }
              }],
              xAxes: [{
                  ticks: {
                      fontColor: "white",
                  }
              }]
            }

            }
          })
        const url = await chart.getShortUrl();
        const exampleEmbed = {
          color: 0x0099ff,
          title: 'Game Activity',
          author: {
            name: 'Pokemon Auto Chess',
            icon_url:  'https://raw.githubusercontent.com/arnaudgregoire/pokemonAutoChess/master/app/public/dist/assets/ui/logo-pac.png',
            url: 'https://pokemon-auto-chess.herokuapp.com/',
          },
          image: {
            url: url
          },
          timestamp: new Date(),
          footer: {
            text: 'Pokemon Auto Chess',
            icon_url: 'https://raw.githubusercontent.com/arnaudgregoire/pokemonAutoChess/master/app/public/dist/assets/ui/logo-pac.png',
          },
        };
        
        message.reply({ embed: exampleEmbed });
      });
    });
  }

  else if (command === "whoisthebestdev") {
    message.reply(`Bzz bzz, According to a collection of sources verified by the independent NGO PokemonAutoChess Institute, the best dev on earth is Keldaan.`);
  }

  else if(command == "stats"){

    let email = args[0];
    if(email && email != ""){
      message.reply(`Bzz bzz, No user found`);
    }
    else{
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
        for (let i = 0; i < 20; i++) {
          const user = users[i];

          userNames += `\`${i + 1}\` ${user.email.split('@')[0]}\n`;
          levels += `\`${user.metadata.level}\`\n`;
          wins += `\`${user.metadata.wins}\`\n`;
        }

        const embed = new Discord.MessageEmbed()
          .setAuthor('Pokemon Auto Chess Leaderboard', 'https://raw.githubusercontent.com/arnaudgregoire/pokemonAutoChess/master/app/public/dist/assets/ui/logo-pac.png','https://pokemon-auto-chess.herokuapp.com/')
          .addFields({ name: 'Top 20', value: userNames, inline: true },
            { name: 'Level', value: levels, inline: true },
            { name: 'Wins', value: wins, inline: true })
          .setTimestamp()
          .setFooter('Pokemon Auto Chess','https://raw.githubusercontent.com/arnaudgregoire/pokemonAutoChess/master/app/public/dist/assets/ui/logo-pac.png');
    
        message.channel.send(embed);
      });
    });
  }
});

/*
let scheduledMessage = new Cron.CronJob('* * * * * *', () => {
  // This runs every day at 10:30:00, you can do anything you want
  let channel = client.channels.cache.get('discussion');
  channel.send('You message');
});

scheduledMessage.start()
*/