const fs = require('fs');
const chalk = require('chalk');

module.exports = (client) => {
  console.log(' ');
  console.log(chalk.blue(chalk.bold('SYSTEM')), chalk.white('>>'), chalk.cyan(chalk.underline('Commands Loading...')));
  console.log(' ')

  const commandFolders = fs.readdirSync('./src/Commands');
  for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./src/Commands/${folder}`).filter((files) => files.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(`../Commands/${folder}/${file}`)

      client.commands.set(command.name, command);
      console.log(chalk.blue(chalk.bold('SYSTEM')), chalk.white('>>'), chalk.cyan(chalk.bold(`${command.name}`)), chalk.green('Command Loaded.'));
    }
  }
}