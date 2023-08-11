// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   const missionTargetDiv = document.getElementById("missionTarget");
    missionTargetDiv.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `;
}

function validateInput(testInput) {
    if (testInput.trim() === "") {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    // Validate inputs
    const pilotStatus = validateInput(pilot);
    const copilotStatus = validateInput(copilot);
    const fuelLevelStatus = validateInput(fuelLevel);
    const cargoLevelStatus = validateInput(cargoLevel);

    if (pilotStatus === "Empty" || copilotStatus === "Empty" ||
        fuelLevelStatus === "Empty" || cargoLevelStatus === "Empty") {
        alert("All fields are required!");
    } else if (pilotStatus === "Is a Number" || copilotStatus === "Is a Number") {
        alert("Pilot and co-pilot names must be strings!");
    } else if (fuelLevelStatus !== "Is a Number" || cargoLevelStatus !== "Is a Number") {
        alert("Fuel level and cargo mass must be numbers!");
    } else {
        // Update shuttle requirements
        document.getElementById("pilotStatus").textContent = `Pilot ${pilot} is ready`;
        document.getElementById("copilotStatus").textContent = `Co-pilot ${copilot} is ready`;

        // Check fuel level
        if (fuelLevel < 10000) {
            document.getElementById("faultyItems").style.visibility = "visible";
            document.getElementById("fuelStatus").textContent = "Fuel level is too low for launch";
            document.getElementById("launchStatus").textContent = "Shuttle not ready for launch";
            document.getElementById("launchStatus").style.color = "#C7254E"; // Red shade
        }

        // Check cargo mass
        else if (cargoLevel > 10000) {
            document.getElementById("faultyItems").style.visibility = "visible";
            document.getElementById("cargoStatus").textContent = "Cargo mass is too large for launch";
            document.getElementById("launchStatus").textContent = "Shuttle not ready for launch";
            document.getElementById("launchStatus").style.color = "#C7254E"; // Red shade
        }

        // Shuttle is ready for launch
        else {
            document.getElementById("faultyItems").style.visibility = "hidden";
            document.getElementById("launchStatus").textContent = "Shuttle is ready for launch";
            document.getElementById("launchStatus").style.color = "#419F6A"; // Green shade
        }
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then(function(response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    const randomIndex = Math.floor(Math.random() * planets.length);
    return planets[randomIndex];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
