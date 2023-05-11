const {Events} = require('discord.js')

module.exports = {
    name: Events.ThreadCreate,
    once: false,

    // soon, we will filter and prevent user that haven't reacted to the rules post
    // from creating new threads. Quite simple, but not going to finish this just now.

    execute(thread, newlyCreated) {



    }
}