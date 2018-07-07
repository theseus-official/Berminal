let clear = require('clear'),
    figlet = require('figlet'),
    chalk = require('chalk'),
    inquirer = require('inquirer');

clear();
console.log(
    chalk.yellow(
        figlet.textSync('Berminal', {horizontalLayout: 'full'})
    )
);

