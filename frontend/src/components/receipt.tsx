import React from "react";

export function Receipt(props:any) {
    console.log(props.ingredients);

    const prices:any = {
        "beef": 10,
        "chicken": 10, 
        "garlic": 1, 
    }

    const ingredientWithPrice:any[] = [];

    props.ingredients.forEach((obj:any) => {
        const price = prices[obj.ingredientName.split()[0].toLowerCase()];

        ingredientWithPrice.push({
            name: obj.ingredientName,
            price: price,
        });
    })


    const showIngredients = ingredientWithPrice.map((obj)=>{
       return <div>{obj.name}: {obj.price}</div> 
    });

    return <div>{showIngredients}</div>;


}