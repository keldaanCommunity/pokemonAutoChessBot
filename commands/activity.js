
const Mongoose = require("mongoose");
const QuickChart = require('quickchart-js');
const DetailledStatistic = require('../detailled-statistic');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('activity')
		.setDescription('Get latest data about pokemon auto chess activity'),
	async execute(interaction) {
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
                icon_url:  'https://raw.githubusercontent.com/keldaanInteractive/pokemonAutoChess/master/app/public/dist/client/assets/ui/pokemon_autochess_final.png',
                url: 'https://pokemon-auto-chess.com/',
                },
                image: {
                url: url
                },
                timestamp: new Date(),
                footer: {
                text: 'Pokemon Auto Chess',
                icon_url: 'https://raw.githubusercontent.com/keldaanInteractive/pokemonAutoChess/master/app/public/dist/client/assets/ui/pokemon_autochess_final.png',
                },
            };
            
            interaction.reply({ embeds: [exampleEmbed] });
            });
        });
	},
};

