/*
// Command: Assignment
// Description: Assignment handler. I'll probably put most or all assignment data in this command.
*/

module.exports = (message, args) => {
    var guildInfo = require(`../data/${message.guild.id}.json`);

    switch(args[0]) {
        case 'new': {
            // Create new channel for assignment
            message.guild.channels.create(args[1], {
                parent: guildInfo.activeCategory,
                topic: '**Handler:** Please use "!!assignment handler" to you the handler. \n\n**Details:** ',
                reason: 'New assignment created by: ' + message.author.username
            });

            // Thumbs up!
            message.react('👍');
            break;
        }

        case 'handler': 
            // Declare some variables
            var replytext = 'I am making you the handler of: ';
            var channelsToModify = [];

            // Check if the message mentions any assignment channels to be modified. If not, assume the channel message is from to be modified.
            if (message.mentions.channels.size > 0) {
                // Check that all channels mentioned are current assignments.
                message.mentions.channels.each(channel => {
                    if (channel.parent.id !== guildInfo.activeCategory) {
                        message.channel.send(`${channel} is not under the 'Current Assignments' category so I will not modify it.`);
                    } else {
                        // Since this channel is an active assignment, add it to the list of channels to modify.
                        channelsToModify.push(channel);
                        replytext += `${channel}`;
                    }
                });
            } else {
                message.channel.send('No assignment channel mentioned. Assuming you mean this channel.');
                channelsToModify.push(message.channel);
                replytext += `<#${message.channel.id}>`;
            }

            // Tell user the work will be done.
            message.channel.send(replytext);

            // Modify the channel(s)
            channelsToModify.forEach(channel => channel.setTopic(channel.topic.replace(/\*\*handler:\*\*.*/mi, `**Handler:** ${message.author.tag}`)));
            break;

        default: 
            message.channel.send('Command unrecognized or not given. Please use !!assignment help or just mention me and mention help.');
    }
};