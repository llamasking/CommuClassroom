/*
// Command: Assignment
// Description: Assignment handler. I'll probably put most or all assignment data in this command.
*/

// This module is a bit magical and has some requirements.
const fs = require('fs');
const Discord = require('discord.js');

module.exports = (message, args) => {
    var guildinfo = require(`../data/${message.guild.id}.json`);

    switch(args[0]) {
        case 'new': {
            // Create new channel for assignment
            message.guild.channels.create(args[1], {
                parent: guildinfo.activeCategory,
                reason: 'New assignment created by: ' + message.author.username
            });

            // Thumbs up!
            message.react('👍');
            break;
        }

        case 'handler': 
            var replytext = '';
            // Check if the message mentions any assignment channels to be modified. If not, assume the channel message is from to be modified.
            if (!message.mentions.channels) {
                var channelsToModify = {};
                // Check that all channels mentioned are current assignments.
                for (var channel in message.mentions.channels)  {
                    if (channel.parent.id !== guildinfo.activeCategory) {
                        message.reply(`${channel} is not under the 'Current Assignments' category so I will not modify it. -- `);
                        return;
                    } else {
                        // Since this channel is an active assignment, add it to the list of channels to modify.
                        channelsToModify.push(channel);
                    }
                }
            } else {
                replytext += 'No assignment channel mentioned. Assuming you mean this channel. -- ';
                var channelsToModify = message.channel;
            }

            // Check if the message mentions any user to be made handler. If not, assume message author to be the handler.
            if (!message.mentions.members) {
                replytext += 'No maintainer mentioned. Assuming you to be the maintainer.';
                var handler = message.member;
            } else {
                var handler = message.mentions.members.first();
                replytext += `Making ${message.mentions.members.first()} maintainer.`;
            }

            message.reply(replytext);

            console.log(message.mentions.members.delete(message.guild.me));
            
            break;

        default: 
            message.reply('Command unrecognized or not given. Please use !!assignment help or just mention me and mention help.');
    }
};