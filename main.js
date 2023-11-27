const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this._field = field;
    this._positionX = 0; // current item in the current array
    this._positionY = 0; // current array we're on
    this._gameOver = false;
  }

  print() {
    const field = this._field.reduce((currentString, currentLine, index) => {
      if (index === 0) {
        currentString = currentLine.join("");
      } else {
        currentString += `\n${currentLine.join("")}`;
      }
      return currentString;
    }, "");
    console.log(field);
  }

  updateUserPath() {
    const currentRow = this._field[this._positionY];
    const currentValue = currentRow[this._positionX];
    if (currentValue === "O") {
      this._gameOver = true;
      console.log("Oops, try again!");
    } else if (currentValue === "^") {
      this._gameOver = true;
      console.log("Congratulations, you won!");
    } else {
      currentRow[this._positionX] = "*";
    }
  }

  move(direction) {
    switch (direction) {
      case "l":
        if (this._positionX !== 0) {
          this._positionX -= 1;
          this.updateUserPath();
        }
        break;
      case "r":
        if (this._positionX !== this._field[this._positionY].length) {
          this._positionX += 1;
          this.updateUserPath();
        }
        break;
      case "d":
        if (this._positionY !== this._field.length) {
          this._positionY += 1;
          this.updateUserPath();
        }
        break;
      case "u":
        if (this._positionY !== 0) {
          this._positionY -= 1;
          this.updateUserPath();
        }
        break;
      default:
        break;
    }
  }

  start() {
    while (!this._gameOver) {
      myField.print();
      let direction = null;
      direction = prompt("Which way?");
      if (direction) {
        myField.move(direction);
      }
    }
  }

  static getRandomFieldValue() {
    const values = [fieldCharacter, hole];
    const index = Math.floor(Math.random() * 2);
    return values[index];
  }

  static generateRow(width) {
    const row = [];
    while (row.length < width) {
      row.push(this.getRandomFieldValue());
    }
    return row;
  }

  static getRandomXCoord(maxX) {
    let X = Math.floor(Math.random() * maxX);
    if (X === 0) {
      return 1;
    }
    return X;
  }

  static getRandomYCoord(maxY) {
    let Y = Math.floor(Math.random() * maxY);
    if (Y === 0) {
      return 1;
    }
    return Y;
  }

  static generateField(height, width) {
    const field = [];
    const hatXCoord = this.getRandomXCoord(width);
    const hatYCoord = this.getRandomYCoord(height);
    while (field.length < height) {
      field.push(this.generateRow(width));
    }
    field[0][0] = pathCharacter;
    field[hatYCoord][hatXCoord] = hat;
    return field;
  }
}

const randomField = Field.generateField(8, 6);
const myField = new Field(randomField);

myField.start();
