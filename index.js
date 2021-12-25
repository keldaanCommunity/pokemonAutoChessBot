require('dotenv').config();
const Discord = require("discord.js");
const Mongoose = require("mongoose");
//const Cron = require('cron');
const client = new Discord.Client();
const QuickChart = require('quickchart-js');
const DetailledStatistic = require('./detailled-statistic');

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
    message.reply(`Bzz bzz, I am a Pokemon Auto Chess bot. Im currently under development. !help, !ping !activity`);
  }

  else if(command == "activity"){
    let days = [0,0,0,0,0,0,0,0,0,0];
    let daysString = ['','','','','','','','','','']; 
    Mongoose.connect(process.env.MONGO_URI , (err) => {
      let now = Date.now();
      DetailledStatistic.find({'time': { $gt: now - 86400000 * 10 }},['time'],{}, async (err, datas)=> {
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
});

/*
let scheduledMessage = new Cron.CronJob('* * * * * *', () => {
  // This runs every day at 10:30:00, you can do anything you want
  let channel = client.channels.cache.get('discussion');
  channel.send('You message');
});

scheduledMessage.start()
*/