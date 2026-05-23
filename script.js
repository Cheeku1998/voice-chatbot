const API_KEY = "AIzaSyCjeT5u8YdGfK-0xvIQajVS1PShqAmvkhI";

async function sendMessage() {

    const input =
    document.getElementById("message");

    const message = input.value;

    if(message === ""){
        return;
    }

    document.getElementById("reply")
    .innerHTML = "Thinking...";

    try {

        const response = await fetch(

        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,

        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                contents: [
                    {
                        parts: [
                            {
                                text: message
                            }
                        ]
                    }
                ]

            })

        });

        const data = await response.json();

        console.log(data);

        if(data.candidates){

            const reply =
            data.candidates[0]
            .content.parts[0].text;

            document.getElementById("reply")
            .innerHTML = reply;

            speak(reply);

        } else {

            document.getElementById("reply")
            .innerHTML =
            "No response from AI";

            console.log(data);

        }

    } catch(error){

        console.log(error);

        document.getElementById("reply")
        .innerHTML =
        "Error connecting to AI";

    }

}

function speak(text){

    const speech =
    new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";

    speechSynthesis.speak(speech);

}

function startVoice(){

    const recognition =
    new webkitSpeechRecognition();

    recognition.start();

    recognition.onresult = function(event){

        const voiceText =
        event.results[0][0].transcript;

        document.getElementById("message")
        .value = voiceText;

    };

}
