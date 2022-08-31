/**********/
/* m@nish */
/**********/
const fs = require("fs");

fs.readFile("Arduino_VScode.json", (err, data) => {
  if (!err) {
    let json_data = JSON.parse(data);
    // console.log(json_data);
    let json_sublime = {
      scope: "source.c",
      completions: [],
    };
    // iterate it
    for (let key in json_data) {
      if (json_data.hasOwnProperty(key)) {
        let Trigger = json_data[key].prefix;
        let Content = json_data[key].body.slice(0, -2);
        let Annotation = json_data[key].description;

        let newCompletion = {
          trigger: Trigger,
          contents: Content,
          annotation: Annotation,
          kind: "markup",
        };
        // push it ^-^
        json_sublime.completions.push(newCompletion);
      }
    }
    // console.log(json_sublime);
    let stringified_data = JSON.stringify(json_sublime);
    // write it in new file
    fs.writeFile(
      "Arduino_Sublime.sublime-completions",
      stringified_data,
      (err) => {
        if (err) console.log("Error generating file!");
        console.log(
          "Generated" +
            json_sublime.completions.length +
            "completions Successfully!"
        );
      }
    );
  } else {
    console.log("Error accessing .json file");
  }
});
