const infoBtn = document.querySelector(".med-info-btn");
const returnBtn = document.querySelector(".info-back-btn");
const wrapper = document.querySelector(".wrapper");
const toggleBtn = document.getElementById("info-btn");

const switchScreen = () => {
  wrapper.classList.toggle("show-home-screen");
}

infoBtn.addEventListener("click",switchScreen);
returnBtn.addEventListener("click",switchScreen);



/* Add Photo Functions */

const medImg = document.getElementById("med-img");
const imgInput = document.getElementById("img-input");

imgInput.addEventListener("change", uploadImgFN);

function uploadImgFN() {
  if (imgInput.files && imgInput.files[0]) {
    const reader = new FileReader();
    
    reader.onload = function(event) {
      medImg.src = event.target.result;
      
      try {
        const medicineId = new URLSearchParams(window.location.search).get("id");
        if (medicineId) {
          const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
          const taskIndex = tasks.findIndex(task => task.id == medicineId);
          
          if (taskIndex !== -1) {
            tasks[taskIndex].imageData = event.target.result;
            localStorage.setItem("tasks", JSON.stringify(tasks));
          }
        }
      } catch (error) {
        console.error("Error saving image data:", error);
      }
    };
    
    reader.readAsDataURL(imgInput.files[0]);
  }
}

function loadSavedImage() {
  try {
    const medicineId = new URLSearchParams(window.location.search).get("id");
    if (medicineId) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const selectedTask = tasks.find(task => task.id == medicineId);
      
      if (selectedTask && selectedTask.imageData) {
        medImg.src = selectedTask.imageData;
      }
    }
  } catch (error) {
    console.error("Error loading saved image:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadSavedImage);

const renderDetails = () => 
{
  const categoryTasks = tasks.filter(
    (task) =>
      task.category.toLowerCase() === selectedCategory.title.toLowerCase()
  );
  categoryTasks.forEach((task) => {
    const div = document.createElement("div");
    div.classList.add("info-wrapper");
    div.innerHTML = `
    <div class="image-wrapper">
      <img src="no-image.jpg" id="med-img">
    </div>
    <div class="img-input-box">
      <div>
        <label for="img-input">
          Upload Image
        </label>
      </div>
      <input type="file" accept="image/jpg, image/jpeg, image/png" id="img-input">
    </div>
    <div class="med-details">
      <br>
      Name: ${task.id}
      <br> 
      Type: ${task.type}  
      <br> 
      Category: ${task.category}

    </div>
    `;
  }
  
  )
}
