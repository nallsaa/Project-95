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
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log("room_names - " + Room_names)
                  row = "<div class='room_name' id='" + Room_names + "'onclick=redirectToRoomNames(this.id)>" + Room_names + "</div> <hr>"
                  document.getElementById("output").innerHTML += row
                  //End code
            });
      });
}
getData();

function add_room() {
      room_name = document.getElementById("room_name").value
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      })

      localStorage.setItem("room_name", room_name)

      window_location = "kwitter_page.html"
}

function redirectToRoomNames(name) {
      console.log("Room_name")
      localStorage.setItem("room_name", name)
      window.location = "kwitter_page.html"
}

function logout() {
      localStorage.removeItem("room_name")
      localStorage.removeItem("user_name")
      window.location = "index.html"
}
