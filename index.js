const fetch = require("node-fetch");
const { Client, Collection, Activity } = require("discord.js");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

const client = new Client({
    intents: 32767,
});
module.exports = client;

// 전역변수
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./handler/config.json");

function delay(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
  }

// 프로젝트 준비
require("./handler")(client);

client.login(client.config.subtoken);
client.on("ready", () => {
    console.log(`${client.user.tag} iS uP aNd ReAdY tO gO!`);
});