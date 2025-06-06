import React from "react";
import babycloth from "../../assets/babycloth.jpg";
import toys from "../../assets/Toys.jpg";
import Reddress from "../../assets/Reddress.jpg";
import traditionaldress from "../../assets/traditionaldress.jpg";
import BoysTShirt from "../../assets/BoysTShirt.jpg";
import HorseBaby from "../../assets/HoseBabyLatzhose.jpg";
import Teddy from "../../assets/BigTeddy.jpg";
import Jeep from "../../assets/Electricjeep.jpg";

const BestSellers = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-center font-bold text-3xl text-blue-400">New Arrival</h1>
      <p className="text-gray-500 text-center mb-8">
        Discover our most loved baby products!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <img
            src={babycloth}
            alt="Clothes"
            className="w-full max-w-[250px] h-[280px] object-cover rounded-lg mx-auto"
          />
          <h2 className="text-lg font-semibold mt-2 uppercase tracking-wider">Clothes</h2>
        </div>

        <div className="text-center">
          <img
            src={toys}
            alt="Toys"
            className="w-full max-w-[250px] h-[280px] object-cover rounded-lg mx-auto"
          />
          <h2 className="text-lg font-semibold mt-2 uppercase tracking-wider">Toys</h2>
        </div>

        <div className="text-center">
          <img
            src={Reddress}
            alt="Essentials"
            className="w-full max-w-[250px] h-[280px] object-cover rounded-lg mx-auto"
          />
          <h2 className="text-lg font-semibold mt-2 uppercase tracking-wider">Essentials</h2>
        </div>

        <div className="text-center">
          <img
            src={traditionaldress}
            alt="Traditional Wear"
            className="w-full max-w-[250px] h-[280px] object-cover rounded-lg mx-auto"
          />
          <h2 className="text-lg font-semibold mt-2 uppercase tracking-wider">Traditional Wear</h2>
        </div>

        <div className="text-center">
          <img
            src={BoysTShirt}
            alt="Boys T-Shirt"
            className="w-full max-w-[250px] h-[280px] object-cover rounded-lg mx-auto"
          />
          <h2 className="text-lg font-semibold mt-2 uppercase tracking-wider">Boys T-Shirt</h2>
        </div>

        <div className="text-center">
          <img
            src={HorseBaby}
            alt="Horse Baby Overalls"
            className="w-full max-w-[250px] h-[280px] object-cover rounded-lg mx-auto"
          />
          <h2 className="text-lg font-semibold mt-2 uppercase tracking-wider">Overalls</h2>
        </div>

        <div className="text-center">
          <img
            src={Teddy}
            alt="Big Teddy"
            className="w-full max-w-[250px] h-[280px] object-cover rounded-lg mx-auto"
          />
          <h2 className="text-lg font-semibold mt-2 uppercase tracking-wider">Big Teddy</h2>
        </div>

        <div className="text-center">
          <img
            src={Jeep}
            alt="Electric Jeep"
            className="w-full max-w-[250px] h-[280px] object-cover rounded-lg mx-auto"
          />
          <h2 className="text-lg font-semibold mt-2 uppercase tracking-wider">Electric Jeep</h2>
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
