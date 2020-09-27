// Map related variables
let map;
let marker;
let tile_col;
let tile_row;
let ground_layer;
let top_layer;

let game_camera;

// The current position of the camra
let x_position_current;
let y_position_current;

/* 
Sometimes, Phaser 3's camera system zooms to the center of the screen, even though it is told to zoom somewhere else.
To prevent this, we check the current position of the camera. 
If it is not the intended location we want to zoom into, fix it by giving it the intended coordinates of the location.
*/

// The intended coordinates when zooming with camera 
let camera_x_coordinate = [30, 580, 50, 580, 137, 555];
let camera_y_coordinate = [130, 130, 430, 430, 836, 670];

// Zoom coordinates in the case the camera does something unintended
let camera_zoom_to_x = [350, 900, 370, 900, 350, 860];
let camera_zoom_to_y = [450, 450, 750, 750, 1050, 1280];

// Sound effects for placing/removing tiles
let place_tile_sound;
let remove_tile_sound;


class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
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
    this.load.tilemapTiledJSON("map", "./assets/tile_map/island_1280.json");
    this.load.image("tileset", "./assets/tile_map/tileset.png");
    this.load.image("community_info", "./assets/in_game_buttons/speech.png");
    this.load.audio("place_tile", "./assets/audio/place_tile.mp3");
    this.load.audio("refund", "./assets/audio/refund.mp3");
  }

  create() {
    this.scene.stop("Title_Scene");  // Stop title scene

    // Sound effects for placing/removing a tile
    place_tile_sound = this.sound.add("place_tile");
    remove_tile_sound = this.sound.add("refund");

    this.scene.setVisible(false); // Set this scene invisible --> Once UIScene is loaded, GameScene will become visible 
    this.scene.run("UIScene");  // Run the UIScene

    // Load the map
    map = this.make.tilemap({ key: "map" });
    const tiles = map.addTilesetImage("tileset");
    ground_layer = map.createDynamicLayer("ground", tiles, 0, 0);
    top_layer = map.createDynamicLayer("top", tiles, 0, 0);

    // Initial randomization of the map
    randomize_map();

    // Initialzie camera
    game_camera = this.cameras.main;
    game_camera.setZoom(1);
    game_camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Touch events based on if camera is zoomed-in or not
    this.input.on("pointerup", function () {
      if (zoomed_in) {
        let tile = top_layer.getTileAt(tile_col, tile_row);

        if (tile == null) {
          // Do nothing if selected tile is out of bounds
        }

        // Check if tile is empty and is within the bounds
        else if (tile.index == "0" && able_to_place_tile(community_id)) {
          place_tile(selected_option, money);

          if (selected_option != "none" && selected_option != "remove_tile") {  // play sound only when placing a tile
            place_tile_sound.play();
          }
        }

        // Remove tile option
        else if (tile.index != "0" && selected_option == "remove_tile") {
          if (able_to_place_tile(community_id)) {
            refund(tile.index); // Get 50% of tile cost, and add 50 + C02_tile/2
            top_layer.putTileAt(0, tile_col, tile_row);  // Place an empty tile
            remove_tile_sound.play();
          }

        }
      }

      else { // Zoomed out
        if (tile_col >= 3 && tile_col <= 8 && tile_row >= 4 && tile_row <= 7) {
          zoom_to_community(1);
        }

        else if (tile_col >= 10 && tile_col <= 13 && tile_row == 4) {

          zoom_to_community(2);
        }

        else if (tile_col >= 10 && tile_col <= 15 && tile_row == 5) {

          zoom_to_community(2);

        }

        else if (tile_row == 6 || tile_row == 7) {
          if (tile_col >= 10 && tile_col <= 17) {
            zoom_to_community(2);
          }
        }


        else if (tile_col >= 3 && tile_col <= 8 && tile_row >= 9 && tile_row <= 12) {
          zoom_to_community(3);

        }

        else if (tile_col >= 10 && tile_col <= 17 && tile_row >= 9 && tile_row <= 12) {
          zoom_to_community(4);

        }

        else if (tile_col >= 3 && tile_col <= 7 && tile_row >= 14 && tile_row <= 16) {
          zoom_to_community(5);

        }

        else if (tile_col >= 9 && tile_col <= 17 && tile_row >= 14 && tile_row <= 16) {
          zoom_to_community(6);
        }
      };
    });

    // Re-optimize the routes for each home
    initializeAssociations();
  }


  update() {
    points = calculatePoints()[0];
    let score;
    // store HIGHEST score if score already exists. Otherwise, create a new key:value pair containing the score
    if (time == 0) {
      if (firebase.auth().currentUser != null) {
        let user_id = firebase.auth().currentUser.uid;

        firebase.database().ref("users/" + user_id).on("value", function (snapshot) {
          let x = snapshot.val();
          score = x["score"];
        })

        if (score == null || points > score) {
          firebase.database().ref("users/" + user_id).update({
            score: points
          });
        }
      }

      else {
        // No user is signed in.
        // Do nothing
      }
    }

    // Check the current position of the camera
    x_position_current = game_camera.worldView.x;
    y_position_current = game_camera.worldView.y;


    // Check if the camera is in the correct position. If not, adjust it.
    if (x_position_current < camera_x_coordinate[community_id - 1] || y_position_current < camera_y_coordinate[community_id - 1] ||
      x_position_current > camera_x_coordinate[community_id - 1] || y_position_current > camera_y_coordinate[community_id - 1]) {

      game_camera.pan(camera_zoom_to_x[community_id - 1], camera_zoom_to_y[community_id - 1], 100, 'Power2');

    }

    var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

    if (x_position_current < 0 || y_position_current < 0) {
      console.log("sup");
      // do nothing if pointer is outside game screen
      // This is to avoid crashing the game when user clicks outside the game screen
    }


    else {
      // Convert coordinate to its nearest tile
      tile_col = map.worldToTileX(worldPoint.x);
      tile_row = map.worldToTileY(worldPoint.y);
    }
  }
}


function randomize_map() {
  // Col, Row, Width, Height of Community # 1, 3 - 6 
  let min_col = [3, 3, 10, 3, 9];
  let max_col = [8, 8, 17, 7, 17];
  let min_row = [4, 9, 9, 14, 14];
  let max_row = [7, 12, 12, 16, 16];

  let width = [6, 6, 8, 5, 9];
  let height = [4, 4, 4, 3, 3];

  // Community #1, 3 - 6
  for (let i = 0; i < min_col.length; i++) {
    generate_ground_tile(min_col[i], min_row[i], width[i], height[i]);
    generate_building_tiles(min_col[i], max_col[i], min_row[i], max_row[i]);
  }

  /* Community #2 */
  // First row
  generate_ground_tile(10, 4, 4, 1);
  generate_building_tiles(10, 13, 4, 4);

  // Second row
  generate_ground_tile(10, 5, 6, 1);
  generate_building_tiles(10, 15, 5, 5);

  // Third + Fourth rows
  generate_ground_tile(10, 6, 8, 2);
  generate_building_tiles(10, 17, 6, 7);
}


function generate_building_tiles(min_col, max_col, min_row, max_row) {
  for (let i = min_col; i <= max_col; i++) {
    for (let j = min_row; j <= max_row; j++) {

      // Calculate tile probability each loop
      /*
        70% probability to generate blank tile
        10% probability to generate tree tile
        10% probability to generate house tile
        5% probability to generate store tile
        4% probability to generate hospital tile
        1% probability to generate work tower tile
      */
      let tile_prob = Math.round(Math.random() * 100 + 1);

      if (tile_prob <= 70) {  // Blank
        top_layer.putTileAt(0, i, j);
      }

      else if (tile_prob >= 71 && tile_prob <= 80) { // Tree
        top_layer.putTileAt(70, i, j);
        infrastructure_co2 -= 10;
        parkList.append(new Park(i, j));
      }

      else if (tile_prob >= 81 && tile_prob <= 90) { // House
        top_layer.putTileAt(71, i, j);
        infrastructure_co2 += 10
        houseList.append(new House(i, j));
      }

      else if (tile_prob >= 91 && tile_prob <= 95) {  // Store
        top_layer.putTileAt(72, i, j);
        infrastructure_co2 += 25
        storeList.append(new Store(i, j));
      }

      else if (tile_prob >= 96 && tile_prob <= 99) {  // Hospital
        top_layer.putTileAt(73, i, j);
        infrastructure_co2 += 100
        hospitalList.append(new Hospital(i, j));
      }
      else if(tile_prob == 100) {  // Office
        top_layer.putTileAt(74, i, j);
        infrastructure_co2 += 200
        workTowerList.append(new WorkTower(i, j));
      }
    }
  }
}


function generate_ground_tile(col, row, width, height) {
  ground_layer.weightedRandomize(col, row, width, height, [
    { index: 12, weight: 4 }, // Grass
    { index: 15, weight: 1 }, // Metal dots 
    { index: 14, weight: 1 }, // Metal stripes
    { index: 18, weight: 1 }, // Cement
    { index: 10, weight: 1 }  // Mono grey
  ]);
}


function refund(tile_index) {
  // Refund half the value when demolishing tile
  if (tile_index == 70 || tile_index == 75) {  // Tree 
    money += 50;
    infrastructure_co2 += 25
    parkList.remove(parkList.findByPosition(tile_col, tile_row));
  }
  else if (tile_index == 71) { // House
    money += 100;
    infrastructure_co2 += 30;
    houseList.remove(houseList.findByPosition(tile_col, tile_row));
  }

  else if (tile_index == 72) {  // Store
    money += 125;
    infrastructure_co2 += 33;
    storeList.remove(storeList.findByPosition(tile_col, tile_row));

  }

  else if (tile_index == 73) { // Hospital
    money += 250;
    infrastructure_co2 += 45;
    hospitalList.remove(hospitalList.findByPosition(tile_col, tile_row));
  }

  else if (tile_index == 74) {  // Office
    money += 500;
    infrastructure_co2 += 75;
    workTowerList.remove(workTowerList.findByPosition(tile_col, tile_row));
  }
  
  initializeAssociations();
}


function place_tile(selected_option, current_money) {
  if (selected_option == "tree_tile" && current_money >= 100) {
    top_layer.putTileAt(70, tile_col, tile_row);
    infrastructure_co2 -= 10;
    money -= 100;
    parkList.append(new Park(tile_col, tile_row));
  }
  else if (selected_option == "house_tile" && current_money >= 200) {
    top_layer.putTileAt(71, tile_col, tile_row);
    infrastructure_co2 += 10;
    money -= 200;
    houseList.append(new House(tile_col, tile_row));
  }

  else if (selected_option == "store_tile" && current_money >= 250) {
    top_layer.putTileAt(72, tile_col, tile_row);
    infrastructure_co2 += 25;
    money -= 250;
    storeList.append(new Store(tile_col, tile_row));
  }

  else if (selected_option == "hospital_tile" && current_money >= 500) {
    top_layer.putTileAt(73, tile_col, tile_row);
    infrastructure_co2 += 100;
    money -= 500;
    hospitalList.append(new Hospital(tile_col, tile_row));
  }

  else if (selected_option == "office_tile" && current_money >= 1000) {
    top_layer.putTileAt(74, tile_col, tile_row);
    infrastructure_co2 += 200;
    money -= 1000;
    workTowerList.append(new WorkTower(tile_col, tile_row));
  }

  else if (selected_option == "tree_tile_easter" && current_money >= 100) {
    top_layer.putTileAt(75, tile_col, tile_row);
    infrastructure_co2 -= 10;
    money -= 100;
    parkList.append(new Park(tile_col, tile_row));
  }

  else {
    if (selected_option != "remove_tile" && selected_option != "none" && selected_option != null) {
      window.alert("You lack the funds to build this unit");
    }
  }

  if (total_co2 >= 5000) {
    window.alert("Your city is producing too much CO2!");
  }

  initializeAssociations();

}


function zoom_to_community(community_number) {
  community_id = community_number;
  bot_hud.alpha = 0.75;
  zoomed_in = true;

  if (community_number == 5) {
    game_camera.zoomTo(3, 100);
  }

  else if (community_number == 6) {
    game_camera.zoomTo(2.1, 100);
  }
  else {
    game_camera.zoomTo(2, 100);
  }

  game_camera.pan(camera_zoom_to_x[community_number - 1], camera_zoom_to_y[community_number - 1], 50, 'Power1');
}


function able_to_place_tile(community_number) {
  if (community_number == 1) {
    if (tile_col >= 3 && tile_col <= 8 && tile_row >= 4 && tile_row <= 7) {
      return true
    }
  }

  else if (community_number == 2) {
    if (tile_row == 4) {
      if (tile_col >= 10 && tile_col <= 13) {
        return true
      }
    }

    else if (tile_row == 5) {
      if (tile_col >= 10 && tile_col <= 15) {
        return true
      }
    }

    else if (tile_row == 6 || tile_row == 7) {
      if (tile_col >= 10 && tile_col <= 17) {
        return true
      }
    }

  }

  else if (community_number == 3) {
    if (tile_col >= 3 && tile_col <= 8 && tile_row >= 9 && tile_row <= 12) {
      return true
    }
  }

  else if (community_number == 4) {
    if (tile_col >= 10 && tile_col <= 17 && tile_row >= 9 && tile_row <= 12) {
      return true
    }
  }

  else if (community_number == 5) {
    if (tile_col >= 3 && tile_col <= 7 && tile_row >= 14 && tile_row <= 16) {
      return true
    }
  }

  else if (community_number == 6) {
    if (tile_col >= 9 && tile_col <= 17 && tile_row >= 14 && tile_row <= 16) {
      return true
    }

  }

  if (selected_option != "remove_tile" ) {
    window.alert("You cannot place a tile in another community.");
  }
  return false;
}
