var flowers = [];
var maxFlowers = 100;
var w = window.innerWidth;
var h = window.innerHeight;
var flowerIndex = 0;
var x = tx = window.innerWidth/2;
var y = ty = window.innerHeight/2;

function random(min, max){
	return Math.random() * (max - min) + min
}



function Flower(){
	this.size = random(5, 40);
	this.petals = random(5, 6);
	this.petalColor = "hsl("+random(0, 360)+", 40%, 70%)";
	this.centerColor = "rgb(124, 86, 34)";
	this.direction = Math.random() > .5 ? "right" : "left";
	this.x = this.origX = 0;
	this.y = this.origY = 0;
	this.vx = this.ovx = random(-10, 10);
	this.vy = this.ovy = random(-10, -3);
	this.id = "dat-flower-" + flowerIndex; 
	this.alpha = 0;
	flowerIndex++;
	this.life = 0;
	this.maxLife = random(100,200);
	this.flower = $("<div />", {
		class: "flower",
		id: "dat-flower-" + flowerIndex 
	}).css({
		height: this.size,
		width: this.size,
		background: this.centerColor,
		top: window.innerHeight + 300,
		left: random(0, (window.innerWidth - this.size)),
		opacity: 0,
		webkitTransform: "translate3d(0,0,-500px)",
		transform: "translate3d(0,0,-500px)",
	});
	
	for(var i=0; i<this.petals; i++){
		var rotate = (i + 1) * (360/this.petals);
		var translateY = (this.size - (this.size * .2));
		
		var petal = $("<div />", {
			class: "petal",
		}).css({
			backgroundColor: this.petalColor,
			webkitTransform: "rotate(" + rotate + "deg) translateY("+ translateY +"px)",
			transform: "rotate(" + rotate + "deg) translateY("+ translateY +"px)",
			opacity: "inherit"
		});
		
		if(this.direction == "right"){
			petal.css({
				borderBottomRightRadius: "50%",
				borderTopRightRadius: "50%",
			});
		} else {
			petal.css({
				borderBottomLeftRadius: "50%",
				borderTopLeftRadius: "50%",
			});
		}
		this.flower.append(petal);
	}
	
	$("body").append(this.flower);
	this.flower = $("#" + this.id);
}

Flower.prototype.reset = function(){
	this.x = this.origX;
	this.y = this.origY;
	this.vx = this.ovx;
	this.vy = this.ovy;
	this.z = -1000;
	this.life = 0;
	this.alpha = 0;
}

Flower.prototype.draw = function(){
	this.flower.css({
		webkitTransform: "translate3d("+this.x+"px, "+this.y+"px, "+this.z+"px)",
		transform: "translate3d("+this.x+"px, "+this.y+"px, "+this.z+"px)",
		opacity: this.alpha
	});
	this.update();
};

Flower.prototype.update = function(){
	if(this.life >= this.maxLife){
		this.reset();
	} else {
		this.x += this.vx;
		this.y += this.vy;
		this.vy += .01;
		this.z += 12;
		this.alpha += .1;
		this.life++;
	}
	
};


for(var i=0; i<maxFlowers; i++){
	
	flowers.push( new Flower() );
	
	
}




function anim(){
	for(var i in flowers){
		var f = flowers[i];
		f.draw();
	}
	camera();
	requestAnimationFrame(anim);
}

function camera(){
	if(Math.abs(tx - x) > .1 && Math.abs(ty - y) > .1){
		x += (tx - x) * .05;
		y += (ty - y) * .05;
		$("body").css({
			perspectiveOrigin: x + "px " + y + "px"
		})
	}
	
}

function touches(e) {
	var touches = e.touches;
	var newX, newY;
	if(touches){
		console.log(touches);
		newX = touches[0].clientX;
		newY = touches[0].clientY;
	} else {
		newX = e.clientX;
	  newY = e.clientY;
	}
	tx = (newX - (window.innerWidth/2)) * 3;
	ty = (newY - (window.innerHeight/2)) * 3;
	e.preventDefault();
};

window.addEventListener("mousemove", touches);
window.addEventListener("touchstart", touches);
window.addEventListener("touchmove", touches);

$(window).on("mouseleave", function(e){
	tx = window.innerWidth/2;
	ty = window.innerHeight/2;
})



anim();