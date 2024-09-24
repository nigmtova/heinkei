var data = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  var today = new Date();
  var currentMonthIndex = today.getMonth();
  var currentYear = today.getFullYear();
  
  function updateCalendar(selectedMonthIndex = currentMonthIndex) {
    var calendarElement1 = document.getElementById("calendar1");
    var calendarElement2 = document.getElementById("calendar2");
    calendarElement1.innerHTML = "";
    calendarElement2.innerHTML = "";
  
    renderMonth(calendarElement1, selectedMonthIndex - currentMonthIndex);
    renderMonth(calendarElement2, selectedMonthIndex - currentMonthIndex + 1);
  
    updateNavigationButtons(selectedMonthIndex);
    selectDay(); // Ensure selectDay is called after rendering months
  }
  
  function renderMonth(calendarElement, monthOffset) {
    var year = currentYear;
    var monthIndex = currentMonthIndex + monthOffset;
  
    if (monthIndex >= 12) {
      monthIndex -= 12;
      year++;
    } else if (monthIndex < 0) {
      monthIndex += 12;
      year--;
    }
  
    var currentMonth = data[monthIndex];
  
    var calendarHTML = `<table class="m-calendar" id="calendar-table">
      <thead>
        <tr>
          <th class="m-sun">Sun</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th class="m-sat">Sat</th>
        </tr>
      </thead>
      <tbody>`;
  
    var totalDays = new Date(year, monthIndex + 1, 0).getDate();
    var firstDayOfMonth = new Date(year, monthIndex, 1).getDay();
    var dayOfWeek = 0;
  
    calendarHTML += "<tr>";
    for (var i = 0; i < firstDayOfMonth; i++) {
      calendarHTML += "<td></td>";
      dayOfWeek++;
    }
  
    for (var i = 1; i <= totalDays; i++) {
      if (
        year === today.getFullYear() &&
        monthIndex === today.getMonth() &&
        i < today.getDate()
      ) {
        calendarHTML += `<td class="not-active-days"><a class="c-calendar-dates"><span>${i}</span></a></td>`;
      } else {
        calendarHTML += `<td onclick="pasport1(${dayOfWeek},${i},${year},${monthIndex})" class="actives-days"><a class="c-calendar-dates"><span>${i}</span></a></td>`;
      }
  
      dayOfWeek++;
      if (dayOfWeek === 7) {
        calendarHTML += "</tr>";
        if (i < totalDays) {
          calendarHTML += "<tr>";
        }
        dayOfWeek = 0;
      }
    }
  
    calendarHTML += "</tbody></table>";
  
    calendarElement.innerHTML += `<div class="month">
      <h2>${currentMonth} ${year}</h2>
      ${calendarHTML}
    </div>`;
  }
  
  function updateNavigationButtons(selectedMonthIndex) {
    var prevButton = document.getElementById("aylantirish1");
    var nextButton = document.getElementById("aylantirish2");
  
    var selectedYear = currentYear;
    var selectedMonth = selectedMonthIndex;
  
    while (selectedMonth >= 12) {
      selectedMonth -= 12;
      selectedYear++;
    }
    while (selectedMonth < 0) {
      selectedMonth += 12;
      selectedYear--;
    }
  
    if (selectedYear < today.getFullYear() || (selectedYear === today.getFullYear() && selectedMonth <= today.getMonth())) {
      prevButton.classList.add("disabled1");
    } else {
      prevButton.classList.remove("disabled1");
    }
  
    if (selectedYear > today.getFullYear() + 1 || (selectedYear === today.getFullYear() + 1 && selectedMonth > today.getMonth())) {
      nextButton.classList.add("disabled1");
    } else {
      nextButton.classList.remove("disabled1");
    }
  }
  
  function is_acc(key) {
    currentMonthIndex += key;
    if (currentMonthIndex > 11) {
      currentMonthIndex = 0;
      currentYear++;
    } else if (currentMonthIndex < 0) {
      currentMonthIndex = 11;
      currentYear--;
    }
    updateCalendar(currentMonthIndex);
  }
  
  function selectDay() {
    var calendarDays1 = document.querySelectorAll("#calendar1 .actives-days");
    var calendarDays2 = document.querySelectorAll("#calendar2 .actives-days");
  
    calendarDays1.forEach(function(day) {
      day.addEventListener("click", function() {
        deselectAllDays();
        day.classList.add("selected-day");
        updateWeekView(day, currentYear, currentMonthIndex);
      });
    });
  
    calendarDays2.forEach(function(day) {
      day.addEventListener("click", function() {
        deselectAllDays();
        day.classList.add("selected-day");
        updateWeekView(day, currentYear, currentMonthIndex + 1);
      });
    });
  }
  
  function deselectAllDays() {
    var calendarDays = document.querySelectorAll(".actives-days");
    calendarDays.forEach(function(day) {
      day.classList.remove("selected-day");
    });
  }
  
  function updateWeekView(selectedDayElement, year, monthIndex) {
    var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var selectedDate = new Date(year, monthIndex, parseInt(selectedDayElement.textContent));
  
    var weekDayElements = document.querySelectorAll("#calendar-week .day");
    weekDayElements.forEach(function(dayElement, index) {
      var dayDate = new Date(selectedDate);
      dayDate.setDate(selectedDate.getDate() + index);
  
      var dayName = daysOfWeek[dayDate.getDay()];
      var dayNumber = dayDate.getDate();
      var monthName = data[dayDate.getMonth()].substring(0, 3);
  
      dayElement.innerHTML = `<strong>${dayName}</strong><br>${monthName} ${dayNumber}`;
  
      // Remove current-day class from all days in the week view
      dayElement.classList.remove("current-day");
  
      // Add current-day class to the selected day
      if (dayDate.getTime() === selectedDate.getTime()) {
        dayElement.classList.add("current-day");
      }
    });
  }
  
  function pasport1(dayOfWeek, i, year, month) {
    var daysWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var weeks = daysWeek.slice(dayOfWeek, dayOfWeek + 1);
    var monthName = months[month];
    localStorage.setItem("for_year",year)
    localStorage.setItem('select_data', `${monthName} ${i}, ${year}`);
    console.log(`${monthName} ${i}, ${year}`);
    document.querySelector("#caLendar2").value = localStorage.getItem("select_data")

    selectDay(); // Update selected day for both calendars
    document.querySelector(".for_date").innerHTML=localStorage.getItem("select_data")
    var activeDays = document.querySelectorAll(".actives-days");
    activeDays.forEach(function(day) {
      var daySpan = day.querySelector("span").textContent;
      if (parseInt(daySpan) === i && day.parentElement.parentElement.id === "calendar1") {
        day.classList.add("selected-day");
        updateWeekView(day, year, month);
      } else if (parseInt(daySpan) === i && day.parentElement.parentElement.id === "calendar2") {
        day.classList.add("selected-day");
        updateWeekView(day, year, month + 1);
      } else {
        day.classList.remove("selected-day");
      }
    });
  }
  
  document.getElementById("aylantirish1").addEventListener("click", function() {
    if (!this.classList.contains("disabled1")) {
      is_acc(-1);
    }
  });
  
  document.getElementById("aylantirish2").addEventListener("click", function() {
    if (!this.classList.contains("disabled1")) {
      is_acc(1);
    }
  });
  
  updateCalendar();
  selectDay();
  
  function renderWeek() {
    var calendarWeekElement = document.getElementById("calendar-week");
    calendarWeekElement.innerHTML = "";
  
    var today = new Date();
    today.setHours(0, 0, 0, 0); // Set the hours to 0
  
    var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    for (var i = 0; i < 7; i++) {
      var dayElement = document.createElement("div");
      dayElement.className = "day click_calendar";
  
      var dayDate = new Date(today);
      dayDate.setDate(today.getDate() + i);
  
      var dayName = daysOfWeek[dayDate.getDay()];
      var dayNumber = dayDate.getDate();
      var monthName = monthsOfYear[dayDate.getMonth()];
      var year = dayDate.getFullYear();
  
      dayElement.innerHTML = `<strong>${dayName}</strong><br>${monthName} ${dayNumber}`;
  
      // Add current-day class to today's date
      if (i === 0) {
        dayElement.classList.add("current-day");
      }
      
      calendarWeekElement.appendChild(dayElement);
    }
  
    var extraDiv = document.createElement("div");
    extraDiv.className = "day1 click_calendar";
    extraDiv.innerHTML = `<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" role="img"><path d="M12.6667 2.66675H3.33333C2.59695 2.66675 2 3.2637 2 4.00008V13.3334C2 14.0698 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0698 14 13.3334V4.00008C14 3.2637 13.403 2.66675 12.6667 2.66675Z" stroke="#23a1b2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.6667 1.33337V4.00004" stroke="#23a1b2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.33334 1.33337V4.00004" stroke="#23a1b2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2 6.66675H14" stroke="#23a1b2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
    More Dates`;
    calendarWeekElement.appendChild(extraDiv);
  
    extraDiv.addEventListener("click", function() {
      document.querySelector(".for_black_back").style.display = "flex";
    });
  
    // Add click event listener to each day in the week view
    var dayElements = document.querySelectorAll('.day');
    dayElements.forEach(function(day) {
      day.addEventListener('click', function() {
        // Remove current-day class from all days in the week view
        dayElements.forEach(function(d) {
          d.classList.remove('current-day');
        });
  
        // Add current-day class to the clicked day
        day.classList.add('current-day');
  
        // Store selected day, month, and week day in localStorage
        var dayNumber = day.querySelector('br').nextSibling.textContent.split(' ')[1];
        var monthName = day.querySelector('br').nextSibling.textContent.split(' ')[0];
        var weekDayName = day.querySelector('strong').textContent;
        var year = new Date().getFullYear(); // Get the current year
  
  
        var today = new Date();
          var year = today.getFullYear();
  if (localStorage.getItem("for_year")) {
    localStorage.setItem('select_data', `${monthName} ${dayNumber}, ${localStorage.getItem("for_year")}`);
  }else{
    localStorage.setItem('select_data', `${monthName} ${dayNumber}, ${year}`);
  }
  
        
        document.querySelector(".for_date").innerHTML=localStorage.getItem("select_data")
      });
    });
  }
  
  renderWeek();
  
  function exit_modal() {
    document.querySelector(".for_black_back").style.display = "none";
  }
  
  const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  
  const week = new Date();
  let week1 = weekday[week.getDay()];
  
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  
  const month = new Date();
  let month1 = months[month.getMonth()];
  
  const day = new Date();
  let day1 = day.getDate();
  
  const year = new Date()
  let year1 = year.getFullYear()
  
  localStorage.setItem("select_data",`${month1} ${day1}, ${year1}`)
  
  document.querySelector(".for_date").innerHTML=localStorage.getItem("select_data")