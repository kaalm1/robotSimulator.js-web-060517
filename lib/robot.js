'use strict';

var directions = {
  north: {
    L: "west",
    R: "east"
  },
  south: {
    L: "east",
    R: "west"
  },
  east: {
    L: "north",
    R: "south"
  },
  west: {
    L: "south",
    R: "north"
  }
}

function Robot() {

  this.orient = function(currentDirection) {

    if (Object.keys(directions).includes(currentDirection)) {
      this.bearing = currentDirection
    } else {
      throw new Error("Invalid Robot Bearing")
    }

  }
  this.turnLeft = function() {
    this.bearing = directions[this.bearing].L
  }
  this.turnRight = function() {
    this.bearing = directions[this.bearing].R
  }
  this.at = function(x, y) {
    this.coordinates = [x,y]
  }

  this.advance = function() {
    switch(this.bearing) {
      case "north" :
          this.coordinates = [this.coordinates[0], this.coordinates[1] + 1]
          break;
      case "south" :
          this.coordinates = [this.coordinates[0], this.coordinates[1] - 1]
          break;
      case "east" :
          this.coordinates = [this.coordinates[0] + 1, this.coordinates[1]]
          break
      case "west" :
        this.coordinates = [this.coordinates[0] - 1, this.coordinates[1]]
    }
  }

  this.instructions = function(str) {
    let arr = []

    for (let i = 0; i < str.length; i++) {

      if (str[i] === "R") {
        arr.push("turnRight")
      } else if (str[i] === "L") {
        arr.push("turnLeft")
      } else if (str[i] === "A") {
        arr.push("advance")
      }

    }
    return arr
  }

  this.place = function(args) {
    this.at(args.x, args.y)
    this.orient(args.direction)
  }

  this.evaluate = function(str) {
    let robot = this
     this.instructions(str).forEach(function(element){
       robot[element]()
     });
  }

}
