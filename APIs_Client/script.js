const link = "http://localhost:3000/";

function load(){
    var ul = document.getElementById("hint");
    ul.innerHTML = ""
    ul.classList.remove("text-danger")
    fetch(link, {method: "GET", headers: {auth: "qwerty"}}).then(res => res.json()).then(res => {
        for (let i = 0; i < res.length; i++) {
            var song = res[i];
            var li = document.createElement("li");
            li.innerHTML = song.album.replaceAll("_", " ");
            ul.appendChild(li);
        }
    }).catch(err => {
        ul.classList.add("text-danger")
        ul.innerHTML = "Error: Your token is not valid!"
    });
}

function URL_Transform(){
    var song = document.getElementById("song").value;
    var value = song.replaceAll(" ", "_");
    var url = link+value;
    return url;
}

function search(){
    var table = document.getElementById("table");
    var url = URL_Transform();
    table.innerHTML = ""
    fetch(url, {method: "GET", headers: {auth: "qwerty"}}).then(res => res.json()).then(res => {
        var song = res;
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        td1.innerHTML = song.album.replaceAll("_", " ");
        td2.innerHTML = song.songs.join("<br>");
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
    load()
    }).catch(err => {
        hint.classList.add("text-danger")
        hint.innerHTML = "Error: Your token is not valid!"
    });
}

function InsertAlbum() {
    var album = document.getElementById("album").value.replaceAll(" ", "_");
    var songs = document.getElementById("songs").value.split(",");
    var url = link+"InsertarAlbum";
    fetch(url, {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth': 'qwerty'
            },
            body: JSON.stringify({ album: album, songs: songs.map(song => song.trim()) })
    }).then(res => res.text()).then(res => {
        alert(res);
        window.location.href = "index.html";
    }).catch(err => {
        alert("Error: Your token is not valid!")
    });
}

/* function notDone() {
    alert("Aca n¿ada mas deje el formulario hecho para meterle la funcionalidad después")
} */