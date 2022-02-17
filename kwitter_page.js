user_name = localStorage.getItem("user_name")
room_name = localStorage.getItem("room_name")

const firebaseConfig = {
      apiKey: "AIzaSyD_mD7L-0v0KMizr31_dsKC9QJ5avIYNM8",
      authDomain: "c93kwitter-26724.firebaseapp.com",
      databaseURL: "https://c93kwitter-26724-default-rtdb.firebaseio.com",
      projectId: "c93kwitter-26724",
      storageBucket: "c93kwitter-26724.appspot.com",
      messagingSenderId: "861025533602",
      appId: "1:861025533602:web:67737bf9858e4e773be1fb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//ADD YOUR FIREBASE LINKS HERE

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id)
                        console.log(message_data)
                        name = message_data["name"]
                        message = message_data["message"]
                        like = message_data["like"]
                        name_with_tag = "<h4>" + name + '<img src="tick.png" class="user_tick"></h4>'
                        message_tag = "<h4 class='message_h4'>" + message + "</h4>"
                        like_button_tag = "<button class='btn btn-warning' id='" + firebase_message_id + "value='" + like + "' onclick='update_likes(this.id)'>"
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>like: " + like + "</span> </button> </hr>"
                        row = name_with_tag + message_tag + like_button_tag + span_with_tag
                        document.getElementById("output").innerHTML += row
                        //End code
                  }
            });
      });
}
getData();


function logout() {
      localStorage.removeItem("room_name")
      localStorage.removeItem("user_name")
      window.location = "index.html"
}

function send() {
      msg = document.getElementById("msg").value
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0

      })

      document.getElementById("msg").value = ""
}

function update_likes(message_id) {
      button_id = message_id
      likes = document.getElementById(button_id).value
      updated_likes = Number(likes) + 1
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      })


}
