import React from "react";

import "./receipt.css";

export function Receipt(props: any) {
  console.log(props.ingredients);

  const prices: any = {
    "basil leaves": 4,
    "butter beans": 1,
    "chicken breast": 11,
    "chicken breasts": 11,
    "chicken stock": 5,
    "chicken thighs": 12,
    "chicken thigh": 12,
    "olive oil": "Pantry",
    "parmesan cheese": 8,
    "plain flour": "Pantry",
    "vegetable oil": "Pantry",
    allspice: "Pantry",
    apricot: 3,
    apricots: 3,
    bacon: 6,
    basil: 4,
    banana: 3,
    beef: 10,
    blackberries: 3,
    blackberrys: 3,
    bread: "Pantry",
    butter: "Panty",
    cardamom: "Pantry",
    carrot: 2,
    carrots: 2,
    celery: 3,
    "cocount milk": 3,
    cheese: 3,
    chicken: 10,
    chickpeas: 3,
    cilantro: 3,
    cinnamon: "Pantry",
    cream: 4,
    duck: 12,
    egg: 3,
    eggs: 3,
    fennel: 2,
    "fish sauce": "Pantry",
    garlic: 1,
    ginger: 3,
    lamb: 15,
    leek: 2,
    lettuce: 4,
    lime: 1,
    mackerel: 5,
    milk: 4,
    mushroom: 3,
    mushrooms: 4,
    onion: 1,
    paprikia: "Pantry",
    parsley: 3,
    parmesan: 8,
    passata: 1,
    pepper: "Pantry",
    plain: "Pantry",
    potatoes: 4,
    prawns: 16,
    pumpkin: 4,
    raspberries: 4,
    salt: "Pantry",
    sugar: "Pantry",
    thyme: 4,
    tomato: 3,
    tomatoes: 3,
    walnuts: 4,
    water: "Pantry",
    yeast: "Pantry",
    prosciutto: 4,
  };

  const clearance = ["lettuce", "tomato", "broccoli"];

  const ingredientWithPrice: any[] = [];

  props.ingredients.forEach((obj: any) => {
    const price = prices[obj.ingredientName.toLowerCase()];

    ingredientWithPrice.push({
      name: obj.ingredientName,
      price: price
    });
  });

  var totalPrice = 0;

  const showIngredients = ingredientWithPrice.map(obj => {
    if (typeof obj.price === "number") {
      totalPrice += obj.price;
      return (
        <tr>
          <td className="ingredient-column">{obj.name}</td>
          <td className="ingredient-price"> ${obj.price}.00</td>
        </tr>
      );
    } else if (typeof obj.price === "string") {
      return (
        <tr>
          <td className="ingredient-column">{obj.name.trim()}</td>
          <td className="ingredient-price">Pantry</td>
        </tr>
      );
    }
  });

  return (
    <table>
      <tr>
        <th>Ingredient</th>
        <th>Price</th>
      </tr>
      {showIngredients}
      <div className="subtotal">Total Price: ${totalPrice}.00</div>
    </table>
  );
}
