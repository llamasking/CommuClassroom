/*
 * Command: Assignment
 * Description: Assignment handler. I'll probably put most or all assignment data in this command.
 */

module.exports = (message, args) => {
    var guildInfo = require(`../data/${message.guild.id}.json`);

    switch(args[0]) {
        case 'create':
        case 'new': {
            // Create new channel for assignment
            message.guild.channels.create(args[1], {
                parent: guildInfo.activeCategory,
                topic: '**Handler:** Please use "!!assignment handler" to make yourself the handler. \n**Due Date:** \n**Details:**',
                reason: 'New assignment created by: ' + message.author.username
            });

            // Thumbs up!
            message.react('👍');
            break;
        }

        case 'handler': {
            // Declare some variables
            var replytext = 'I am making you the handler of: ';
            var channelsToModify = [];

            // Check if the message mentions any assignment channels to be modified. If not, assume the channel message is from to be modified.
            if (message.mentions.channels.size > 0) {
                // Check that all channels mentioned are current assignments.
                message.mentions.channels.forEach(channel => {
                    if (channel.parent.id !== guildInfo.activeCategory) {
                        channel.send(`${channel} is not under the 'Current Assignments' category so I will not modify it.`);
                    } else {
                        // Since this channel is an active assignment, add it to the list of channels to modify.
                        channelsToModify.push(channel);
                        replytext += `${channel}`;
                    }
                });
            } else {
                // Verify this channel is an active assignment
                if (message.channel.parent.id !== guildInfo.activeCategory) {
                    message.channel.send('No assignment channel mentioned. Assuming you mean this channel. However, this channel is not under the \'Current Assignments\' category so I will not modify it.');
                    return;
                }

                // Since this channel is an active assignment, add it to the list of channels to modify.
                message.channel.send('No assignment channel mentioned. Assuming you mean this channel.');
                channelsToModify.push(message.channel);
                replytext += `<#${message.channel.id}>`;
            }

            // Tell user the work will be done.
            message.channel.send(replytext + '. Please go through and update the channel topic(s) to include due dates, details on the assignment, etc.');

            // If the message author has a nickname, put their real username in parentheses. Otherwise, just use their tag.
            var messageAuthor = message.author.tag;
            if (message.member.nickname) messageAuthor = `${message.member.nickname} (${message.author.tag})`;

            // Modify the channel(s) to have updated topics and permissions
            channelsToModify.forEach(channel => channel.setTopic(channel.topic.replace(/(?<=\*\*Handler:\*\* ).*/mi, messageAuthor)));
            channelsToModify.forEach(channel => channel.overwritePermissions([
                {
                    id: message.author.id,
                    allow: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES']
                }
            ], 'Allow the assignment handler to complete the channel\'s topic.'));

            // Thumbs up!
            message.react('👍');
            break;
        }

        case 'done':
        case 'complete':
        case 'completed':
        case 'turnedin': {
            // If the message author has a nickname, put their real username in parentheses. Otherwise, just use their tag.
            var messageAuthor = message.author.tag;
            if (message.member.nickname) messageAuthor = `${message.member.nickname} (${message.author.tag})`;

            // Simply modify channel topic to say that the assignment was turned in by X at Y time.
            message.channel.setTopic(`**TURNED IN BY: ${messageAuthor}** on ${new Date().toUTCString()}. \n` + message.channel.topic);

            // And move the channel to the archive then use the archived permissions.
            message.channel.setParent(guildInfo.archiveCategory, { reason: 'Assignment is completed or turned in.' })
                .then(channel => channel.lockPermissions());

            // Thumbs up!
            message.react('👍');

            break;
        }

        default: {
            message.channel.send('Command unrecognized or not given. Please use !!help or just ping me and mention help.');
        }
    }
};