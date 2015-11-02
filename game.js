var person

// function ship(){
//   this.name = function(){
//     return ship.name;
//   }
//     this.size = function(){
//       return ship.size;
//   }
// }
// var pinta = new ship ({name:"Pinta", size:"Medium"});
// var nina = new ship ({name:'Nina', size:'Small'});
// var santaMaria = new ship ({name:'Santa Maria', size:'Large'});
 $( document ).ready();

 // global vars
 var div = document.createElement('div'),
     body = document.getElementsByTagName('body')[0],
     canvas = document.createElement('canvas'),
     ctx = canvas.getContext('2d'),
     w,
     h;

 // events
 window.onresize = function(event) {
   SetMargins();
 };

 // initialization
 function Init () {
   document.body.appendChild(div);
   // div.style.position = "fixed";
   canvas.style.zIndex = "0";
   canvas.style.position = "absolute";
   div.appendChild(canvas);

   SetMargins();
   Update();
 }
 Init();


 // main loop
 function Update() {

   ctx.fillStyle = '#00d4c8';
   ctx.fillRect(0,0,w,h);

   var timeCur = new Date().getTime();

   var maxLayers = Math.floor(h / 150) + 1;
   var waveLayer = -1;
   var offset = 0;
   var offsetInc = 30;

   while(waveLayer < maxLayers){
     var timeDivider = (8 - (5 * waveLayer / maxLayers));
     var timeMod = timeCur / timeDivider;
     var ampMod = 32 + 12 * waveLayer;
     var ampMult = 8 + waveLayer * 4;

     var grd = ctx.createLinearGradient(0,offset,0,offset + offsetInc * 2);
     grd.addColorStop(0,'#80e0d0');//'rgba(255,255,208,0.2)');
     grd.addColorStop(0.5,'#40d8d4');//'rgba(255,208,208,0)');
     grd.addColorStop(1,'#40d4d0');

     ctx.beginPath();

     for(var i = 0 ; i < w; i+= 10 ){
       var timeUse = (timeMod + i) / ampMod;
       var amp = ampMult * Math.sin(timeUse);
       var height = 4 * Math.cos((timeMod) / 48);
       var yPoint = amp - height + offset;
       var xPoint = i;
       ctx.lineTo(xPoint, yPoint);
     }
     ctx.lineTo(w,h+offset);
     ctx.lineTo(0,h+offset);
     ctx.lineTo(0,offset);

     ctx.closePath();
     ctx.fillStyle = grd;
     ctx.fill();

     waveLayer++;
     offsetInc = 30 + 10 * Math.pow(waveLayer,2);
     offset += offsetInc
   }

   requestAnimationFrame(Update);
 }


 // functions
 function SetMargins () {
   var bodyW = document.documentElement.clientWidth,
       bodyH = document.documentElement.clientHeight;

   w = canvas.width = Math.max(600,bodyW);
   h = canvas.height = bodyH;
   canvas.style.bottom = 0;

  div.style.left=div.style.right=div.style.top=div.style.bottom="0";
 }

////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////
$(".textArea").html("<h3>You're sailing the high seas! Do you wish to continue?</h3>" + "<button style='background-color: white; border-radius: 15px; padding:10px; border-color: white; color: black;' type='button' class='yes' name='Yes!'>&nbsp;Yes!&nbsp;</button>")
$('.yes').on('click', function(){

//  var txt;
//  var chooseSailor =
// $('button .next').on('click', function(){
// $(".textArea").html("Click the cloud to find out the weather on the seas!");
// });



  $('.textArea').html("<h3>Which sailor would you like to be: Jerry, Jack, or Jill?</h3><br><button style='background-color: white; border-radius: 15px; padding:10px; border-color: white; color: black;' type='button' class='jerry' name='jerry'> &nbsp; Jerry &nbsp;</button>&nbsp;<button style='background-color: white; border-radius: 15px; padding:10px; border-color: white; color: black;' type='button' class='jack' name='Jack'>&nbsp;Jack&nbsp;</button>&nbsp;<button style='background-color: white; border-radius: 15px; padding:10px; border-color: white; color: black;' type='button' class='jill' name='Jill'>&nbsp;Jill&nbsp;</button>");
  // switch(chooseSailor) {
        $('.jerry').on('click', function(){
          person = new Sailor({})
          $(".textArea").html("<h3>o0oh! Sailor Jerry has been on the seas for many years and starts with a Life Chance of 100.</h3><button style='background-color: white; border-radius: 15px; padding:10px; border-color: white; color: black;' type='button' class='next' name='Next'> &nbsp; Next &nbsp; </button>");
          $(this.button).html('test');
        });
        $('.jack').on('click', function(){
          $(".textArea").html("<h3>Nice! Jack begins with a Life Chance of 300.</h3><button style='background-color: white; border-radius: 15px; padding:10px; border-color: white; color: black;' type='button' class='next' name='Next'> &nbsp; Next &nbsp; </button>");
          person = new Sailor({name: "Jack", chanceofLife: 300});

        });
        $('.jill').on('click', function(){
          person = new Sailor({name: "Jill", chanceofLife: 500});
          $(".textArea").html("<h3>Great choice! Jill begins with a Life Chance of 500.</h3><button style='background-color: white; border-radius: 15px; padding:10px; border-color: white; color: black;' type='button' class='next' name='Next'> &nbsp; Next &nbsp; </button>");

        });

        /*function myFunky() {
            $(".textArea").html("<h3>Click the clouds to find out today's weather!</h3>");
        }*/
        $(".textArea").on("click", ".next", function(){
          $(".textArea").html("<h3>Click the clouds to find out today's weather!</h3>");
        });

      // default:
      //     txt = "Hey, that's not a sailor. Are you a stowaway?";
      //     console.log(txt);
      //     alert(txt);
          // location.reload();
//   }
});



function Sailor(options){
  var options = options || {};
  this.name = options.name || "Jerry";
  this.chanceofLife = options.chanceofLife || 100;
  this.weather = new weather({name: "cloudy", damage: 50, messsage:"You are taking a risk!"});
  this.mermaidDie = new mermaidDie({name:'', damage:''})
}

function weather(options){
  this.name = options.name;
  this.damage = options.damage;
  this.message = options.message;
}

determineWeather = function (sailor) {
  var randomInt = Math.floor(Math.random() * 10);
  if(randomInt < 5) {
    sailor.chanceofLife = sailor.chanceofLife - sailor.weather.damage;
    $(".textArea").html("Oh, Your Life Chance is now at " + sailor.chanceofLife);
    if(sailor.chanceofLife <= 100) {
      sailor.chanceofLife <= 50;
      $(".textArea").html("Be careful you are wickedly close to dying.");
    }
} else {
  $(".textArea").html("<h3>Carry on. Click the mermaid to greet her.</h3>");

}
};



// });
var windy = new weather({name: "windy", damage: 100, message:"Batten down the hatches!"});
var calm = new weather({name: "calm", damage: 0, message:"It's your lucky day!"});

$( "#weatherClick" ).click(function() {
  // $(".textArea").html( "Let's check the weather." );
  window.determineWeather(Sailor);
  $('#weatherClick').addClass('hideElement');
  $('.mermaid').addClass('clickedElement');
  $('.mermaid').removeClass('hideElement');

});

function mermaidDie(options){
  this.name = options.name;
  this.damage = options.damage;
  // this.message = options.message;
}
var hitRocks = new mermaidDie({name: "You hit rocks!", damage: 400});
var sink = new mermaidDie({name: "YOU'RE SUNK!", damage: 1000});
var goOverboard = new mermaidDie({name: "I hope you can swim!", damage: 200});
var missed = new mermaidDie({name: "You missed the rocks!", damage: 0});



mermaidMeet= function (sailor) {
    var randomInt = Math.floor(Math.random() * 100);
    if(randomInt < 25) {
      var hitRocks = new mermaidDie({name: "You hit rocks!", damage: 400});
      sailor.chanceofLife = sailor.chanceofLife - sailor.mermaidDiedamage;
      $(".concludeCl").html("<h1>"+ hitRocks.name + "</h1>");
      $(".textArea").html(" ");
      if(sailor.chanceofLife <= 100) {
        sailor.chanceofLife <= 50;
        $(".textArea").html("Be careful you are wickedly close to dying.");
        sailor.chanceofLife = 0;
        $(".textArea").html("You have died," + sailor.name + ".");
      }
  }
else if(randomInt >= 25 || randomInt > 50) {
  var sink = new mermaidDie({name: "YOU'RE SUNK!", damag: 1000});
      sailor.chanceofLife = sailor.chanceofLife - sailor.mermaidDiedamage;
      $(".concludeCl").html("<h1>" + sink.name + "</h1>");
      $(".textArea").html(" ");
      if(sailor.chanceofLife <= 100) {
        sailor.chanceofLife <= 50;
        aler8t("Be careful you are wickedly close to dying.");
        sailor.chanceofLife = 0;
        $(".textArea").html("You have died," + sailor.name + ".");
      }
    }
else if (randomInt >=51 || randomInt > 75) {
  var goOverboard = new mermaidDie({name: "I hope you can swim!", damage: 200});
  sailor.chanceofLife = sailor.chanceofLife - sailor.mermaidDiedamage;
      $(".concludeCl").html("<h1>" + goOverboard.name + "</h1>");
      $(".textArea").html(" ");
      if(sailor.chanceofLife <= 100) {
        sailor.chanceofLife <= 50;
        $(".textArea").html("Be careful you are wickedly close to dying.");
        sailor.chanceofLife = 0;
        $(".textArea").html("You have died," + sailor.name + ".");
      }
    }
    else if(randomInt < 75) {
      var missed = new mermaidDie({name: "You missed the rocks!", damage: 0});
      sailor.chanceofLife = sailor.chanceofLife - sailor.mermaidDie.damage;
          $(".concludeCl").html("<h1>" + missed.name + "</h1>");
          $(".textArea").html(" ");
          if(sailor.chanceofLife <= 100) {
            sailor.chanceofLife <= 50;
            $(".textArea").html("Be careful you are wickedly close to dying.");
            sailor.chanceofLife = 0;
            $(".textArea").html("You have died.");
          }
        }
        setTimeout(function(){
          $(".textArea").html("<h1>Thanks for visiting Mermaid Cove!&nbsp; &nbsp;<button style='background-color: white; border-radius: 15px; padding:10px; border-color: white; color: black;' type='button' class='playagain' name='Next'> &nbsp; Play again. &nbsp; </button></h1>");
          $(".concludeCl").html(" ");
          $('.final').removeClass('hideElement');
          $('.final').addClass('clickedElement');
          $('#concludeClick').removeClass('hideElement');
          $('#concludeClick').addClass('clickedElement');
          $('#end').addClass('clickedElement');
          $('#end').removeClass('hideElement');
          $('.beach-sunset').addClass('clickedElement');
          $('#mermaidClick').addClass('hideElement');
          $('#mermaidClick').removeClass('clickedElement');
       }, 3000);
       $(".textArea").on("click", ".playagain", function(){
           location.reload();
         });
        };


  $( "#mermaidClick" ).click(function() {
    $(".textArea").html( "<h3>You've encountered a whole pod of mermaids and they do not appreciate you sailing in their seas.</h3><button style='background-color: white; border-radius: 15px; padding:10px; border-color: white; color: black;' type='button' class='2next' name='Next'> &nbsp; Next &nbsp; </button>" );
    window.mermaidMeet();
    $('#mermaidClick').addClass('hideElement');
    $('#mermaidClick').removeClass('clickedElement');
    // $('.conclude').addClass('clickedElement');
    // $('.conclude').removeClass('hideElement');
  });

  $(".textArea").on("click", ".2next", function(){
    mermaidMeet(person);
  });




  this.choice = function (sailor) {
    var randomInt = Math.floor(Math.random() * 20);
    if(randomInt < 7) {
      sailor.chanceofLife = sailor.chanceofLife - this.mermaidDie.damage;
      $(".textArea").html("Show caution," + sailor.name + "! Your chance of life is now at ");
      if(sailor.chanceofLife <= 0) {
        sailor.chanceofLife = 0;
        $(".textArea").html("The sirens got the better of your and your ship, you're sunk.");
      }
 }
 else {
    $(".textArea").html("The Moon shines in your favor. You've narrowly escaped the mermaid pod. ");
  }
}
//
// $( "#concludeClick" ).click(function() {
//   $(".concludeCl").html("<h1>Thanks for visiting Mermaid Cove.</h1>");
//   $('#concludeClick').addClass('hideElement');
//   $('#end').addClass('clickedElement');
//   $('#end').removeClass('hideElement');
// });

////////////////////////////////////////////////
// source for background-color
//http://codepen.io/REast/details/gqmuE/

//cloud//http://codepen.io/seyedi/pen/nCvKA

//sunset
//http://codepen.io/peterbrinck/pen/emwXBP
