// Unselected buttons
let tree_button;
let house_button;
let hospital_button;
let office_button;
let store_button;
let demolish_button;
let tree_button_easter;

// Selected buttons
let tree_button_selected;
let house_button_selected;
let hospital_button_selected;
let office_button_selected;
let store_button_selected;
let tree_button_easter_selected;
let demolish_button_selected;

// For counting the tree easter egg
let tree_easter_counter = 0;

// Top HUD contents
let score;
let money_text;
let timer;

// Top HUD Detailed
let money_text_hud;
let top_score;
let total_co2_text_hud;
let top_hud_contents;
let top_hud_detailed;
let park_count;
let store_count;
let office_count;
let hospital_count;
let house_count;

// Bot HUD buttons
let bot_hud_buttons_array;  // array of non-selected buttons in bottom hud
let bot_hud_buttons_selected_array;   // array of selected buttons in bottom hud

// Settings menu buttons
let settings_menu_visible = false;
let music_is_on = true;
let sfx_is_on = true;

// Game over screen assets
let gameover_screen;
let gameover_co2_score;
let gameover_total_score;
let total_associations;
let missing_associations;


class UIScene extends Phaser.Scene {
  constructor() {
    super("UIScene");
  }

  preload() {
    // Load un-selected button icons
    this.load.image("tileset", "./assets/in_game_buttons/tileset.png");
    this.load.image("tree", "./assets/in_game_buttons/tree_button.png");
    this.load.image("house", "./assets/in_game_buttons/house_button.png");
    this.load.image("store", "./assets/in_game_buttons/grocery.png");
    this.load.image("hospital", "./assets/in_game_buttons/hospital.png");
    this.load.image("office", "./assets/in_game_buttons/office.png");
    this.load.image("demolish_button", "./assets/in_game_buttons/demolish.png");
    this.load.image("right_arrow", "./assets/in_game_buttons/right_arrow.png");
    this.load.image("tree_easter", "./assets/in_game_buttons/tree_button_easter.png");

    // Load selected button icons
    this.load.image("tree_selected", "./assets/in_game_buttons/tree_button_selected.png");
    this.load.image("house_selected", "./assets/in_game_buttons/house_button_selected.png");
    this.load.image("store_selected", "./assets/in_game_buttons/grocery_selected.png");
    this.load.image("hospital_selected", "./assets/in_game_buttons/hospital_selected.png");
    this.load.image("office_selected", "./assets/in_game_buttons/office_selected.png");
    this.load.image("tree_easter_selected", "./assets/in_game_buttons/tree_button_easter_selected.png");
    this.load.image("demolish_button_selected", "./assets/in_game_buttons/demolish_selected.png");

    //Load various HUD and settings buttons
    this.load.image("down_arrow_button", "./assets/in_game_buttons/downarrow.png");
    this.load.image("up_arrow_button", "./assets/in_game_buttons/up_arrow.png");
    this.load.image("zoom_out", "./assets/in_game_buttons/zoom_out.png");
    this.load.image("cog", "./assets/in_game_buttons/cog.png");
    this.load.image("check", "./assets/in_game_buttons/check.png");
    this.load.image("empty", "./assets/in_game_buttons/empty.png");

    // Load game over backgroudn and buttons
    this.load.image("bg", "./assets/bg.png");
    this.load.image("play_again", "./assets/playagain.png");
    this.load.image("return_to_menu", "./assets/menu.png");
  }

  create() {
    // Top HUD bar
    let top_hud = this.add.graphics();
    top_hud.fillRect(0, 0, 1280, 105);
    top_hud.alpha = 0.75;


    // Top HUD contents
    money_text = this.add.text(825, 5, "Money: $" + money, { fontFamily: "Verdana", fontSize: 36 });
    score = this.add.text(825, 50, "Score: " + points, { fontFamily: "Verdana", fontSize: 36 });
    timer = this.add.text(420, 32, "Time left: 2:00", { fontFamily: "Verdana", fontSize: 36 });

    /* 
    Timer code snippet (slightly modified) from
    https://stackoverflow.com/questions/50041474/javascript-countdown-timer-for-hour-minutes-and-seconds-when-a-start-button-cli 
    */

    // Change the text of timer every 1 second, until time left = 0:00
    var myTimer;
    if (start_timer) {
      function clock() {
        myTimer = setInterval(myClock, 1000);


        function myClock() {
          let workTowerIncome;
          if (workTowerList.listSize > houseList.listSize) {
            workTowerIncome = houseList.listSize;
          }
          else {
            workTowerIncome = workTowerList.listSize;
          }
          money += 0 + 25 * (workTowerIncome);  // base money + $25 per office that is associtaed with a house

          --time
          var seconds = time % 60; // Seconds that cannot be written in minutes
          var minutes = (time - seconds) / 60; // Gives the seconds that COULD be given in minutes

          if (seconds < 10) {
            timer.setText("Time left: " + minutes + ":0" + seconds)
          }
          else {
            timer.setText("Time left: " + minutes + ":" + seconds)
          }

          // Time is up
          if (time == 0) {
            clearInterval(myTimer);

            for (let i = 0; i < gameover_screen.length; i++) {
              gameover_screen[i].alpha = 1;
            }
          }
        }
      }
      clock();
    }


    // Top HUD detailed score menu
    top_hud_detailed = this.add.graphics().setVisible(false);
    top_hud_detailed.fillRect(800, 0, 680, 600);
    top_hud_detailed.alpha = 0.75;


    // Top HUD Detailed
    top_score = this.add.text(825, 50, "Score: " + calculatePoints()[0], { fontFamily: "Verdana", fontSize: 36 });

    let house_icon = this.add.image(1000, 190, "house").setScale(1.5);
    house_count = this.add.text(1050, 150, " x15", { fontFamily: "Verdana", fontSize: 48 });

    let tree_icon = this.add.image(885, 300, "tree").setScale(1.25);
    park_count = this.add.text(935, 280, "+2", { fontFamily: "Verdana", fontSize: 36 });

    let office_icon = this.add.image(1110, 300, "office").setScale(1.25);
    office_count = this.add.text(1175, 280, "-2", { fontFamily: "Verdana", fontSize: 36 });

    let store_icon = this.add.image(885, 420, "store").setScale(1.25);
    store_count = this.add.text(935, 400, "+0", { fontFamily: "Verdana", fontSize: 36 });

    let hospital_icon = this.add.image(1110, 420, "hospital").setScale(1.25);
    hospital_count = this.add.text(1175, 400, "-2", { fontFamily: "Verdana", fontSize: 36 });

    total_co2_text_hud = this.add.text(820, 500, "Global CO2 ppm: ", { fontFamily: "Verdana", fontSize: 38 });

    let down_arrow_button = this.add.image(1240, 48, "down_arrow_button").setInteractive().setScale(0.8);
    let up_arrow_button = this.add.image(1240, 48, "up_arrow_button").setInteractive().setScale(0.8);

    money_text_hud = this.add.text(825, 5, "Money: $" + money, { fontFamily: "Verdana", fontSize: 36 });


    top_hud_contents = [top_score, tree_icon, park_count, office_icon, office_count, store_icon, store_count,
      hospital_icon, hospital_count, total_co2_text_hud, house_icon, house_count, up_arrow_button, money_text_hud];

     

    hide_top_hud_detailed();

    down_arrow_button.on("pointerup", function () {
      show_top_hud_detailed();
    });

    up_arrow_button.on("pointerup", function () {
      hide_top_hud_detailed();
    });


    // Cog (top-left corner) drop down menu
    let cog = this.add.image(50, 48, "cog").setInteractive();
    let settings = this.add.graphics();
    settings.fillRect(0, 105, 300, 200);
    settings.alpha = 0;

    let quit_text = this.add.text(25, 200, "Quit", { fontFamily: "Verdana", fontSize: 36 }).setInteractive();
    let settings_text = this.add.text(25, 120, "Settings", { fontFamily: "Verdana", fontSize: 36 }).setInteractive();

    quit_text.alpha = 0;
    settings_text.alpha = 0;
    let settings_window = this.add.graphics();
    settings_window.fillRect(400, 400, 500, 500);

    let exit_button = this.add.graphics({ fillStyle: { color: 0x059327 } });
    exit_button.fillRect(565, 750, 170, 100);


    // Cog (top-left corner) drop down menu button functions
    cog.on("pointerup", function () {
      if (settings_menu_visible) {
        this.scene.resume("GameScene");
        hide_cog_dropdown();

      }
      else {
        this.scene.pause("GameScene");
        display_cog_dropdown();

      }
    }, this);

    settings_text.on("pointerup", function () {
      hide_cog_dropdown();
      display_settings_menu();
    });

    quit_text.on("pointerup", function () {
      console.log("quit");

      clearInterval(myTimer);
      zoomed_in = false;
      this.scene.switch("Title_Scene");
      this.scene.moveUp("Title_Scene");
      this.scene.stop("UIScene");
      reset_game();
    }, this);


    // SFX Menu
    let sfx_text = this.add.text(470, 450, "SFX", { fontFamily: "Verdana", fontSize: 48 });
    let sfx_on = this.add.text(490, 530, "ON", { fontFamily: "Verdana", fontSize: 36 });
    let sfx_off = this.add.text(735, 530, "OFF", { fontFamily: "Verdana", fontSize: 36 });
    let check_sfx_on = this.add.image(525, 620, "check").setInteractive();
    let check_sfx_off = this.add.image(775, 620, "check").setInteractive();
    let empty_sfx_on = this.add.image(525, 620, "empty").setScale(0.7).setInteractive();
    let empty_sfx_off = this.add.image(775, 620, "empty").setScale(0.7).setInteractive();
    let return_text = this.add.text(570, 770, "Return", { fontFamily: "Verdana", fontSize: 48 }).setInteractive();


    // SFX menu button functions
    return_text.on("pointerup", function () {
      hide_sfx_menu();
      this.scene.resume("GameScene");
    }, this);

    empty_sfx_off.on("pointerup", function () {
      sfx_is_on = false;
      place_tile_sound.setVolume(0);
      remove_tile_sound.setVolume(0);
      check_sfx_on.alpha = 0;
      check_sfx_off.alpha = 1;
      empty_sfx_on.alpha = 1;
      empty_sfx_off.alpha = 0;
    });

    empty_sfx_on.on("pointerup", function () {
      sfx_is_on = true;
      place_tile_sound.setVolume(1);
      remove_tile_sound.setVolume(1);
      check_sfx_on.alpha = 1;
      check_sfx_off.alpha = 0;
      empty_sfx_on.alpha = 0;
      empty_sfx_off.alpha = 1;
    });

    hide_sfx_menu();  // Initially hide the SFX menu


    // Bottom HUD
    bot_hud = this.add.graphics();
    bot_hud.fillRect(0, 925, 1280, 500);
    bot_hud.alpha = 0;


    /* Tile buttons */
    // Unselected buttons
    tree_button = this.add.sprite(390, 1035, "tree").setInteractive().setScale(2);
    house_button = this.add.sprite(690, 1035, "house").setInteractive().setScale(2);
    hospital_button = this.add.sprite(990, 1035, "hospital").setInteractive().setScale(2);
    office_button = this.add.sprite(390, 1185, "office").setInteractive().setScale(2);
    store_button = this.add.sprite(690, 1185, "store").setInteractive().setScale(2);
    demolish_button = this.add.sprite(990, 1185, "demolish_button").setInteractive().setScale(2);
    tree_button_easter = this.add.sprite(390, 1035, "tree_easter").setInteractive().setScale(2);

    // Selected buttons
    tree_button_selected = this.add.sprite(390, 1035, "tree_selected").setInteractive().setScale(2);
    house_button_selected = this.add.sprite(690, 1035, "house_selected").setInteractive().setScale(2);
    hospital_button_selected = this.add.sprite(990, 1035, "hospital_selected").setInteractive().setScale(2);
    office_button_selected = this.add.sprite(390, 1185, "office_selected").setInteractive().setScale(2);
    store_button_selected = this.add.sprite(690, 1185, "store_selected").setInteractive().setScale(2);
    tree_button_easter_selected = this.add.sprite(390, 1035, "tree_easter_selected").setInteractive().setScale(2);
    demolish_button_selected = this.add.sprite(990, 1185, "demolish_button_selected").setInteractive().setScale(2);

    tree_button_easter.alpha = 0;    // Initially set easter egg button hidden


    // Bottom HUD navigation
    let right_arrow_button = this.add.sprite(1190, 1100, "right_arrow").setInteractive().setScale(0.4);
    let zoom_out_button = this.add.image(150, 1090, "zoom_out").setInteractive();

    bot_hud_buttons_array = [tree_button, house_button, demolish_button, right_arrow_button, zoom_out_button,
      hospital_button, office_button, store_button];

    bot_hud_buttons_selected_array = [tree_button_selected, house_button_selected, hospital_button_selected, office_button_selected,
      store_button_selected, tree_button_easter_selected, tree_button_easter, demolish_button_selected];

    hide_bot_hud();  // Initially hide bot HUD buttons 

    //Bottom HUD button functions 
    right_arrow_button.on("pointerup", function () {
      community_id += 1;
      if (community_id == 7) {
        community_id = 1;
      }

      game_camera.pan(camera_zoom_to_x[community_id - 1], camera_zoom_to_y[community_id - 1], 100, "Power2");
      if (community_id == 5) { game_camera.zoomTo(3, 100); }
      else if (community_id == 6) { game_camera.zoomTo(2.1, 100); }
      else { game_camera.zoomTo(2, 100) }
    });

    zoom_out_button.on("pointerup", function () {
      tree_easter_counter = 0;
      hide_bot_hud();
      game_camera.zoomTo(1, 500);
      selected_option = "none";
      zoomed_in = false;
    });

    tree_button.on("pointerup", function () {
      tree_easter_counter += 1;
      console.log("Tree Tile Selected");
      selected_option = "tree_tile";
      check_easter_egg_status(tree_easter_counter);
      select_tile(tree_button);
    });

    tree_button_selected.on("pointerup", function () {
      tree_easter_counter += 1;
      selected_option = "tree_tile";
      console.log("Tree Tile Selected");
      check_easter_egg_status(tree_easter_counter);
      select_tile(tree_button);
    });

    tree_button_easter_selected.on("pointerup", function () {
      tree_easter_counter += 1;
      selected_option = "tree_tile_easter";
      select_tile(tree_button_easter);
      check_easter_egg_status(tree_easter_counter);
    });

    tree_button_easter.on("pointerup", function () {
      selected_option = "tree_tile_easter";
      check_easter_egg_status(tree_easter_counter);
      select_tile(tree_button_easter);
    })

    house_button.on("pointerup", function () {
      console.log("House Tile Selected");
      selected_option = "house_tile";
      select_tile(house_button);
    });

    office_button.on("pointerup", function () {
      console.log("Office Tile Selected");
      selected_option = "office_tile";
      select_tile(office_button);
    });

    store_button.on("pointerup", function () {
      console.log("Store Tile Selected");
      selected_option = "store_tile";
      select_tile(store_button);
    });

    hospital_button.on("pointerup", function () {
      console.log("Hospital Tile Selected");
      selected_option = "hospital_tile";
      select_tile(hospital_button);
    });

    demolish_button
  .on("pointerup", function () {
      console.log("Delete Tile Selected");
      selected_option = "remove_tile";
      select_tile(demolish_button);
    });



    // Game over screen
    // This screen will be shown once the timer is 0:00
    let gameover_background = this.add.image(600, 640, "bg").setScale(3);
    let gameover_txt = this.add.text(290, 50, "Game Over", { fontFamily: "Verdana", color: "black", fontSize: 128 });
    gameover_total_score = this.add.text(375, 250, "Score: ", { fontFamily: "Verdana", color: "black", fontSize: 86 });

    let breakdown = this.add.text(350, 390, "Score Breakdown", { fontFamily: "Verdana", color: "black", fontSize: 64 })
    let base_score = this.add.text(100, 510, "Base Score: +" + INITIAL_POINTS + "pts", { fontFamily: "Verdana", color: "blue", fontSize: 64 });

    gameover_co2_score = this.add.text(100, 610, "CO2 Emission: ppm", { fontFamily: "Verdana", color: "red", fontSize: 60 });
    total_associations = this.add.text(100, 710, "# of associations: ", { fontFamily: "Verdana", color: "blue", fontSize: 64 });
    missing_associations = this.add.text(100, 810, "# of missing associations: ", { fontFamily: "Verdana", color: "red", fontSize: 56 });

    let play_again_button = this.add.image(650, 1000, "play_again").setScale(2.25).setInteractive();
    let return_to_menu = this.add.image(650, 1200, "return_to_menu").setScale(2.25).setInteractive();

    gameover_screen = [gameover_background, gameover_txt, gameover_total_score, gameover_co2_score, total_associations, play_again_button, return_to_menu, missing_associations, base_score, breakdown]

    for (let i = 0; i < gameover_screen.length; i++) {
      gameover_screen[i].alpha = 0;
    }

    play_again_button.on("pointerup", function () {
      console.log("play");
      reset_game();
      start_timer = true;

      this.scene.resume("GameScene");
      this.scene.resume("UIScene");
      this.scene.run("GameScene");
      this.scene.setVisible(false);

      reset_game();
    }, this);

    return_to_menu.on("pointerup", function () {
      zoomed_in = false;
      this.scene.switch("Title_Scene");
      this.scene.moveUp("Title_Scene");
      this.scene.stop("UIScene");
      start_timer = true;
      money = 2000;
      total_co2 = 0;
      reset_game();
    }, this);

    this.scene.setVisible(true, "GameScene");  // To create the illusion that the UIScene and GameScene loaded simultaneously

    /* Functions used inside create() */
    function hide_bot_hud() {
      hide_buttons(bot_hud_buttons_array);
      hide_buttons(bot_hud_buttons_selected_array);
      bot_hud.alpha = 0;
    }


    function hide_buttons(button_list) {
      for (let i = 0; i < button_list.length; i++) {
        button_list[i].alpha = 0;
      }
    }


    function hide_top_hud_detailed() {
      top_hud_detailed.setVisible(false);
      score.alpha = 1;
      down_arrow_button.alpha = 1;
      for (let i = 0; i < top_hud_contents.length; i++) {
        top_hud_contents[i].alpha = 0;
      }
    }


    function show_top_hud_detailed() {
      top_hud_detailed.setVisible(true);
      score.alpha = 0;
      down_arrow_button.alpha = 0;
      for (let i = 0; i < top_hud_contents.length; i++) {
        top_hud_contents[i].alpha = 1;
      }
    }


    function hide_cog_dropdown() {
      settings_menu_visible = false;
      quit_text.alpha = 0;
      settings_text.alpha = 0;
      settings.alpha = 0;
    }


    function display_cog_dropdown() {
      settings_menu_visible = true;

      quit_text.alpha = 1;
      settings_text.alpha = 1;
      settings.alpha = 0.75;
    }


    function hide_sfx_menu() {
      let settings_content = [settings_window, exit_button, sfx_text, sfx_on, sfx_off, check_sfx_off, check_sfx_on, empty_sfx_off, empty_sfx_on, return_text];
      for (let i = 0; i < settings_content.length; i++) {
        settings_content[i].alpha = 0;

      }
    }


    function display_settings_menu() {
      let settings_content_text = [settings_window, exit_button, sfx_text, sfx_on, sfx_off, return_text];
      for (let i = 0; i < settings_content_text.length; i++) {
        settings_content_text[i].alpha = 1;
      }

      if (sfx_is_on) {
        check_sfx_on.alpha = 1;
        check_sfx_off.alpha = 0;
        empty_sfx_on.alpha = 0;
        empty_sfx_off.alpha = 1;
      }
      else {
        check_sfx_on.alpha = 0;
        check_sfx_off.alpha = 1;
        empty_sfx_on.alpha = 1;
        empty_sfx_off.alpha = 0;
      }
    }


    function reset_game() {
      houseList = new List();
      hospitalList = new List();
      storeList = new List();
      workTowerList = new List();
      parkList = new List();
      allLists = [[houseList, HOUSE_CO2], [workTowerList, WORK_TOWER_CO2], [hospitalList, HOSPITAL_CO2], [storeList, STORE_CO2], [parkList, PARK_CO2]];
      DRIVING_CO2 = 0;
      infrastructure_co2 = 0;
      money = 2000;
      time = 120;
    }


    function select_tile(tile_name) {
      // Change tile buttons to yellow once selected
      let not_selected = [house_button, hospital_button, office_button, store_button, demolish_button];
      let bot_hud_buttons_selected_array = [house_button_selected, hospital_button_selected, office_button_selected, 
                                                store_button_selected,demolish_button_selected];

      for (let i = 0; i < bot_hud_buttons_selected_array.length; i++) {
        if (not_selected[i] === tile_name) {
          not_selected[i].alpha = 0;
          bot_hud_buttons_selected_array[i].alpha = 1;
        }
        else {
          not_selected[i].alpha = 1
          bot_hud_buttons_selected_array[i].alpha = 0;
        }
      }

      if (tile_name == demolish_button) {
        for (let i = 0; i < not_selected.length; i++) {
          not_selected[i].alpha = 1;
          tree_button_selected.alpha = 0;
        }

        if (tree_easter_counter < 7) {
          tree_button.alpha = 1;
        }
        else {
          tree_button_easter.alpha = 1;
        }
      }

      else if (tile_name == tree_button) {
        tree_button.alpha = 0;
        tree_button_selected.alpha = 1;
      }

      else if (tile_name == tree_button_easter) {
        tree_button_easter_selected.alpha = 1;
        tree_button_easter.alpha = 0;
      }

      else {
        if (tree_easter_counter < 7) {
          tree_button_selected.alpha = 0;
          tree_button.alpha = 1;
        }
        else {
          tree_button_easter_selected.alpha = 0;
          tree_button_selected.alpha = 0;
          tree_button_easter.alpha = 1;
        }
      }
    }


    function check_easter_egg_status(counter) {
      // Determine whether easter egg is activated
      console.log(counter);

      if (counter < 7) {
        tree_button_selected.alpha = 1;
        tree_button.alpha = 0;
      }

      else if (counter == 7) {
        tree_button.alpha = 0;
        tree_button_selected.alpha = 0;
        tree_button_easter_selected.alpha = 1;
        selected_option = "tree_tile_easter";
      }

      else if (counter > 7 && counter < 14) {
        tree_button_easter_selected.alpha = 1;
        tree_button_easter.alpha = 0;
      }

      else if (counter == 14) {
        tree_easter_counter = 0;
        tree_button_selected.alpha = 1;
        tree_button_easter_selected.alpha = 0;
        tree_button_easter.alpha = 0;
        selected_option = "tree_tile";
      }
    }
  }

  update() {
    // Always update score based on the CO2 of distance travelled and infrastructures on the map
    total_co2 = infrastructure_co2 + Math.round(DRIVING_CO2);

    // When timer is 0:00, zoom-out of the map and set selected option to none
    if (time == 0) {
      zoomed_in = false
      selected_option = "none";
    }

    // Constantly update detailed overview of map (top hud detailed dropdown menu)
    money_text_hud.setText("Money: $" + money);
    let number_of_houses = houseList.listSize;
    let number_of_offices = workTowerList.listSize;
    let number_of_hospitals = hospitalList.listSize;
    let number_of_shops = storeList.listSize;
    let number_of_parks = parkList.listSize;

    update_count(park_count, number_of_parks);
    update_count(store_count, number_of_shops);
    update_count(office_count, number_of_offices);
    update_count(hospital_count, number_of_hospitals);
    house_count.setText(" x" + number_of_houses);  // Do not modify the color of the # of houses

    // Constantly update the game over screen scores
    let associated_points = calculateAssociationsAndLeftOvers();
    let missing_association_points = calculatePoints();
    total_associations.setText("# of associations: " + associated_points[0] + "= +" + associated_points[1] + "pts")
    missing_associations.setText("# of missing associations: " + associated_points[2] + " = -" + missing_association_points[4] + "pts")
    gameover_co2_score.setText("CO2 Emission: " + total_co2 + "ppm" + " = -" + total_co2 + "pts");

    // Constantly update total score
    let score_msg = "Score: " + points;
    score.setText(score_msg);
    gameover_total_score.setText(score_msg);
    top_score.setText(score_msg);
    total_co2_text_hud.setText("Global CO2 ppm: " + total_co2);
    money_text.setText("Money: $" + money);

    // Constantly check whether camera is zoomed-in or not
    if (zoomed_in) {
      for (let j = 0; j < bot_hud_buttons_array.length; j++) {
        bot_hud_buttons_array[j].alpha = 1;
      }
    }


    function update_count(status, size) {
      // Set color or text, based on # of houses
      status.setText(" x" + size);
      if (size != number_of_houses) {
        status.setColor("#f23535");  // red
      }

      else {
        status.setColor("#20f209");  // green
      }
    }

  }
}

