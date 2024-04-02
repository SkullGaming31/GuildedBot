const { Message, Client } = require("guilded.js");
const chalk = require('chalk');


const prefix = process.env.PREFIX;

module.exports = {
  name: 'messageCreated',
  /**
   * 
   * @param {Message} message 
   * @param {Client} client
   */
  async execute(message, client) {
    if (!message.content.startsWith(prefix) || message.author.type === 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
    if (!command) return;

    try {
      command.execute(message, client, args);
    } catch (error) {
      console.error(error);
      let errReply = {
        embeds: [{
          title: '⛔ Error ⛔',
          description: `\`\`\` ${error} \`\`\``,
          color: 0xff0000
        }],
        isPrivate: true
      }

      message.reply(errReply);
      return message.delete().catch((err) => { console.error(error) });
    }
  }
}