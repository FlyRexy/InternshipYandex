const solution = function(originalFunction, timeInterval, maxRequests) {
    let calls = [];
    let banned = new Set()
    return (ip, timestamp, ...args) => {
        // originalFunction(...args)
        if (banned.has(ip))
            return
        let ipCalls = calls.filter(call => call.ip === ip)
        calls.push({ip: ip, time: timestamp});
        let queries = ipCalls.reduce((acc, call) => Math.abs(call.time - timestamp) <= timeInterval ? acc + 1 : acc, 0)
        if (queries + 1 <= maxRequests)
            originalFunction(...args)
        else {
            banned.add(ip)
        }
    }
}
const originalFunction = function(userId) {
    console.log(`User with id ${userId} was successfully authenticated.`);
}

const limitedFunction = solution(originalFunction, 10, 2);
limitedFunction('192.168.1.1', 1, 11); // IP-адрес: 192.168.1.1, время: 1 секунда
limitedFunction('192.168.1.1', 2, 12); // IP-адрес: 192.168.1.1, время: 2 секунды
limitedFunction('192.168.1.1', 3, 13); // IP-адрес: 192.168.1.1, время: 3 секунды
limitedFunction('192.168.1.1', 4, 14); // IP-адрес: 192.168.1.1, время: 4 секунды
limitedFunction('192.168.1.1', 5, 15);