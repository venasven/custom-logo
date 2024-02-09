const inquirer = require("inquirer");
const SVG = require("./svg");
const { Circle, Triangle, Square } = require("./shapes");
const { writeFile } = require("fs/promises");

class CLI {
  run() {
    return inquirer
      .prompt([
        {
          name: "text",
          type: "input",
          message:
            "Enter text for the logo. (Must not be more than 3 characters.)",
          validate: (text) =>
            text.length <= 3 ||
            "The message must not contain more than 3 characters",
        },
        {
          name: "color",
          type: "input",
          message: "Enter a text color",
        },
        {
          name: "typeShape",
          type: "list",
          message: "Select a shape for the logo",
          choices: ["circle", "square", "triangle"],
        },
        {
          name: "colorShape",
          type: "input",
          message: "Enter a shape color",
        },
      ])
      .then(({ text, color, typeShape, colorShape }) => {
        let shape;
        switch (typeShape) {
          case "circle":
            shape = new Circle();
            break;

          case "square":
            shape = new Square();
            break;

          default:
            shape = new Triangle();
            break;
        }
        shape.setColor(colorShape);

        const svg = new SVG();
        svg.setText(text, color);
        svg.setShape(shape);
        return writeFile("logo.svg", svg.render());
      })
      .then(() => {
        console.log("Generated logo.svg");
      })
      .catch((error) => {
        console.log(error);
        console.log("Oops! Something went wrong.");
      });
  }
}

module.exports = CLI;