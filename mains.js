localStorage.removeItem("Count1_1")

var for_plus_1 = localStorage.getItem("Count1_1") || 1;

function calenadry() {
  document.querySelector(".calendar_card").style = "display: block"
  document.querySelector(".qoraa").style = "display: flex;"
}


function vistPage() {
  if(for_plus_1 > 0){
      document.querySelector(".css-1vzof1e").style="display: block;"
  }

  document.querySelector("#calendar_card").style="display: none;"
}

function plussBtn() {
      for_plus_1 += 1;
      document.querySelector("#inputs_01").value = for_plus_1;
      document.querySelector("#for_minus_1").disabled = false;
      localStorage.setItem("Count1_1", for_plus_1);
}
  
function minussBtn() {
      if (for_plus_1 > 0) {
        for_plus_1 -= 1;
      }
      document.querySelector("#inputs_01").value = for_plus_1;
      localStorage.setItem("Count1_1", for_plus_1);
      document.querySelector("#for_minus_1").disabled = (for_plus_1 === 0);
}

document.querySelector("#caLendar").value = localStorage.getItem("select_data")
document.querySelector("#caLendar2").value = localStorage.getItem("select_data")

function adulto(key) {
  localStorage.setItem("time", key)
}


function Qoraa() {
  document.querySelector(".calendar_card").style = "display: none;"
  document.querySelector(".qoraa").style = "display: none;"
}

function checkPage() {
  localStorage.setItem("selected_date", document.querySelector(".css-1s1z98e").value)
}