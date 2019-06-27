var queryDict = {};
var mod = "";

function init() {
	if (typeof mods === "undefined") {
		document.getElementById("data").addEventListener("load", init);
	} else {
		var known_apis = {
			"forge" : "https://files.minecraftforge.net/",
			"fabric" : "http://fabricmc.net/"
		};
		
		// this line by http://stackoverflow.com/users/985454/qwerty
		location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]});
		
		if (queryDict.m && mods[queryDict.m] && (mod = mods[queryDict.m])) {
			document.title = "ModsForge - " + mod.name;
			document.getElementById("modname").innerText = mod.name;
			document.getElementById("moddesc").innerText = mod.description;
			if (!mod.versions || mod.versions.length === 0) {
				document.getElementById("modvers").innerText = "N/A";
			} else for (let i = 0; i < mod.versions.length; i++) {
				if (i > 0) {
					let e = document.createTextNode(", ");
					document.getElementById("modvers").appendChild(e);					
				}
				//let e = document.createElement("a");
				//e.href = "https://minecraft.gamepedia.com/" + mod.versions[i];
				//e.innerText = mod.versions[i];
				let e = document.createTextNode(mod.versions[i]);
				document.getElementById("modvers").appendChild(e);
			}
			if (!mod.apis || mod.apis.length === 0) {
				document.getElementById("modapis").innerText = "N/A";
			} else for (let i = 0; i < mod.apis.length; i++) {
				if (i > 0) {
					let e = document.createTextNode(", ");
					document.getElementById("modapis").appendChild(e);					
				}
				if (known_apis[mod.apis[i]]) {
					let e = document.createElement("a");
					e.href = known_apis[mod.apis[i]];
					e.innerText = mod.apis[i];
					document.getElementById("modapis").appendChild(e);					
				} else {
					let e = document.createTextNode(mod.apis[i]);
					document.getElementById("modapis").appendChild(e);	
				}
			}
			if (!mod.upstream) {
				document.getElementById("modurl").innerText = "N/A";
			} else {
				let e = document.createElement("a");
				e.href = mod.upstream;
				e.innerText = mod.upstream;
				document.getElementById("modurl").appendChild(e);				
			}
		} else {
			document.getElementById("mod").innerText = "Invalid mod identifier.";
		}
	}
}
	
window.addEventListener("load", init);