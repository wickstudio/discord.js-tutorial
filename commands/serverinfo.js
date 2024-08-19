const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    alliases: ['s', 'server'],
    description: 'عرض معلومات السيرفر',
    
    execute(message, args) {
        const { guild } = message;

        const embed = new EmbedBuilder()
        .setTitle('معلومات السيرفر')                                                                           // عنوان الامبد
        .setThumbnail(guild.iconURL())                                                                         // صورة مصغره للامبد
        .addFields(                                                                                           // الفيلدز
            { name: 'اسم السيرفر:', value: `${guild.name}`, inline: true },
            { name: 'تاريخ انشاء السيرفر', value: `${guild.createdAt.toDateString()}`, inline: true },
            { name: 'اعضاء السيرفر', value: `${guild.memberCount}`, inline: true },
            { name: 'اونر السيرفر', value: `<@${guild.ownerId}>`, inline: true },

        )
        .setColor('#ff0000')                                                           // لون الامبد
        .setFooter({ text: 'Wick Studio', iconURL: 'https://wicks.bot/logo.png' })    // الكلام التحتي للامبد
        .setTimestamp();                                                             // وقت ارسال الامبد

        message.channel.send({ embeds: [embed] }); // ارسال الامبد للروم الي استخدم فيه الامر
    },
};