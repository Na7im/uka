const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = "%";

client.login('NTgyNTIyMDA0MDI5MzA4OTM4.XOvCHA.gXccz4mwZKJbKDfg9PN_bkmXBDM');

client.on('message', message =>{
    if(message.content === "bienvenue"){
        message.reply('Merci à toi de souhaitez la bienvenue au nouveau membres !');
        console.log('répond au bienvenue');
    }
});


client.on('guildMemberAdd', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':tada: **' +member.user.username + '** a rejoint le discord ' + member.guild.name)
        .setFooter('Nous somme désormais ' + member.guild.memberCount )
    member.guild.channels.get('564811348844740638').send(embed)

});

/*Kick*/
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLocaleLowerCase() === prefix + 'kick'){
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous avez pas la permission")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Vous avez pas mentionner une personne :x:")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet personne")
        if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet personne")
        member.kick()
        message.channel.send(member.user.username + 'à été exclu :broken_heart: !')
    }
});

/*Ban*/
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLocaleLowerCase() === prefix + 'ban'){
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous avez pas la permission")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Vous avez pas mentionner une personne :x:")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas ban cet personne")
        if (!member.kickable) return message.channel.send("Je ne peux pas ban cet personne")
        member.guild.ban(member, {days: 7})
        message.channel.send(member.user.username + 'à été ban :broken_heart: !')
    }
});

client.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let count = args[1]
        if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
        if (count < 1 || count > 101) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
        message.channel.bulkDelete(parseInt(count) + 1)
    }
 
    if (args[0].toLowerCase() === prefix + "mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Membre introuvable")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne peux pas mute ce membre")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole(muterole)
            message.channel.send(member + ' a été mute :white_check_mark:')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then(function (role) {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(function (channel) {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(member + ' a été mute :white_check_mark:')
            })
        }
    }
})