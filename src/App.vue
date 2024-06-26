<template>
  <div>
    <upload></upload>
    <div>{{ responseText }}</div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import Upload from "./components/upload.vue";

// Define reactive variables
const responseText = ref("");

// Function to handle file upload event

// Fetch data function
const HealthCheck = async () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch("http://localhost:80/", requestOptions);
    const result = await response.text();
    console.log(result);
    responseText.value = result; // Update responseText with fetched data
  } catch (error) {
    console.error(error);
  }
};

// Watch for changes in responseText
watch(responseText, (newVal) => {
  console.log("Response Text changed:", newVal);
  // Optionally, you can perform additional actions when responseText changes
});

// Fetch initial data on component mount
onMounted(() => {
  // HealthCheck();
});
</script>

<style scoped>
/* Add scoped styles here if necessary */
</style>
