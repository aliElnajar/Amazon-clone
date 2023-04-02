import Image from "next/image";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { cartActions } from "./store/store";
const Product = ({ id, title, description, category, image, price }) => {
  const [rate, setRate] = useState(1);
  const [hasPrime, setHasPrime] = useState(false);

  useEffect(() => {
    setRate(Math.floor(Math.random() * 5 + 1));
    setHasPrime(Math.random() > 0.5);
  }, []);

  const dispatch = useDispatch();
  const addToCartHandler = () => {
    const product = {
      id,
      title,
      description,
      category,
      image,
      price,
      rate,
      hasPrime,
    };
    dispatch(cartActions.addItem(product));
  };

  return (
    <div className="bg-white relative flex flex-col m-5 z-30 p-10 text-center">
      <p className=" absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image
        src={image}
        width={200}
        height={200}
        alt={title}
        className="object-contain w-48 h-48 mx-auto"
      />
      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(rate)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 fill-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5">
        <Currency quantity={price} currency="gbp" />
      </div>
      {hasPrime ? (
        <div className="flex items-center space-x-3 -mt-5">
          <img
            src="https://links.papareact.com/fdw"
            alt="prime"
            className="w-12"
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      ) : (
        ""
      )}
      <button onClick={addToCartHandler} className="mt-auto button">
        add to basket
      </button>
    </div>
  );
};

export default Product;
