function able_to_place_tile(community_number, tile_col, tile_row, selected_option) {
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
