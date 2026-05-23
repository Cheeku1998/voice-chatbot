const API_KEY = "AIzaSyBUbhEKM3y3Fb1IaAvHPfTU1R8pMvAxskQ";

async function generateResponse(userMessage) {

    try {

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: userMessage,
                                },
                            ],
                        },
                    ],
                }),
            }
        );

        const data = await response.json();

        console.log(data);

        if (
            data.candidates &&
            data.candidates.length > 0
        ) {
            return data.candidates[0].content.parts[0].text;
        }

        return "No response from AI";

    } catch (error) {

        console.error(error);

        return "Error generating response";
    }
}

async function sendMessage() {

    const messageInput =
        document.getElementById("message");

    const reply =
        document.getElementById("reply");

    const userMessage =
        messageInput.value.trim();

    if (userMessage === "") return;

    reply.innerHTML = "Thinking...";

    const botReply =
        await generateResponse(userMessage);

    reply.innerHTML = botReply;

    // Voice response
    const speech =
        new SpeechSynthesisUtterance(botReply);

    speechSynthesis.speak(speech);

    messageInput.value = "";
}

function startVoice() {

    const recognition =
        new webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.onresult = function (event) {

        const voiceText =
            event.results[0][0].transcript;

        document.getElementById("message").value =
            voiceText;

        sendMessage();
    };

    recognition.start();
}
