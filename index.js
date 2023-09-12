function createEmployeeRecord(employArray){
    return {
        firstName: employArray[0],
        familyName: employArray[1],
        title: employArray[2],
        payPerHour: employArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}


function createEmployeeRecords(arrayOfArrays){
   return arrayOfArrays.map((employArray)=> createEmployeeRecord(employArray))
}


function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    const timeInEvent = {
      type: "TimeIn",
      date: date,
      hour: parseInt(hour)
    };
    employee.timeInEvents.push(timeInEvent);
  
    return employee;
  }


  function createTimeOutEvent(employee, dateStamp) {
    const [date, time] = dateStamp.split(" ");
    const timeOutEvent = {
        type: "TimeOut",
        date: date,
        hour: parseInt(time)
    };
    employee.timeOutEvents.push(timeOutEvent);

    return employee;
  }

  
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find((emp) => emp.date === date)
    const timeOut = employee.timeOutEvents.find((emp) => emp.date === date)
    const hoursWorked = (timeOut.hour - timeIn.hour)/100
    return hoursWorked
  }


  function wagesEarnedOnDate(employee, date){
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
  }


  function allWagesFor(employee) {
    const allDates = employee.timeInEvents.map((emp) => emp.date)
    return allDates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0)
  }

  function calculatePayroll(arrayOfEmployees) {
    return arrayOfEmployees.reduce((total, employee) => total + allWagesFor(employee), 0)
  }