import {
	codeBlock,
	PermissionFlagsBits,
	SlashCommandBuilder,
} from "discord.js";
import { UserMetadata } from "../user-metadata";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("brackets")
		.setDescription("Get tournament users")
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		try {
			await interaction.deferReply();
			const events = await interaction.guild.scheduledEvents.fetch();
			const subscribers = await (
				Array.from(events) as any
			)[0][1].fetchSubscribers({ withMember: true });

			const users = new Array<{ u: string; e: number }>();

			const usersArray = Array.from(subscribers) as any[];
			for (let i = 0; i < usersArray.length; i++) {
				const user = usersArray[i][1];

				const nameToSearch = user.member?.nickname
					? user.member.nickname
					: user.user.username;
				const players = await UserMetadata.find(
					{
						displayName: nameToSearch,
					},
					"elo",
					{ limit: 1, sort: { elo: -1 } },
				);
				if (players && players.length && players.length > 0) {
					const player = players[0];
					users.push({ u: nameToSearch, e: player.elo });
				} else {
					users.push({ u: nameToSearch, e: 0 });
				}
			}

			let i = 0;
			while (8 * Math.pow(2, i) < users.length) {
				i++;
			}

			const numberOfPoolsToGenerate = Math.pow(2, i);

			const pools = new Array<Array<{ u: string; e: number }>>();
			for (let j = 0; j < numberOfPoolsToGenerate; j++) {
				pools.push([]);
			}

			users.sort((a, b) => b.e - a.e);

			for (let j = 0; j < users.length; j++) {
				const user = users[j];
				pools[j % numberOfPoolsToGenerate].push(user);
			}
			await interaction.editReply(
				codeBlock(
					pools
						.map(
							(pool, index) =>
								`Match ${index + 1} \n ${pool
									.map((u, p) => `${u.u} (${u.e})`)
									.join("\n")} \n`,
						)
						.join("\n"),
				),
			);
		} catch (error) {
			console.log(error);
			await interaction.editReply("Server error");
		}
	},
};
