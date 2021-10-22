var bodies = { // gravitational parameter, rotational period, radius
	earth: [3.986004418e+14, 86164.098903691, 6371000],
}
var body;

function variable() {
	body = bodies[document.getElementById("body").options[document.getElementById("body").selectedIndex].value];
}

function preset() {
	if (document.getElementById("preset").options[document.getElementById("preset").selectedIndex].value == "stationary") {
		document.getElementById("peri2").value = Math.pow((body[0]*body[1]*body[1]/(4*Math.pow(Math.PI,2))), 1/3) - body[2];
		document.getElementById("apo3").value = Math.pow((body[0]*body[1]*body[1]/(4*Math.pow(Math.PI,2))), 1/3) - body[2];
	}
}

function orbitvel(alt, sma) {
	return Math.sqrt(body[0]*(2/(alt+body[2]) - 1/(sma+body[2])));
}

function calc() {
	document.getElementById("b1").innerHTML = 
    orbitvel(Number(document.getElementById("peri1").value)+body[2], 
    (Number(document.getElementById("peri1").value)+Number(document.getElementById("apo2").value))/2 + body[2]) 
    - orbitvel(Number(document.getElementById("peri1").value)+body[2], 
    (Number(document.getElementById("peri1").value)+Number(document.getElementById("apo1").value))/2 + body[2]);

    document.getElementById("b2").innerHTML = 
    orbitvel(Number(document.getElementById("apo2").value)+body[2], 
    (Number(document.getElementById("peri2").value)+Number(document.getElementById("apo2").value))/2 + body[2]) 
    - orbitvel(Number(document.getElementById("apo2").value)+body[2], 
    (Number(document.getElementById("peri1").value)+Number(document.getElementById("apo2").value))/2 + body[2]);

    document.getElementById("b3").innerHTML = 
    orbitvel(Number(document.getElementById("peri2").value)+body[2], 
    (Number(document.getElementById("peri2").value)+Number(document.getElementById("apo3").value))/2 + body[2]) 
    - orbitvel(Number(document.getElementById("peri2").value)+body[2], 
    (Number(document.getElementById("peri2").value)+Number(document.getElementById("apo2").value))/2 + body[2]);
}

var intervals = [setInterval(variable, 100), setInterval(preset, 100), setInterval(calc, 100)];