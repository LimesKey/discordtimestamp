const datepicker = document.getElementById("date");
const timepicker = document.getElementById("time");

datepicker.addEventListener("change", () => {
    updateTimes();
})
timepicker.addEventListener("change", () => {
    updateTimes();
})
datepicker.addEventListener("click", (e) => {
    e.target.showPicker();
})
timepicker.addEventListener("click", (e) => {
    e.target.showPicker();
})

let timestamps = {
    'relative': {
        name: "Relative",
        stamp: "<t:stamp:R>",
        display: { style: `long`, }
    },
    'short_time': {
        name: "Short Time",
        stamp: "<t:stamp:t>",
        display: { timeStyle: 'short' }
    },
    'long_time': {
        name: "Long Time",
        stamp: "<t:stamp:T>",
        display: { timeStyle: 'medium' }
    },
    'short_date': {
        name: "Short Date",
        stamp: "<t:stamp:d>",
        display: { dateStyle: 'short' }
    },
    'long_date': {
        name: "Long Date",
        stamp: "<t:stamp:D>",
        display: { dateStyle: 'long' }
    },
    'long_date_short_time': {
        name: "Long Date with Short Time",
        stamp: "<t:stamp:f>",
        display: { dateStyle: 'long', timeStyle: 'short' }
    },
    'long_date_weekday_short_time': {
        name: "Long Date with Day of the Week, Short Time",
        stamp: "<t:stamp:F>",
        display: { dateStyle: 'full', timeStyle: 'short' }
    }
}

const onload = _ => {
    let now = new Date();
    datepicker.value = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    timepicker.value = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    let selections = document.getElementById("selections");
    Object.keys(timestamps).forEach(key => {
        let current = timestamps[key];
        let div = document.createElement("div");
        div.classList.add("w-2/3", "md:w-max", "p-7", "bg-slate-800", "rounded-lg", "cursor-pointer", "hover:scale-105", "hover:bg-slate-700", "transition-colors", "duration-300")
        div.id = key;
        let first = document.createElement("p");
        first.classList.add("text-center", "text-md", "bg-slate-700", "p-2", "rounded-lg", "font-semibold");
        div.appendChild(first);
        let second = document.createElement("p");
        second.classList.add("text-gray-400", "text-xs", "mt-1");
        div.appendChild(second);
        second.innerText = current.name;

        selections.appendChild(div);

        div.addEventListener("click", async () => {
            let selectedDate = new Date(datepicker.valueAsNumber + timepicker.valueAsNumber + new Date().getTimezoneOffset() * 60000);
            let ts = selectedDate.getTime().toString();
            await navigator.clipboard.writeText(timestamps[key].stamp.replace("stamp", `${ts.substr(0, ts.length - 3)}`));
            document.getElementById("notification").classList.toggle("hidden");
            setTimeout(() => {
                document.getElementById("notification").classList.toggle("hidden");
            }, 2000);
        });
    })
    updateTimes();
    // Setup QuickSelection Pins
    quickselectionsetup();
}
window.onload = onload;

function updateTimes() {
    const selectedDate = new Date(datepicker.valueAsNumber + timepicker.valueAsNumber + new Date().getTimezoneOffset() * 60000);
    Object.keys(timestamps).forEach(key => {
        if (key === 'relative') {
            let formatter = new Intl.RelativeTimeFormat(`en`, timestamps[key].display);
            let format = automaticRelativeDifference(selectedDate);
            document.getElementById(key).firstElementChild.textContent = formatter.format(format.duration, format.unit);
        } else {
            let formatter = new Intl.DateTimeFormat(navigator.language || 'en', timestamps[key].display || {});
            document.getElementById(key).firstElementChild.textContent = formatter.format(selectedDate);
        }
    })
}

// Calculate Time Left or Passed
function automaticRelativeDifference(d) {
    const diff = -((new Date().getTime() - d.getTime()) / 1000);
    const absDiff = Math.abs(diff);
    if (absDiff > 86400 * 30 * 10) {
        return { duration: Math.round(diff / (86400 * 365)), unit: 'years' };
    }
    if (absDiff > 86400 * 25) {
        return { duration: Math.round(diff / (86400 * 30)), unit: 'months' };
    }
    if (absDiff > 3600 * 21) {
        return { duration: Math.round(diff / 86400), unit: 'days' };
    }
    if (absDiff > 60 * 44) {
        return { duration: Math.round(diff / 3600), unit: 'hours' };
    }
    if (absDiff > 60) {
        return { duration: Math.round(diff / 60), unit: 'minutes' };
    }
    if (absDiff < 60) {
        setTimeout(() => {
            updateTimes();
        }, 1000);
    }
    return { duration: parseInt(diff), unit: 'seconds' };
}

// Toggle the HowTo Overlay to be Hidden or Shown
function togglehowto() {
    document.getElementsByTagName("howto")[0].classList.toggle("hidden");
    document.getElementsByTagName("main")[0].classList.toggle("blur-md");
}

document.onkeydown = function (e) {
    if (e.key == "Escape" && !document.getElementsByTagName("howto")[0].classList.contains("hidden")) {
        togglehowto();
    }
}