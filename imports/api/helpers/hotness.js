const hotness = (score, date) => {

    console.clear();
    console.log('')
    console.log('==NEW HOTNESS CALC==');

    let order = Math.log(Math.max(Math.abs(score), 1), 10)
    let sign = score > 0 ? 1 : score < 0 ? -1 : 0;
    console.log('score', score)

    console.log("Math.abs(score)", Math.abs(score));
    console.log("Math.max(Math.abs(score)", Math.max(Math.abs(score)));
    console.log("Math.log(Math.max(Math.abs(score), 1), 10)", Math.log(Math.max(Math.abs(score), 1), 10));

    console.log('order', order)
    console.log('sign', sign)

    let youpersFoundingDate = new Date(2017, 3, 1).getTime() / 1000;
    let articleCreationDate = new Date(date).getTime() / 1000;
    let seconds = articleCreationDate - youpersFoundingDate;
    console.log('1 jan 2018', youpersFoundingDate)
    console.log('articleCreationDate', articleCreationDate)
    console.log('seconds', seconds)

    console.log('sign * order + seconds', sign * order + seconds)
    console.log('sign * order + seconds / 45000', sign * order + seconds / 45000)

    let timeWindow = seconds / 45000;

    let hotness = (sign * order + timeWindow)
    console.log('hotness', hotness)

    let precision = 10000000;
    let roundedHotness = Math.round(hotness * precision) / precision
    console.log('roundedHotness', roundedHotness)
    return roundedHotness;
}

module.exports = hotness;