require("dotenv").config();
let telegram = require("node-telegram-bot-api");
const client = new telegram("1486132860:AAFTPk49K9Z3grQfyb6bETteq9SxjlFfCJQ", {
  polling: true,
});

client.onText(/\/help (.+)/, function (msg) {
  let chatID = msg.chat.id;
  let help = 'Hanya Perlu Ketik "/find (nama film)"';
  client.sendMessage(chatID, help);
});

const key = process.env.APIKEY;
let request = require("request");
client.onText(/\/find (.+)/, function (msg, match) {
  var mov = match[1];
  var chatID = msg.chat.id;
  request(
    `http://www.omdbapi.com/?apikey=${key}&t=${mov}`,
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        client.sendMessage(chatID, `- Looking for ${mov}...`).then(() => {
          var m = JSON.parse(body);
          setTimeout(() => {
            client.sendPhoto(chatID, m.Poster, {
              caption: `Result:
            \nTitle: ${m.Title} \nDate: ${m.Released} \nYear: ${m.Year} \nGenre: ${m.Genre} \nTime: ${m.Runtime}
            \nPlot: ${m.Plot}
            \nWriters: ${m.Writer}
            \nActors: ${m.Actors}
            \nAwards: ${m.Awards}
            \nRating: ${m.imdbRating}✨ \nSource: Imdb Database
            \n\nBot by Dimas Andhika Diputra`,
            });
          }, 800);
        });
      }
    }
  );
});
