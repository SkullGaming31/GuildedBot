const fs = require('fs');
const chalk = require('chalk');

module.exports = (client) => {
  console.log(' ');
  console.log(chalk.blue(chalk.bold('SYSTEM')), chalk.white('>>'), chalk.cyan(chalk.underline('Events Starting...')));
  console.log(' ')

  const eventFolders = fs.readdirSync('./src/Events');
  for (const folder of eventFolders) {
    const eventFiles = fs.readdirSync(`./src/Events/${folder}`).filter((files) => files.endsWith('.js'));

    for (const file of eventFiles) {
      const event = require(`../Events/${folder}/${file}`)

      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
        console.log(chalk.blue(chalk.bold('SYSTEM')), chalk.white('>>'), chalk.cyan(chalk.bold(`${event.name}`)), chalk.green('Event Loaded.'));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
        console.log(chalk.blue(chalk.bold('SYSTEM')), chalk.white('>>'), chalk.cyan(chalk.bold(`${event.name}`)), chalk.green('Event Loaded.'));
      }
    }
  }
}