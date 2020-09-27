(function () {
    // Create key:value pair for name and email if user id is new
    firebase.auth().onAuthStateChanged(function (user) {
        firebase.database().ref("users/" + user.uid).update(
            {
                "name": user.displayName,
                "email": user.email
            });
    });
})()

