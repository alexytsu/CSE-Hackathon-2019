import React from "react";

import "./receipt.css";

export function Receipt(props: any) {
  console.log(props.ingredients);

  const prices: any = {
    "basil leaves": 4,
    "beef stock": 4,
    "beef shin": 12,
    "beef brisket": 13,
    "butter beans": 1,
    "chicken breast": 11,
    "chicken breasts": 11,
    "chicken stock": 5,
    "chicken thigh": 12,
    "chicken thighs": 12,
    "canellini beans": 2,
    "chilli powder": "Pantry",
    "coconut milk": 3,
    "fish sauce": "Pantry",
    "fresh basil": 3,
    "heavy cream": 2,
    "garam masala": "Pantry",
    "green pepper": 1,
    "green chili": 2,
    "king prawns": 15,
    "sea salt": "Pantry", 
    "kidney beans": 1,
    "olive oil": "Pantry",
    "parmesan cheese": 8,
    "plain flour": "Pantry",
    "red pepper": 2,
    "sesame seed oil": "Pantry",
    "soy sauce": "Pantry", 
    "spring onions": 2,
    "vegetable oil": "Pantry",
    "vegetable stock": 3,
    "water chestnut": 4,
    "white wine": 9,
    "tomato puree": 3,
    allspice: "Pantry",
    apricot: 3,
    apricots: 3,
    bacon: 6,
    banana: 3,
    basil: 4,
    beef: 10,
    blackberries: 3,
    blackberrys: 3,
    bread: "Pantry",
    butter: "Panty",
    cabbage: 2,
    cardamom: "Pantry",
    carrot: 2,
    carrots: 2,
    celery: 3,
    chives: 2,
    cucumber: 1,
    hostsauce: "Pantry",
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
    garlic: 1,
    ginger: 3,
    kale: 3,
    lamb: 15,
    leek: 2,
    lemon: 1,
    lemons: 2,
    lettuce: 4,
    lime: 1,
    macaroni: 4,
    mackerel: 5,
    milk: 4,
    monkfish: 11,
    mushroom: 3,
    mushrooms: 4,
    nutmeg: "Pantry",
    oatmeal: 5,
    onion: 1,
    paprikia: "Pantry",
    parmesan: 8,
    parsley: 3,
    passata: 1,
    pepper: "Pantry",
    plain: "Pantry",
    potatoes: 4,
    prawns: 16,
    prosciutto: 4,
    pumpkin: 4,
    raisins: 3,
    raspberries: 4,
    saffron: "Pantry",
    sake: 9,
    salt: "Pantry",
    strawberries: 3,
    sugar: "Pantry",
    thyme: 4,
    tomato: 3,
    tomatoes: 3,
    walnuts: 4,
    water: "Pantry",
    veal: 17,
    yeast: "Pantry",
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
