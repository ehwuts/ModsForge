var filterstring = "";
var filtertype = "all";

function trySort(e) {
	let column = e.target;
	//alert(e.target.innerText);
}

function tryFilter() {
	let newsearch = document.getElementById("search").value;
	let newsubsearch = document.getElementById("subsearch").value;
	
	if (newsearch !== filterstring || (newsubsearch !== filtertype && newsearch !== "")) {
		let k = Object.keys(mods);
		for (let i = 0; i < k.length; i++) {
			let matched = false;
			if (newsearch === "") {
				matched = true;
			} else {
				if (newsubsearch === "all" || newsubsearch === "apis") {
					for (let j = 0; j < mods[k[i]].apis.length; j++) {
						if (mods[k[i]].apis[j] === newsearch) {
							matched = true;
						}
					}
				}
				if (newsubsearch === "all" || newsubsearch === "versions") {
					for (let j = 0; j < mods[k[i]].versions.length; j++) {
						if (mods[k[i]].versions[j] === newsearch) {
							matched = true;
						}
					}
				}
				if (newsubsearch === "all" || newsubsearch === "description") {
					let desc = mods[k[i]].description.toLowerCase();
					let keywords = newsearch.toLowerCase().split(" ");
					let failed = false;
					for (let j = 0; j < keywords.length; j++) {
						if (desc.indexOf(keywords[j]) === -1) {
							failed = true;
							break;
						}
					}
					if (failed === false) {
						matched = true;
					}
				}
				if (newsubsearch === "all" || newsubsearch === "name") {
					let desc = mods[k[i]].name.toLowerCase();
					let keywords = newsearch.toLowerCase().split(" ");
					let failed = false;
					for (let j = 0; j < keywords.length; j++) {
						if (desc.indexOf(keywords[j]) === -1) {
							failed = true;
							break;
						}
					}
					if (failed === false) {
						matched = true;
					}
				}
			}
			
			if (matched) {
				document.getElementById(k[i]).classList.remove("hidden");
			} else {
				document.getElementById(k[i]).classList.add("hidden");
			}
		}
	}
	
	filterstring = newsearch;
	filtertype = newsubsearch;
}

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
			let namehref = document.createElement("a");
			namehref.href = "modsforgeview.html?m=" + k[i];
			namehref.innerText = mods[k[i]].name;
			if (namehref.innerText.length > limits.name) {
				namehref.innerText = namehref.innerText.substring(0, limits.name - 3) + "...";
			}
			name.appendChild(namehref);
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
		
		document.getElementById("search").onchange = tryFilter;
		document.getElementById("search").onkeyup = tryFilter;
		document.getElementById("subsearch").onchange = tryFilter;
		document.getElementById("subsearch").onkeyup = tryFilter;
		
		let columns = document.getElementsByClassName("sortable");
		for (let i = 0; i < columns.length; i++) {
			columns[i].onclick = trySort;
		}
	}
}

window.addEventListener("load", init);