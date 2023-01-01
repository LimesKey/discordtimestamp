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
    document.getElementById(id).classList.toggle("flex");
    document.getElementById(id).classList.toggle("hidden");
    sidebars.forEach(item => {
        if (item.id === id) {
            item.status = !item.status;
        }
    })
}