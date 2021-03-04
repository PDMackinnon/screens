
let d = document;

let mySlides=["A","B","C","D"];

let myCurrSlideIndx = 0;

d.addEventListener("keydown", (e) => {
	if (e.key === "ArrowLeft") {
		// goLeft();
		myCurrSlideIndx = Math.max(myCurrSlideIndx - 1 , 0 ) ;
		slideL(mySlides[myCurrSlideIndx]);

		}
	
	  if (e.key === "ArrowRight") {
		// goRight();

		myCurrSlideIndx = Math.min(myCurrSlideIndx + 1 , mySlides.length-1 ) ;
		slideR(mySlides[myCurrSlideIndx]);

	  }


	  ///////////////////
  
	  if (e.key === "1") {
		slideL("A");
		}
	
	  if (e.key === "2") {
		slideL("B");
	  }
  	if (e.key === "3") {
		slideL("C");
		}
	
	  if (e.key === "4") {
		slideL("D");
	  }
  //////////////////////

  if (e.key === "q") {
	slideR("A");
	}

  if (e.key === "w") {
	slideR("B");
  }
  if (e.key === "e") {
	slideR("C");
	}

  if (e.key === "r") {
	slideR("D");
  }


  ///////////////////
  if (e.key === "a") {
	flip("A");
	}

  if (e.key === "s") {
	flip("B");
  }
  if (e.key === "d") {
	flip("C");
	}
  if (e.key === "f") {
	flip("D");
  }
  //////////////////////
   ///////////////////
   if (e.key === "g") {
	showScreenByLabel("A");
	}

  if (e.key === "h") {
	showScreenByLabel("B");
  }
  if (e.key === "j") {
	showScreenByLabel("C");
	}
  if (e.key === "k") {
	showScreenByLabel("D");
  }
  //////////////////////


	  if (e.key === "z") {
		slideUp("A");
		}
	
	  if (e.key === "x") {
		slideUp("B");
	  }
  	if (e.key === "c") {
		slideUp("C");
		}
	
	  if (e.key === "v") {
		slideUp("D");
	  }
///////////////////////////////

if (e.key === "b") {
	slideDown("A");
	}

  if (e.key === "n") {
	slideDown("B");
  }
  if (e.key === "m") {
	slideDown("C");
	}

  if (e.key === ",") {
	slideDown("D");
  }
///////////////////////////////




  }); //end key events listeners
  


var slideTime = 500, flipTime = 500;

var current = "A";

let prefix = "test";

showScreenByLabel(current);

function hideAllScreens() {

	var screens = document.querySelectorAll(".screen");
	screens.forEach(element => {
		element.classList.add("hidden");
		});
}

function getScreenIDfromLabel(label){
	return prefix + label;
}

function showScreen(screenID) {
	hideAllScreens();
	var screen = document.getElementById(screenID);
	if (screen) {
		screen.classList.remove("hidden");
	}
}

function showScreenByLabel(label){
showScreen(getScreenIDfromLabel(label));
current = label;
}

function getScreen(label) {
	return document.getElementById(getScreenIDfromLabel(label));
}




const TranslateScreenR = 'translate(100vw, 0)';
const TranslateScreenL = 'translate(-100vw, 0)';
const TranslateScreenB = 'translate(0, 100vh)';
const TranslateScreenT = 'translate(0, -100vh)';



function slide(nextScreenLabel, offScreenTranslate) {
	
	if (nextScreenLabel == current) return; // do nothing if same screen


	var nextScreen = getScreen(nextScreenLabel);
	var currentScreen = getScreen(current);
	currentScreen.style.zIndex = -1000;
	nextScreen.style.zIndex = 1000;

	nextScreen.classList.remove("hidden");

	var anim = nextScreen.animate([
		{
			transform: offScreenTranslate
		},
		{
			transform: 'translate(0,0)'
		}
		] ,slideTime);

	anim.finished.then(function(){
		currentScreen.classList.add("hidden");
	});
	current = nextScreenLabel;
}// end slide fn

function slideL(nextScreenLabel){
	slide(nextScreenLabel,TranslateScreenR);
}
function slideR(nextScreenLabel){
	slide(nextScreenLabel,TranslateScreenL);
}
function slideUp(nextScreenLabel){
	slide(nextScreenLabel,TranslateScreenB);
}
function slideDown(nextScreenLabel){
	slide(nextScreenLabel,TranslateScreenT);
}



function flip(nextScreenLabel){
	if (nextScreenLabel == current) return; // do nothing if same screen
	var nextScreen = getScreen(nextScreenLabel);
	var currentScreen = getScreen(current);


	currentScreen.style.zIndex = 2000;
	currentScreen.style.transform = "rotateY(180deg)";
	

	nextScreen.style.zIndex = -1000;
	nextScreen.classList.remove("hidden");


	var anim = nextScreen.parentElement.animate([
		{
			transform: "rotateY(180deg)"
		},
		{
			transform: "rotateY(0deg)"
		}
		] ,flipTime);

	anim.finished.then(function(){
		currentScreen.classList.add("hidden");
		currentScreen.style.transform = "rotateY(0deg)";

	});
	current = nextScreenLabel;

}

