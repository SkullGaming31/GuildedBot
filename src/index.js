require('dotenv').config();
const { Client, Collection } = require('guilded.js');
const chalk = require('chalk');
const fs = require('fs');

const TOKEN = process.env.TOKEN;

console.clear();

console.log(chalk.blue(chalk.bold('SYSTEM')), chalk.white('>>'), chalk.magenta(chalk.underline(chalk.bold('Bot Starting...'))));


const client = new Client({ token: TOKEN, cache: true });

client.commands = new Collection();

for (const handler of fs.readdirSync('./src/Handlers').filter(f => f.endsWith('.js'))) {
  require(`./Handlers/${handler}`)(client);
}

client.login();