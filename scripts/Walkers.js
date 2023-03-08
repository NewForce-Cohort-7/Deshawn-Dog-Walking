import { getCities, getWalkers, getWalkerCities } from "./database.js"


const walkers = getWalkers()

const findWalkerCitiesByWalker = (walkerId) => {
         // get all the walker city bridge table objects
         const allTheWalkerCities = getWalkerCities()
         // loop through them all to find the ones for THIS particular walker we clicked on
         const matchingWalkerCityObjects = []
         for(const walkerCityObject of allTheWalkerCities){
             if(walkerCityObject.walkerId === parseInt(walkerId)){
                 matchingWalkerCityObjects.push(walkerCityObject)
             }
         }

         return matchingWalkerCityObjects
         
}

const assignedCityNamed = (objectsWeJustFound) => {
    
    const allTheCities = getCities()

    let cityString = ""
    for(const matchingObject of objectsWeJustFound){
        for(const singleCity of allTheCities){
            if(singleCity.id === matchingObject.cityId){
                cityString += ` ${singleCity.name}`
            }
        }
    }
    return cityString

}


document.addEventListener(
    "click",  // This is the type of event
    (clickEvent) => {
     
        const itemClicked = clickEvent.target

        if (itemClicked.id.startsWith("walker")) {

            const [,walkerId] = itemClicked.id.split("--")

            for (const walkerObject of walkers) {

                if (walkerObject.id === parseInt(walkerId)) {

                    const matchingObjects = findWalkerCitiesByWalker(walkerId)
                    
                    const stringListOfCities = assignedCityNamed(matchingObjects)
                    
                    window.alert(`${walkerObject.name} services ${stringListOfCities}`)
                }
            }
        }
    }
)

export const Walkers = () => {
    let walkerHTML = "<ul>"

    for (const walkerObject of walkers) {
        walkerHTML += `<li id="walker--${walkerObject.id}">${walkerObject.name}</li>`
    }

    walkerHTML += "</ul>"

    return walkerHTML
}

