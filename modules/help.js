/*
 * Command: Help / Commands
 * Description: Example sheet for creating new commands.
 */

const Discord = require('discord.js');

module.exports = (message) => {
    var embed = new Discord.MessageEmbed()
        .setTitle('Assignment Commands')
        .addField(`@${message.client.user.username}`, 'This is short for "!!assignment" so that you don\'t have to type it out all the time.')

        .addField('!!assignment New', 'Creates a new assignment text channel under the "Active Assignments" category.')
        .addField('!!assignment Handler [#assignment1, #assignment2, ...]', 'Makes the person who sent the message the assignment "handler" (if assignment channels are mentioned, become maintainer of those).')
        .addField('!!assignment TurnedIn', 'Marks assignment as "turned in" in the topic and moves the text channel to the "Archived Assignments" category.')

        // Yes, I'm pulling the rainbow.gif from Twitblend because I'm too lazy to copy it over, lmao.
        .setImage('https://raw.githubusercontent.com/llamasking/TwitblendBot-Discord/master/rainbow.gif')
        .setColor(0x7289DA)
        .setFooter('If you ever run into issues, please contact my creator: llamasking#1513');
    message.channel.send({ embed });
};