/* 
Error cases: 
$.getScript('game.js', function name(){
    window.alert("");
});
*/


function gameOver(){
    //Call this function in game.js if the player loses. 
    window.location = "gameOver.html";
}

$.getScript('game.js',  function carbonHighCommun(){
    window.alert("This community is producing too much CO2!!");
    //code can be adjusted to lead to gameover screen if it' levels breach a certain threshold.
});


$.getScript('game.js', function moneyOut(){
    window.alert("You are out of money");
    //if no work towers are in the game, call Game Over.
});

$.getScript('game.js', function globalCarbonHigh(){
    window.alert("The global CO2 levels are reaching dangerous heights!");
});

$.getScript('game.js', function eventDisasster(){
    window.alert("One of the communities has been hit by a disaster!");
});