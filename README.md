# CommuClass Bot

An overly complicated way of ~~cheating on homework~~ -- I mean sharing knowledge with other students.

## Invite

[Invite Link](https://discordapp.com/oauth2/authorize?client_id=691152673633730672&scope=bot&permissions=268594288)

## Commands

At the time of writing, the bot has 3 commands.

1.  **New**: Creates a new text channel for an assignment, under the "Active Assignments" category created when the bot is added to a server.

2.  **Handler**: Makes the person who sent the message the assignment's "handler"

        -   Update's the channel's topic to mark that user as handler.
        -   Gives the user the permision to edit the channel to fill out the details and due date.
        -   If the user mentions other assignment channels, they are made hander of those assignments as well.

3.  **TurnedIn**: Edits the topic to say "**TURNED IN BY: User** on Date" (in UTC) before all other lines in the topic and moves the channel to the "Archived Assignments" category.
