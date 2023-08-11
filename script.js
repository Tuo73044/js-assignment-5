// Write your JavaScript code here!


window.addEventListener("load", function() {
    const submitButton = document.getElementById("formSubmit");
    const list = document.getElementById("faultyItems");

    submitButton.addEventListener("click", function(event) {
        event.preventDefault();

        const pilotInput = document.querySelector("input[name='pilotName']").value;
        const copilotInput = document.querySelector("input[name='copilotName']").value;
        const fuelLevelInput = document.querySelector("input[name='fuelLevel']").value;
        const cargoLevelInput = document.querySelector("input[name='cargoMass']").value;

        formSubmission(document, list, pilotInput, copilotInput, fuelLevelInput, cargoLevelInput);
    });

    let listedPlanets;
    let listedPlanetsResponse = myFetch();
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    listedPlanetsResponse.then(function(result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function() {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
  

        const selectedPlanet = pickPlanet(listedPlanets);
        const missionTargetDiv = document.getElementById("missionTarget");
        addDestinationInfo(missionTargetDiv, selectedPlanet.name, selectedPlanet.diameter, selectedPlanet.star, selectedPlanet.distance, selectedPlanet.moons, selectedPlanet.imageUrl);
    });
});