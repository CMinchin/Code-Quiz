const title = document.getElementById("title");
const desc = document.getElementById("desc");
const buttons = document.getElementsByClassName("buttons");
const textBox = document.getElementById("text");
const answer = document.getElementById("answer");
const questions = [
    {
        q:"a",
        a:[
            "a",
            "b",
            "c",
            "d"
        ], 
        c:"a"
    },{
        q:"a", 
        c:"a"
    },{
        q:"a",
        a:[
            "a",
            "b",
            "c",
            "d"
        ], 
        c:"a"
    },{
        q:"a", 
        c:"a"
    },{
        q:"a",
        a:[
            "a",
            "b",
            "c",
            "d"
        ], 
        c:"a"
    },{
        q:"a", 
        c:"a"
    },{
        q:"a",
        a:[
            "a",
            "b",
            "c",
            "d"
        ], 
        c:"a"
    },{
        q:"a", 
        c:"a"
    }]
var qNum = -1;
var state = "start";
var a;

Array.from(buttons).forEach(button => {
    button.classList.add("hide");
    button.addEventListener("click", buttonHandler)
});

document.getElementById("highscore").addEventListener("click", () => {
    
});

function buttonHandler(e) {
    a = e;
    if (state == "start") {
        state = "questions"
        qNum = 0;
        displayQuestion(questions[qNum]);
    } else if (state == "questions") {
        checkQuestion(qNum, e.target.id);
        qNum++;
        displayQuestion(questions[qNum]);
    }
}

function checkQuestion(q,a) {
    if (questions[q].c == a) {
        answer.innerText = "Correct";
    } else {
        answer.innerText = "Incorrect +10"
    }
}

function displayQuestion(q) {
    console.log(q)
    if (q.a) {
        console.log("multiple choice");
        Array.from(buttons).forEach(button => {
            button.classList.remove("hide");
        });
        buttons.a.innerText = q.a[0];
        buttons.b.innerText = q.a[1];
        buttons.c.innerText = q.a[2];
        buttons.d.innerText = q.a[3];
    } else {
        console.log("answer box");
        Array.from(buttons).forEach(button => {
            button.classList.add("hide");
        });
    }
}

buttons.a.classList.remove("hide");
buttons.a.innerText = "Start";

