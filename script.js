// fetch("http://localhost:8088/food")
// .then(foods => foods.json())
// .then(parsedFoods => {
//     parsedFoods.forEach(food => {
//         //Print foods to DOM
//         document.querySelector("#foodlist").innerHTML += 
//         `<div><h3>${food.name}</h3>
//         <h4>${food.ethnicity}</h4>
//         <h5>${food.category}</h5></div>`
//      })
//  });


 fetch("http://localhost:8088/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            console.log(food) // Should have a `barcode` property
            // let parsedFoodsBarcode = food.barcode

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text) {
                      food.ingredients = productInfo.product.ingredients_text
                    } else {
                      food.ingredients = "no ingredients listed"
                    }

                    if (productInfo.product.countries) {
                        food.countries = productInfo.product.countries
                    } else {
                        food.countries = "no countries listed"
                    }

                    if (productInfo.product.nutriments["energy-kcal_serving"]) {
                        food.calPerServing = productInfo.product.nutriments["energy-kcal_serving"]
                    } else {
                        food.calPerServing = "no calories per serving listed"
                    }
                    if (productInfo.product.nutriments.fat_serving) {
                        food.fatPerServing = productInfo.product.nutriments.fat_serving
                    } else {
                        food.fatPerServing = "no fat per serving listed"
                    }

                    if (productInfo.product.nutriments.sugars_serving) {
                        food.sugarPerServing = productInfo.product.nutriments.sugars_serving
                    } else {
                        food.sugarPerServing = "no sugar per serving listed"
                    }

                    document.querySelector("#foodlist").innerHTML +=
                    `<div><h3>${food.name}</h3>
                    <p>${food.ethnicity} ${food.category}</p>
                    <p><strong>Ingredients:</strong></p>${food.ingredients}</p>
                    <p><strong> Country of Origin:</strong> ${food.countries}</p>
                    <p><strong> Calories per serving:</strong> ${food.calPerServing}</p>
                    <p><strong> Fat per serving:</strong> ${food.fatPerServing}</p>
                    <p><strong> Sugar per serving:</strong> ${food.sugarPerServing}</p></div>`

                    // Build HTML string for individual food
                    // Add HTML string to DOM
                    
                })
        })
    })
