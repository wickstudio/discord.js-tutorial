const { Client, GatewayIntentBits, Collection } = require('discord.js') // استدعاء المودلز من مكتبة discord.js


const fs = require('fs');     // مودل يخليك تتعامل مع نظام الملفات
const path = require('path'); // جمع مسار الملف مع مجلد الاوامر

const client = new Client({ // تعريف النوايا
 intents: [
    GatewayIntentBits.Guilds,          // تعريف و وصول بيانات للسيرفرات
    GatewayIntentBits.GuildMessages,  // كلشي يتعلق بالرسائل بداخل السيرفر
    GatewayIntentBits.MessageContent,// الوصول إلى محتوى الرسائل، مما يسمح له بالتفاعل مع النصوص المرسلة. هذا التوجه يتطلب موافقة خاصة عند استخدامه بسبب مخاوف تتعلق بالخصوصية
 ],
});

client.commands = new Collection(); // تخزين الاوامر

// قراءة جميع ملفات الاوامر من داخل مجلد الاوامر
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`); // استدعاء الامر من الملف
    client.commands.set(command.name, command);   // اضافة الامر الى قائمة الاوامر
}

client.once('ready', () => {
    console.log(`bot is ready ${client.user.tag}`); // تأكيد من ان البوت اشتغل
});

// حدث لمعالجة الرسائل الي تنرسل للسيرفر
client.on('messageCreate', message => {
    if (!message.content.startsWith('!') || message.author.bot) return; // يتحقق من ان الامر ينرسل مع برفكس

    // يحذف البرفكس قبل الامر
    const args = message.content.slice(1).split(/ +/);
    const commandName = args.shift().toLowerCase();  // يحول اسم الامر الى حروف صغيرة

    const command = client.commands.get(commandName); // يحصل الامر من مجلد الاوامر ويتفاعل معاهم

    if (!command) return; // تجاهل الرسائل غير الاوامر

    // معالجة اخطاء الكود
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('حصل خطا في البوت');
    }
});

client.login('TOKEN'); // تحطون التوكن هنا