let logged_in = false
let welcome_user;
let welcome_guest;
let login_button;
let logout_button;
let info_button;
let play_button;
let home_button;

let eco;
let about_us_button;
let welcome_user_msg = "Welcome, ";
let leaderboard_button;

class Title_Scene extends Phaser.Scene {
  constructor() {
    super("Title_Scene");
  }

  preload() {
    /* Loading screen code from https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/ */

    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(440, 470, 320, 50);
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(450, 480, 300 * value, 30);
    });

    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    this.load.image('background_image', 'assets/title_page/vancouver_background_2.png');
    this.load.image('play_button_image', 'assets/title_page/Play_button_title_screen.png');
    this.load.image('login', 'assets/title_page/Login_button_title_screen.png');
    this.load.image('logout', 'assets/title_page/Logout_button_title_screen.png');
    this.load.image('info_button', 'assets/title_page/Info_button_title_screen.png');
    this.load.image('home_button', 'assets/title_page/Logo_Title_Screen.png');
    this.load.image('logo', 'assets/title_page/logo.png');
    this.load.image('eco', 'assets/title_page/eco.png');
    this.load.image('about_us_button', 'assets/title_page/about_us_title_screen.png');

    this.load.image('leaderboard', 'assets/title_page/leaderboard_title_screen.png');
  }

  create() {
    // music = this.sound.add("bgm")

    let background = this.add.sprite(0, 0, 'background_image');
    background.setOrigin(0, 0);
    background.setScale(3);

    play_button = this.add.sprite(660, 800, 'play_button_image').setInteractive().setVisible(false).setScale(2);
    login_button = this.add.sprite(660, 1100, "login").setInteractive().setVisible(false).setScale(2);
    logout_button = this.add.sprite(660, 1100, "logout").setInteractive().setVisible(false).setScale(2);
    info_button = this.add.sprite(660, 900, 'info_button').setInteractive().setVisible(false).setScale(2);
    this.add.sprite(660, 300, 'logo').setInteractive().setScale(0.5)  // logo
    this.add.sprite(660, 500, 'eco').setInteractive().setScale(0.5)  // EcoLibria

    leaderboard_button = this.add.sprite(660, 1000, 'leaderboard').setInteractive().setVisible(false).setScale(2);
    leaderboard_button.on("pointerup", function () {
      leaderboard();
    });

    about_us_button = this.add.sprite(100, 100, 'about_us_button').setInteractive().setScale(2);

    // Welcome message depending on login status
    welcome_user = this.add.text(320, 600, welcome_user_msg, { fontFamily: "Verdana", color: "black", fontSize: '64px', }).setVisible(false);
    welcome_guest = this.add.text(520, 600, "Welcome", { fontFamily: "Verdana", color: 'black', fontSize: '64px' }).setVisible(false);

    /* Button functions */
    info_button.once("pointerup", function () {
      console.log('Info button selected.');
      info();
    }, this);

    play_button.on("pointerup", function () {
      console.log("Play button selected.")
      // this.registry.destroy();
      this.events.off();

      // this.scene.setVisible(false);
      this.scene.restart("UIScene");
      this.scene.run("GameScene");



      // this.scene.setVisible(true, "UIScene");

    }, this);

    login_button.once("pointerup", function () {
      console.log("Login button selected");
      login();
    });

    about_us_button.once("pointerup", function () {
      console.log("About us button selected");
      about_us();
    }, this);

    logout_button.once("pointerup", function () {
      console.log("Logout button selected");
      firebase.auth().signOut().then(function () {
        // Sign-out successful.
        logged_in = false;
      }).catch(function (error) {
        window.location = "Error.html";
      });
    });

  }

  update() {
    setTimeout(function () {
      if (firebase.auth().currentUser != null) {
        logged_in = true;
        login_button.setVisible(false);
        logout_button.setVisible(true);
        info_button.setVisible(true);
        leaderboard_button.setVisible(true);

        welcome_guest.setVisible(false);
        welcome_user.setVisible(true);
        let user_id = firebase.auth().currentUser.uid;
        firebase.database().ref("users/" + user_id).on('value', function (snapshot) {
          let user_name = snapshot.val().name;
          welcome_user_msg = "Welcome, " + user_name;
          welcome_user.setText(welcome_user_msg).setVisible(true);

          // Wait for Firebase to apply changes before showing play_button
          setTimeout(function () { play_button.setVisible(true); }, 500)
        });

      }
      else {
        // No user is signed in.
        logged_in = false;
        login_button.setVisible(true);
        leaderboard_button.setVisible(true);
        logout_button.setVisible(false);
        welcome_guest.setVisible(true);
        welcome_user.setVisible(false);
        info_button.setVisible(true);
        // Wait for Firebase to apply changes before showing play_button
        setTimeout(function () { play_button.setVisible(true); }, 500)
      }
    }, 1000);
  }
}

//Redirects to info.html
function info() {
  window.location = "Info.html";
}

function about_us() {
  window.location = "About_us.html";
}

function login() {
  window.location = "login.html";
}

function leaderboard() {
  window.location = "leaderboard.html";
}
