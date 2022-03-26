const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "핑",
    description: "봇의 반응속도를 알려줍니다.",

    /**
     * 
     * @param {*} client 
     * @param {*} interaction 
     */

    run: async (client, interaction) => {
        const embed = new MessageEmbed()
        .setColor("#f58293")
        .setTitle("[핑] 이 봇의 반응 속도")
        .setDescription(`반응 속도 : ${client.ws.ping}ms`)
        .setTimestamp()
        .setFooter(`${interaction.user.tag} 유저에 의해 요청됨`, interaction.user.displayAvatarURL());
        interaction.followUp({ embeds : [embed] });
    },
};
