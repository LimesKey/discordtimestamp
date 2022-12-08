let currentyear = new Date().getFullYear();

let selections = {
    "christmas": {
        name: "🎄 Christmas",
        date: new Date(currentyear, 11, 24, 00, 00)
    },
    "new_year": {
        name: "🎆 New Year",
        date: new Date(currentyear, 11, 31, 00, 00)
    },
    "pridemonth": {
        name: "🏳️‍🌈 Pride Month",
        date: new Date(2023, 05, 01, 00, 00)
    },
    "valentine": {
        name: "💖 Valentine's Day",
        date: new Date(2023, 01, 14, 00, 00)
    },
    "easter": {
        name: "🐇 Easter",
        date: new Date(2023, 03, 09, 00, 00)
    },
    "st_patricks": {
        name: "☘️ St. Patrick's Day",
        date: new Date(2023, 02, 17, 00, 00)
    }
}

function quickselectionsetup() {
    let parent = document.getElementById("quickselections");
    let days_in_advance = new Date().getTime() + (1000 * 60 * 60 * 24 * 35);
    Object.keys(selections).forEach(key => {
        let item = selections[key];

        if (item.date.getTime() - days_in_advance > 0) {
            return;
        }

        let div = document.createElement("div");
        div.classList.add("border-2", "border-slate-700", "text-gray-400", "border-gray-600", "rounded-xl", "hover:bg-slate-600", "w-max", "p-2", "cursor-pointer", "select-none");
        div.id = key;
        div.innerText = selections[key].name;
        parent.appendChild(div);

        div.addEventListener("click", (event) => {
            let date = selections[event.target.id].date;
            datepicker.value = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            timepicker.value = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
            updateTimes();
        });
    })
}