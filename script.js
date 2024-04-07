const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

var button = document.querySelector('div button');
button.addEventListener('click', calculateAge);

document.querySelector('[name="day"]').addEventListener('focus', clear);
document.querySelector('[name="month"]').addEventListener('focus', clear);
document.querySelector('[name="year"]').addEventListener('focus', clear);

function calculateAge() {
    var day = parseInt(document.querySelector('[name="day"]').value);
    var month = parseInt(document.querySelector('[name="month"]').value);
    var year = parseInt(document.querySelector('[name="year"]').value);
    var date = [day, month, year];

    let yearCount = 0;
    let monthCount = 0;
    let dayCount = 0;

    if (dateEmpty(date) && dateValid(date)) {

        yearCount = currentYear - year;
        monthCount = currentMonth - month; 
        dayCount = currentDay - day; 

        console.log(currentYear, currentMonth, currentDay);
        console.log(yearCount, monthCount, dayCount);

        if (monthCount < 0 || (monthCount === 0 && dayCount < 0)) {
            yearCount--; 
            if (monthCount < 0) {
                monthCount += 12; 
            }
        }
        var previousMonthDate = new Date(currentYear, currentMonth - 1, day);
        dayCount = Math.floor((currentDate - previousMonthDate) / (1000 * 60 * 60 * 24));

        document.querySelector('.result #y').innerHTML = yearCount;
        document.querySelector('.result #m').innerHTML = monthCount;
        document.querySelector('.result #d').innerHTML = dayCount;
    }

    console.log(`day: ${day} month: ${month} year: ${year}`);
};

function dateEmpty(date) {
    let flag = true;

    if (isNaN(date[0])) {
        ErrorMessage('day', 'This field is required');
        flag = false;
    }
    if (isNaN(date[1])) {
        ErrorMessage('month', 'This field is required');
        flag = false;
    }
    if (isNaN(date[2])) {
        ErrorMessage('year', 'This field is required');
        flag = false;
    }

    return flag;
}

// function isValid(date) {
//     var day = date[0];
//     var month = date[1];
//     var year = date[2];
//     var flag = true;

//     var date = new Date(year, month-1, day);

//     if((date.getFullYear() === year) == false){
//         ErrorMessage('year', 'Must be a valid year');
//         flag = false;
//     }
//     if((date.getMonth() === month) == false){
//         ErrorMessage('month', 'Must be a valid month');
//         flag = false;
//     }
//     if((date.getDate() === day) == false){
//         ErrorMessage('day', 'Must be a valid day');
//         flag = false;
//     }

//     return flag;
// }

function dateValid(date) {
    let day = date[0];
    let month = date[1];
    let year = date[2];
    let flag = true;

    if (month > 12) {
        ErrorMessage('month', 'Must be a valid month');
        flag = false;
    }

    if (month == 2 && isLeapYear(year)) {
        if (day > 29) {
            ErrorMessage('day', 'Must be a valid day');
            flag = false;
        }
    }
    else {
        if (day > months[month - 1]) {
            ErrorMessage('day', 'Must be a valid day');
            flag = false;
        }
    }

    if (year === currentYear) {
        if (month === currentMonth) {
            if (day > currentDay) {
                ErrorMessage('day', 'Must be a valid day');
                flag = false;
            }
        }
        if (month > currentMonth) {
            ErrorMessage('month', 'Must be a valid month');
            flag = false;
        }
    }

    if (year > currentYear) {
        ErrorMessage('year', 'Must be a valid year');
        flag = false;
    }

    return flag;
}

function isLeapYear(year) {
    var date = new Date(year, 1, 29);
    return date.getDate() === 29;
}

function ErrorMessage(nameAttribute, message) {
    var error = document.querySelector(`.${nameAttribute} .error`);
    error.textContent = message;
    document.querySelector(`[name="${nameAttribute}"]`).style.cssText = 'border-color: hsl(0, 100%, 67%);';
    document.querySelector(`.${nameAttribute} label`).style.cssText = 'color: hsl(0, 100%, 67%);';
}

function clear() {
    var parent = this.parentNode;
    parent.querySelector('label').style.cssText = 'color: hsl(0, 1%, 44%);'
    parent.querySelector('input').style.cssText = 'border-color: hsl(0, 1%, 44%);';
    parent.querySelector('.error').textContent = '';

    document.querySelector('.result #y').innerHTML = '- -';
    document.querySelector('.result #m').innerHTML = '- -';
    document.querySelector('.result #d').innerHTML = '- -';
}
