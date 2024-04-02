const { Message, Client } = require("guilded.js");

module.exports = {
	name: 'ping',
	description: 'Returns Pong!',
	category: 'Utility',
	/**
	 * 
	 * @param {Message} message 
	 * @param {Client} client 
	 */
	async execute(message, client) {
		let response = {
			embeds: [{
				description: `🏓 ${client.ws.ping}ms 🏓`,
				color: 0x00ff00
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