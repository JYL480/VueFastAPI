<template>
  <div>
    <h2>
      Mini Food Classification Application: Pizza 🍕, Sushi 🍣 and Steak 🥩
    </h2>
    <div>
      <h3>Steps:</h3>
      <ol>
        <li>Choose an image of a food item</li>
        <li>Click on Upload Image</li>
        <li>Predict!</li>
      </ol>
    </div>
    <h3>Try it out!</h3>

    <div class="input-container">
      <div class="card flex justify-content-center">
        <Toast />
        <FileUpload
          mode="basic"
          type="file"
          accept="image/*"
          ref="fileInput"
          name="file"
          @upload="onUpload"
        />
      </div>
      <Button
        label="Upload Image"
        type="button"
        value="Upload Image"
        name="submit"
        @click="uploadImage"
        raised
      />
      <Button label="Predict" @click="getPrediction" raised />
    </div>

    <div v-if="predictionMessage" class="prediction-message">
      <h2>Prediction:</h2>
      {{ predictionMessage }}
    </div>
    <div v-if="imageUrl" class="uploaded-image">
      <h3>Uploaded Image:</h3>
      <img :src="imageUrl" alt="Uploaded Image" style="max-width: 100%" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Create references for the file input and the prediction message
const fileInput = ref(null);
const predictionMessage = ref("");
const imageUrl = ref(null); // To store the URL of the uploaded image

const onUpload = () => {
  toast.add({
    severity: "info",
    summary: "Success",
    detail: "File Uploaded",
    life: 3000,
  });
};

const uploadImage = async () => {
  const file = fileInput.value.files[0];
  console.log(file);
  if (!file) {
    alert("Please select a file to upload.");
    return;
  }
  const formData = new FormData();
  formData.append("file", file);
  try {
    // Use the fetch API to send the form data to the server
    const response = await fetch("http://127.0.0.1:80/upload", {
      method: "POST",
      body: formData,
    });

    // Parse the response from the server
    const result = await response.json();
    alert(result.message);
    imageUrl.value = result.imageUrl; // Assuming the server returns the URL of the uploaded image
  } catch (error) {
    alert("There was an error uploading the file.");
  }
};

const getPrediction = async () => {
  if (!fileInput.value.files[0]) {
    alert("Please select a file to upload.");
    return;
  }
  try {
    const response = await fetch("http://127.0.0.1:80/predict", {
      method: "POST",
    });
    const result = await response.json();
    predictionMessage.value = `Food: ${result.Message}, Time taken: ${result.Time}`;
    // const obj = JSON.parse(result);
    // console.log(obj);
    // predictionMessage.value = obj;
  } catch (error) {
    alert("There was an error uploading the file.");
  }
};
</script>
<style scoped>
.input-container {
  display: flex;
  align-items: center;
  gap: 10px; /* Adjust the gap as needed */
}

.card {
  /* Styles for the card component if necessary */
}

/* Additional styling as needed */
</style>
