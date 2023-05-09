const solution = function (timesheet, hourRate) {
    let salary = 0;
    for (let i = 0; i < timesheet.length; i++) {
        if (timesheet[i][0] === 'login'){
            let dateIn = new Date(timesheet[i][1])
            let dateOut = new Date(timesheet[i+1][1])
            console.log(dateIn, dateOut)
            if (Math.floor((dateOut - dateIn) / 3600000) > 12)
                return
            let from8to18 = !(dateIn.getHours() <= 8 && dateOut.getHours() < 8 || dateOut.getHours() > 18 && dateIn.getHours() > 18)
            let from18to23 = dateOut.getHours() > 18 || dateOut.getHours() <= 8 && dateIn >= 12
            let from23to8 = dateIn.getHours() === 23 || dateIn.getHours() < 8 || dateOut.getHours() <= 8;
            console.log(dateOut.getHours(), dateOut.getMinutes())
            console.log(dateIn.getHours(), dateIn.getMinutes())
            console.log(from8to18, from23to8, from18to23)
            if (from18to23) {
                if (dateIn.getHours() >= 18) {
                    salary += (dateOut.getHours() - dateIn.getHours()+ Math.floor((dateOut.getMinutes() - dateIn.getMinutes())/60))*hourRate*1.5
                }
                else if (dateOut.getHours() <= 8) { // DANGER 23:00 can happen
                    salary += 5*hourRate*1.5
                }
                else if (dateOut.getHours() >= 18) {
                    salary += (dateOut.getHours() - 18)*hourRate*1.5
                }
            }
            console.log(salary)
            if (from8to18) {
                if (dateIn.getHours()<8 && dateOut.getHours() <= 18) {
                    salary += (dateOut.getHours() - 8)*hourRate
                }
                else if (dateIn.getHours() >= 8 && dateOut >= 18) {
                    salary += (18 - dateIn.getHours()
                        - Math.ceil(dateIn.getMinutes()/60))*hourRate
                }
                else if (dateIn.getHours() >=8 && dateIn.getHours()<=18) {
                    salary += (dateOut.getHours() - dateIn.getHours()
                        + Math.floor((dateOut.getMinutes() - dateIn.getMinutes())/60))*hourRate
                }
                else {
                    salary += 10*hourRate
                }
            }
            console.log(salary)
            if (from23to8) {
                if (dateIn.getHours() === 23 && dateOut < 8) {
                    salary += (dateOut.getHours() + Math.ceil(dateOut.getMinutes() - dateIn.getMinutes()))*2*hourRate
                }
                else if (dateIn.getHours() === 23 && dateOut >=8) {
                    salary += (8 + Math.ceil(dateOut.getMinutes() - dateIn.getMinutes()))*2*hourRate
                }
                else if (dateOut.getHours() <= 8 && dateIn.getHours() <= 8) {
                    salary += (dateOut.getHours() - dateIn.getHours() + Math.ceil(dateOut.getMinutes() - dateIn.getMinutes()))*2*hourRate
                }
                else if (dateOut.getHours() >= 8) {
                    salary += (8 - dateIn.getHours() + Math.floor(-dateIn.getMinutes()/60))*2*hourRate
                }
                else if(dateIn.getHours() < 23 && dateOut.getHours() <=8) {
                    salary += (dateOut.getHours() + 1)*2*hourRate
                }
            }
        }
    }


    return salary
}

console.log(solution([['login', 1682377800000], ['logout', 1682414400000]], 100))