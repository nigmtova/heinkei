

var for_plus_1 = localStorage.getItem("Count1_1");

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