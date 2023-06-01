const { codeBlock, PermissionFlagsBits } = require("discord.js")
const UserMetadata  = require("../user-metadata")
const Mongoose = require("mongoose")
const { SlashCommandBuilder, Routes } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("brackets")
    .setDescription("Get tournament users")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    try {
      await interaction.deferReply()
      const events = await interaction.guild.scheduledEvents.fetch()
      const subscribers = await Array.from(events)[0][1].fetchSubscribers({withMember: true})
      await Mongoose.connect(process.env.MONGO_URI)

      const users = []

      const usersArray = Array.from(subscribers)
      for (let i = 0; i < usersArray.length; i++) {
        const user = usersArray[i][1]
        
        const nameToSearch = user.member?.nickname ? user.member.nickname : user.user.username
        const us = await UserMetadata.findOne({
          displayName: nameToSearch 
        })
        if (us) {
          users.push({ u: nameToSearch, e: us.elo })
        } else {
          users.push({ u:nameToSearch, e: 0 })
        }
      }

      let i = 0
      while (8*Math.pow(2,i)<users.length){
        i++
      }

      const numberOfPoolsToGenerate = Math.pow(2,i)

      const pools = []
      for (let j = 0; j < numberOfPoolsToGenerate; j++) {
        pools.push([])
      }

      users.sort((a, b) => b.e - a.e)

      for (let j = 0; j < users.length; j++) {
        const user = users[j]
        pools[j%numberOfPoolsToGenerate].push(user)
      }
      await interaction.editReply(
        codeBlock(
            pools.map((pool,index)=>`Match ${index + 1} \n ${pool.map((u, p) => `${u.u} (${u.e})`).join("\n")} \n`).join("\n")
        )
      )
    } catch (error) {
      console.log(error)
      await interaction.editReply('Server error')
    }
  }
}
