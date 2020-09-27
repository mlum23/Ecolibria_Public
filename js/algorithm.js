
// Create constants for CO2 emissions
const [HOUSE_CO2, HOSPITAL_CO2, PARK_CO2, WORK_TOWER_CO2, STORE_CO2] = [10, 20, -10, 20, 15];

/* Create general infrastructural class and then assign it as a prototype
    for all of five of the infrastructural elements.
 */
class Infrastructure {
    constructor(x, y, CO2, people = 0, capacity = 1) {
        this.capacity = capacity;
        this.people = people;
        this.CO2_emission = CO2;
        this.posX = x;
        this.posY = y;
    }

    addPeople(number) {
        // Check to see is capacity is reached.
        if ((this.people + number) <= this.capacity) {
            this.people += number;
        } else {
            // don't increment people
            // display message to user
        }
    }
}
// house class
class House extends Infrastructure {
    constructor(x, y, CO2 = HOUSE_CO2, people = 1, capacity = 1) {
        super(x, y, CO2, people);
        //console.log("House created");
    }
}
// hospital class
class Hospital extends Infrastructure {
    constructor(x, y, CO2 = HOSPITAL_CO2, people = 0, capacity = 1) {
        super(x, y, CO2);
        //console.log("Hospital created.");
    }
}
// Work tower class
class WorkTower extends Infrastructure {
    constructor(x, y, CO2 = WORK_TOWER_CO2, people = 0, capacity = 1) {
        super(x, y, CO2);
        //console.log("Work tower created");
    }
}
// Park class
class Park extends Infrastructure {
    constructor(x, y, CO2 = PARK_CO2, people = 0, capacity = 1) {
        super(x, y, CO2);
    }
}
// Store class
class Store extends Infrastructure {
    constructor(x, y, CO2 = STORE_CO2, people = 0, capacity = 1) {
        super(x, y, CO2);
    }
}

/* Create list ADT for Infrastructural Elements */
function List() {
    this.listSize = 0;                      // initialize list size to zero
    this.listPos = 0;                       // list position initially set to zero
    this.dataStore = [];                    // initialize an empty array to store list elements
    this.clear = clear;                     // clear a list
    this.find = find;                       // find an element
    this.findByPosition = findByPosition;   // find an element based on its x and y position
    this.toString = toString;               // display the contents of a list
    this.insert = insert;                   // insert an element in a list
    this.append = append;                   // append an element to the end of a list
    this.remove = remove;                   // remove an element from a list
    this.front = front;                     // move current position to front of list
    this.end = end;                         // move current position to end of list
    this.prev = prev;                       // move current position to element immediately before current element
    this.next = next;                       // move current position to element immediately after current element
    this.length = length;                   // return the number of elements in a list
    this.currPos = currPos;                 // return current position
    this.moveTo = moveTo;                   // move current position to new position in list
    this.getElement = getElement;           // retrieve element (via find)
    this.getElementAt = getElementAt;       // retrieve element based on its index in list
    this.swapElements = swapElements;       // swap two elements
}

// Append an element to a list
function append(element) {
    this.dataStore[this.listSize++] = element;
    //console.log("this.listSize: " + this.listSize);
}

// Find an element in a list based on its x and y coordinates
function findByPosition(x, y) {
    for (let i = 0; i < this.dataStore.length; ++i) {
        //console.log(this.dataStore[i].posX);

        if (this.dataStore[i].posX === x && this.dataStore[i].posY === y) {
            return this.dataStore[i];
        }
    }
    return null;
}

// Find an element in a list
// Postcondition: return the element, if found; otherwise, return -1
function find(element) {
    for (let i = 0; i < this.dataStore.length; ++i) {
        if (this.dataStore[i] === element) {
            return i;
        }
    }
    return -1;
}

// Remove an element from a list, decrement listSize and splice dataStore array
// Postcondition: remove element if found and return true; otherwise, return false
function remove(element) {
    let foundAt = this.find(element);
    if (foundAt > -1) {
        // delete object (item)
        delete this.dataStore[foundAt];
        this.dataStore.splice(foundAt, 1);
        --this.listSize;
        return true;
    }
    return false;
}

// Determine the number of elements in a list
// Postcondition: return size of list
function length() {
    //console.log("listSize: " + this.listSize);
    return this.listSize;
}

// View the elements of a list
// Postcondition: return the list's data object
function toString() {
    return this.dataStore;
}

// Precondition: new element to insert and index to insert it AT
// Insert an element into a list
// Postcondition: insert new element in list, increase list size, and return true; return false otherwise
function insert(element, at) {
    let insertPos = this.find(at);
    if (insertPos > -1) {
        this.dataStore.splice(insertPos, 0, element);
        ++this.listSize;
        return true;
    }
    return false;
}

//  Removing all elements from a list
function clear() {
    // delete all objects
    for (let i = 0; i < this.listSize; i++) {
        delete this.dataStore[i];
    }
    // delete array
    delete this.dataStore;
    this.dataStore.length = 0;
    this.listSize = this.listPos = 0;
}

// Set the current position to the front of the list (i.e., zero)
function front() {
    this.listPos = 0;
}

// Set the current position to the end of the list
function end() {
    this.listPos = this.listSize - 1;
}

// Decrement the current position of the list by one
function prev() {
    if (this.listPos > 0) {
        --this.listPos;
    }
}

// Increment the current position of the list by one
function next() {
    //console.log("this.listPos: " + this.listPos);
    if (this.listPos < this.listSize - 1) {
        ++this.listPos;
    }
}

// Return current position
// Postcondition: return current position of list as integer
function currPos() {
    //console.log("pos: " + this.listPos);
    return this.listPos;
}

// Move current position to specific number
function moveTo(position) {
    this.listPos = position;
}

// Return element at current position
// Postcondition: return element at current position
function getElement() {
    return this.dataStore[this.pos];
}

// Return element in list at the specified index
// Postcondition: return element at specified index
function getElementAt(index) {
    return this.dataStore[index];
}

// Precondition: indexes of two elements in a list
// swap two elements in the list
function swapElements(first_index, second_index) {
    if (first_index !== second_index && first_index < this.length() && second_index < this.length()) {
        let first_element = this.dataStore.splice(first_index, 1)[0];
        let second_element = this.dataStore.splice(second_index - 1, 1, first_element)[0];
        this.dataStore.splice(first_index, 0, second_element);
    }
}

// Precondition: two element objects (e.g., house, worktower, hospital)
// Calculate the distance between two infrastructural elements
// Postcondition: the total distance between the two infrastructural elements
function calculateDistance(element_1, element_2) {
    let x = Math.abs(element_1.posX - element_2.posX);
    let y = Math.abs(element_1.posY - element_2.posY);
    // return the total absolute distance
    return x + y;
}

/* Initialize associations between houses/apartments and all other infrastructural elements
    position (pos) of each list always refers to last OCCUPIED infrastructural element of list */
function initializeAssociations() {
    houseList.front();              // move to first house in list

    for (let i = 0; i < houseList.length(); i++) {
        let currHouse = houseList.getElementAt(i);
         // Check work towers
        swapClosestElementFromList(currHouse, i, workTowerList);
        // Check hospitals
        swapClosestElementFromList(currHouse, i, hospitalList);
        // Check parks
        swapClosestElementFromList(currHouse, i, parkList);
        // Check stores
        swapClosestElementFromList(currHouse, i, storeList);
        // increment house list
        houseList.next();                                           // increment to next house in houseList
    }
}
// Precondition: a house element, the index of the house element, and an element list (workTowerList, hospitalList, etc.)
// Calculate the distance between a house element and every element in a non-house element list and swap out
// the non-house element that is closest to the house element so that it is at the same index as the house element.
function swapClosestElementFromList(houseElement, houseIndex, elementList) {
    if (elementList.getElementAt(houseIndex) !== undefined) {
        elementList.moveTo(houseIndex);
        let minElementIndex = houseIndex;
        let elementDistance, minDistance = calculateDistance(houseElement, elementList.getElementAt(houseIndex));
        for (let i = houseIndex + 1; i < elementList.length(); i++) {
            elementList.next();
            elementDistance = calculateDistance(elementList.getElementAt(i), houseElement);   // Calculate distance to tower
            if (elementDistance < minDistance) {
                minDistance = elementDistance;
                minElementIndex = i;
            }
        }
        elementList.getElementAt(minElementIndex).people++;
        elementList.swapElements(houseIndex, minElementIndex);  // Swap elements
    }
}
// Postcondition: return total points
// Calculate the player's total points, based on CO2 emissions, # of associations, # of missing associations and
function calculatePoints() {
    let distance = 0, points = 0;                   // initial variables set to zero
    DRIVING_CO2 = 0;
    for (let i = 1; i < allLists.length; i++) {     // loop through all non-house elements
        let j, currHouse, currElement;
        for (j = 0; j < houseList.length(); j++) {  // Review only those elements that are associated with a house
            currHouse = houseList.getElementAt(j);
            currElement = allLists[i][0].getElementAt(j);
            if (currElement !== undefined) {
                distance += calculateDistance(currHouse, currElement);          // basic distance calculation
                // CO2 calculation based on 2019 Canada Fuel Guide
                DRIVING_CO2 += distance * CITY_BLOCK_LENGTH * FUEL_CONSUMPTION_L_PER_KM * KG_CO2_PER_LITRE * KG_CO2_IN_PPM;
                points += POINTS_PER_ASSOCIATION;       // Award points per association
            }
        }
    }
    let missing_association_points = calculateAssociationsAndLeftOvers()[3];        // points deducted for missing associations
    let total_points = [Math.round(INITIAL_POINTS + points - missing_association_points - DRIVING_CO2 - infrastructure_co2)]; // Total score
    let associated_points = calculateAssociationsAndLeftOvers();
    for (let scores in associated_points) {  // Push the associated scores
        total_points.push(associated_points[scores]);
    }

    return total_points;
}

// Calculate total number associations and leftovers between house and remaining infrastructural elements
// postcondition: return an array of length 4: total # of associations, total points awarded, total Leftover
// elements, and total points deducted.
function calculateAssociationsAndLeftOvers() {
    let totalAssociations = 0, totalLeftOvers = 0, totalPointsAwarded = 0, totalPointsDeducted = 0;
    for (let i = 1; i < allLists.length; i++) {         // loop through non-house element lists
        let j;
        for (j = 0; j < houseList.length(); j++) {      // check only those elements which are associated with a house
            let currElement = allLists[i][0].getElementAt(j);
            if (currElement !== undefined) {
                totalAssociations++;
                totalPointsAwarded += POINTS_PER_ASSOCIATION;   // award points based on # of associations
            }
        }
        // Calculate # of leftover elements with house associations
        for (j; j < allLists[i][0].length(); j++) {
            totalLeftOvers++;
            totalPointsDeducted += allLists[i][1];      // deduct points based on number of leftover elements * their CO2_emissions
        }
    }
    return [totalAssociations, totalPointsAwarded, totalLeftOvers, Math.abs(totalPointsDeducted)];
}

// Initial points and constants and CO2
let INITIAL_POINTS = 4000;
const POINTS_PER_ASSOCIATION = 25;      // each association of a house with another infrastructural element is equal to 25 points
var DRIVING_CO2;

// Create lists for all infrastructural elements
let houseList = new List();
let hospitalList = new List();
let storeList = new List();
let workTowerList = new List();
let parkList = new List();
let allLists = [[houseList, HOUSE_CO2], [workTowerList, WORK_TOWER_CO2], [hospitalList, HOSPITAL_CO2], [storeList, STORE_CO2], [parkList, PARK_CO2]];


// Create constants for fuel consumption
const CITY_BLOCK_LENGTH = 0.200;        // One city block is on average 200 m
const KG_CO2_PER_LITRE = 2.31;          // The average gasoline-powered engine produces 2.31 kg of CO2 per Litre
const FUEL_CONSUMPTION_L_PER_KM = 0.107;// The average city vehicle consumes 10.7 L of fuel per 100 km (2019 Fuel Consumption Guide)
const KG_CO2_IN_PPM = 7.80488;          // 410 ppm of CO2 is roughly equivalent to 3200 Gigatonnes of CO2
