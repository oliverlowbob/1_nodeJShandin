const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.static('videos'))
app.use(express.static('public'))



let devices = [
    { id: 1, type: "computer"}, 
    { id: 2, type: "smart watch"}
];


app.get("/devices", (req, res) =>{
    return res.send({response: devices})
});

app.get("/devices/:id", (req, res) => {
    const device = devices.find(device => device.id === Number(req.params.id));
    return res.send({ response: device });
});


app.get("/videos/", (req, res) =>{
    return res.sendFile(__dirname+"/public/html/videos.html");
});


app.get("/", (req, res) =>{
    return res.sendFile(__dirname+"/public/html/index.html");
});

app.get("/api", (req, res) =>{
    return res.sendFile(__dirname+"/public/html/api.html");
});

app.get("/requirements", (req, res) =>{
    return res.sendFile(__dirname+"/public/html/requirements.html");
});

app.get("/misc", (req, res) =>{
    return res.sendFile(__dirname+"/public/html/misc.html");
});

app.get("/jquery", (req, res) =>{
    return res.sendFile(__dirname+"/public/html/jquery.html");
});

app.get("/basics", (req, res) =>{
    return res.sendFile(__dirname+"/public/html/basics.html");
});

app.get("/jsbasics", (req, res) =>{
    return res.sendFile(__dirname+"/public/html/jsbasics.html");
});

app.get("/jqueryintro", (req, res) =>{
    return res.sendFile(__dirname+"/public/html/jqueryintro.html");
});

app.put("/devices/:id", (req, res) =>{
    const foundIndex = devices.findIndex(device => device.id === Number(req.params.id));
    delete req.body.id
    const newDevice = {...devices[foundIndex], ...req.body};
    devices[foundIndex] = newDevice;
    return res.send({response: devices});

    //const device = devices.find(device => device.id === Number(req.params.id));
    //device.type = req.body
    //return res.send({response: devices})

});

app.delete("/devices/:id", (req, res) =>{

    // devices = devices.filter(device => device.id !== Number(req.params.id));

    const device = devices.find(device => device.id === Number(req.params.id));

    for(var i = 0; i < devices.length; i++) {
      if(devices[i].id == device.id) {
        devices.splice(i, 1);
          break;
        }
    }
    return res.send({response: devices})
      

})


const server = app.listen(80, (error) =>{
    if(error){
        console.log(error);
    }
    console.log("Server is running", server.address().port);
});