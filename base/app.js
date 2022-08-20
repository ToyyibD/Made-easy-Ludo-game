// Storage Controller
const StorageCtrl = (function () {

  const storeJSON = function (key, data) {

    if (typeof data === 'object') {

      const dataX = JSON.stringify(data)

      localStorage.setItem(key, dataX)

    }

  }

  const retreiveJSON = function (key) {

    const data = localStorage.getItem(key)

    const dataX = JSON.parse(data)

    if (typeof dataX === 'object' && dataX !== null) {

      return dataX

    } else {

      return ''

    }

  }

  const storeData = function (key, data) {

    localStorage.setItem(key, data)

  }

  const retreiveData = function (key) {

    const data = localStorage.getItem(key)

    return data

  }

  return {

    retreiveJSON: (key) => retreiveJSON(key),

    retreiveData: (key) => retreiveData(key),

    storeJSON: (key, data) => storeJSON(key, data),

    storeData: (key, data) => storeData(key, data),

  }
})();


// Time Controller
const TimeCtrl = (function () {

  const getNoDays = function (number, year) {

    switch (number) {
      case 1:
        if (year) {

          if (year % 4 === 0) {

            return 29

          } else {

            return 28

          }

        } else {

          return 28

        }
        break

      case 4:
      case 0:
      case 2:
      case 6:
      case 7:
      case 9:
      case 11:
        return 31
        break;

      case 3:
      case 5:
      case 8:
      case 10:
        return 30
        break;

      default:
        break;
    }

  }

  const secondstoTimeStr = function (number, x) {

    let answer = number / 3600

    const hour = Math.floor(answer)

    answer = answer - hour

    answer = answer * 60

    const minute = Math.floor(answer)

    answer = answer - minute

    answer = answer * 60

    const second = Math.floor(answer)

    let stamp = hour >= 12 ? `pm` : `am`

    const newMinute = String(minute).length === 2 ? minute : `0${minute}`

    let newHour = hour > 12 ? (hour - 12) : hour

    newHour = hour === 0 ? 12 : newHour

    stamp = hour === 24 ? `am` : stamp

    return x === undefined ?
      `${newHour}:${newMinute}${stamp}` :
      `${newHour}:${newMinute}:${second}${stamp}`
  }

  const timeListToMilSeconds = function (theList) {

    theList.map((a) => {
      return isNaN(parseInt(a)) ? a : parseInt(a)
    })

    let milliSec = 0

    if (theList.length === 3) {

      milliSec += theList[0] * 60 * 60 * 1000

      milliSec += theList[1] * 60 * 1000

      milliSec += theList[2] * 1000

    } else {

      let hr

      if (theList[3] === 'am') {
        if (theList[0] === 12) {
          hr = 0
        } else {
          hr = theList[0]
        }
      } else {
        if (theList[0] === 12) {
          hr = 24
        } else {
          hr = theList[0] + 12
        }
      }

      milliSec += hr * 60 * 60 * 1000

      milliSec += theList[1] * 60 * 1000

      milliSec += theList[2] * 1000

    }

    const returnValue = milliSec

    return returnValue
  }

  const secondstoTimeList = function (number) {

    let answer = number / 3600

    const hour = Math.floor(answer)

    answer = answer - hour

    answer = answer * 60

    const minute = Math.floor(answer)

    answer = answer - minute

    answer = answer * 60

    const second = Math.floor(answer)

    return [hour, minute, second]
  }

  const timetoSeconds = function (theDate) {
    const dateArray = [
      theDate.getHours() * 3600,
      theDate.getMinutes() * 60,
      theDate.getSeconds()
    ]

    let answer = 0

    for (const item of dateArray) {
      answer += item
    }

    return answer
  }

  const getMonth = function (number) {

    switch (number) {
      case 0:
        return 'January'
        break;

      case 1:
        return 'February'
        break;

      case 2:
        return 'March'
        break;

      case 3:
        return 'April'
        break;

      case 4:
        return 'May'
        break;

      case 5:
        return 'June'
        break;

      case 6:
        return 'July'
        break;

      case 7:
        return 'August'
        break;

      case 8:
        return 'September'
        break;

      case 9:
        return 'October'
        break;

      case 10:
        return 'November'
        break;

      case 11:
        return 'December'
        break;

      default:
        break;
    }

  }

  const getMonthNumber = function (month) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',]

    return months.indexOf(month)
  }

  const makeCalender = function (date) {

    const today = new Date()

    const year = date.getFullYear()

    const month = TimeCtrl.getMonth(date.getMonth())

    const noOfDays = TimeCtrl.getNoDays(date.getMonth(), date.getFullYear())

    let firstDay = new Date(year, date.getMonth(), 1)

    firstDay = firstDay.getDay()

    let prevMonth = new Date(year, date.getMonth() - 1, date.getDate())

    prevMonth = TimeCtrl.getNoDays(prevMonth.getMonth(), prevMonth.getFullYear())

    let countStarted = 0;

    let countEnded = 'No';

    let daysCount = 0; let piece

    const makeCalende = function (date, datetr) {

      const tbody = document.createElement('tbody')

      let trow = document.createElement('tr')

      const makeTH = (list) => {

        for (let i = 0; i < list.length; i++) {

          const text = list[i];

          const th = document.createElement('th')

          th.appendChild(document.createTextNode(text))

          trow.appendChild(th)

        }

      }

      const makeTD = (text, clas) => {

        const td = document.createElement('td')

        td.appendChild(document.createTextNode(text))

        if (clas != undefined) {

          UICtrl.addClass(td, clas)

        }

        return td

      }

      makeTH(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])

      tbody.appendChild(trow)

      let calender = ``

      const row1 = document.createElement('tr')

      for (let j = 0; j < 7; j++) {

        const startCount = j >= firstDay ? 'yes' : 'no'

        if (j === firstDay) { countStarted = j }

        if (startCount === 'yes') {

          daysCount++

          if (daysCount === date) {

            row1.appendChild(makeTD(j + 1 - countStarted, 'active'))

          } else if (daysCount === datetr) {

            row1.appendChild(makeTD(j + 1 - countStarted, 'xactive'))

          } else {

            row1.appendChild(makeTD(j + 1 - countStarted))

          }

        } else {

          row1.appendChild(makeTD(prevMonth - firstDay + 1 + j, 'clouded before'))

        }

      }

      tbody.appendChild(row1)

      const row2 = document.createElement('tr')

      for (let j = 0; j < 7; j++) {

        daysCount++

        if (daysCount === date) {

          row2.appendChild(makeTD(daysCount, 'active'))

        } else if (daysCount === datetr) {

          row2.appendChild(makeTD(daysCount, 'xactive'))

        } else {

          row2.appendChild(makeTD(daysCount))

        }

      }

      tbody.appendChild(row2)

      const row3 = document.createElement('tr')

      for (let j = 0; j < 7; j++) {

        daysCount++

        if (daysCount === date) {

          row3.appendChild(makeTD(daysCount, 'active'))

        } else if (daysCount === datetr) {

          row3.appendChild(makeTD(daysCount, 'xactive'))

        } else {

          row3.appendChild(makeTD(daysCount))

        }
      }

      tbody.appendChild(row3)

      const row4 = document.createElement('tr')

      for (let j = 0; j < 7; j++) {

        daysCount++

        if (daysCount > noOfDays) { countEnded = 'Yes' }

        if (countEnded === 'Yes') {

          row4.appendChild(makeTD(daysCount - noOfDays, 'clouded after'))

        } else {

          if (daysCount === date) {

            row4.appendChild(makeTD(daysCount, 'active'))

          } else if (daysCount === datetr) {

            row4.appendChild(makeTD(daysCount, 'xactive'))

          } else {

            row4.appendChild(makeTD(daysCount))

          }
        }
      }

      tbody.appendChild(row4)

      if (daysCount < noOfDays) {

        const row5 = document.createElement('tr')

        for (let j = 0; j < 7; j++) {

          daysCount++

          if (daysCount > noOfDays) { countEnded = 'Yes' }

          if (countEnded === 'Yes') {

            row5.appendChild(makeTD(daysCount - noOfDays, 'clouded after'))

          } else {

            if (daysCount === date) {

              row5.appendChild(makeTD(daysCount, 'active'))

            } else if (daysCount === datetr) {

              row5.appendChild(makeTD(daysCount, 'xactive'))

            } else {

              row5.appendChild(makeTD(daysCount))

            }
          }
        }

        tbody.appendChild(row5)

      }

      if (daysCount < noOfDays) {

        const row6 = document.createElement('tr')

        for (let j = 0; j < 7; j++) {

          daysCount++

          if (daysCount > noOfDays) { countEnded = 'Yes' }

          if (countEnded === 'Yes') {

            row5.appendChild(makeTD(daysCount - noOfDays, 'clouded after'))

          } else {

            if (daysCount === date) {

              row5.appendChild(makeTD(daysCount, 'active'))

            } else if (daysCount === datetr) {

              row5.appendChild(makeTD(daysCount, 'xactive'))

            } else {

              row5.appendChild(makeTD(daysCount))

            }
          }
        }

        tbody.appendChild(row6)

      }

      return tbody

    }

    if (
      `${date.getFullYear() + ' ' + date.getMonth()}`
      ===
      `${today.getFullYear() + ' ' + today.getMonth()}`
    ) {

      piece = makeCalende(today.getDate(), date.getDate())

    } else {

      piece = makeCalende(0, date.getDate())

    }

    return {
      month: month,
      year: year,
      table: piece,
      info: [
        "It makes a calender simple",
        "The td with class xactive is the requested day",
        "The td with class active is the current day",
        "the td with class clouded is not in the current month",
        "The td with class after is in the next month",
        "The td with class before is in the previous month",
        "The month gives the month and the year gives the year",
        "Enjoy!"
      ]
    }

  }

  const addDateSuffix = function (dateX) {

    let date = dateX.toString()

    if (['11', '12', '13'].indexOf(date) !== -1) {
      date = date + 'th'
    } else if (date[date.length - 1] > '3') {
      date = date + 'th'
    } else if (date[date.length - 1] === '0') {
      date = date + 'th'
    } else if (date[date.length - 1] === '1') {
      date = date + 'st'
    } else if (date[date.length - 1] === '2') {
      date = date + 'nd'
    } else if (date[date.length - 1] === '3') {
      date = date + 'rd'
    }

    if (isNaN(parseInt(dateX))) { return dateX } else { return date }
  }

  const getDayNumber = function (day) {

    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednessday',
      'Thursday',
      'Friday',
      'Saturday'
    ]

    return days.indexOf(day)

  }

  const getDay = function (number) {

    num = parseInt(number)

    const days = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednessday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    }

    return days[num]

  }

  const datetoTimeStr = function (theDate) {

    const acSeconds = timetoSeconds(theDate)

    const acTime = secondstoTimeStr(acSeconds)

    return acTime

  }

  const datetoFullTimeStr = function (theDate) {

    const acSeconds = timetoSeconds(theDate)

    const acTime = secondstoTimeStr(acSeconds, 3)

    return acTime

  }

  const getLeisureDate = function (date, theDate) {

    let returnValue

    if (date.getTime() === theDate.getTime()) {

      returnValue = 'Now'

    } else if (theDate.getTime() > date.getTime()) {

      const beginDate = (
        new Date(date.getTime() - (TimeCtrl.timetoSeconds(date) * 1000))
      ).getTime() - 1000

      if (theDate.getTime() < (beginDate + 86400000)) {

        returnValue = 'Today'

      } else if (
        theDate.getTime() > (beginDate + 86400000) &&
        theDate.getTime() < (beginDate + (86400000 * 2))
      ) {

        returnValue = 'Tommorow'

      } else if (
        theDate.getTime() > (beginDate + (86400000 * 2)) &&
        theDate.getTime() < (beginDate + (86400000 * 3))
      ) {

        returnValue = 'Two Days'

      } else if (
        theDate.getTime() > (beginDate + (86400000 * 3)) &&
        theDate.getTime() < (beginDate + (86400000 * 4))
      ) {

        returnValue = 'Three Days'

      } else if (
        theDate.getTime() > (beginDate + (86400000 * 4)) &&
        theDate.getTime() < (beginDate + (86400000 * 5))
      ) {

        returnValue = 'Four Days'

      } else if (
        theDate.getTime() > (beginDate + (86400000 * 5)) &&
        theDate.getTime() < (beginDate + (86400000 * 6))
      ) {

        returnValue = 'Five Days'

      } else if (
        theDate.getTime() > (beginDate + (86400000 * 6)) &&
        theDate.getTime() < (beginDate + (86400000 * 7))
      ) {

        returnValue = 'Six Days'

      } else if (
        theDate.getTime() > (beginDate + (86400000 * 7)) &&
        theDate.getTime() < (beginDate + (86400000 * 14))
      ) {

        returnValue = 'Two Weeks'

      } else if (
        theDate.getTime() > (beginDate + (86400000 * 14)) &&
        theDate.getTime() < (beginDate + (86400000 * 21))
      ) {

        returnValue = 'Three Weeks'

      } else if (
        theDate.getTime() > (beginDate + (86400000 * 21)) &&
        theDate.getTime() < (beginDate + (86400000 * 28))
      ) {

        returnValue = 'Four Weeks'

      } else if (
        theDate.getTime() > (beginDate + (86400000 * 28))
      ) {

        returnValue = `${addDateSuffix(theDate.getDate())} ${getMonth(theDate.getMonth())}`

      } else {
        returnValue = `${addDateSuffix(theDate.getDate())} ${getMonth(theDate.getMonth())}`
      }


    } else if (theDate.getTime() < date.getTime()) {

      const beginDate = (
        new Date(date.getTime() - (TimeCtrl.timetoSeconds(date) * 1000))
      ).getTime() - 1000

      if (
        theDate.getTime() < (beginDate + 86400000) &&
        theDate.getTime() > (beginDate)
      ) {

        returnValue = 'Today'

      } else if (
        theDate.getTime() < (beginDate) &&
        theDate.getTime() > (beginDate - 86400000)
      ) {

        returnValue = 'Yesterday'

      } else if (
        theDate.getTime() < (beginDate - 86400000) &&
        theDate.getTime() > (beginDate - (86400000 * 2))
      ) {

        returnValue = 'Two Days Ago'

      } else if (
        theDate.getTime() < (beginDate - (86400000 * 2)) &&
        theDate.getTime() > (beginDate - (86400000 * 3))
      ) {

        returnValue = 'Three Days Ago'

      } else if (
        theDate.getTime() < (beginDate - (86400000 * 3)) &&
        theDate.getTime() > (beginDate - (86400000 * 4))
      ) {

        returnValue = 'Four Days Ago'

      } else if (
        theDate.getTime() < (beginDate - (86400000 * 4)) &&
        theDate.getTime() > (beginDate - (86400000 * 5))
      ) {

        returnValue = 'Five Days Ago'

      } else if (
        theDate.getTime() < (beginDate - (86400000 * 5)) &&
        theDate.getTime() > (beginDate - (86400000 * 6))
      ) {

        returnValue = 'Six Days Ago'

      } else if (
        theDate.getTime() < (beginDate - (86400000 * 6)) &&
        theDate.getTime() > (beginDate - (86400000 * 13))
      ) {

        returnValue = 'Two Weeks Ago'

      } else if (
        theDate.getTime() < (beginDate - (86400000 * 13)) &&
        theDate.getTime() > (beginDate - (86400000 * 20))
      ) {

        returnValue = 'Three Weeks Ago'

      } else if (
        theDate.getTime() < (beginDate - (86400000 * 20)) &&
        theDate.getTime() > (beginDate - (86400000 * 27))
      ) {

        returnValue = 'Four Weeks Ago'

      } else if (
        theDate.getTime() < (beginDate - (86400000 * 27))
      ) {

        returnValue = `${addDateSuffix(theDate.getDate())} ${getMonth(theDate.getMonth())}`

      } else {
        returnValue = `${addDateSuffix(theDate.getDate())} ${getMonth(theDate.getMonth())}`
      }


    } else {
      returnValue = `${addDateSuffix(theDate.getDate())} ${getMonth(theDate.getMonth())}`
    }

    return returnValue

  }

  const datetoDateStr = function (theDate) {

    return `${addDateSuffix(theDate.getDate())} of ${getMonth(theDate.getMonth())}, ${theDate.getFullYear()}`

  }

  const timeBetweenDatesW = function (date1, date2) {

    let returnValue

    const a = date1.getTime()

    const b = date2.getTime()

    const c = Math.abs(a - b)

    if (c <= 10000) {

      returnValue = ['Now', c]

    } else if (c > 10000 && c < 50000) {

      returnValue = [Math.floor(c / 1000) + 's', c]

    } else if (c >= 50000 && c <= 3540000) {

      returnValue = [Math.ceil(c / 60000) + 'm', c]

    } else if (c > 3540000 && c <= 82800000) {

      returnValue = [Math.ceil(c / 3600000) + 'h', c]

    } else if (c > 82800000 && c <= 604800000) {

      returnValue = [Math.ceil(c / 86400000) + 'd', c]

    } else {

      returnValue = [date2.toLocaleDateString(), c]

    }

    return returnValue

  }

  return {
    getNoDays: (number, year) => getNoDays(number, year),

    timeListToMilSeconds: (theList) => timeListToMilSeconds(theList),

    getDayNumber: (day) => getDayNumber(day),

    getLeisureDate: (date, theDate) => getLeisureDate(date, theDate),

    timeBetweenDatesW: (date1, date2) => timeBetweenDatesW(date1, date2),

    secondstoTimeStr: (number) => secondstoTimeStr(number),

    timetoSeconds: (theDate) => timetoSeconds(theDate),

    datetoTimeStr: (theDate) => datetoTimeStr(theDate),

    datetoFullTimeStr: (theDate) => datetoFullTimeStr(theDate),

    datetoDateStr: (theDate) => datetoDateStr(theDate),

    getMonth: (number) => getMonth(number),

    getDay: (number) => getDay(number),

    getMonthNumber: (month) => getMonthNumber(month),

    secondstoTimeList: (number) => secondstoTimeList(number),

    addDateSuffix: (dateX) => addDateSuffix(dateX),

    makeCalender: (date) => makeCalender(date)
  }

}())


//  WebSocket Controller
const WebSocketCtrl = (function () {

  const connect = (url) => {

    return new Promise(function (resolve, reject) {

      const server = new WebSocket(url)

      server.onopen = function () {

        resolve(server)

      }

      server.onclose = function (err) {

        reject(err)

      }

    })

  }

  const sendToUser = async (user, data) => {

    const protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';

    const host = window.location.host

    const url = `${protocol}${host}/ws/chatty_user/${user}/`

    // console.log(url);

    try {

      const userSocket = await connect(url)

      userSocket.send(JSON.stringify({ text: data }))

      userSocket.close()

      return { msg: 'Successful' }

    } catch (error) {

      return { error: error }

    }

  }


  return {

    sendToUser: (user, data) => sendToUser(user, data),

    sendToUserID: (id, data) => sendToUserID(id, data),

    sendToGroup: (group, data) => sendToGroup(group, data),

    connect: (url) => connect(url),

  }
})()


// Global Controller
const GlobalCtrl = (function () {

  return {

  }

})()


// API Controller
const APICtrl = (function () {

  const getRandomApi = async function (url) {

    const response = await fetch(url)

    const responseJson = await response.json()

    return responseJson
  }

  async function getAPI_Json(url) {

    let ment = await fetch(url)

    let cent = await ment.json()

    return cent

  }

  async function postAPI_JsonWithFile(url, data) {

    const formData = new FormData();

    for (const name in data) {

      formData.append(name, data[name]);

    }

    let ment = await fetch(url, {
      method: 'POST',
      headers: {
        "X-CSRFToken": SpecialCtrl.getCookie('csrftoken')
      },
      body: formData
    })

    let cent = await ment.json()

    return cent

  }

  async function postAPI_Json(url, data) {

    let ment = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        "X-CSRFToken": SpecialCtrl.getCookie('csrftoken')
      },
      body: JSON.stringify(data)
    })

    let cent = await ment.json()

    return cent

  }

  async function putAPI_Json(url, data) {

    let ment = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        "X-CSRFToken": SpecialCtrl.getCookie('csrftoken')
      },
      body: JSON.stringify(data)
    })

    let cent = await ment.json()

    return cent

  }

  async function putAPI_JsonWithFile(url, data) {

    const formData = new FormData();

    for (const name in data) {

      formData.append(name, data[name]);

    }

    let ment = await fetch(url, {
      method: 'PUT',
      headers: {
        "X-CSRFToken": SpecialCtrl.getCookie('csrftoken')
      },
      body: formData
    })

    let cent = await ment.json()

    return cent

  }

  async function deleteAPI_Json(url) {

    let ment = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        "X-CSRFToken": SpecialCtrl.getCookie('csrftoken')
      },
    })

    let cent = await 'Deleted Successfully...'

    return cent

  }


  return {

    getRandomApi: (url) => getRandomApi(url),

    getAPI_Json: (url) => getAPI_Json(url),

    postAPI_Json: (url, data) => postAPI_Json(url, data),

    postAPI_JsonWithFile: (url, data) => postAPI_JsonWithFile(url, data),

    putAPI_Json: (url, data) => putAPI_Json(url, data),

    putAPI_JsonWithFile: (url, data) => putAPI_JsonWithFile(url, data),

    deleteAPI_Json: (url) => deleteAPI_Json(url),

  }
})();


// Special Functions
const SpecialCtrl = (function () {

  const randomAmong = (num1, num2) => {

    return (Math.floor(Math.random() * (num2 - num1 + 1))) + num1

  }

  const chooseFrom = (arr) => {

    return arr[randomAmong(0, (arr.length - 1))]

  }

  const shuffle = (arr) => {

    let array = arr.slice()

    for (let i = array.length - 1; i > 0; i--) {

      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];

    }

    return array

  }

  const heightAspect = (element, ratio) => {

    window.addEventListener('resize', () => {

      element.style.height = (element.offsetWidth * ratio) + 'px'

      setTimeout(() => {

        element.style.height = (element.offsetWidth * ratio) + 'px'

      }, 500);

    })

  }

  const OHeightAspect = (element, ratio) => {

    element.style.height = (element.offsetWidth * ratio) + 'px'

  }

  const smallAspect = (element, ratio) => {

    window.addEventListener('resize', () => {

      element.style.height = null
      element.style.maxHeight = null
      element.style.width = null
      element.style.maxWidth = null

      setTimeout(() => {

        if (element.offsetWidth > element.offsetHeight) {

          element.style.width = (element.offsetHeight * ratio) + 'px'
          element.style.maxWidth = (element.offsetHeight * ratio) + 'px'

        } else {

          element.style.height = (element.offsetWidth * (1 / ratio)) + 'px'
          element.style.maxHeight = (element.offsetWidth * (1 / ratio)) + 'px'

        }

      }, 100);

    })

  }

  const OSmallAspect = (element, ratio) => {

    if (element.offsetWidth > element.offsetHeight) {

      element.style.width = (element.offsetHeight * ratio) + 'px'
      element.style.maxWidth = (element.offsetHeight * ratio) + 'px'

    } else {

      element.style.height = (element.offsetWidth * (1 / ratio)) + 'px'
      element.style.maxHeight = (element.offsetWidth * (1 / ratio)) + 'px'

    }

  }

  const addNumbers = (from, to, element, interval) => {

    element.innerHTML = from

    const add = from < to

    let inx = setInterval(() => {

      let newNumb

      if (parseInt(element.innerHTML) === to) { clearInterval(inx); newNumb = '`.-x-`.' }

      if (newNumb === '`.-x-`.') {

      } else if (add === true) {

        newNumb = parseInt(element.innerHTML) + 1

        element.innerHTML = newNumb

      } else {

        newNumb = parseInt(element.innerHTML) - 1

        element.innerHTML = newNumb

      }

    }, interval);

  }

  const addLetters = (phrase, element, interval, toNfro, end) => {

    element.innerHTML = ''

    let theText = element.innerHTML

    end = end === undefined ? '' : end

    let full = false

    const nphrase = phrase

    let number = 0

    let inx = setInterval(() => {

      let newPhrase

      if (element.innerHTML == (phrase + end)) { newPhrase = '`.-x-`.' }


      // Checks if the phrase has once been completed
      if (full === true) {

        full = true

      } else {

        if (newPhrase === '`.-x-`.') { full = true }

      }



      // Checks if another same operation is running and terminates older one
      let otherText = element.innerHTML; let over = false;

      if (full === false) {

        if (theText !== element.innerHTML) { clearInterval(inx); over = true; }

      }


      // Checks if dev wants it to go to and fro and if completed
      if (full === true && toNfro === 0) {

        clearInterval(inx);

      } else {

        // Check if first stage has completed
        if (full === false) {

          element.innerHTML = nphrase.slice(0, number) + end;

          number++

        } else {

          if (number > 0) {

            // Set timeout for second stage based on toNfro
            setTimeout(() => {

              number--

              if (number >= 0) {

                if (theText !== element.innerHTML) { clearInterval(inx); over = true; }

                otherText = element.innerHTML

                element.innerHTML = nphrase.slice(0, number) + end

                if (over === true) { element.innerHTML = otherText; }

                theText = element.innerHTML;

              }

              element.scrollLeft = 100000000

            }, toNfro);

          } else {

            clearInterval(inx)

          }

        }

      }

      if (full === false) {

        if (over === true) { element.innerHTML = otherText; }

        theText = element.innerHTML;

      }

      element.scrollLeft = 100000000

    }, interval);

  }

  const togglePassword = (passwordInput, toggler, state) => {

    if (state === "hover") {

      toggler.addEventListener('mouseover', () => {

        passwordInput.type = 'text'

      })

      toggler.addEventListener('mouseout', () => {

        passwordInput.type = 'password'

      })


    } else if (state === "click") {

      toggler.addEventListener("click", (e) => {

        e.preventDefault();

        if (passwordInput.type === "password") {

          passwordInput.type = 'text'

        } else {

          passwordInput.type = 'password'

        }


      })

    }

  }

  const getCookie = (name) => {

    let cookieValue = null;

    if (document.cookie && document.cookie !== '') {

      const cookies = document.cookie.split(';');

      for (const i = 0; i < cookies.length; i++) {

        const cookie = cookies[i].trim();

        // Does this cookie string begin with the name we want?

        if (cookie.substring(0, name.length + 1) === (name + '=')) {

          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));

          break;

        }

      }

    }

    return cookieValue;

  }

  const urlify = (text) => {

    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig

    return text.replace(urlRegex, function (url) {

      return '<a target="_blank" href="' + url + '">' + url + '</a>';

    })

  }

  const imageify = (text) => {

    var imageRegex = /(\(`\+img\+`\))(.*?)(\(`\-img\-`\))/ig

    return text.replace(imageRegex, function (url) {

      url = url.replaceAll(/(\(`\+img\+`\))/ig, '')
      url = url.replaceAll(/(\(`\-img\-`\))/ig, '')

      const num = url.search(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig)
      const num2 = url.search(/,/)

      console.log(url.slice(num));

      return '<img style="width: ' + url.slice(0, num2) + '%" src="' + url.slice(num - 5) + '">'

    })

  }

  const replaceAsync = async (str, regex, asyncFn) => {

    const promises = [];

    str.replace(regex, (match, ...args) => {

      const promise = asyncFn(match, ...args);

      promises.push(promise);

    });

    const data = await Promise.all(promises);

    return str.replace(regex, () => data.shift());

  }

  const getUsername = async (text) => {

    var urlRegex = /___ ([a-z0-9]){3,} ___/ig;

    const returnValue = await replaceAsync(text, urlRegex, async function (item) {

      const username = item.slice(4, item.length - 4)

      const url = window.location.protocol + '//' + window.location.host + `/api/chatty-users/username/${username}/`

      const chattyUser = await APICtrl.getAPI_Json(url)

      if (chattyUser.username == '') {

        return item

      } else {

        const url = window.location.protocol + '//' + window.location.host + `/dialogue/${username}`

        return `<a target="_blank" href="${url}">${username}</a>`;

      }


    })

    return returnValue

  }

  const copyText = (text) => {

    const textArea = document.createElement('textarea')

    textArea.style.position = 'fixed'

    textArea.style.top = '0'

    textArea.style.bottom = '0'

    textArea.style.width = '2rem'

    textArea.style.height = '2rem'

    textArea.style.padding = '0'

    textArea.style.border = 'none'

    textArea.style.outline = 'none'

    textArea.style.boxShadow = 'none'

    textArea.style.background = 'transparent'

    textArea.value = text

    document.body.appendChild(textArea)

    textArea.focus()

    textArea.select()

    document.execCommand('copy')

  }

  const insertAtCursor = (myField, myValue) => {

    //IE support

    if (document.selection) {

      myField.focus();

      sel = document.selection.createRange();

      sel.text = myValue;

    }

    //MOZILLA and others

    else if (myField.selectionStart || myField.selectionStart == '0') {

      var startPos = myField.selectionStart;

      var endPos = myField.selectionEnd;

      myField.value = myField.value.substring(0, startPos)

        + myValue

        + myField.value.substring(endPos, myField.value.length);

      myField.focus()

      myField.selectionStart = startPos + myValue.length;

      myField.selectionEnd = startPos + myValue.length;

    } else {

      myField.value += myValue;

    }

  }

  const requestFullScreen = element => {

    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;

    if (requestMethod) {

      requestMethod.call(element);

    } else if (typeof window.ActiveXObject !== "undefined") { // IE work

      var wscript = new ActiveXObject("WScript.Shell");

      if (wscript !== null) {

        wscript.SendKeys("{F11}");

      }

    }

    // document.exitFullscreen()  Use this to exit
  }

  const scrollThrough = (vertical, horisontal = 0) => {

    window.scrollBy({ top: vertical, left: horisontal, behavior: 'smooth' });

  }

  const magnifyingGlass = (img, zoom = 2) => {

    var glass, w, h, bw;

    /* Create magnifier glass: */
    glass = document.createElement("DIV");

    glass.setAttribute("class", "el-img-magnifier-glass");

    glass.style.zIndex = 1000

    /* Insert magnifier glass: */
    img.parentElement.insertBefore(glass, img);

    /* Set background properties for the magnifier glass: */

    glass.style.backgroundImage = "url('" + img.src + "')";

    glass.style.backgroundRepeat = "no-repeat";

    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";

    bw = 3;

    w = glass.offsetWidth / 2;

    h = glass.offsetHeight / 2;


    /* Execute a function when someone moves the magnifier glass over the image: */

    glass.addEventListener("mousemove", moveMagnifier);

    img.addEventListener("mousemove", moveMagnifier);


    /*and also for touch screens:*/

    glass.addEventListener("touchmove", moveMagnifier);

    img.addEventListener("touchmove", moveMagnifier);

    function moveMagnifier(e) {

      var pos, x, y;

      /* Prevent any other actions that may occur when moving over the image */

      e.preventDefault();

      /* Get the cursor's x and y positions: */

      pos = getCursorPos(e);

      x = pos.x;

      y = pos.y;

      /* Prevent the magnifier glass from being positioned outside the image: */

      if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }

      if (x < w / zoom) { x = w / zoom; }

      if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }

      if (y < h / zoom) { y = h / zoom; }

      /* Set the position of the magnifier glass: */

      glass.style.left = (x - w) + "px";

      glass.style.top = (y - h) + "px";

      /* Display what the magnifier glass "sees": */

      glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";

    }

    function getCursorPos(e) {

      var a, x = 0, y = 0;

      e = e || window.event;

      /* Get the x and y positions of the image: */

      a = img.getBoundingClientRect();

      /* Calculate the cursor's x and y coordinates, relative to the image: */

      x = e.pageX - a.left;

      y = e.pageY - a.top;

      /* Consider any page scrolling: */

      x = x - window.pageXOffset;

      y = y - window.pageYOffset;

      return { x: x, y: y };

    }


    // Info
    // The image MUST be encased in a container that contains nothing but the div

  }

  const autocompleteInput = (inputElement, autocompleteList, withInput = true) => {

    autocompleteList = autocompleteList.sort()

    /*the autocomplete function takes two arguments,
    
    the text field element and an array of possible autocompleted values:*/

    let currentFocus;

    /*execute a function when someone writes in the text field:*/


    inputElement.addEventListener("input", function (e) {

      var a, b, i, val = this.value;

      /*close any already open lists of autocompleted values*/

      closeAllLists();

      if (!val) { return false; }

      currentFocus = -1;

    })

    if (withInput) {

      inputElement.addEventListener("input", function (e) {

        var a, b, i, val = this.value;

        /*create a DIV element that will contain the items (values):*/

        a = document.createElement("DIV");

        a.setAttribute("id", this.id + "el-autocomplete-list");

        a.setAttribute("class", "el-autocomplete-items");

        /*append the DIV element as a child of the autocomplete container:*/

        this.parentNode.appendChild(a);

        /*for each item in the array...*/

        let existsList = []

        for (i = 0; i < autocompleteList.length; i++) {

          /*check if the item starts with the same letters as the text field value:*/

          let theItemStartsWith = false

          let theItemExists = autocompleteList[i].toUpperCase().indexOf(val.toUpperCase())

          theItemStartsWith = autocompleteList[i].toUpperCase().startsWith(val.toUpperCase())

          theItemExists = [theItemExists != -1, theItemExists]

          if (theItemStartsWith) {

            /*create a DIV element for each matching element:*/

            b = document.createElement("DIV");

            /*make the matching letters bold:*/

            b.innerHTML = "<strong>" + autocompleteList[i].substr(0, val.length) + "</strong>";

            b.innerHTML += autocompleteList[i].substr(val.length);

            /*insert a input field that will hold the current array item's value:*/

            b.innerHTML += "<input type='hidden' value='" + autocompleteList[i] + "'>";

            /*execute a function when someone clicks on the item value (DIV element):*/

            b.addEventListener("click", function (e) {

              /*insert the value for the autocomplete text field:*/

              inputElement.value = this.getElementsByTagName("input")[0].value;

              /*close the list of autocompleted values,
              
              (or any other open lists of autocompleted values:*/

              closeAllLists();

            });

            a.appendChild(b);

          } else if (theItemExists[0]) {

            /*create a DIV element for each matching element:*/

            b = document.createElement("DIV");

            /*make the matching letters bold:*/

            b.innerHTML = autocompleteList[i].substr(0, theItemExists[1]);

            b.innerHTML += "<strong>" + autocompleteList[i].substr(theItemExists[1], val.length) + "</strong>";

            b.innerHTML += autocompleteList[i].substr(val.length + theItemExists[1]);

            /*insert a input field that will hold the current array item's value:*/

            b.innerHTML += "<input type='hidden' value='" + autocompleteList[i] + "'>";

            /*execute a function when someone clicks on the item value (DIV element):*/

            b.addEventListener("click", function (e) {

              /*insert the value for the autocomplete text field:*/

              inputElement.value = this.getElementsByTagName("input")[0].value;

              /*close the list of autocompleted values,
            
              (or any other open lists of autocompleted values:*/

              closeAllLists();

            });

            existsList.push(b);

          }

        }

        existsList.forEach(item => {

          a.appendChild(item)

        })

      });

    }

    /*execute a function presses a key on the keyboard:*/

    inputElement.addEventListener("keydown", function (e) {

      var x = document.getElementById(this.id + "el-autocomplete-list");

      if (x) x = x.getElementsByTagName("div");

      if (e.keyCode == 40) {

        /*If the arrow DOWN key is pressed,
        
        increase the currentFocus variable:*/

        currentFocus++;

        /*and and make the current item more visible:*/

        addActive(x);

      } else if (e.keyCode == 38) { //up

        /*If the arrow UP key is pressed,
        
        decrease the currentFocus variable:*/

        currentFocus--;

        /*and and make the current item more visible:*/

        addActive(x);

      } else if (e.keyCode == 13) {

        /*If the ENTER key is pressed, prevent the form from being submitted,*/

        e.preventDefault();

        if (currentFocus > -1) {

          /*and simulate a click on the "active" item:*/

          if (x) x[currentFocus].click();

        }

      }

    });


    function addActive(x) {

      /*a function to classify an item as "active":*/

      if (!x) return false;

      /*start by removing the "active" class on all items:*/

      removeActive(x);

      if (currentFocus >= x.length) currentFocus = 0;

      if (currentFocus < 0) currentFocus = (x.length - 1);

      /*add class "el-autocomplete-active":*/

      x[currentFocus].classList.add("el-autocomplete-active");

    }

    function removeActive(x) {

      /*a function to remove the "active" class from all autocomplete items:*/

      for (var i = 0; i < x.length; i++) {

        x[i].classList.remove("el-autocomplete-active");

      }

    }

    function closeAllLists(elmnt) {

      /*close all autocomplete lists in the document,
      
      except the one passed as an argument:*/

      var x = document.getElementsByClassName("el-autocomplete-items");

      for (var i = 0; i < x.length; i++) {

        if (elmnt != x[i] && elmnt != inputElement) {

          x[i].parentNode.removeChild(x[i]);

        }

      }

    }

    /*execute a function when someone clicks in the document:*/

    document.addEventListener("click", function (e) {

      closeAllLists(e.target);

    });


    // Sample of Input event to use if you set withInput to false and set autocompleteList to the list
    /* theInputField.addEventListener("input", function (e) {
  
        autocompleteList = 
  
        const inputElement = e.currentTarget
  
        function closeAllLists(elmnt) {
  
          // close all autocomplete lists in the document,
          
          // except the one passed as an argument:
  
          var x = document.getElementsByClassName("el-autocomplete-items");
  
          for (var i = 0; i < x.length; i++) {
  
            if (elmnt != x[i] && elmnt != inputElement) {
  
              x[i].parentNode.removeChild(x[i]);
  
            }
  
          }
  
        }
  
        var a, b, i, val = this.value;
  
        create a DIV element that will contain the items (values):      a = document.createElement("DIV"
  
        a.setAttribute("id", this.id + "el-autocomplete-list");
  
        a.setAttribute("class", "el-autocomplete-items");
  
        // append the DIV element as a child of the autocomplete container:
  
        this.parentNode.appendChild(a);
  
        // for each item in the array...
  
        let existsList = []
  
        for (i = 0; i < autocompleteList.length; i++) {
  
          // check if the item starts with the same letters as the text field value:
  
          let theItemStartsWith = false
  
          let theItemExists = autocompleteList[i].toUpperCase().indexOf(val.toUpperCase())
  
          theItemStartsWith = autocompleteList[i].toUpperCase().startsWith(val.toUpperCase())
  
          theItemExists = [theItemExists != -1, theItemExists]
  
          if (theItemStartsWith) {
  
            // create a DIV element for each matching element:
  
            b = document.createElement("DIV");
  
            // make the matching letters bold:
  
            b.innerHTML = "<strong>" + autocompleteList[i].substr(0, val.length) + "</strong>";
  
            b.innerHTML += autocompleteList[i].substr(val.length);
  
            // insert a input field that will hold the current array item's value:
  
            b.innerHTML += "<input type='hidden' value='" + autocompleteList[i] + "'>";
  
            // execute a function when someone clicks on the item value (DIV element):
  
            b.addEventListener("click", function (e) {
  
              // insert the value for the autocomplete text field:
  
              inputElement.value = this.getElementsByTagName("input")[0].value;
  
              // close the list of autocompleted values,
          
              // (or any other open lists of autocompleted values:
  
              closeAllLists();
  
            });
  
            a.appendChild(b);
  
          } else if (theItemExists[0]) {
  
            // // create a DIV element for each matching element:
  
            b = document.createElement("DIV");
  
            // // make the matching letters bold:
  
            b.innerHTML = autocompleteList[i].substr(0, theItemExists[1]);
  
            b.innerHTML += "<strong>" + autocompleteList[i].substr(theItemExists[1], val.length) + "</strong>";
  
            b.innerHTML += autocompleteList[i].substr(val.length + theItemExists[1]);
  
            // // insert a input field that will hold the current array item's value:
  
            b.innerHTML += "<input type='hidden' value='" + autocompleteList[i] + "'>";
  
            // // execute a function when someone clicks on the item value (DIV element):
  
            b.addEventListener("click", function (e) {
  
              // // insert the value for the autocomplete text field:
  
              inputElement.value = this.getElementsByTagName("input")[0].value;
  
              // close the list of autocompleted values,
            
              // (or any other open lists of autocompleted values:
  
              closeAllLists();
  
            });
  
            existsList.push(b);
  
          }
  
        }
  
        existsList.forEach(item => {
  
          a.appendChild(item)
  
        })
  
      });
    
    */
  }


  return {

    smallAspect: (element, ratio) => smallAspect(element, ratio),

    OSmallAspect: (element, ratio) => OSmallAspect(element, ratio),

    randomAmong: (num1, num2) => randomAmong(num1, num2),

    chooseFrom: (arr) => chooseFrom(arr),

    shuffle: (arr) => shuffle(arr),

    getCookie: (name) => getCookie(name),

    urlify: (text) => urlify(text),

    imageify: (text) => imageify(text),

    requestFullScreen: (element) => requestFullScreen(element),

    copyText: (text) => copyText(text),

    getUsername: (text) => getUsername(text),

    insertAtCursor: (myField, myValue) => insertAtCursor(myField, myValue),

    magnifyingGlass: (img, zoom) => magnifyingGlass(img, zoom),

    replaceAsync: (str, regex, asyncFn) => replaceAsync(str, regex, asyncFn),

    scrollThrough: (vertical, horisontal) => scrollThrough(vertical, horisontal),

    heightAspect: (element, ratio) => heightAspect(element, ratio),

    OHeightAspect: (element, ratio) => OHeightAspect(element, ratio),

    addNumbers: (from, to, element, interval) => addNumbers(from, to, element, interval),

    addLetters: (phrase, element, interval, toNfro, end) => addLetters(phrase, element, interval, toNfro, end),

    togglePassword: (passwordInput, toggler, state) => togglePassword(passwordInput, toggler, state),

    autocompleteInput: (inputElement, autocompleteList, withInput) => autocompleteInput(inputElement, autocompleteList, withInput),
  }

})()


// Message Controller
const MessageCtrl = (function () {

  const sendMiniMessage = (message, time) => {

    UICtrl.UIVars.miniMessageContext.innerHTML = ''

    UICtrl.removeClass(UICtrl.UIVars.miniMessageHolder, 'show')

    UICtrl.addClass(UICtrl.UIVars.miniMessageHolder, 'show')

    UICtrl.UIVars.miniMessageContext.innerHTML = message

    let newTime = parseInt(time)

    newTime = newTime < 51000 ? newTime : 1000

    setTimeout(() => {

      UICtrl.UIVars.miniMessageContext.innerHTML = ''

      UICtrl.removeClass(UICtrl.UIVars.miniMessageHolder, 'show')

    }, newTime);

  }

  const sendSmallMessage = (message, time) => {

    removeSmallMessage()

    UICtrl.addClass(UICtrl.UIVars.smallMessageHolder, 'show')

    UICtrl.UIVars.smallMessageContext.innerHTML = message

    let newTime = parseInt(time)

    newTime = newTime < 71000 ? newTime : 1000

    setTimeout(() => {

      removeSmallMessage()

    }, newTime);

  }

  const removeSmallMessage = () => {

    UICtrl.UIVars.smallMessageContext.innerHTML = ''

    UICtrl.removeClass(UICtrl.UIVars.smallMessageHolder, 'show')

  }

  const sendNormalMessage = (message) => {

    removeNormalMessage()

    if (typeof (message) === 'object') {

      UICtrl.UIVars.normalMessageContext.appendChild(message)

    } else {

      UICtrl.UIVars.normalMessageContext.innerHTML = message
    }

    UICtrl.addClass(UICtrl.UIVars.normalMessageHolder, 'show')

  }

  const removeNormalMessage = () => {

    UICtrl.UIVars.normalMessageContext.innerHTML = ''

    UICtrl.removeClass(UICtrl.UIVars.normalMessageHolder, 'show')

  }

  const sendXMessage = (message) => {

    removeXMessage()

    if (typeof (message) === 'object') {

      UICtrl.UIVars.XMessageContext.appendChild(message)

    } else {

      UICtrl.UIVars.XMessageContext.innerHTML = message

    }

    UICtrl.addClass(UICtrl.UIVars.XMessageHolder, 'show')

  }

  const removeXMessage = () => {

    UICtrl.UIVars.XMessageContext.innerHTML = ''

    UICtrl.removeClass(UICtrl.UIVars.XMessageHolder, 'show')

  }


  return {

    sendMiniMessage: (message, time) => sendMiniMessage(message, time),

    sendSmallMessage: (message, time) => sendSmallMessage(message, time),

    removeSmallMessage: () => removeSmallMessage(),

    sendNormalMessage: (message) => sendNormalMessage(message),

    removeNormalMessage: () => removeNormalMessage(),

    sendXMessage: (message) => sendXMessage(message),

    removeXMessage: () => removeXMessage(),

  }

})()


// UI Controller
const UICtrl = (function () {

  const findElement = function (tag) {

    return document.querySelector(tag)

  }

  const findElements = function (tag) {

    return Array.from(document.querySelectorAll(tag))

  }

  const findBy = function (element, tag) {

    return element.querySelector(tag)

  }

  const findsBy = function (element, tag) {

    return Array.from(element.querySelectorAll(tag))

  }

  const addClass = function (element, clas) {

    const classList = clas.split(" ")

    classList.forEach(item => {

      element.classList.add(item)

    })

  }

  const createElement = function (emmet, innerContent) {

    let info1 = emmet.split(".")

    const returnValue = document.createElement(info1[0])

    info1.forEach((item, index) => {

      if (index > 0) {

        item.split('#').forEach((item, index) => {

          if (index == 0) {

            addClass(returnValue, item)

          } else {

            returnValue.id = item

          }

        })

      }

    })

    innerContent = innerContent == undefined ? '' : innerContent

    returnValue.innerHTML = innerContent

    return returnValue

  }

  const toggleClass = function (element, clas) {

    if (element.classList.contains(clas)) {
      removeClass(element, clas)
    } else {
      addClass(element, clas)
    }

  }

  const toggleWithDocument = function (clicker, element, clas) {

    clicker.addEventListener('click', (e) => {

      const theFunc = function () {

        removeClass(element, clas)

        document.removeEventListener('click', theFunc)

      }

      if (element.classList.contains(clas)) {

        theFunc()

      } else {

        addClass(element, clas)

        setTimeout(() => {

          document.addEventListener('click', theFunc)

        }, 10);

      }

    })

  }

  const removeClass = function (element, clas) {
    element.classList.remove(clas)
  }

  const transitionSroll = function (item, clicker, seconds) {

    clicker.addEventListener('click', () => {

      const normHeight = item.scrollHeight

      const actualHeight = item.clientHeight

      item.style.overflow = `hidden`

      if (actualHeight === 0) {

        item.style.transition = `height ${seconds}s`

        item.style.height = `${normHeight}px`

        setTimeout(() => {

          item.style.height = `auto`

        }, seconds * 1000);

      } else {

        item.style.height = `${normHeight}px`

        setTimeout(() => {

          item.style.transition = `height ${seconds}s`

          item.style.height = `0px`

        }, 10);

      }

    })

  }

  const tabilize = function (tabHolder, elemHolder, tabName, elemName) {

    const tabChildren = tabHolder.children

    const elementChildren = elemHolder.children

    tabHolder.addEventListener('click', (e) => {

      if (e.target.classList.contains(tabName)) {

        const caughtNum = `${elemName}-${e.target.id.split('-')[1]}`

        for (let i = 0; i < tabChildren.length; i++) {
          const element = tabChildren[i];

          removeClass(element, 'active')

        }

        addClass(e.target, 'active')

        for (let i = 0; i < elementChildren.length; i++) {
          const element = elementChildren[i];

          removeClass(element, 'show')

          if (element.id === caughtNum) {
            addClass(element, 'show')
          }
        }
      }

    })

  }

  const dragElement = function (elmnt) {

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    if (findElement(elmnt.id + "-dragger")) {

      // if present, the header is where you move the DIV from:

      findElement(elmnt.id + "-dragger").style.cursor = 'move'

      findElement(elmnt.id + "-dragger").onmousedown = dragMouseDown;

    } else {

      // otherwise, move the DIV from anywhere inside the DIV:

      elmnt.style.cursor = 'move'

      elmnt.onmousedown = dragMouseDown;

    }

    function dragMouseDown(e) {

      e = e || window.event;

      e.preventDefault();

      // get the mouse cursor position at startup:

      pos3 = e.clientX;

      pos4 = e.clientY;

      document.onmouseup = closeDragElement;

      // call a function whenever the cursor moves:

      document.onmousemove = elementDrag;

    }

    function elementDrag(e) {

      e = e || window.event;

      e.preventDefault();

      // calculate the new cursor position:

      pos1 = pos3 - e.clientX;

      pos2 = pos4 - e.clientY;

      pos3 = e.clientX;

      pos4 = e.clientY;

      // set the element's new position:

      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";

      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    }

    function closeDragElement() {

      // stop moving when mouse button is released:

      document.onmouseup = null;

      document.onmousemove = null;

    }

    // It modifies only top and left values

  }

  const UIVars = {

    // Rest Elements
    body: findElement('body'),
    html: findElement('html'),

    // Message
    miniMessageHolder: findElement('.mini-message-holder'),
    miniMessageContext: findElement('.mini-message-holder .message-context'),

    smallMessageHolder: findElement('.small-message-holder'),
    smallMessageContext: findElement('.small-message-holder .message-context'),
    smallMessageCancel: findElement('.small-message-holder .cancel-x'),

    normalMessageHolder: findElement('.normal-message-holder'),
    normalMessageContext: findElement('.normal-message-holder .message-context'),
    normalMessageCancel: findElement('.normal-message-holder .cancel-x'),

    XMessageHolder: findElement('.x-message-holder'),
    XMessageContext: findElement('.x-message-holder .message-context'),

    // Footer Elements
    contactButton: findElement('#foot-contact'),
    footerSVGS: findElement('.footer-svgs'),

    // Board
    boardHolder: findElement('.board-holder'),
  }

  return {

    UIVars: UIVars,

    findElement: (tag) => findElement(tag),

    findBy: (element, tag) => findBy(element, tag),

    findsBy: (element, tag) => findsBy(element, tag),

    findElements: (tag) => findElements(tag),

    dragElement: (element) => dragElement(element),

    addClass: (element, clas) => addClass(element, clas),

    createElement: (emmet, innerContent) => createElement(emmet, innerContent),

    toggleClass: (element, clas) => toggleClass(element, clas),

    removeClass: (element, clas) => removeClass(element, clas),

    toggleWithDocument: (clicker, element, clas) =>
      toggleWithDocument(clicker, element, clas),

    tabilize: (tabHolder, elemHolder, tabName, elemName) =>
      tabilize(tabHolder, elemHolder, tabName, elemName),

    transitionSroll: (item, clicker, seconds) =>
      transitionSroll(item, clicker, seconds)

  }
})()


// UI Variables
const UIVariables = {

  // Rest Elements
  body: UICtrl.findElement('body'),

  html: UICtrl.findElement('html'),

  bigWrapper: UICtrl.findElement('.big-wrapper'),


  // Message
  miniMessageHolder: UICtrl.findElement('.mini-message-holder'),

  miniMessageContext: UICtrl.findElement('.mini-message-holder .message-context'),


  smallMessageHolder: UICtrl.findElement('.small-message-holder'),

  smallMessageContext: UICtrl.findElement('.small-message-holder .message-context'),

  smallMessageCancel: UICtrl.findElement('.small-message-holder .cancel-x'),


  normalMessageHolder: UICtrl.findElement('.normal-message-holder'),

  normalMessageContext: UICtrl.findElement('.normal-message-holder .message-context'),

  normalMessageCancel: UICtrl.findElement('.normal-message-holder .cancel-x'),


  XMessageHolder: UICtrl.findElement('.x-message-holder'),

  XMessageContext: UICtrl.findElement('.x-message-holder .message-context'),

  // Nav Elements
  nav: UICtrl.findElement('nav'),


  // Footer Elements
  footer: UICtrl.findElement('footer'),

  contactButton: UICtrl.findElement('#foot-contact'),

  footerSVGS: UICtrl.findElement('.footer-svgs'),

}


// App Controller
const App = (function (UICtrl, APICtrl, GlobalCtrl, SpecialCtrl, WebSocketCtrl, MessageCtrl) {

  const loadEventListeners = function () {

    UIVariables.smallMessageCancel.addEventListener('click', () => {

      MessageCtrl.removeSmallMessage()

    })

    UIVariables.normalMessageCancel.addEventListener('click', () => {

      MessageCtrl.removeNormalMessage()

    })

    UIVariables.normalMessageHolder.addEventListener('click', e => {

      if (e.target.classList.contains('normal-message-holder')) {

        MessageCtrl.removeNormalMessage()

      }

    })

  }

  const loadInit = async function () {

  }

  const coreInit = function () {

    // Handle Scroll Animations
    const animateScrollItems = () => {

      const theElements = UICtrl.findElements(".animate-me")

      theElements.forEach(item => {

        if (item.getBoundingClientRect().y - window.innerHeight < 0) {

          let clas = Array.from(item.classList)

          clas = clas.filter(a => {

            if (/^animate-/.test(a) && !/e-me$/.test(a)) {

              return a

            }

          })

          UICtrl.addClass(item, clas[0].slice(8))

          UICtrl.removeClass(item, 'animate-me')

        }

        a = item

      })

      window.addEventListener('scroll', e => {

        theElements.forEach(item => {

          if (item.getBoundingClientRect().y - window.innerHeight < 0) {

            let clas = Array.from(item.classList)

            clas = clas.filter(a => {

              if (/^animate-/.test(a) && !/e-me$/.test(a)) {

                return a

              }

            })

            UICtrl.addClass(item, clas[0].slice(8))

            UICtrl.removeClass(item, 'animate-me')

          }

          a = item

        })

      })


      // How It Works!!!

      // 1. Create the animation keyframe in the css file

      // 2. The animation name must begin with scroll-

      // 3. Create the animation style

      // 4. The style class name must be the same as the keyframe name

      // 5. Create another css animation style of {animate-(animation_name).animate-me}

      // 6. This style is given the initial appearance of the animation

      // 7. The element to be animated must have the class animate-me

      // 8. The element to be animated must have the class animate-(animation_name)

      // 9. The Javascript will handle the rest

      // 10. Then enjoy your animation
    }


    // Handle Nav Hams
    const haminizeNavs = () => {

      const allNavs = UICtrl.findElements('.el-nav-holder')

      allNavs.forEach(item => {

        item.addEventListener('click', (e) => {

          const navHolder = e.currentTarget

          if (navHolder.classList.contains('change-to-x')) {

            navHolder.classList.add("change-to-def");

            navHolder.classList.remove("change-to-x");

          } else {

            navHolder.classList.add("change-to-x");

            navHolder.classList.remove("change-to-def");

          }


        })

      })

      //              Info

      // 1. Give it a class of "el-nav-holder"
      // 2. Put three divs of classes bar-1, bar-2, bar-3
    }


    // Set Footer Display
    const footerDisplayer = () => {

      UICtrl.toggleWithDocument(UIVariables.contactButton, UIVariables.footerSVGS, 'show')

    }


    // Smooth Link Scrolling
    const linkScroller = () => {

      const allLinks = UICtrl.findElements('a')

      allLinks.forEach(item => {

        item.addEventListener('click', e => {

          const target = e.currentTarget

          if (target.hash !== "") {

            e.preventDefault()

            let hash = target.hash

            UICtrl.findElement(hash).scrollIntoView({

              behavior: 'smooth'

            })

          }

        })

      })

    }


    // Handle all Accordions
    const accordinate = () => {

      const accElements = UICtrl.findElements(".el-accordion")

      accElements.forEach(item => {

        const content = UICtrl.findElement('#' + item.id + '-el-accord')

        content.style.transition = "max-height 0.2s ease-out"

        content.style.overflow = "hidden"

        if (content.dataset.status == 'hidden') {

          content.style.maxHeight = "0px"

        } else {

          content.style.maxHeight = content.scrollHeight + "px";

        }

        item.addEventListener("click", e => {

          const target = e.currentTarget

          UICtrl.toggleClass(target, 'active')

          const panel = UICtrl.findElement('#' + target.id + '-el-accord');

          if (panel.dataset.status == 'hidden') {

            panel.style.maxHeight = panel.scrollHeight + "px";

            panel.dataset.status = 'visible'

          } else {

            panel.style.maxHeight = '0';

            panel.dataset.status = 'hidden'

          }

        });

      })

      // Info
      // 1. Give the clicker a class of "el-accordion"
      // 2. Give the clicker an id
      // 3. Give the content/panel an id of "<clicker_id>-el-accord"
      // 4. Add this to the content/panel -> "data-status="hidden"" if you want it to be hidden at first
      // 4. Add this to the content/panel -> "data-status="visible"" if you want it to be visible at first
    }


    // Handle Custom Select
    const customSelect = () => {

      var x, i, j, l, ll, selElmnt, a, b, c;

      /* Look for any elements with the class "el-custom-select": */

      x = document.getElementsByClassName("el-custom-select");

      l = x.length;

      for (i = 0; i < l; i++) {

        selElmnt = x[i].getElementsByTagName("select")[0];

        ll = selElmnt.length;

        /* For each element, create a new DIV that will act as the selected item: */

        a = document.createElement("DIV");

        a.setAttribute("class", "el-select-selected");

        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;

        x[i].appendChild(a);

        /* For each element, create a new DIV that will contain the option list: */

        b = document.createElement("DIV");

        b.setAttribute("class", "el-select-items el-select-hide");

        for (j = 1; j < ll; j++) {

          /* For each option in the original select element,
          
          create a new DIV that will act as an option item: */

          c = document.createElement("DIV");

          c.innerHTML = selElmnt.options[j].innerHTML;

          c.addEventListener("click", function (e) {

            /* When an item is clicked, update the original select box,
            
            and the selected item: */

            var y, i, k, s, h, sl, yl;

            s = this.parentNode.parentNode.getElementsByTagName("select")[0];

            sl = s.length;

            h = this.parentNode.previousSibling;

            for (i = 0; i < sl; i++) {

              if (s.options[i].innerHTML == this.innerHTML) {

                s.selectedIndex = i;

                h.innerHTML = this.innerHTML;

                y = this.parentNode.getElementsByClassName("el-same-as-selected");

                yl = y.length;

                for (k = 0; k < yl; k++) {

                  y[k].removeAttribute("class");

                }

                this.setAttribute("class", "el-same-as-selected");

                break;

              }

            }

            h.click();

          });

          b.appendChild(c);

        }

        x[i].appendChild(b);

        a.addEventListener("click", function (e) {

          /* When the select box is clicked, close any other select boxes,
          
          and open/close the current select box: */

          e.stopPropagation();

          closeAllSelect(this);

          this.nextSibling.classList.toggle("el-select-hide");

          this.classList.toggle("el-select-arrow-active");

        });

      }

      function closeAllSelect(elmnt) {

        // A function that will close all select boxes in the document,

        // except the current select box

        var x, y, i, xl, yl, arrNo = [];

        x = document.getElementsByClassName("el-select-items");

        y = document.getElementsByClassName("el-select-selected");

        xl = x.length;

        yl = y.length;

        for (i = 0; i < yl; i++) {

          if (elmnt == y[i]) {

            arrNo.push(i)

          } else {

            y[i].classList.remove("el-select-arrow-active");

          }

        }

        for (i = 0; i < xl; i++) {

          if (arrNo.indexOf(i)) {

            x[i].classList.add("el-select-hide");

          }

        }

      }

      /* If the user clicks anywhere outside the select box,
      then close all select boxes: */
      document.addEventListener("click", closeAllSelect);

    }


    // Handle Including HTML
    const includeHTML = () => {

      var z, i, elmnt, file, xhttp;

      /* Loop through a collection of all HTML elements: */

      z = document.getElementsByTagName("*");

      for (i = 0; i < z.length; i++) {

        elmnt = z[i];

        /*search for elements with a certain atrribute:*/

        file = elmnt.getAttribute("el-include-html");

        if (file) {

          /* Make an HTTP request using the attribute value as the file name: */

          xhttp = new XMLHttpRequest();

          xhttp.onreadystatechange = function () {

            if (this.readyState == 4) {

              if (this.status == 200) { elmnt.innerHTML = this.responseText; }

              if (this.status == 404) { elmnt.innerHTML = "Page not found."; }

              /* Remove the attribute, and call this function once more: */

              elmnt.removeAttribute("w3-include-html");

              includeHTML();

            }

          }

          xhttp.open("GET", file, true);

          xhttp.send();

          /* Exit the function: */

          return;

        }

      }

      // give the element the attribute "el-include-html="<html_link_to_be_included>""

    }


    animateScrollItems(); haminizeNavs()

    footerDisplayer(); linkScroller()

    accordinate(); customSelect()

    includeHTML();
  }

  return {
    init: () => {

      loadEventListeners()

      coreInit()

      loadInit()

      console.log('Application is successfully running...')

    }
  }
})
  (UICtrl, APICtrl, GlobalCtrl, SpecialCtrl, WebSocketCtrl, MessageCtrl)


// Initialize Application
document.addEventListener('DOMContentLoaded', App.init)