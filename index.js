const Discord = require('discord.js');
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_MEMBERS
    ]
});


Client.on("ready", () => {
    console.log(`bot opérationnel: connecté en tant que ${Client.user.tag}`)
});

const prefix = "$"

Client.on("messageCreate", message => {
    if (message.author.bot) return;

    if (message.content === "salut") {
        message.react("👋");
    }

    if (message.content[0] === prefix) { CheckCommand(message)}

    else if (message.content === prefix + "help") {
        const embed = new Discord.MessageEmbed()
            .setAuthor("Superangers", "https://urlr.me/zfP3G")  //link: profil picture
            .setTitle("Commandes disponibles:")

        message.channel.send({ embeds: [embed]});
        return
    }
});

Client.on("guildMemberAdd", member => {
    console.log("membre ajouté")
    member.guild.channels.cache.find(channel => channel.id === "837268790453731328")
        .send(":wave: "+member.displayName+" viens d'arriver! Souhaitez-lui la bienvenue. \nC'est le **"
            +member.guild.memberCount+"**ème membre sur le serveur");
});

Client.on("guildMemberRemove", member => {
    ondeviceorientationabsolute.log("membre retiré")
    member.guild.channels.cache.find(channel => channel.id === "837268790453731328")
        .send(member.displayName+" viens de nous quitter! :sob: \n Nous sommes maintenant **"
            +member.guild.memberCount+"** sur le serveur");
});


// Checks Commands
function CheckCommand(message) {
    const content = message.content;

    if (content === prefix + "ping") { message.reply(`le ping est de ${Client.ws.ping} ms`); return} // Ping command

    else if (content === prefix + "help") {}    // Help command

    else if (content === prefix + "youtube") {        // Youtube command
        const embed = new Discord.MessageEmbed()
            .setAuthor("Superangers", "https://urlr.me/zfP3G")
            .setThumbnail("https://urlr.me/zfP3G")
            .addField("__chaîne youtube de Superangers:__", "https://www.youtube.com/channel/UCYbF-oBjeuMvNU1m8T3_uHg");
        
        message.channel.send({ embeds: [embed]});
        return
    }
    
    else if (content.startsWith(prefix+"clear")) {      // Clear command
        if (message.member.permissions.has("MANAGE_MESSAGES")) {
            let args = message.content.split(" ");

            // Check if argument is defined
            if (args[1] == undefined) {
                message.reply("Nombre de messages non défini")
            }
            else {
                let number = parseInt(args[1]);

                // Check if argument is a number
                if(isNaN(number)){ message.reply("Nombre de messages mal défini") }
                else {
                    // Deletes messages
                    message.channel.bulkDelete(number+1).then(messages => {
                        console.log("Suppression de "+messages.size +" messages réussi!");
                    }).catch( err => {
                        console.log("erreur de clear: "+ err)
                    });
                }
            }
        }
    }
}


Client.login(TOKEN);
