import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { gql, request } from "graphql-request";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("contribution")
    .setDescription("Contribute to PMD Collab"),
  async execute(interaction) {
    await interaction.deferReply();
    try {
      const pacRequest = await fetch(
        "http://pokemon-auto-chess.com/pokemons-index"
      );
      const pkmIndex = await pacRequest.json();
      const pkmPath = new Map<
        string,
        { normal: string; shiny: string; id: number }
      >();
      Object.keys(pkmIndex).forEach((pkm) => {
        pkmPath.set(pkm, {
          normal: getPath(pkmIndex[pkm].replace("-", "/"), false),
          shiny: getPath(pkmIndex[pkm].replace("-", "/"), true),
          id: parseInt((pkmIndex[pkm] as string).slice(0, 4)),
        });
      });

      const indexList = Object.values(pkmIndex).map((v) =>
        parseInt((v as string).slice(0, 4))
      );

      const document = gql`
      {
        monster(filter: [${indexList}]){
          id
          name
          forms{
            fullName
            fullPath
            sprites{
              phase
            }
          }
        }
      }
      `;
      const pmdCollabRequest = (await request(
        "https://spriteserver.pmdcollab.org/graphql",
        document
      )) as {
        monster: [
          {
            id: number;
            name: string;
            forms: [
              { fullName: string; fullPath: string; sprites: { phase: string } }
            ];
          }
        ];
      };

      const missingSprites = new Array<{ name: string; index: number }>();

      pkmPath.forEach((pkm) => {
        const monster = pmdCollabRequest.monster.find((m) => m.id === pkm.id);
        if (monster) {
          [pkm.normal, pkm.shiny].forEach((p) => {
            const form = monster.forms.find((f) => f.fullPath === p);
            if (form && form.sprites.phase === "INCOMPLETE") {
              missingSprites.push({
                name:
                  monster.name !== form.fullName
                    ? `${monster.name} ${form.fullName}`
                    : monster.name,
                index: monster.id,
              });
            }
          });
        }
      });

      const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Contribute to the spriting Community")
        .setURL("https://sprites.pmdcollab.org/")
        .setAuthor({
          name: "Pokemon Auto Chess",
          iconURL: "https://pokemon-auto-chess.com/assets/ui/colyseus-icon.png",
          url: "https://discord.js.org",
        })
        .setDescription(
          `Did you know ? You can easily contribute to the sprites you see in pokemon auto chess. Every sprites in PAC is based on a collaborative project called [PMD Collab](https://sprites.pmdcollab.org). This could be the start of your career as a pixel artist !
          
          _Hint: The easiest way to start is to try and make a shiny sprite from existing sprites_

        **How to submit your shiny sprite**
- Download the [recolor sprites](https://sprites.pmdcollab.org/#/0004?form=0) for the Pokemon you want to submit.
- Do your modification to the picture (usually mainly change the color palette)
- Submit the file to https://discord.com/channels/710190644152369162/764610870357131265

**List of missing sprites in Pokemon Auto Chess**

        `.concat(
            missingSprites
              .map((sprite) => sprite.name.replace("_", " "))
              .join("\n")
          )
        )
        .setThumbnail(
          "https://pokemon-auto-chess.com/assets/ui/colyseus-icon.png"
        )
        .setTimestamp()
        .setFooter({
          text: "Pokemon Auto Chess",
        });

      await interaction.editReply({ embeds: [exampleEmbed] });
    } catch (error) {
      console.log(error);
      await interaction.editReply("Server error");
    }
  },
};

function getPath(index: string, shiny: boolean) {
  let pokemonPath = "";

  pokemonPath += index;

  if (shiny) {
    const shinyPad = index.length == 4 ? `/0000/0001` : `/0001`;
    pokemonPath += shinyPad;
  }
  return pokemonPath;
}
