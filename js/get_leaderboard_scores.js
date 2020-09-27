firebase.database().ref("users/").on("value", function (snapshot) {
    let user_ids = snapshot.val();
    let scores = [];
    let names = [];
    let leaderboard_names = [];
    let leaderboard_scores = [];
    for (var index in user_ids) {
        if (user_ids[index].score != null) {
            scores.push(user_ids[index].score);
            names.push(user_ids[index].name)
        }
    }

    // Calculate top 20 scores
    if (scores.length <= 20) {
        // Since we are splicing the list, store original length
        let original_scores_length = scores.length
        for (let i = 0; i < original_scores_length; i++) {
            let max_index = scores.indexOf(Math.max(...scores));
            let name_user = names[max_index];
            let user_score = scores[max_index];

            names.splice(max_index, 1);
            scores.splice(max_index, 1);

            leaderboard_scores.push(user_score);
            leaderboard_names.push(name_user);
        }
    }

    else {
        for (let i = 0; i < 20; i++) {
            let max_index = scores.indexOf(Math.max(...scores));
            let name_user = names[max_index];
            let user_score = scores[max_index];

            names = names.splice(max_index, 1);
            scores = scores.splice(max_index, 1);

            leaderboard_scores.push(user_score);
            leaderboard_names.push(name_user);
        }
    }

    for (let i = 0; i < leaderboard_scores.length; i++) {
        let row = document.createElement("tr")
        row.id = "row_id" + i
        document.getElementById("leaderboard").appendChild(row);
        let score = document.createElement("td");
        let name = document.createElement("td");
        name.innerHTML = leaderboard_names[i];
        score.innerHTML = leaderboard_scores[i];
        document.getElementById("row_id" + i).appendChild(name);
        document.getElementById("row_id" + i).appendChild(score);
    }
});