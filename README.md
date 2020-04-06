# CommuClass Bot

An overly complicated way of ~~cheating on homework~~ -- I mean sharing knowledge with other students.

## Invite
This bot is not up to my standards just yet, so for now there is no publicinvite link. However, the code is perfectly functional, so you're more than welcome to download it and host your own bot.

## Commands
The bot can be activated in two ways:
1. Starting a message with `!!assignment`.
	* I will be adding some shortcuts like `!!ass` in the future.
2. Pinging the bot followed by a command.
	* Pinging the bot is like starting a message with `!!assignment`.

The bot, at the time of writing has 3 commands.
1. **New**: Creates a new text channel for an assignment, under the "Active Assignments" category created when the bot is added to a server.
	* Channels are created with the preset topic of:
>**Handler:** Please use "!!assignment handler" to make yourself the handler.
**Due Date:**
**Details:**

2. **Handler**: Makes the person who sent the message the assignment's "handler"
	* Changes the topic (above) to say the message author's name after handler.
	* Gives the author the permision to edit the channel and fill out the details and due date.
	 * If the message mentions other assignment channels, they are made hander of those assignments as well.

3. **TurnedIn**: Edits the topic to say "**TURNED IN BY: MessageAuthor** on Date" (date's in UTC) before all other lines in the topic and moves the channel to the "Archived Assignments" category.