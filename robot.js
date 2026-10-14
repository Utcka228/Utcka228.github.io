/*====================================
РОБОТ ПОМОЩНИК
====================================*/

window.addEventListener("load", () => {

    const robot = document.getElementById("robotAssistant");
    const message = document.getElementById("robotMessage");

    setTimeout(() => {
        robot.classList.add("show");

        setTimeout(() => {
            message.classList.add("show");
        }, 800);

    }, 3000);

    setTimeout(() => {
        message.classList.remove("show");
    }, 10000);

    robot.querySelector("img").addEventListener("click", () => {

        message.innerHTML = `
            <strong>🚀 Запишись на занятие!</strong><
            Я помогу тебе стать инженером будущего!
        `;

        message.classList.add("show");
    });

});





