const textArea = document.getElementById("text_to_summarize");

const submitButton = document.getElementById("submit-button");

const generateImageButton = document.getElementById("generate-img-submit-button");

textArea.addEventListener("input", verifyTextLength);

submitButton.addEventListener("click", submitData);

generateImageButton.addEventListener("click", displayImage);
// First, we disable the submit button by default when the user loads the website.
submitButton.disabled = true;

// Next, we define a function called verifyTextLength(). This function will be called when the user enters something in the text area. It receives an event, called ‘e’ here
function verifyTextLength(e) {

  // The e.target property gives us the HTML element that triggered the event, which in this case is the textarea. We save this to a variable called ‘textarea’
  const textarea = e.target;

  // Check if the text in the text area is the right length - between 200 and 100,000 characters
  if (textarea.value.length > 200 && textarea.value.length < 100000) {
    // If it is, we enable the submit button.
    submitButton.disabled = false;
  } else {
    // If it is not, we disable the submit button.
    submitButton.disabled = true;
  }
}

function submitData(e) {

  // This is used to add animation to the submit button
  submitButton.classList.add("submit-button--loading");
  document.getElementById('result').replaceChildren();
  const summarizedTextArea=document.createElement('textArea');
  document.getElementById('result').appendChild(summarizedTextArea);
  const text_to_summarize = textArea.value;

  // INSERT CODE SNIPPET FROM POSTMAN BELOW
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer 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");

  const raw = JSON.stringify({
    "text_to_summarize": text_to_summarize
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  // Send the text to the server using fetch API

  // Note - here we can omit the “baseUrl” we needed in Postman and just use a relative path to “/summarize” because we will be calling the API from our Replit!  
  fetch('/summarize', requestOptions)
    .then(response => response.text()) // Response will be summarized text
    .then(summary => {
      // Do something with the summary response from the back end API!

      // Update the output text area with new summary
      summarizedTextArea.value = summary;

      // Stop the spinning loading animation
      submitButton.classList.remove("submit-button--loading");
      flag=0;

    })
    .catch(error => {
      console.log(error.message);
    });
}

// function generateImg(e) {
//   summarizedTextArea.style.visibility = "hidden";
//   generateImageButton.classList.add("submit-button--loading");
//   const text_to_summarize = textArea.value;
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append("Authorization", "Bearer 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");

//   const raw = JSON.stringify({
//     "text_to_summarize": text_to_summarize
//   });

//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow"
//   };

//   fetch("/generateImg", requestOptions)
//     .then((response) => response.blob())
//     .then((blob) => URL.createObjectURL(blob))
//     .then((url) => {
//       image.src = url;
//       generateImageButton.classList.remove("submit-button--loading");
//     })
//     .catch((error) => console.error(error));
// }

async function query(payload) {
  const API_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell";
  const headers = {
    "Authorization": "Bearer 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",
    "Content-Type": "application/json"
  };
  console.log(payload);
  const response = await fetch(API_URL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.arrayBuffer();
}


async function displayImage() {
  console.log("display!!");
  generateImageButton.classList.add("submit-button--loading");
  document.getElementById('result').replaceChildren();
  const image=document.createElement('img');
  document.getElementById('result').appendChild(image);
  try {
    const imageBytes = await query({
      "inputs": textArea.value
    });
    const blob = new Blob([imageBytes], { type: 'image/png' });
    const imageUrl = URL.createObjectURL(blob);
    image.src = imageUrl;
    generateImageButton.classList.remove("submit-button--loading");

  } catch (error) {
    console.error('Error fetching image:', error);
  }
}

// Call the function to fetch and display the image
