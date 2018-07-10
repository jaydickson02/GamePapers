const wallpaper = require('wallpaper');
const download = require('image-downloader');
const GoogleImages = require('google-images');
const fs = require('fs');
const client = new GoogleImages('006133202951393427695:ichq9igryp0', 'AIzaSyBDlUrWTtz829mREydfH74IHkGxhUcbZrY');
const SteamAPI = require('steamapi');
const steam = new SteamAPI('4A535CADF3F5ADF0BCB9C98E60122976');

username = "electricstorm252";

//Find id from username
steam.resolve('https://steamcommunity.com/id/' + username).then(id => {

//Get the users recent games from there id
  steam.getUserRecentGames(id).then(summary => {

    //Search for wallpaper images based on the most recent played game
    client.search(summary[0]["name"] + " wallpaper").then(images => {

          var options = {
          url: images[0]['url'],
          dest: 'wallpapers/' + summary[0]["name"] + '.jpg'         // Save to /path/to/dest/photo.jpg
          }

        download.image(options)

          .then(({ filename, image }) => {
            console.log('File saved to', filename)

            wallpaper.set('wallpapers/' + summary[0]["name"] + '.jpg' ).then(() => {
            	console.log('Wallpaper Changed');
            });

          })

          .catch((err) => {
            console.error(err)
          })

        });
  });
});
