const fetch = require("node-fetch");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "그림퀴즈",
    description: "Doodle Crew 게임을 실행합니다.",
    run: async (client, interaction) => {
        
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            const vcerror = new MessageEmbed()
            .setColor("#f14948")
            .setTitle(`<a:no:888743684923863080> 오류 발생`)
            .setDescription(`명령어를 실행하기 전 음성 채널에 들어가 주세요.`)
            .addField("에러 코드 :","VC_CONNECTION_ERROR")
            //.setThumbnail("https://cdn.discordapp.com/avatars/756897703182729378/861929c25caa9287a66992d1fa3afdac.png?size=512")
            .setTimestamp()
            .setFooter(`${interaction.user.tag} 유저에 의해 요청됨 | 반응 속도 : ${client.ws.ping}ms`, interaction.user.displayAvatarURL());
            return interaction.followUp({ embeds: [vcerror] });

            } else {
                fetch(`https://discord.com/api/v8/channels/${voiceChannel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
        
                target_application_id: "878067389634314250", // Doodle Crew 아이디
                target_type: 2,
                temporary: false,
         
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            } 
            
        }).then(res => res.json())
        .then(body => {
            const row = new MessageActionRow().addComponents(
            new MessageButton()
	        .setURL(`https://discord.gg/${body.code}`)
	        .setLabel('플레이')
            .setEmoji('🎲')
	        .setStyle('LINK'))

            const embed = new MessageEmbed()
            .setColor("#43b581")
            .setTitle(`<a:yes:888745318357803008> 준비 완료`)
            .setDescription(`아래 버튼을 클릭해 게임을 실행하세요.\n링크가 만료될 경우 명령어를 다시 입력해주세요.\n\n**즐거운 게임 되세요!**`)
            //.setThumbnail("https://cdn.discordapp.com/avatars/756897703182729378/861929c25caa9287a66992d1fa3afdac.png?size=512")
            .setTimestamp()
            .setFooter(`${interaction.user.tag} 유저에 의해 요청됨 | 반응 속도 : ${client.ws.ping}ms`, interaction.user.displayAvatarURL());
            return interaction.followUp({ embeds: [embed], components: [row]});
            })
        }
    }
}