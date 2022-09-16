const highscore = document.getElementById("highscore");
const timerBox = document.getElementById("timer");
const title = document.getElementById("title");
const desc = document.getElementById("desc");
const buttons = document.getElementsByClassName("buttons");
const textBox = document.getElementById("text");
const answer = document.getElementById("answer");
const questions = [
    {
        q:"1. Commonly used data types do not include",
        a:[
            "String",
            "Integer",
            "Object",
            "Complex Number"
        ], 
        c:"d"
    },{
        q:"2. Correct syntax for helloworld.py", 
        c:"print(\"Hello World!\")"
    },{
        q:"3. What's the worst type of error?",
        a:[
            "Syntax error",
            "Network error",
            "Exception",
            "Logic error"
        ], 
        c:"c"
    },{
        q:"What Question number is this?", 
        c:"4"
    },{
        q:"5. What's the third letter of the alphabet?",
        a:[
            "a: c",
            "b: a",
            "c: b",
            "d: d"
        ], 
        c:"d"
    },{
        q:"6. Where does a programmer drink?",
        a:[
            "Varsity Sports Bar",
            "The pub",
            "Foo Bar",
            "Home"
        ], 
        c:"c"
    },{
        q:"7. What's the object-oriented way to become wealthy?", 
        c:"inheritance"
    },{
        q:"Fantastic effort, please enter your name", 
        c:"your name"
    }
]
var qNum = -1;
var state = "start";
var score = 0;
var timer;

function countup() {
  
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
        score++;
        timerBox.innerText = "Timer: "+score;
    }, 500);
    return timeInterval;
}

Array.from(buttons).forEach(button => {
    button.classList.add("hide");
    button.addEventListener("click", buttonHandler)
});

highscore.addEventListener("click", () => {
    if (state == "highscores") {
        window.location.reload();
    }
    state = "highscores";
    buttonHandler();
    clearInterval(timer);
});

function buttonHandler(e="aaa") {
    if (state == "start") {
        state = "questions"
        qNum = 0;
        displayQuestion(questions[qNum]);
        timer = countup();
    } else if (state == "questions") {
        console.log(qNum);
        checkQuestion(questions[qNum], e.target.id);
        qNum++;
        if (qNum == questions.length) {
            console.log("done");
            clearInterval(timer);
            title.innerText = "Well Done";
            desc.innerText = "I promise it's done this time, even the timer stopped. \nPlease enter your name. or don't."
            state = "finished";
            return;
        }
        displayQuestion(questions[qNum]);
    } else if (state == "finished") {
        let highscores = JSON.parse(localStorage.getItem("highscores"))??{};
        console.log(highscores);
        if (textBox.value) {
            if (highscores[textBox.value]) {
                if (highscores[textBox.value] > score) {
                    highscores[textBox.value] = score
                }
            } else {
                highscores[textBox.value] = score
            }
            localStorage.setItem("highscores",JSON.stringify(highscores))
        }
        state = "highscores";
        buttonHandler();
    } else if (state == "highscores") {
        highscore.innerText = "Back";
        Array.from(buttons).forEach(button => {
            button.classList.add("hide");
        });
        title.innerText = "Highscores";
        desc.innerText = "A hall of fame if you will."
        let highscores = localStorage.getItem("highscores") ?? "{*cricket noises*}";
        answer.innerText = highscores.slice(1,-1).replaceAll(",","\n").replaceAll(":", " | ");
        textBox.classList.add("hide");
    }
}

function checkQuestion(q, a) {
    if (q.c == a || textBox.value == q.c) {
        answer.innerText = "Correct";
    } else {
        answer.innerText = "Incorrect +10"
        score += 10;
    }
    textBox.value = "";
}

function displayQuestion(q) {
    console.log(q)
    desc.innerText = q.q;
    if (q.a) {
        textBox.classList.add("hide");
        console.log("multiple choice");
        Array.from(buttons).forEach(button => {
            button.classList.remove("hide");
        });
        buttons.a.innerText = q.a[0];
        buttons.b.innerText = q.a[1];
        buttons.c.innerText = q.a[2];
        buttons.d.innerText = q.a[3];
    } else {
        textBox.classList.remove("hide");
        console.log("answer box");
        Array.from(buttons).forEach(button => {
            button.classList.add("hide");
        });
        buttons.d.classList.remove("hide");
        buttons.d.innerText = "Submit";
    }
}

buttons.a.classList.remove("hide");
buttons.a.innerText = "Start";

