
const Mongoose = require("mongoose");
const QuickChart = require('quickchart-js');
const UserMetadata = require('../user-metadata');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('distribution')
		.setDescription('Get the current elo distribution graph'),

	async execute(interaction) {
        try {
                    //console.log(days);
        await interaction.deferReply()
        const minUser = await UserMetadata.findOne({}, "elo", {limit: 1, sort: {elo: 1}})
        const maxUser = await UserMetadata.findOne({}, "elo", {limit: 1, sort: {elo: -1}})
        const minElo = minUser.elo
        const maxElo = maxUser.elo

        const minEloBound = Math.max(0, Math.floor(minElo / 10) * 10)
        const maxEloBound = Math.ceil(maxElo / 10) * 10

        const step = 25
        const labels = []
        const data = []

        for (let e = minEloBound; e < maxEloBound; e+=step) {
            labels.push(e)
            const numbersOfPlayers = await UserMetadata.count({elo: {$gt: e, $lt: e + step}})
            data.push(numbersOfPlayers)
        }
        const chart = new QuickChart();
        chart.setBackgroundColor('#272727');
        chart
            .setConfig({
            type: 'line',
            data:
            {
                labels: labels,
                datasets: [{
                    label: 'Numbers of players',
                    data: data,
                    backgroundColor:'#505160',
                    borderColor:'#f5891c',
                    pointBackgroundColor:'#f5ba1c'
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
                    type: "logarithmic",
                    display: true,
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
            title: `Elo Distribution Graph`,
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
        await interaction.editReply({ embeds: [exampleEmbed] });
        } catch (error) {
            console.log(error)
            await interaction.editReply('Server error')
        }
	},
};

