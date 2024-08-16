module.exports = {
    name: 'ping',                         // اسم الامر
    description: 'يرد بكلمه بنج',       // وصف الامر
    execute(message, args) {            // ينفذ من يرسل الامر
        message.channel.send('ping');  // الرد عند استخدام الامر
    },
};