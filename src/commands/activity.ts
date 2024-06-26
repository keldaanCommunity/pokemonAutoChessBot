import { SlashCommandBuilder } from "discord.js";
import QuickChart from "quickchart-js";
import DetailledStatistic from "../detailled-statistic";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("activity")
		.setDescription("Get latest data about pokemon auto chess activity")
		.addStringOption((option) =>
			option
				.setName("days")
				.setDescription("The data range in days [0-180]")
				.setRequired(true),
		),
	async execute(interaction) {
		await interaction.deferReply();
		const input = parseInt(interaction.options.getString("days"));
		let numberOfDays = input ? input : 10;
		numberOfDays = Math.max(0, input);
		numberOfDays = Math.min(180, input);

		let days = new Array<number>();
		let daysString = new Array<string>();
		for (let i = 0; i < numberOfDays; i++) {
			days.push(0);
			daysString.push("");
		}

		let now = Date.now();

		try {
			const datas = await DetailledStatistic.find(
				{ time: { $gt: now - 86400000 * numberOfDays } },
				["time"],
				{},
			);
			for (let i = numberOfDays; i > 0; i--) {
				let dateHier = new Date();
				let dateDemain = new Date();
				datas.forEach((data) => {
					if (data.time) {
						let dateTime = new Date(data.time);
						dateHier = new Date(now - 86400000 * i);
						dateDemain = new Date(now - 86400000 * i + 86400000);

						if (dateTime > dateHier && dateTime < dateDemain) {
							//console.log('true');
							days[numberOfDays - i] += 1;
						}
					}
				});
				daysString[numberOfDays - i] = dateDemain.toUTCString().slice(0, 9);
			}
			//console.log(days);
			const chart = new QuickChart();
			chart.setBackgroundColor("#272727");
			chart.setConfig({
				type: "line",
				data: {
					labels: daysString,
					datasets: [
						{
							label: "Games played",
							data: days,
							backgroundColor: "#505160",
							borderColor: "#f5891c",
							pointBackgroundColor: "#f5ba1c",
						},
					],
				},
				options: {
					legend: {
						labels: {
							fontColor: "white",
						},
					},
					scales: {
						yAxes: [
							{
								ticks: {
									fontColor: "white",
									beginAtZero: true,
								},
							},
						],
						xAxes: [
							{
								ticks: {
									fontColor: "white",
								},
							},
						],
					},
				},
			});
			const url = await chart.getShortUrl();
			const exampleEmbed = {
				color: 0x0099ff,
				title: `Game Activity (Last ${numberOfDays} days)`,
				author: {
					name: "Pokemon Auto Chess",
					icon_url:
						"https://raw.githubusercontent.com/keldaanInteractive/pokemonAutoChess/master/app/public/dist/client/assets/ui/pokemon_autochess_final.png",
					url: "https://pokemon-auto-chess.com/",
				},
				image: {
					url: url,
				},
				timestamp: new Date(),
				footer: {
					text: "Pokemon Auto Chess",
					icon_url:
						"https://raw.githubusercontent.com/keldaanInteractive/pokemonAutoChess/master/app/public/dist/client/assets/ui/pokemon_autochess_final.png",
				},
			};
			await interaction.editReply({ embeds: [exampleEmbed] });
		} catch (error) {
			console.log(error);
			await interaction.editReply("Server error");
		}
	},
};
