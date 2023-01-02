let sidebars = [
    {
        id: "howto_deep",
        status: false,
    },
    {
        id: "howto",
        status: false,
    }
]

document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.key == "Escape") {
        sidebars.forEach(item => {
            if (item.status == true) {
                toggleBar(item.id)
            }
        })
    }
};

function toggleBar(id) {
    sidebars.forEach(item => {
        if (item.id === id) {
            if (item.status) {
                document.getElementById(id).classList.add("animate-fly-out-left");
                setTimeout(() => {
                    document.getElementById(id).classList.add("hidden");
                }, 750);
            } else {
                document.getElementById(id).classList.remove("animate-fly-out-left", "hidden");
            }
            item.status = !item.status;
        }
    })
}