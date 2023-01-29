const datepicker = document.getElementById("date");
const timepicker = document.getElementById("time");

datepicker.addEventListener("input", () => {
    updateTimes();
})
timepicker.addEventListener("input", () => {
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
        stamp: "<t:stamp:R>",
        display: { style: `long`, }
    },
    'short_time': {
        stamp: "<t:stamp:t>",
        display: { timeStyle: 'short' }
    },
    'long_time': {
        stamp: "<t:stamp:T>",
        display: { timeStyle: 'medium' }
    },
    'short_date': {
        stamp: "<t:stamp:d>",
        display: { dateStyle: 'short' }
    },
    'long_date': {
        stamp: "<t:stamp:D>",
        display: { dateStyle: 'long' }
    },
    'long_date_short_time': {
        stamp: "<t:stamp:f>",
        display: { dateStyle: 'long', timeStyle: 'short' }
    },
    'long_date_weekday_short_time': {
        stamp: "<t:stamp:F>",
        display: { dateStyle: 'full', timeStyle: 'short' }
    }
}

window.addEventListener("load", function () {
    let now = new Date();
    datepicker.value = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    timepicker.value = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    let selections = document.getElementById("selections");
    Object.keys(timestamps).forEach(key => {
        let element = document.getElementById(key);
        element.addEventListener("click", async () => {
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
});

function updateTimes() {
    const selectedDate = new Date(datepicker.valueAsNumber + timepicker.valueAsNumber + new Date().getTimezoneOffset() * 60000);
    Object.keys(timestamps).forEach(key => {
        if (key === 'relative') {
            updateRelative(key)
        } else {
            let formatter = new Intl.DateTimeFormat(navigator.language || 'en', timestamps[key].display || {});
            document.getElementById(key).firstElementChild.textContent = formatter.format(selectedDate);
        }
    })
    checkStatus(selectedDate);
}

function updateRelative(key) {
    const selectedDate = new Date(datepicker.valueAsNumber + timepicker.valueAsNumber + new Date().getTimezoneOffset() * 60000);
    let formatter = new Intl.RelativeTimeFormat(`en`, timestamps[key].display);
    let format = automaticRelativeDifference(selectedDate);
    document.getElementById(key).firstElementChild.textContent = formatter.format(format.duration, format.unit);
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
            updateRelative("relative");
        }, 1000);
    }
    return { duration: parseInt(diff), unit: 'seconds' };
}