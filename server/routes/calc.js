var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
    console.log("works?!");
    var dataPosted = req.body;
    buildEquasion(dataPosted.input);

    var displayOutput = {
        display: buildDisplay(equasionArray)
    };
    res.send(displayOutput);

});

var output = "";
var equasionArray = [];

function clearAll() {
    equasionArray = [];
    console.log("cleared equasion + output");
}

function solve() {
    //complicates things because of parenthese + carat.
    console.log(equasionArray);
    var solveable = "";
    equasionArray = ["answer", eval(buildDisplay(equasionArray))];
    //----------- was trying to build function that would take caratkeys to heart..
    //----------- idk ima just remove them probably.
    // var idArray = buildEmptyID();
    // idArray = fillArrayIDs(idArray);
    // checkCaratKeys(idArray);
    // var answer = eval(buildDisplay(equasionArray));
    // equasionArray = [];
    // equasionArray[0] = answer;
    // //find caratKey()
    // //send "solved equasion" object param to display "history"
    // function checkCaratKeys(idList) {
    //
    //     // if carat
    //     // look at last id
    //     // fallow last id until its id-1
    //     // save first + last
    //     // build new equasion
    //     // check for more carats.
    //     var updateEquasion = [];
    //     var numberOfCarats = 0;
    //     var caratPower = 0;
    //     //counts carrats
    //     equasionArray.forEach(function(variable, i) {
    //         if (variable == "carat") {
    //             numberOfCarats++;
    //         }
    //     });
    //     while (numberOfCarats > 0) {
    //         var splice = [];
    //         var toCarat = [];
    //         equasionArray.forEach(function(variable, q) {
    //             if (variable == "carat") {
    //                 var caratPower = parseInt(equasionArray[q + 1]);
    //                 equasionArray[q] = "";
    //                 //if caratPower = "(" || nonInt -> fuckin more logic.
    //                 var parentheseID = q - 1;
    //                 var searchID = 0;
    //                 for (var j = parentheseID; j >= 0; j--) {
    //                     searchID = idList[parentheseID];
    //                     if (searchID == idList[j]) {
    //                         splice.push(j);
    //                     }
    //                 }
    //                 splice.forEach(function(idIndex, w) {
    //                     if (w != splice.count) {
    //                         toCarat[splice.count - 1] = equasionArray.splice(idIndex, 1);
    //                     } else {
    //                         toCarat[splice.count - 1] = equasionArray.splice(idIndex, 1, "here");
    //                     }
    //                 });
    //                 for (var x = caratPower; x > 1; x--) {
    //                     toCarat.forEach(function(variable, y) {
    //                         if (y == 0) {
    //                             toCarat.push("multiply");
    //                         }
    //                         if (y != toCarat.length - 1) {
    //                             toCarat.push(toCarat[y]);
    //                         }
    //                     });
    //
    //                 }
    //                 var caratValue = buildDisplay(toCarat);
    //                 console.log(caratValue);
    //                 caratValue = eval(caratValue);
    //
    //                 equasionArray.forEach(function(variable, f) {
    //                     if (variable == "here") {
    //                         equasionArray.splice(f, 1, caratValue);
    //                     }
    //                 });
    //                 numberOfCarats--;
    //
    //             }
    //         });
    //
    //     }
    //
    //
    //
    //
    //
    //
    //
    //
    // }
    // function buildEmptyID() {
    //     var blankIDArray = [];
    //     equasionArray.forEach(function() {
    //         blankIDArray.push(0);
    //     });
    //     return blankIDArray;
    // }
    // function fillArrayIDs(blankArray) {
    //     var filledArray = blankArray;
    //     var id = 1;
    //     equasionArray.forEach(function(variable, i) {
    //
    //         if (variable == "openingParenthese") {
    //             id++;
    //             filledArray[i] = id;
    //         } else if (variable == "closingParenthese") {
    //             filledArray[i] = id;
    //             id++;
    //         } else {
    //             filledArray[i] = id;
    //         }
    //     });
    //     return filledArray;
    // }




}

function makeLastNegetive(lastType) {
    if (lastType != "opperator") {
        equasionArray[equasionArray.length - 1] = equasionArray[equasionArray.length - 1] * -1;
    }
}

function buildEquasion(input) {
    //builds equasionArray and returns an output to be displayed
    if (equasionArray.length === 0 && checkType(input) == "isNum") {
        equasionArray.push(input);

    } else if (equasionArray.length === 0 && input == "openingParenthese") {
        equasionArray.push(input);
    } else {
        var lastType = checkType(equasionArray[equasionArray.length - 1]);
        switch (checkType(input)) {
            case "isNum":

                appendNum(input, lastType);
                break;
            case "opperator":
                if (equasionArray.length !== 0) {
                    appendOpperators(input, lastType);
                }
                break;

            case "action":
                switch (input) {
                    case "clear":
                        clearAll();
                        break;
                    case "negetive":
                        makeLastNegetive(lastType);
                        break;
                    case "equals":
                        solve();
                        break;
                }
                break;
            default:
                console.log("input type not accounted for");
        }
    }
    return output;
}

function appendOpperators(input, lastType) {
    var lastTypeID = equasionArray[equasionArray.length - 1];
    console.log("before if:", equasionArray.length, equasionArray);

    switch (input) {
        case "closingParenthese":
            if (lastTypeID == "closingParenthese") {
                equasionArray.push(input);
            } else if (lastTypeID == "openingParenthese") {
                //do nothing
            } else if (lastType == "isNum") {
                equasionArray.push(input);
            } else if (lastType == "opperator") {
                //do nothing
            }
            break;
        case "openingParenthese":
            if (lastTypeID == "closingParenthese") {
                equasionArray.push("multiply");
                equasionArray.push(input);
            } else if (lastTypeID == "openingParenthese") {
                //do nothing
            } else if (lastType == "isNum") {
                equasionArray.push("multiply");
                equasionArray.push(input);
            } else if (lastType == "opperator") {
                equasionArray.push(input);
            }
            break;
        default:
            if (lastType == "opperator") {
                if (lastTypeID != "closingParenthese") {
                    equasionArray[equasionArray.length - 1] = input;
                } else {
                    equasionArray.push(input);
                }
            } else {
                if (lastTypeID == "closingParenthese") {
                    equasionArray.push("multiply");
                    equasionArray.push(input);
                } else {
                    equasionArray.push(input);
                }
            }
    }

}

function appendNum(input, lastType) {
    if (lastType == "isNum") {
        equasionArray[equasionArray.length - 1] += input;
    } else if (equasionArray[equasionArray.length - 1] == "closingParenthese") {
        equasionArray.push("multiply");
        equasionArray.push(input);
    } else {
        equasionArray.push(input);
    }
}

function buildDisplay(equasion) {
    if (equasion[0] == "answer") {
        output = equasion[1];
        equasionArray = [];
    }
    var output = "";
    equasion.forEach(function(variable, i) {
        if (checkType(variable) == "isNum") {
            output += variable; // + "*1";
        } else if (checkType(variable) == "opperator") {

            switch (variable) {
                case "subtract":
                    output += "-";
                    break;
                case "divide":
                    output += "/";
                    break;
                case "multiply":
                    output += "*";
                    break;
                case "add":
                    output += "+";
                    break;
                case "caratKey":
                    output += "^";
                    break;
                case "closingParenthese":
                    output += ")";
                    break;
                case "openingParenthese":
                    output += "(";
                    break;
                case "carat":
                    output += "^";
                    break;

                default:
                    output += "??";
                    console.log("opperator not defined");
                    break;

            }
        } else {
            console.log("?? something happened in buildDisplay()");
        }

    });
    if (output === "") {
        output = "0";
    }
    return output;
}







function checkType(input) {
    if (input * -1 >= 0 || input * -1 <= 0) {
        return "isNum";
    } else if (input == "equals" || input == "negetive" || input == "clear") {
        return "action";
    } else {
        var type = "";
        var opperators = ["carat", "add", "subtract", "divide", "multiply", "openingParenthese", "closingParenthese", "caratKey"];
        opperators.forEach(function(opperator, i) {
            if (input == opperator) {
                type = "opperator";
            }
        });
        if (type == "opperator") {
            return type;
        } else {
            console.log(input);
            console.log("type is wrong");
            return type;
        }
    }
}
module.exports = router;
