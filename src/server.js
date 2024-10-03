import qrcode from 'qrcode-terminal';

import WAWebJS from 'whatsapp-web.js';
import actionSelector from './actionSelector.js';
const {Client, LocalAuth} = WAWebJS;

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();


client.on("message", (message) => {
    actionSelector(message);
    console.log(message.from);
});
