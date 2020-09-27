TestCase("ableToPlaceTile testTest", {
    "test ableToPlaceTile community 1 lower bound ": function(){
        assertEquals(true, able_to_place_tile(1, 3, 4, "tree" ));
    },
    "test ableToPlaceTile community 1 upper bound ": function(){
     assertEquals(true, able_to_place_tile(1, 8, 7 , "tree"));
    },
    "test ableToPlaceTile community 2 row 4 lower bound": function(){
        assertEquals(true, able_to_place_tile(2, 10, 4, "tree"));
    },

    "test ableToPlaceTile community 2 row 4 lower upper": function(){
        assertEquals(true, able_to_place_tile(2, 13, 4,"tree"));
    },

    "test ableToPlaceTile community 2 row 5 lower bound": function(){
        assertEquals(true, able_to_place_tile(2, 10, 5,"tree"));
    },

    "test ableToPlaceTile community 2 row 5 upper bound": function(){
        assertEquals(true, able_to_place_tile(2, 15, 5, "tree"));
    },

    "test ableToPlaceTile community 2 row 6  lower bound": function(){
        assertEquals(true, able_to_place_tile(2, 10, 6, "tree"));
    },

    "test ableToPlaceTile community 2 row 6  upper bound": function(){
        assertEquals(true, able_to_place_tile(2, 17, 6, "tree"));
    },

    "test ableToPlaceTile community 2 row 7  lower bound": function(){
        assertEquals(true, able_to_place_tile(2, 10, 7, "tree"));
    },

    "test ableToPlaceTile community 2 row 7  upper bound": function(){
        assertEquals(true, able_to_place_tile(2, 17, 7, "tree"));
    },

    "test ableToPlaceTile community 3 lower bound ": function(){
        assertEquals(true, able_to_place_tile(3, 3, 9 , "tree"));
    },
    "test ableToPlaceTile community 3 upper bound ": function(){
        assertEquals(true, able_to_place_tile(3, 8, 12 , "tree"));
    },

    "test ableToPlaceTile community 4 lower bound ": function(){
        assertEquals(true, able_to_place_tile(4, 10, 9 , "tree"));
    },
    "test ableToPlaceTile community 4 upper bound ": function(){
        assertEquals(true, able_to_place_tile(4, 17, 12 , "tree"));
    },

    "test ableToPlaceTile community 5 lower bound ": function(){
        assertEquals(true, able_to_place_tile(5, 3, 14 , "tree"));
    },
    "test ableToPlaceTile community 5 upper bound ": function(){
        assertEquals(true, able_to_place_tile(5, 7, 16, "tree" ));
    },

    "test ableToPlaceTile community 6 lower bound ": function(){
        assertEquals(true, able_to_place_tile(6, 9, 14 , "tree"));
    },
    "test ableToPlaceTile community 6 upper bound ": function(){
        assertEquals(true, able_to_place_tile(6, 17, 16 , "tree"));
    },

    "test ableToPlaceTile community 1 out of bounds ": function(){
        assertEquals(false, able_to_place_tile(1, 2, 2, "tree" ));
    },
});
