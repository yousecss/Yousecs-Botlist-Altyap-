const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!'; // PREFİXİNİZİ GİRİN

client.once('ready', () => {
    console.log('Bot Giriş Yaptı');
    
    
    client.user.setActivity('Yousecs Botlist Altyapısı', { type: 'PLAYING' }); 
    client.user.setStatus('online'); 
  });

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./komutlar').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./komutlar/${file}`);
  client.commands.set(command.name, command);
}

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);

  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.channel.send(`Hata Oldu\nHata:\n\`\`\`fix\n${error}\n\`\`\``);
  }
});

client.login('TOKEN_GİR');