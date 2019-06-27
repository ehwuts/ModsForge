
function init() {
	if (typeof mods === "undefined") {
		document.getElementById("data").addEventListener("load", init);
	} else {
		let limits = {
			"name": 20,
			"description": 70,
			"versions": 4,
			"apis": 2
		};
		let listings = document.getElementById("listings");
		let k = Object.keys(mods);
		for (let i = 0; i < k.length; i++) {
			let row = document.createElement("div");
			row.id = k[i];
			row.className = "mod";
			
			let name = document.createElement("div");
			name.innerText = mods[k[i]].name;
			if (name.innerText.length > limits.name) {
				name.innerText = name.innerText.substring(0, limits.name - 3) + "...";
			}
			row.appendChild(name);
			
			let description = document.createElement("div");
			description.innerText = mods[k[i]].description; 
			if (description.innerText.length > limits.description) {
				description.innerText = description.innerText.substring(0, limits.description - 3) + "...";
			}
			row.appendChild(description);
			
			let versions = document.createElement("div");
			versions.innerText = mods[k[i]].versions.slice(0, limits.versions).join(", ");
			if (mods[k[i]].versions.length > limits.versions) {
				versions.innerText += ", [..]";
			}
			row.appendChild(versions);
			
			let apis = document.createElement("div");
			apis.innerText = mods[k[i]].apis.slice(0, limits.apis).join(", ");
			if (mods[k[i]].apis.length > limits.apis) {
				apis.innerText += ", [..]";
			}
			row.appendChild(apis);
			
			listings.appendChild(row);
		}
	}
}

window.addEventListener("load", init);