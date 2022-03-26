const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu, Message } = require("discord.js");

module.exports = {
    name: '요트',
    description: "Yacht Dice 게임을 시작합니다.",
    run: async (client, interaction, ButtonInteraction) => {
        const SentUser = interaction.user;
        const NumIcon = ['0', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣'];
        const AttendButtonfilter = i => i.customId === 'AttendButton' && i.user.id !== interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ AttendButtonfilter, time: 60000 });

        const AttendButton = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId('AttendButton')
            .setLabel('참가')
            .setEmoji('🎲')
            .setStyle('PRIMARY'));
    
        const embed = new MessageEmbed()
            .setAuthor("Yongjun's Playground : Yacht Dice", client.user.displayAvatarURL())
            .setColor("#43b581")
            .setTitle(`${interaction.user.username} 님이 게임을 생성하였습니다.`)
            .setDescription("60초 동안 다른 참가자 한명을 모집합니다.\n아래 버튼을 눌러 게임에 참가하세요.")
            .addField("현재 참가자 :", `${interaction.user.username}`)
            .setFooter(`${interaction.user.tag} 유저에 의해 요청됨 | 반응 속도 : ${client.ws.ping}ms`, interaction.user.displayAvatarURL());
    
        return interaction.followUp({ embeds: [embed], components: [AttendButton]})
        .then(msg => {
            collector.on('collect', async interaction => {
                if (interaction.customId === 'AttendButton' ) {
                    // customId가 'primary' 라는 버튼이 감지되면
                    const SecondaryUser = interaction.user;
                    const Userlist = [SentUser.username, SecondaryUser.username];
                    var TryDice = 3;
                    const embededit = new MessageEmbed()
                    .setAuthor("Yongjun's Playground : Yacht Dice", client.user.displayAvatarURL())
                    .setColor("#43b581")
                    .setTitle(`${SentUser.username} 님이 생성한 게임이 곧 시작합니다.`)
                    .setDescription("3초 후 게임이 시작됩니다.")
                    .addField("현재 참가자 :", `${Userlist}`)
                    .setFooter(`${interaction.user.tag} 유저에 의해 요청됨 | 반응 속도 : ${client.ws.ping}ms`, interaction.user.displayAvatarURL());

                    let p1_scores = {
                        "ones" : 0,
                        "twos" : 0,
                        "threes" : 0,
                        "fours" : 0,
                        "fives" : 0,
                        "sixes" : 0,
                        "subtotal" : 0,
                        "bonus" : 0,
                        "choice" : 0,
                        "four_kind" : 0,
                        "full_house" : 0,
                        "small_str" : 0,
                        "large_str" : 0,
                        "yacht" : 0,
                        "ALL" : 0
                    }
                    let p2_scores = {
                        "ones" : 0,
                        "twos" : 0,
                        "threes" : 0,
                        "fours" : 0,
                        "fives" : 0,
                        "sixes" : 0,
                        "subtotal" : 0,
                        "bonus" : 0,
                        "choice" : 0,
                        "four_kind" : 0,
                        "full_house" : 0,
                        "small_str" : 0,
                        "large_str" : 0,
                        "yacht" : 0,
                        "ALL" : 0
                    }

                    let scoreboard = new MessageEmbed()
                    .setAuthor("Yongjun's Playground : Yacht Dice", client.user.displayAvatarURL())
                    .setTitle("현재 점수판")
                    .addField(`${SentUser.username}`,
                    `**Ones** : ${p1_scores.ones}\n**Twos** : ${p1_scores.twos}\n**Threes** : ${p1_scores.threes}\n
                    **Fours** : ${p1_scores.fours}\n**Fives** : ${p1_scores.fives}\n**Sixes** : ${p1_scores.sixes}\n
                    \n**Subtotal** : ${p1_scores.subtotal}/63\n**Bonus** : ${p1_scores.bonus}\n\n
                    **Choices** : ${p1_scores.choice}\n**Four of a Kind** : ${p1_scores.four_kind}\n
                    **Full House** : ${p1_scores.full_house}\n**Small Straight** : ${p1_scores.small_str}\n
                    **Large Straight** : ${p1_scores.large_str}\n**Yacht** : ${p1_scores.yacht}
                    `, true)
                    .addField(`${SecondaryUser.username}`,
                    `**Ones** : ${p2_scores.ones}\n**Twos** : ${p2_scores.twos}\n**Threes** : ${p2_scores.threes}\n
                    **Fours** : ${p2_scores.fours}\n**Fives** : ${p2_scores.fives}\n**Sixes** : ${p2_scores.sixes}\n
                    \n**Subtotal** : ${p2_scores.subtotal}/63\n**Bonus** : ${p2_scores.bonus}\n\n
                    **Choices** : ${p2_scores.choice}\n**Four of a Kind** : ${p2_scores.four_kind}\n
                    **Full House** : ${p2_scores.full_house}\n**Small Straight** : ${p2_scores.small_str}\n
                    **Large Straight** : ${p2_scores.large_str}\n**Yacht** : ${p2_scores.yacht}
                    `, true)

                    .setFooter(`반응 속도 : ${client.ws.ping}ms`, interaction.user.displayAvatarURL());
                    
                    interaction.update({ embeds: [embededit], components: [] }).then(() => {
                        const UserTurn = SentUser;
                    function rollingthedice() {
                        const RollTheDice = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
                        if (RollTheDice[0] == RollTheDice[1] == RollTheDice[2] == RollTheDice[3] == RollTheDice[4]) {
                            var syacht = 50;
                        } else var syacht = 0;

                        let sortedDice = RollTheDice.sort();
                        const sones = RollTheDice.filter(n => n === 1).length*1;
                        const stwos = RollTheDice.filter(n => n === 2).length*2;
                        const sthrees = RollTheDice.filter(n => n === 3).length*3;
                        const sfours = RollTheDice.filter(n => n === 4).length*4;
                        const sfives = RollTheDice.filter(n => n === 5).length*5;
                        const ssixes = RollTheDice.filter(n => n === 6).length*6;
                        const schoice = RollTheDice[0]+RollTheDice[1]+RollTheDice[2]+RollTheDice[3]+RollTheDice[4];

                        let count1 = RollTheDice.filter(n => n === 1).length;
                        let count2 = RollTheDice.filter(n => n === 2).length;
                        let count3 = RollTheDice.filter(n => n === 3).length;
                        let count4 = RollTheDice.filter(n => n === 4).length;
                        let count5 = RollTheDice.filter(n => n === 5).length;
                        let count6 = RollTheDice.filter(n => n === 6).length;
                        if (count1 >= 4 || count2 >= 4 || count3 >= 4 || count4 >= 4 || count5 >= 5 || count6 >= 6) {
                            var sfourkind = schoice;
                        } else var sfourkind = 0;
                        
                        for (let i = 1; i < 6; i++) {

                        if (sortedDice[0] == i && sortedDice[1] == i && sortedDice[2] == i && sortedDice[3] == i+1 && sortedDice[4] == i+1 ||
                            sortedDice[0] == i && sortedDice[1] == i && sortedDice[2] == i && sortedDice[3] == i+2 && sortedDice[4] == i+2 ||
                            sortedDice[0] == i && sortedDice[1] == i && sortedDice[2] == i && sortedDice[3] == i+3 && sortedDice[4] == i+3 ||
                            sortedDice[0] == i && sortedDice[1] == i && sortedDice[2] == i && sortedDice[3] == i+4 && sortedDice[4] == i+4 ||
                            sortedDice[0] == i && sortedDice[1] == i && sortedDice[2] == i && sortedDice[3] == i+5 && sortedDice[4] == i+5 ||
                            sortedDice[0] == i && sortedDice[1] == i && sortedDice[2] == i+1 && sortedDice[3] == i+1 && sortedDice[4] == i+1 ||
                            sortedDice[0] == i && sortedDice[1] == i && sortedDice[2] == i+2 && sortedDice[3] == i+2 && sortedDice[4] == i+2 ||
                            sortedDice[0] == i && sortedDice[1] == i && sortedDice[2] == i+3 && sortedDice[3] == i+3 && sortedDice[4] == i+3 ||
                            sortedDice[0] == i && sortedDice[1] == i && sortedDice[2] == i+4 && sortedDice[3] == i+4 && sortedDice[4] == i+4 ||
                            sortedDice[0] == i && sortedDice[1] == i && sortedDice[2] == i+5 && sortedDice[3] == i+5 && sortedDice[4] == i+5) {
                                var sfullhouse = schoice; }
                        else var sfullhouse = 0;

                        if (sortedDice[0] == i && sortedDice[1] == i+1 && sortedDice[2] == i+2 && sortedDice[3] == i+3||
                            sortedDice[1] == i && sortedDice[2] == i+1 && sortedDice[3] == i+2 && sortedDice[4] == i+3) var ssmall_str = 15;
                        else var ssmall_str = 0;
                        
                        if (sortedDice[0] == i && sortedDice[1] == i+1 && sortedDice[2] == i+2 && sortedDice[3] == i+3 && sortedDice[4] == i+4) var slarge_str = 30;
                        else var slarge_str = 0;

                        console.log(sortedDice);
                        
                    }
                }
                        const jokbo = new MessageActionRow().addComponents(
                            new MessageSelectMenu()
                            .setCustomId('jokbo')
                            .setPlaceholder('선택')
                            .addOptions([
                                {
                                    label: "Ones",
                                    description: `현재 점수 : ${sones} · 1이 나온 주사위 눈의 총합을 기록합니다.`,
                                    value: 'ones'
                                },{
                                    label: "Twos",
                                    description: `현재 점수 : ${stwos} · 2가 나온 주사위 눈의 총합을 기록합니다.`,
                                    value: 'twos'
                                },{
                                    label: "Threes",
                                    description: `현재 점수 : ${sthrees} · 3이 나온 주사위 눈의 총합을 기록합니다.`,
                                    value: 'threes'
                                },{
                                    label: "Fours",
                                    description: `현재 점수 : ${sfours} · 4가 나온 주사위 눈의 총합을 기록합니다.`,
                                    value: 'fours'
                                },{
                                    label: "Fives",
                                    description: `현재 점수 : ${sfives} · 5가 나온 주사위 눈의 총합을 기록합니다.`,
                                    value: 'fives'
                                },{
                                    label: "Sixes",
                                    description: `현재 점수 : ${ssixes} · 6이 나온 주사위 눈의 총합을 기록합니다.`,
                                    value: 'sixes'
                                },{
                                    label: "Choices",
                                    description: `현재 점수 : ${schoice} · 모든 주사위 눈의 총합을 기록합니다.`,
                                    value: 'choices'
                                },{
                                    label: "Four of a Kind",
                                    description: `현재 점수 : ${sfourkind} · 4개 이상의 같은 주사위 눈이 있다면 모든 주사위 눈의 총합을 기록합니다.`,
                                    value: 'fourkind'
                                },{
                                    label: "Full House",
                                    description: `현재 점수 : ${sfullhouse} · 2개의 주사위 눈과 3개의 주사위 눈이 각각 같다면 모든 주사위 눈의 총합을 기록합니다.`,
                                    value: 'fullhouse'
                                },{
                                    label: "Small Straight",
                                    description: `현재 점수 : ${ssmall_str} · 주사위 눈 중 4개가 차례대로 놓여질 수 있다면 15점을 기록합니다.`,
                                    value: 'smallstr'
                                },{
                                    label: "Large Straight",
                                    description: `현재 점수 : ${sfourkind} · 주사위 눈 중 5개가 차례대로 놓여질 수 있다면 30점을 기록합니다.`,
                                    value: 'largestr'
                                },{
                                    label: "Yacht",
                                    description: `현재 점수 : ${syacht} · 5개의 주사위 눈이 모두 같다면 50점을 기록합니다.`,
                                    value: 'yacht'
                                }
                            ])
                        )
                        

                        const ChooseWisely = new MessageEmbed()
                        .setAuthor("Yongjun's Playground : Yacht Dice", client.user.displayAvatarURL())
                        .setColor("#43b581")
                        .setTitle(`${UserTurn.username} 님의 차례입니다.`)
                        .setDescription(`아래 이모지를 선택해 저장할 주사위를 선택하고 한번 더 굴리거나\n아래 리스트에서 가장 맞는 족보에 기록할 수 있습니다.`)
                        .addField(`| 주사위 |`, `**${RollTheDice[0]}**, **${RollTheDice[1]}**, **${RollTheDice[2]}**, **${RollTheDice[3]}**, **${RollTheDice[4]}**`, true)
                        .addField(`| 남은 리롤 횟수 |`, `${TryDice}회`)
                        .addField('Ones', `${sones}`, true)
                        .addField('Twos', `${stwos}`,true)
                        .addField('Threes', `${sthrees}`, true)
                        .addField('Fours', `${sfours}`, true)
                        .addField('Fives', `${sfives}`, true)
                        .addField('Sixes', `${ssixes}\n`, true)
                        .addField(`Choices`, `${schoice}`, true)
                        .addField(`Four of a Kind`, `${sfourkind}`, true)
                        .addField(`Full House`, `${sfullhouse}`, true)
                        .addField(`Small Straight`, `${ssmall_str}`, true)
                        .addField(`Large Straight`, `${slarge_str}`, true)
                        .addField(`Yacht`, `${syacht}`, true);
                })
                TryDice = TryDice - 1;
                rollingthedice();
                setTimeout(() => interaction.followUp({ embeds : [ChooseWisely], components: [jokbo]}).then(message => {
                    message.react('1️⃣')
                    .then(() => message.react('2️⃣')
                    .then(() => message.react('3️⃣')
                    .then(() => message.react('4️⃣')
                    .then(() => message.react('5️⃣')
                    .then(() => message.react('🎲')
                    .then(() => message.react('📋')
                    .then(() => {
                        message.awaitReactions().then(collected => {
                            if(collected.first.emoji.name === '🎲') {
                                if(trydice !== 0) {
                                    TryDice = TryDice - 1;
                                    rollingthedice();   
                                }
                            }
                        })
                    }))))))
                    )}), 3000)
            }
            });
            client.on('interactionCreate', async interaction => {
                if(!interaction.isSelectMenu()) return;

            })

            collector.on('end', collected => 
                console.log(`Collected ${collected.size} items`)
        );
            setTimeout(() => msg.delete(), 60000)
        });
            
        }
    }