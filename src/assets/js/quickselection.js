let selections = {
    "christmas_eve": {
        name: "🎄 Christmas Eve",
        date: "12/24"
    },
    "christmas": {
        name: "🎄 Christmas",
        date: "12/25"
    },
    "new_year": {
        name: "🎆 New Year",
        date: "01/01"
    },
    "pridemonth": {
        name: "🏳️‍🌈 Pride Month",
        date: "06/01"
    },
    "valentine": {
        name: "💖 Valentine's Day",
        date: "02/14"
    },
    "easter": {
        name: "🐇 Easter",
        date: "04/09"
    },
    "st_patricks": {
        name: "☘️ St. Patrick's Day",
        date: "03/17"
    },
}

function quickselectionsetup() {
    let current = new Date();
    let parent = document.getElementById("quickselections");
    let days_in_advance = new Date().getTime() + (1000 * 60 * 60 * 24 * 35);

    Object.keys(selections).forEach(key => {
        let item = selections[key];

        let manuelldate = item.date.split("/");
        let month = parseInt(manuelldate[0]);
        let day = parseInt(manuelldate[1]);
        let year = new Date().getFullYear();

        if ((current.getMonth() + 1) > month || (current.getMonth() + 1) == month && current.getDate() > day) {
            year++
        }

        if (new Date(year, (month - 1), day) - days_in_advance > 0) {
            return;
        }

        let div = document.createElement("div");
        div.classList.add("border-2", "border-slate-700", "text-gray-400", "border-gray-600", "rounded-xl", "hover:bg-slate-600", "w-max", "p-2", "cursor-pointer", "select-none");
        div.id = key;
        div.innerText = selections[key].name;
        parent.appendChild(div);

        div.addEventListener("click", () => {
            datepicker.value = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
            timepicker.value = "00:00";
            updateTimes();
        });
    })
}