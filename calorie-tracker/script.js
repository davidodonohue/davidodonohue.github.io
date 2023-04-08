const scanButton = document.getElementById('scanButton');
const nutritionForm = document.getElementById('nutritionForm');

// Function to capture an image from the video stream
function captureImage(video) {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

// Function to display the captured image (for debugging purposes)
function displayCapturedImage(imageData) {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext('2d');
  ctx.putImageData(imageData, 0, 0);

  document.body.appendChild(canvas); // Add the canvas to the DOM for debugging
}
  
// Function to apply edge detection
function applyEdgeDetection(imageData) {
  const grayImageData = new jsfeat.matrix_t(imageData.width, imageData.height, jsfeat.U8_t | jsfeat.C1_t);
  jsfeat.imgproc.grayscale(imageData.data, imageData.width, imageData.height, grayImageData);
  jsfeat.imgproc.gaussian_blur(grayImageData, grayImageData, 3);
  jsfeat.imgproc.canny(grayImageData, grayImageData, 20, 80);

  const rgbaArray = new Uint8ClampedArray(imageData.width * imageData.height * 4);
  for (let i = 0, j = 0; i < grayImageData.data.length; i++, j += 4) {
    rgbaArray[j] = rgbaArray[j + 1] = rgbaArray[j + 2] = grayImageData.data[i];
    rgbaArray[j + 3] = 255;
  }

  const edgeDetectedImageData = new ImageData(rgbaArray, imageData.width, imageData.height);
  return edgeDetectedImageData;
}


  
// Function to apply OCR
async function applyOCR(imageData) {
  const { data } = await Tesseract.recognize(imageData, 'eng', {
    workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@2.1.5/dist/worker.min.js',
    langPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@2.1.5/lang-data',
    corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js@2.1.5-core/tesseract-core.wasm.js',
  });
  return data.text;
}


  function extractNutritionInfo(ocrText) {
    const regexMapping = {
      servingSize: /(?:serving size|serving per package)[\s\S]*?(\d+\.?\d*)\s*g/i,
      carbs: /(?:total carbohydrate|carbohydrates)[\s\S]*?(\d+\.?\d*)\s*g/i,
      protein: /protein[\s\S]*?(\d+\.?\d*)\s*g/i,
      fat: /(?:total fat|fat)[\s\S]*?(\d+\.?\d*)\s*g/i
    };
  
    const extractedInfo = {};
  
    for (const [key, regex] of Object.entries(regexMapping)) {
      const match = ocrText.match(regex);
      if (match) {
        extractedInfo[key] = parseFloat(match[1]);
      } else {
        extractedInfo[key] = null;
      }
    }
  
    return extractedInfo;
  }
  
  
  // Handle scan button click
  scanButton.addEventListener('click', async () => {
    try {
      // Access camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
  
      // Capture image after a delay (allowing time for the camera to focus)
      setTimeout(async () => {
        const imageData = captureImage(video);
        video.pause();
        stream.getTracks()[0].stop();
          
        displayCapturedImage(imageData);
  
        // Apply edge detection
        const edgeDetectedImageData = applyEdgeDetection(imageData);
  
        // Apply OCR
        const text = await applyOCR(edgeDetectedImageData);
  
        // Extract nutrition information from the OCR result
        console.log('OCR Result:', text);
        const extractedInfo = extractNutritionInfo(text);
        console.log('Extracted Nutrition Info:', extractedInfo);
      
        // Update the form inputs with the extracted values
        if (extractedInfo.servingSize !== null) {
          document.getElementById('servingSize').value = extractedInfo.servingSize;
        }
        if (extractedInfo.carbs !== null) {
          document.getElementById('carbs').value = extractedInfo.carbs;
        }
        if (extractedInfo.protein !== null) {
          document.getElementById('protein').value = extractedInfo.protein;
        }
        if (extractedInfo.fat !== null) {
          document.getElementById('fat').value = extractedInfo.fat;
        }
      }, 2000); // Adjust the delay as needed
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  });

  // Handle form submit
  nutritionForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const foodName = document.getElementById('foodName').value;
    const servingSize = parseFloat(document.getElementById('servingSize').value);
    const carbs = parseFloat(document.getElementById('carbs').value);
    const protein = parseFloat(document.getElementById('protein').value);
    const fat = parseFloat(document.getElementById('fat').value);
  
    const nutritionInfo = {
      foodName,
      servingSize,
      carbs,
      protein,
      fat
    };
  
    console.log(nutritionInfo);
    // Save the nutritionInfo object, for example, in local storage or send it to a server
  
    // Reset form
    nutritionForm.reset();
  });
