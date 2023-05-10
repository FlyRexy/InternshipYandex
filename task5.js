const solution = async function (request, showSpinner, hideSpinner) {
    const startTime = Date.now();
    let showSpinnerTimeoutId = null;

    request()
        .then(() => {
            const endTime = Date.now();
            if (showSpinnerTimeoutId !== null) {
                clearTimeout(showSpinnerTimeoutId);
                if (endTime - startTime > 250)
                    hideSpinner()
            }
        });

    showSpinnerTimeoutId = setTimeout(() => {
        showSpinner();
    }, 250);

}
req = () => new Promise((resolve) => {
    setTimeout(() => {
        console.log('resolve')
        resolve();
    }, 300);
});
const sh = function () {
    console.log("show spinner")
}
const hh = function () {
    console.log("hide spinner")
}
solution(req, sh, hh)
