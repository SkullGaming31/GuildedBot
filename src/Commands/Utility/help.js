const { Message, Client } = require("guilded.js");

module.exports = {
  name: 'help',
  description: 'Get help with commands',
  category: 'Utility',
  /**
   * 
   * @param {Message} message 
   * @param {Client} client 
   * @param {String[]} args
   */
  async execute(message, args, client) {
    let commands;
    switch (args[0] ? args[0].trim() : '') {
      case 'Utility':
        commands = client.commands.filter(cmd => cmd.category === 'Utility');
        await message.reply({ content: commands.map(cmd => `**/${cmd.name}** | ${cmd.description}`), isPrivate: true }).join(' \n') || 'there are currently no commands in this category';
        break;
      case 'Community':
        commands = client.commands.filter(cmd => cmd.category === "Community");
        await message.reply({
          content: commands.map(cmd => `**/${cmd.name}** | ${cmd.description}`)
            .join(' \n') || 'There are currently no commands in this category',
          isPrivate: true
        });
        break;
      default:
        await message.reply({ content: 'Please use /help [category] for help. [Community, Utility]', isPrivate: true });
        break;
    }
  }
}