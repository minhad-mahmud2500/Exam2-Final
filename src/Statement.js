import stack from "./stack";
import DataTypes from "./misc/DataTypes";
import Assign from "./statements/Assign";
import Tokens from "./misc/Tokens";
import Declaration from "./statements/Declaration";
import Condition from "./statements/Condition";
import Loop from "./statements/Loop";
export default function Statement(statement = "") {
    statement = statement.trim();
    if (!statement)
        return;
    const firstWordRegex = statement.match(/^[a-zA-Z]* /g);
    if (!firstWordRegex)
        throw new Error("Invalid syntax");
    const firstWord = firstWordRegex[0].trim();
    if (DataTypes.has(firstWord)) {
        // declaration'
        Declaration(statement);
    }
    else if (firstWord == Tokens.REPEAT) {
        // while statement
        Loop(statement);
    }
    else if (firstWord == Tokens.COND) {
        // if statement
        Condition(statement);
    }
    else if (stack[firstWord] != undefined) {
        Assign(statement);
        // is an assigny operator
    }
    else {
        // throw error
        throw new Error(`${firstWord} isn't defined`);
    }
}