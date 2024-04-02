const { Message, Client } = require("guilded.js");

const testSchema = require('../../Database/Schemas/test')

module.exports = {
  name: 'dbtest',
  description: 'test the Database connection',
  category: 'Utility',
  /**
   * 
   * @param {Message} message 
   * @param {Client} client 
   */
  async execute(message, client) {
    let finalData;
    const data = testSchema.findOne({ GuildID: message.serverId, UserID: message.authorId });

    if (!data) {
      finalData = "Compiling Data, run command again to see"
      testSchema.create({
        GuildID: message.serverId,
        UserID: message.authorId
      });
    }

    if (data) { finalData = data }

    let response = {
      embeds: [{
        description: `\`\`\`${finalData}\`\`\``,
        color: 0x000000
      }],
      isPrivate: true
    };

    try {
      await message.reply(response);
    } catch (error) {
      console.error(error);
    }
  }
}