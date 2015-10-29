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

function weather(){
  this.name = function(){
    return weather.name;
}
this.damage = function(){
  return weather.damage;
}
this.message = function(){
  return this.message;
}
}

function mermaidDie(){
  this.name = function(){
    return this.name;
}
this.damage = function(){
  return this.damage;
}
}

function sailor(){
  var options = options || {};
  this.name = options.name || "Jerry";
  this.chanceofLife = options.chanceofLife || 100;
  this.weather = new weather({name: "cloudy", damage: 50, messsage:"You are taking a risk!"});
  this.mermaidDie = new mermaidDie({name:'', damage:''})
}
  var Jack = new sailor({name: "Jack", chanceofLife: 300});
  var Jill = new sailor({name: "Jill", chanceofLife: 500});

  var windy = new weather({name: "windy", damage: 100, message:"Batten down the hatches!"});
  var calm = new weather({name: "calm", damage: 0, message:"It's your lucky day!"});

  var hitRocks = new mermaidDie({name: "You hit rocks!", damage: 400});
  var sink = new mermaidDie({name: "YOU'RE SUNK!", damage: 1000});
  var goOverboard = new mermaidDie({name: "I hope you can swim!", damage: 200});
  var missed = new mermaidDie({name: "You missed the rocks!", damage: 0});


  this.choice = function (enemy) {
    var randomInt = Math.floor(Math.random() * 20);
    if(randomInt < 7) {
      enemy.chanceofLife = enemy.chanceofLife - this.mermaidDie.damage;
      console.log("Show caution," + enemy.name + "! Your chance of life is now at " + enemy.chanceofLife);
      if(enemy.chanceofLife <= 0) {
        enemy.chanceofLife = 0;
        console.log("The sirens got the better of your and your ship, you're sunk." + enemy.name);
      }

 }
 else {
    console.log("The Moon shines in your favor. You've narrowly escaped the mermaid trap. " + enemy.name);
  }

  this.weather = function (enemy) {
    var randomInt = Math.floor(Math.random() * 20);
    if(randomInt < 15) {
      enemy.chanceofLife = enemy.chanceofLife - this.weather.damage;
      console.log("Woah," + enemy.name + "! Your chance of life is now at " + enemy.chanceofLife);
      if(enemy.chanceofLife <= 0) {
        enemy.chanceofLife = 0;
        console.log("The winds were too strong, you're sunk." + enemy.name);
      }
 }
 else {
    console.log("The Sun shines and you continue on your merry way. " + enemy.name);
  }
}
}
