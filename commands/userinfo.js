const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'userinfo',
    alliases: ['u', 'us'],
    description: 'عرض معلومات الشخص',

    execute(message, args) {
        const user = message.mentions.users.first() || message.author;      // تاكد اذا كان يوجد منشن لشخص معين لاظهار معلومات عنه او بدون منشن
        const member = message.mentions.members.first() || message.member;

        const embed = new EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: user.displayAvatarURL() }) // المؤلف
        .setTitle('معلومات العضو')                                               // عنوان الامبد
        .setThumbnail(user.displayAvatarURL({ dyniamic: true, size: 1024 }))     // صورة مصغره للامبد
        .setFields(                                                             // الفيلدز
            { name: 'اسم المستخدم', value: `${user.username}`, inline: true },
            { name: 'تاريخ انشاء الحساب', value: `${user.createdAt.toDateString()}`, inline: true },
            { name: 'تاريخ الانضمام الى السيرفر', value: `${member.joinedAt.toDateString()}`, inline: true },
            { name: 'الايدي', value: `${user.id}`, inline: false}
        )
        .setColor(0x1E90FF) // لون الامبد
        .setImage('رابط') // صورة كبيرة للامبد
        .setFooter({ text: 'Wick Studio', iconURL: 'https://wicks.bot/logo.png' }) // الكلام التحتي للامبد
        .setTimestamp(); // وقت ارسال الامبد
        
        message.channel.send({ embeds: [embed] }); // ارسال الامبد للروم الي استخدم فيه الامر
    },
};
