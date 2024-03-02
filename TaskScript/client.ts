import { SchoolMarkdownLoadTasks } from "./src/service/school/SchoolMarkdownLoadTasks";
import * as fs from "fs";

require("dotenv").config();

const MD_FILEPATH = "/Users/borkson/Vaults/SS ARIZONA/Notes/School/Winter 2023/SchoolTodoData.md";
const SERVER_URL = "https://api.msborkson.com/api/taskscript";

const sync = async () => {
    // Open the markdown file
    const viewLoader = new SchoolMarkdownLoadTasks(MD_FILEPATH);
    const tasks = await viewLoader.loadTasks();
    
    const completedTasks = {
        "tasks": tasks.filter(task => task.status === "completed")
    }

    const jsonString = JSON.stringify(completedTasks, null, 4);
    console.log(jsonString);

    // Send request to server
    const response = await fetch(SERVER_URL + "/sync", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": process.env.API_KEY ?? ""
        },
        body: jsonString
    });

    const json = await response.json();
    //console.log(json);
    
    const md_string = json["message"];
    fs.writeFileSync(MD_FILEPATH, md_string);
}

const update = async () => {
    const response = await fetch(SERVER_URL + "/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": ""//SILLY MAX
        }
    });

    const json = await response.json();
    console.log(json);
};


const main = async () => {
    // Read cli arguments
    let command = process.argv.indexOf("--sync") !== -1 ? "sync" : undefined;
    command = process.argv.indexOf("--update") !== -1 ? "update" : command;

    if (command === undefined) {
        console.log("No command given");
        return;
    }

    switch (command) {
        case "sync":
            await sync();
            break;
        case "update":
            await update();
            break;
    }
}

main();
