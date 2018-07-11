const wallpaper = require('wallpaper');
const download = require('image-downloader');
const GoogleImages = require('google-images');
const fs = require('fs');
const SteamAPI = require('steamapi');

exports.ChangeWallpaper = function(username) {

  const steam = new SteamAPI('4A535CADF3F5ADF0BCB9C98E60122976');
  const client = new GoogleImages('006133202951393427695:ichq9igryp0', 'AIzaSyBDlUrWTtz829mREydfH74IHkGxhUcbZrY');

  console.log("Tests Follow:");
  console.log('Attempting to change wallpaper for user: ' + username);
  //Find id from username
  steam.resolve('https://steamcommunity.com/id/' + username)
  .then(id => {
    console.log('id: ' + id);
    console.log("Success: Resolving ID");
    //Get the users recent games from there id
    steam.getUserRecentGames(id)

    .then(summary => {
      console.log("Success: Recent Games");
      //Search for wallpaper images based on the most recent played game

      client.search(summary[0]["name"] + " wallpaper")

      .then(images => {

        var options = {
          url: images[0]['url'],
          dest: 'app/wallpapers/' + summary[0]["name"] + '.jpg' // Save to /path/to/dest/photo.jpg
        }
        console.log("Success: Searching");

        download.image(options)

          .then(({filename, image}) => {
            console.log('File saved to', filename)

            console.log("Success: Downloading image");

            wallpaper.set('app/wallpapers/' + summary[0]["name"] + '.jpg')
            .then(() => {
              console.log('Wallpaper Changed');
            })
            .catch((err) => {
              console.log(err);
            })

          })
          .catch((err) => {
            console.log(err);
          })

      })
      .catch((err) => {
        console.log(err);
      })
    })
    .catch((err) => {
      console.log(err);
    })

  })
  .catch((err) => {
    console.log(err);
  })

}
