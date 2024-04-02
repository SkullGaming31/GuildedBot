const chalk = require('chalk');
const { Client } = require('guilded.js');
const mongoose = require('mongoose');

module.exports = {
  name: 'ready',
  /**
   * 
   * @param {Client} client 
   */
  async execute(client) {
    try {
      const mongodbURL = process.env.MONGODB_URL;
      if (!mongodbURL) return;

      await mongoose.connect(mongodbURL);
      if (mongoose.connect) {
        console.log(chalk.green(chalk.bold('DATABASE')), chalk.white('>>'), chalk.cyan(chalk.bold('MONGOOSE')), chalk.green('ONLINE'));
      }

      console.log(chalk.blue(chalk.bold('SYSTEM')), chalk.white('>>'), chalk.green(chalk.bold(`${client.user.name}`)), chalk.green(' Has Logged in!!'));
      // client.setStatus({ emoteId: 2293100, content: 'In Development', expiresAt: undefined });
    } catch (error) {
      console.error(error);
    }
  }
}