var $loader;
var totalKb = 1800;
var time = 900;
var animateFunc = function() {
	if (gameStart && gameControl.text == "   Pause Σ   " && $("#instructions").css("display") == "none")
		time--;
	if (time < 0) {
		time = 0;
		gameStart = false;
		gameControl.text = "    Let's Σ    ";
		$("#gameOver").fadeIn(2500);
		clearTimeout(animateFunc);
		storage.setItem("MySigma", highScore);
		return;
	}
	if (time > totalKb) {
		time = totalKb;
	}
	$loader.setProgress(time / totalKb);
	$loader.setValue(Math.ceil(time / 20).toString() + 's');
	if (time < totalKb) {
		setTimeout(animateFunc, 50);
	}
}
$(document).ready(function() {
	$loader = $("#loader").percentageLoader({
		width : 180,
		height : 180,
		progress : 900
	});
});
