// self.onmessage = function(data) {
//     // Receive data from the main thread
//     // var data = data;

//     // Perform some computation or task
//     var result = data * 2;

//     // Send the result back to the main thread
//     self.postMessage(result);
// };

/// <reference lib="webworker" />

function isDominantColorBackground(imageData, outputData, pgNo, callback, threshold) {
  const data = imageData.data;
  // Sobel kernels for edge detection
  let Gx = [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1]
  ];

  let Gy = [
      [-1, -2, -1],
      [ 0,  0,  0],
      [ 1,  2,  1]
  ];
  const colorMap = new Map();

  for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];
      const a = data[i + 3];

      if(r >= 238) {
        r = 255;
      }
      if(g >= 238) {
        g = 255;
      }
      if(b >= 238) {
        b = 255;
      }
      // Only consider fully opaque pixels
      if (a === 255) {
          const colorKey = `${r},${g},${b}`;
          if (colorMap.has(colorKey)) {
              colorMap.set(colorKey, colorMap.get(colorKey) + 1);
          } else {
              colorMap.set(colorKey, 1);
          }
      }
  }

  let dominantColor = null;
  let dominantColorCount = 0;
  colorMap.forEach((count, colorKey) => {
      if (count > dominantColorCount) {
          dominantColor = colorKey;
          dominantColorCount = count;
      }
  });

  const totalPixels = (data.length / 4);
  const dominantColorProportion = dominantColorCount / totalPixels;
  let isBackgroundDominant = dominantColorProportion > threshold;

  // sachin for Generic_eVewer7_5261: Blank Page detection: s2-P2
  if(dominantColorProportion > .98 && isBackgroundDominant) {
    applySobel(imageData, outputData, Gx, Gy);
    let edgePixels = 0;
    for (let i = 0; i < outputData.length; i += 4) {
        if (outputData[i] > 0) { // Check if the pixel is an edge
            edgePixels++;
        }
    }

    // Set a threshold (e.g., 1% of the total pixels) to determine if it's blank
    if (edgePixels / (imageData.width * imageData.height) < 0.005) {
        isBackgroundDominant = true;
    } else {
        isBackgroundDominant = false;
    }
  }
  callback(pgNo, isBackgroundDominant, dominantColor, dominantColorProportion);
}

function detectBlankPages(imageData, pageNo, outputData){
  let detected;
  isDominantColorBackground(imageData, outputData, pageNo, function(pgNo, isDominant, dominantColor, proportion) {
    // sachin for Generic_eVewer7_5207 : Blank Page detection : S2-P2
    if (isDominant & proportion > .98) {
      console.log("Page: " + pgNo + `The image is considered blank because the most dominant color (${dominantColor}) occupies ${proportion * 100}% of the image.`);
      detected = true;
    } else {
      console.log("Page: " + pgNo + "The image is not considered blank.");
      detected = false;
    }
  }, 0.98);
  return detected;
}

  addEventListener('message', ({ data }) => {
    const response = {isBlank: this.detectBlankPages(data.imageData, data.pageNo, data.outputData), pageNo: data.pageNo};
    postMessage(response);
  });

  function applySobel(imageData, outputData, Gx, Gy) {
    let width = imageData.width;
    let height = imageData.height;

    // Loop through each pixel (ignoring the border pixels)
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let sumX = 0;
            let sumY = 0;

            // Apply Sobel kernel to the current pixel
            for (let ky = 0; ky < 3; ky++) {
                for (let kx = 0; kx < 3; kx++) {
                    let px = (x + kx - 1);
                    let py = (y + ky - 1);
                    let pixelIndex = (py * width + px) * 4;
                    let r = imageData.data[pixelIndex]; // Red
                    let g = imageData.data[pixelIndex + 1]; // Green
                    let b = imageData.data[pixelIndex + 2]; // Blue
                    let intensity = (r + g + b) / 3; // Convert to grayscale

                    sumX += Gx[ky][kx] * intensity;
                    sumY += Gy[ky][kx] * intensity;
                }
            }

            // Calculate the magnitude of the gradient
            let magnitude = Math.sqrt(sumX * sumX + sumY * sumY);
            magnitude = Math.min(255, magnitude); // Clamp the value to max 255

            // Set the output pixel
            let outputIndex = (y * width + x) * 4;
            outputData[outputIndex] = magnitude;        // Red
            outputData[outputIndex + 1] = magnitude;    // Green
            outputData[outputIndex + 2] = magnitude;    // Blue
            outputData[outputIndex + 3] = 255;          // Alpha (opaque)
        }
    }

    return outputData;
  }