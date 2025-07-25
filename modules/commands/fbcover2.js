module.exports.config = {
  name: "fbcover2",
  version: "1.0.9",
  hasPermssion: 0,
  credits: "TOHIDUL",
  usePrefix: true,
  description: "MAKE BEAUTIFULL FB COVER.",
  commandCategory: "ART",
  cooldowns: 0,
  usage: "<blank>",
  dependencies: {
      "fs-extra": "",
      "request": "",
      "axios": ""
  }
};

module.exports.run = async function ({ api, args, event, permssion , handleReply}) {
const request = require('request');
const fs = require("fs-extra")
const axios = require("axios")
const { threadID, messageID, senderID, body } = event;
  if (this.config.credits != '\ud835\ude48\ud835\ude67\ud835\ude4f\ud835\ude64\ud835\ude62\ud835\ude53\ud835\ude6d\ud835\ude53') {
        console.log(`\x1b[33m[ \u0057\u0041\u0052\u004e ]\x1b[37m » \u0043\u0068\u0061\u006e\u0067\u0065 \u0063\u0072\u0065\u0064\u0069\u0074\u0073 \u006d\u006f \u0070\u0061 \u0068\u0061\u002c \u006d\u0061\u0074\u0075\u0074\u006f \u006b\u0061 \u006d\u0061\u0067\u0063\u006f\u0064\u0065 \u006e\u0067 \u0073\u0061\u0072\u0069\u006c\u0069 \u006d\u006f \u0075\u006c\u006f\u006c \u0070\u0061\u006b\u0079\u0075\u0021`);
        return api.sendMessage('\u005b \u0057\u0041\u0052\u004e \u005d \u0044\u0065\u0074\u0065\u0063\u0074 \u0062\u006f\u0074 \u006f\u0070\u0065\u0072\u0061\u0074\u006f\u0072 ' + global.config.BOTNAME + ' \u0063\u0068\u0061\u006e\u0067\u0065 \u0063\u0072\u0065\u0064\u0069\u0074\u0073 \u006d\u006f\u0064\u0075\u006c\u0065\u0073  "' + this.config.name + '"', threadID, messageID);
  }
  else if (!args[0]){
    api.sendMessage(`\u0059\u006f\u0075 \u0077\u0061\u006e\u0074 \u0074\u006f \u0063\u006f\u006e\u0074\u0069\u006e\u0075\u0065\u003f \u0050\u006c\u0065\u0061\u0073\u0065 \u0072\u0065\u0070\u006c\u0079 \u0069\u0066 \u0079\u006f\u0075 \u0077\u0061\u006e\u0074 \u0061\u006e\u0064 \u0069\u0067\u006e\u006f\u0072\u0065 \u0074\u0068\u0069\u0073 \u0069\u0066 \u0079\u006f\u0075 \u0064\u006f\u006e\u0027\u0074\u002e`,event.threadID, (err, info) => {

     return global.client.handleReply.push({
        type: "characters",
        name: this.config.name,
        author: senderID,
        tenchinh: args.join(" ").toUpperCase(),
        messageID: info.messageID
      });
  },event.messageID);
}
}

module.exports.handleReply = async function({ api, event, args, handleReply, client, __GLOBAL, Threads, Users, Currencies }) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const request = require("request");
    
    // Remove current handler from array first to prevent conflicts
    const replyIndex = global.client.handleReply.findIndex(reply => reply.messageID === handleReply.messageID);
    if (replyIndex !== -1) {
        global.client.handleReply.splice(replyIndex, 1);
    }
    
    var info = await api.getUserInfo(event.senderID);
    var nameSender = info[event.senderID].name;
    var arraytag = [];
    arraytag.push({id: event.senderID, tag: nameSender});
    
    if (handleReply.author != event.senderID) return;
    
    const { threadID, messageID, senderID } = event;

    switch (handleReply.type) {
        case "characters": { 
            api.unsendMessage(handleReply.messageID);
            return api.sendMessage(`Reply to this message enter your primary name`, threadID, function (err, info) { 
                if (!err && info) {
                    global.client.handleReply.push({ 
                        type: 'subname',
                        name: 'fbcover2',
                        author: senderID,
                        characters: event.body,
                        messageID: info.messageID,
                        threadID: threadID
                    });
                }
            }, messageID);
        } 

        case "subname": { 
            api.unsendMessage(handleReply.messageID);
            return api.sendMessage(`You choose ${event.body} as your main name\n(Reply to this message enter your secondary name)`, threadID, function (err, info) { 
                if (!err && info) {
                    global.client.handleReply.push({ 
                        type: 'number',
                        name: 'fbcover2',
                        author: senderID,
                        characters: handleReply.characters,
                        name_s: event.body,
                        messageID: info.messageID,
                        threadID: threadID
                    });
                }
            }, messageID);
        }

        case "number": { 
            api.unsendMessage(handleReply.messageID);
            return api.sendMessage(`You have selected "${event.body}" as your secondary name\n(Reply to this message with your phone number)`, threadID, function (err, info) { 
                if (!err && info) {
                    global.client.handleReply.push({ 
                        type: 'address',
                        name: 'fbcover2',
                        author: senderID,
                        characters: handleReply.characters,
                        subname: event.body,
                        name_s: handleReply.name_s,
                        messageID: info.messageID,
                        threadID: threadID
                    });
                }
            }, messageID);
        }

        case "address": { 
            api.unsendMessage(handleReply.messageID);
            return api.sendMessage(`You have selected "${event.body}" as your phone number\n(Reply to this message with your address)`, threadID, function (err, info) { 
                if (!err && info) {
                    global.client.handleReply.push({ 
                        type: 'email',
                        name: 'fbcover2',
                        author: senderID,
                        characters: handleReply.characters,
                        subname: handleReply.subname,
                        number: event.body,
                        name_s: handleReply.name_s,
                        messageID: info.messageID,
                        threadID: threadID
                    });
                }
            }, messageID);
        }

        case "email": { 
            api.unsendMessage(handleReply.messageID);
            return api.sendMessage(`You have selected "${event.body}" as an address.\n(Reply to this message your email address)`, threadID, function (err, info) { 
                if (!err && info) {
                    global.client.handleReply.push({ 
                        type: 'color',
                        name: 'fbcover2',
                        author: senderID,
                        characters: handleReply.characters,
                        subname: handleReply.subname,
                        number: handleReply.number,
                        address: event.body,
                        name_s: handleReply.name_s,
                        messageID: info.messageID,
                        threadID: threadID
                    });
                }
            }, messageID);
        }

        case "color": { 
            api.unsendMessage(handleReply.messageID);
            return api.sendMessage(`You have chosen "${event.body}" as your email address.\nEnter your background color (note: enter the English name of the color - If you don't want to enter the color then enter "no")\n(Reply this message)`, threadID, function (err, info) {
                if (!err && info) {
                    global.client.handleReply.push({ 
                        type: 'create',
                        name: 'fbcover2',
                        author: senderID,
                        characters: handleReply.characters,
                        subname: handleReply.subname,
                        number: handleReply.number,
                        address: handleReply.address,
                        email: event.body,
                        name_s: handleReply.name_s,
                        messageID: info.messageID,
                        threadID: threadID
                    });
                }
            }, messageID);
        }
        
        case "create": {
            var char = handleReply.characters;
            var name = handleReply.name_s;
            var subname = handleReply.subname;
            var number = handleReply.number;
            var address = handleReply.address;
            var email = handleReply.email;
            var uid = event.senderID;
            var color = event.body;
            
            api.unsendMessage(handleReply.messageID);
            api.sendMessage(`Initializing...`, threadID, (err, info) => {
                setTimeout(() => {
                    if (info && info.messageID) {
                        api.unsendMessage(info.messageID);
                    }
                    
                    var callback = () => {
                        const imagePath = __dirname + "/cache/fbcover.png";
                        if (fs.existsSync(imagePath)) {
                            api.sendMessage({
                                body: `Sender Name: ${nameSender}\nName: ${name}\nSub Name: ${subname}\nID: ${uid}\nColor: ${color}\nAddress: ${address}\nEmail: ${email}\nNumber: ${number}`,
                                mentions: arraytag,
                                attachment: fs.createReadStream(imagePath)
                            }, threadID, () => {
                                try {
                                    fs.unlinkSync(imagePath);
                                } catch (e) {
                                    console.log("Error deleting file:", e.message);
                                }
                            }, messageID);
                        } else {
                            api.sendMessage("❌ Failed to generate cover image. Please try again.", threadID, messageID);
                        }
                    };
                    
                    const apiUrl = `https://api.phamvandien.xyz/fbcover/v1?name=${encodeURIComponent(name)}&uid=${uid}&address=${encodeURIComponent(address)}&email=${encodeURIComponent(email)}&subname=${encodeURIComponent(subname)}&sdt=${encodeURIComponent(number)}&color=${encodeURIComponent(color)}&apikey=KeyTest`;
                    
                    try {
                        request(apiUrl)
                            .pipe(fs.createWriteStream(__dirname + '/cache/fbcover.png'))
                            .on('close', callback)
                            .on('error', (error) => {
                                console.log("Image download error:", error);
                                api.sendMessage("❌ Failed to generate cover image. Please try again.", threadID, messageID);
                            });
                    } catch (error) {
                        console.log("Request error:", error);
                        api.sendMessage("❌ Failed to generate cover image. Please try again.", threadID, messageID);
                    }
                }, 1000);
            }, messageID);
            break;
        }
    }
}
