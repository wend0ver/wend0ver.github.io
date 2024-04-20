let currentZ = 5;

document.addEventListener("DOMContentLoaded", function() {
  const draggableBoxes = document.querySelectorAll(".draggableBox");
  let isDragging = false;
  let activeBox = null;

  draggableBoxes.forEach(function(draggableBox) {
    draggableBox.addEventListener("mousedown", startDragging);
    draggableBox.addEventListener("mouseup", stopDragging);
    draggableBox.addEventListener("click", handleClick);

    draggableBox.addEventListener("touchstart", startDragging);
    draggableBox.addEventListener("touchend", stopDragging);
    draggableBox.addEventListener("touchend", handleClick);
  });

  function startDragging(event) {
    isDragging = true;
    activeBox = event.currentTarget;
    currentZ += 1;
    activeBox.style.zIndex = currentZ;
    document.addEventListener("mousemove", moveBox);
    document.addEventListener("touchmove", moveBox);
  }

  function stopDragging(event) {
    isDragging = false;
    activeBox = null;
    document.removeEventListener("mousemove", moveBox);
    document.removeEventListener("touchmove", moveBox);

    const droppedBoxRect = event.currentTarget.getBoundingClientRect();
    const allBoxes = document.querySelectorAll(".draggableBox");
    let touchingBox = null;
    let highestZIndex = -1;

    allBoxes.forEach(function(box) {
      if (box !== event.currentTarget) {
        const boxRect = box.getBoundingClientRect();
        if (
          droppedBoxRect.left < boxRect.right &&
          droppedBoxRect.right > boxRect.left &&
          droppedBoxRect.top < boxRect.bottom &&
          droppedBoxRect.bottom > boxRect.top
        ) {
          const boxZIndex = parseInt(box.style.zIndex) || 0;
          if (boxZIndex > highestZIndex) {
            touchingBox = box;
            highestZIndex = boxZIndex;
          }
        }
      }
    });
    console.log(event.currentTarget.id)
    if (touchingBox) {
      for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        let ingredients = recipe.equation.ingredients;
        if (ingredients[0].includes(event.currentTarget.id) && ingredients[1].includes(touchingBox.id)) {

          deleteBoxes(event.currentTarget, touchingBox);
          for (let a = 0; a < recipe.equation.equals.length; a++) {
            if (recipe.equation.equals.length == 1) {
              createNewBox(droppedBoxRect.left, droppedBoxRect.top, recipe.equation.equals[a]);
            } else {
              createNewBox(droppedBoxRect.left + Math.floor(Math.random() * 51) - 25, droppedBoxRect.top + Math.floor(Math.random() * 51) - 25, recipe.equation.equals[a]);

            }
          }
        } else {

          if (ingredients[1].includes(event.currentTarget.id) && ingredients[0].includes(touchingBox.id)) {

            deleteBoxes(event.currentTarget, touchingBox);
            for (let a = 0; a < recipe.equation.equals.length; a++) {
              if (recipe.equation.equals.length == 1) {
                createNewBox(droppedBoxRect.left, droppedBoxRect.top, recipe.equation.equals[a]);
              } else {
                createNewBox(droppedBoxRect.left + Math.floor(Math.random() * 51) - 25, droppedBoxRect.top + Math.floor(Math.random() * 51) - 25, recipe.equation.equals[a]);

              }
            }
          }
        }

      }
    }
  }

  function deleteBoxes(box1, box2) {
    box1.remove();
    box2.remove();
    console.log(`Deleted box with ID: ${box1.id} and box with ID: ${box2.id}`);
  }

  function createNewBox(x, y, id) {
    const newBox = document.createElement("div");
    newBox.classList.add("draggableBox");
    newBox.id = id;
    newBox.style.left = x + "px";
    newBox.style.top = y + "px";
    newBox.style.zIndex = currentZ;

    const paragraph = document.createElement("p");
    paragraph.textContent = newBox.id;

    newBox.appendChild(paragraph);
    document.body.appendChild(newBox);

    newBox.addEventListener("mousedown", startDragging);
    newBox.addEventListener("mouseup", stopDragging);
    newBox.addEventListener("touchstart", startDragging);
    newBox.addEventListener("touchend", stopDragging);
  }



  function moveBox(event) {
    if (isDragging && activeBox) {
      activeBox.style.left = event.clientX - activeBox.offsetWidth / 2 + "px";
      activeBox.style.top = event.clientY - activeBox.offsetHeight / 2 + "px";
    }
  }

  function handleClick(event) {
    const id = event.currentTarget.getAttribute("id");
  }
});

// I know you can see this and change the inspect code to cheat, but whats the fun in that

const recipes = [
  {
    "equation": {
      "ingredients": ["💧water", "🌱seed"],
      "equals": ["🌳tree", "🌱seed"]
    }
  },
  {
    "equation": {
      "ingredients": ["🌳tree", "🪓axe"],
      "equals": ["🪓axe", "🪵wood", "🌱seed"]
    }
  },
  {
    "equation": {
      "ingredients": ["🌱seed", "🌱seed"],
      "equals": ["🌳tree"]
    }
  },
  {
    "equation": {
      "ingredients": ["🪵wood", "🪵wood"],
      "equals": ["🪓axe"]
    }
  },
  {
    "equation": {
      "ingredients": ["🪓axe", "🪵wood"],
      "equals": ["🪓axe", "🪵plank", "🪵plank"]
    }
  },
  {
    "equation": {
      "ingredients": ["🪓axe", "🌱seed"],
      "equals": ["🪓axe", "🫚roots", "🫚roots"]
    }
  },
  {
    "equation": {
      "ingredients": ["🫚roots", "💧water"],
      "equals": ["🔩pipe"]
    }
  },
  {
    "equation": {
      "ingredients": ["🫚roots", "🫚roots"],
      "equals": ["💧water"]
    }
  },
  {
    "equation": {
      "ingredients": ["💧water", "💧water"],
      "equals": ["🌊river"]
    }
  },
  {
    "equation": {
      "ingredients": ["💧water", "🪵plank"],
      "equals": ["💧water", "💧water"]
    }
  },
  {
    "equation": {
      "ingredients": ["🔩pipe", "🪵plank"],
      "equals": ["🏭watermill"]
    }
  },
  {
    "equation": {
      "ingredients": ["🏭watermill", "💧water"],
      "equals": ["⚡energy", "🏭watermill"]
    }
  },
  {
    "equation": {
      "ingredients": ["🏭watermill", "🌊river"],
      "equals": ["🪫electricity", "🏭watermill"]
    }
  },
  {
    "equation": {
      "ingredients": ["⚡energy", "🫚roots"],
      "equals": ["🌳tree", "💧water"]
    }
  },
  {
    "equation": {
      "ingredients": ["⚡energy", "🪫electricity"],
      "equals": ["🏭factory"]
    }
  },
  {
    "equation": {
      "ingredients": ["🏭factory", "🌱seed"],
      "equals": ["🚜farm"]
    }
  },
  {
    "equation": {
      "ingredients": ["🚜farm", "💧water"],
      "equals": ["🌳tree", "🌳tree", "🌳tree"]
    }
  },
]
