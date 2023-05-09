const solution = async function (request, showSpinner, hideSpinner) {
    const startTime = Date.now();
    let showSpinnerTimeoutId = null;

    // запускаем запрос и показываем спиннер, если запрос выполняется дольше, чем 250 мс
    const promise = request()
        .then((response) => {
            // вычисляем время выполнения запроса
            const endTime = Date.now();
            const elapsedTime = endTime - startTime;

            // отменяем таймаут показа спиннера, если он не был запущен
            if (showSpinnerTimeoutId !== null) {
                clearTimeout(showSpinnerTimeoutId);
            }

            hideSpinner()
        });

    // показываем спиннер, если запрос выполняется дольше, чем 250 мс
    showSpinnerTimeoutId = setTimeout(() => {
        showSpinner();
    }, 250);

    // возвращаем промис, который резолвится после окончания выполнения запроса
    return promise;

}
req = () => new Promise((resolve) => {
    setTimeout(() => {
        console.log('resolve')
        resolve();
    }, 100);
});
const sh = function () {
    console.log("show spinner")
}
const hh = function () {
    console.log("hide spinner")
}
solution(req, sh, hh)