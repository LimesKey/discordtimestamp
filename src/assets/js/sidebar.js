const get = document.getElementById.bind(document);
let sidebar = get("sidebar");
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

document.addEventListener("keydown", (evt) => {
    evt = evt || window.event;
    if (evt.key == "Escape") {
        sidebars.forEach(item => {
            if (item.status == true) {
                toggleBar(item.id)
            }
        })
    }
});

sidebar.addEventListener("click", (evt) => {
    sidebars.forEach(item => {
        if (evt.target.id == item.id) return;
        if (item.status == true) {
            toggleBar(item.id)
        }
    });
});

function toggleBar(id) {
    sidebars.forEach(item => {
        if (item.id === id) {
            if (item.status) {
                get(id).classList.add("animate-fly-out-left");
                setTimeout(() => {
                    get(id).classList.add("hidden");
                    sidebar.classList.add("hidden");
                }, 750);
            } else {
                document.getElementById(id).classList.remove("animate-fly-out-left", "hidden");
                sidebar.classList.remove("hidden");
            }
            item.status = !item.status;
        }
    })
}