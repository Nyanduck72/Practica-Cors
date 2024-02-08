const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

const Musica = [
    {id: 1, album: "Is_This_It", songs: ["Is This It", "The Modern Age", "Soma", "Barely Legal", "Someday", "Alone, Together", "Last Nite", "Hard To Explain", "New York City Cops", "Trying Your Luck", "Take It Or Leave It"]},
    {id: 2, album: "Room_On_Fire", songs: ["What Ever Happened", "Reptilia", "Automatic Stop", "12:51", "You Talk Way Too Much", "Between Love And Hate", "Meet Me In The Bathroom", "Under Control", "The Way It Is", "The End Has No End", "I Can't Win", "Clampdown", "Modern Girls And Old Fashioned Men"]},
    {id: 3, album: "First_Impressions_Of_Earth", songs: ["You Only Live Once", "Juicebox", "Heart In A Cage", "Razorblade", "On The Other Side", "Vision Of Division", "Ask Me Anything", "Electricityscape", "Killing Lies", "Fear of Sleep", "15 Minutes", "Ize Of The World", "Evening Sun", "Red Light", "Hawaii"]},
    {id: 4, album: "Angles", songs: ["Machu Picchu", "Under Cover Of Darkness", "Two Kinds Of Happiness", "You're So Eight", "Taken For A Fool", "Games", "Call Me Back", "Gratsifaction", "Metabolism", "Life Is Simple In The Moonlight"]},
    {id: 5, album: "Comedown_Machine", songs: ["Tap Out", "All The Time", "One Way Trigger", "Welcome To Japan", "80's Comedown Machine", "50/50", "Slow Animals", "Partners In Crime", "Chances", "Happy Ending", "Call It Fate, Call It Karma"]},
    {id: 6, album: "Future,_Present,_Past", songs: ["Drag Queen", "Oblivius", "Threat Of Joy"]},
    {id: 7, album: "The_New_Abnormal", songs: ["The Adults Are Talking", "Selfless", "Brooklyn Bridge To Chorus", "Bad Decisions", "Eternal Summer", "At The Door", "Why Are Sundays So Depressing", "Not The Same Anymore", "Ode To The Mets"]}
]

app.use(express.json());
app.use(cors(
        {
        origin: '*',
        methods: ['GET', 'POST']
        }
    )
)

function Authorize(req, res, next){
    const _token = req.headers.auth;
    if (_token == "qwerty")
        {
            next()
        }else{
            res.send("Your token is not valid!")
        }
}

app.get('/', Authorize,(req, res) => {
    res.json(Musica)
})

app.get('/:album', Authorize,(req, res) => {
    const album = req.params.album;
    const song = Musica.find(s => s.album == album);
    res.json(song);
})

app.post("/InsertarAlbum", Authorize,(req, res) => {

    if (!req.body.album || !req.body.songs) {
        return res.status(400).send("Falta información para subir el album")
    }

    const newAlbumId = Musica.length + 1;

    const newAlbum = {
        id: newAlbumId,
        album: req.body.album,
        songs: req.body.songs
    };

    Musica.push(newAlbum);

    res.status(201).json(newAlbum);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})