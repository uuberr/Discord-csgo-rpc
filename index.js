const fs = require("fs");
const CSGOGSI = require("node-csgo-gsi"); // const CSGOGSI = require("node-csgo-gsi");

const RPC = require("discord-rpc");
const { Console } = require("console");
const rpc = new RPC.Client({
    transport: "ipc"
});

rpc.on("ready", () =>{

    console.log("nt")
});
rpc.login({
    clientId: "771107009353220127"
});

let gsi = new CSGOGSI({
    port: 3000,
    authToken: ["Q79v5tcxVQ8u", "Team2Token", "Team2SubToken"] // this must match the cfg auth token
});

gsi.on("all", function (data) {
    var map,mode,icon;
    console.log(data["player"]["activity"]);
    if(data["player"]["activity"] == "menu"){
        map = "Idling";
        mode = "Afking hours";
        icon = "csgo";
    }
    else if((data["player"]["activity"] == "playing")){
    console.log(data["map"]["mode"]);
    var mode = data["map"]["mode"];
    var map = data["map"]["name"] + " | " + "CT " + data["map"]["team_ct"]["score"]+ " : " + data["map"]["team_t"]["score"] + " T";
    
    var mapstr = data["map"]["name"];
    var n = mapstr.startsWith("workshop");
    
    console.log(n);
    if(n == true){
        icon = "csgo";
    } else{
        icon = data["map"]["name"];
    }
    switch(map){
        case "de_inferno":
            map = "Inferno";
        case "de_nuke":
            map = "Nuke";
            break;
        case "de_dust2":
            map = "Dust 2";
            break;
        case "de_mirage":
            map = "Mirage";
            break;
        case "de_overpass":
            map = "Overpass";
            break;
        case "de_vertigo":
            map = "Vertigo";
            break;
        case "de_train":
            map = "Train";
            break;
        case "workshop/243702660/aim_botz":
            map = "Aim Botz";
            
            break;
    }
    console.log(data["map"]["name"]);
    
    
    
    
    }
    rpc.setActivity({
        details: map,
        state: mode,
        startTimestamp: new Date(),
        largeImageKey: icon /*"pog"*/,
        largeImageText: "Testi",
        smallImageKey: "1",
        smallImageText: "testi"
    });
});


