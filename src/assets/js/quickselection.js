let show_events_in_future_days = Math.min(localStorage.getItem("days_advanced") || 35, 300);

let selections = {
    "christmas_eve": {
        name: "🎄 Christmas Eve",
        date: "12/24",
        status: false
    },
    "christmas": {
        name: "🎄 Christmas",
        date: "12/25",
        status: false
    },
    "new_year": {
        name: "🎆 New Year",
        date: "01/01",
        status: false
    },
    "pridemonth": {
        name: "🏳️‍🌈 Pride Month",
        date: "06/01",
        status: false
    },
    "valentine": {
        name: "💖 Valentine's Day",
        date: "02/14",
        status: false
    },
    "easter": {
        name: "🐇 Easter",
        date: calculateEaster(),
        status: false
    },
    "st_patricks": {
        name: "☘️ St. Patrick's Day",
        date: "03/17",
        status: false
    },
    "thanksgiving": {
        name: "🦃 Thanksgiving",
        date: calculateThanksgiving(),
        status: false
    },
    "hanukkah": {
        name: "🕎 Hanukkah",
        date: calculateHanukkah(),
        status: false
    },
    "independence_day": {
        name: "Independence Day",
        date: "07/04",
        status: false
    },
    "groundhoog_day": {
        name: "🦦 Groundhog Day",
        date: "02/02",
        status: false
    }
}

let advanced_days_input = document.getElementById("advanced_days_input");

advanced_days_input.addEventListener("input", (e) => {
    console.log("Updated Number");
    let current = new Date();
    let value = e.target.value;
    localStorage.setItem("days_advanced", Math.min(value, 300));
    show_events_in_future_days = Math.min(value, 300);

    let parent = document.getElementById("quickselections");
    parent.replaceChildren();

    let days_in_advance = new Date().getTime() + (1000 * 60 * 60 * 24 * show_events_in_future_days);
    advanced_days_input.value = show_events_in_future_days;

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

        item.status = true;
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
});

window.addEventListener("load", function () {
    let current = new Date();
    let parent = document.getElementById("quickselections");
    let days_in_advance = new Date().getTime() + (1000 * 60 * 60 * 24 * show_events_in_future_days);
    advanced_days_input.value = show_events_in_future_days;

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

        item.status = true;
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
});

function checkStatus(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    date = `${month < 10 ? "0" + month : month}/${day < 10 ? "0" + day : day}`;
    Object.keys(selections).forEach(key => {
        let item = selections[key];
        if (item.status) {
            let element = document.getElementById(key);
            if (date === item.date) {
                element.classList.add("bg-blue-500", "text-white", "border-blue-500");
            } else {
                element.classList.remove("bg-blue-500", "text-white", "border-blue-500");
            }
        }
    });
}

function calculateEaster() {
    let year = new Date().getFullYear();
    var C = Math.floor(year / 100);
    var N = year % 19;
    var K = Math.floor((C - 17) / 25);
    var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
    I = I - 30 * Math.floor((I / 30));
    I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
    var J = year + Math.floor(year / 4) + I + 2 - C + Math.floor(C / 4);
    J = J - 7 * Math.floor(J / 7);
    var L = I - J;
    var month = 3 + Math.floor((L + 40) / 44);
    var day = L + 28 - 31 * Math.floor(month / 4);
    return `${month < 10 ? "0" + month : month}/${day < 10 ? "0" + day : day}`;
}

function calculateThanksgiving() {
    var currentYear = new Date().getFullYear();
    var thanksgiving = new Date(currentYear, 10, 1);
    var dayOfWeek = thanksgiving.getUTCDay();
    var daysToAdd = (dayOfWeek === 0) ? 7 : 4 - dayOfWeek;
    thanksgiving.setDate(thanksgiving.getDate() + daysToAdd);
    return (thanksgiving.getMonth() + 1) + '/' + thanksgiving.getDate();
}

function calculateHanukkah() {
    var currentYear = new Date().getFullYear();
    var hanukkah = new Date(currentYear, 10, 25);
    var dayOfWeek = hanukkah.getUTCDay();
    var daysToAdd = 6 - dayOfWeek;
    hanukkah.setDate(hanukkah.getDate() + daysToAdd);
    return (hanukkah.getMonth() + 1) + '/' + hanukkah.getDate();
}