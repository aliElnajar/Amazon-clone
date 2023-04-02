import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { cartActions } from "./store/store";
import { PlusIcon, MinusIcon } from "@heroicons/react/outline";
const CheckoutItem = ({
  id,
  title,
  description,
  image,
  price,
  rate,
  hasPrime,
  itemQuantity,
}) => {
  const dispatch = useDispatch();
  const addItemHandler = () => {
    const product = { id };
    dispatch(cartActions.addItem(product));
  };

  const removeItemHandler = () => {
    dispatch(cartActions.removeItem(id));
  };
  return (
    <div className="grid grid-cols-5 ">
      <Image
        src={image}
        alt={title}
        width={200}
        height={200}
        className="object-contain h-48 w-48 mx-auto"
      />
      <div className="col-span-3 mx-5">
        <h1 className="text-xl">{title}</h1>
        <div className="flex">
          {Array(rate)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 fill-yellow-500   " />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={price * itemQuantity} currency="gbp" />
        {hasPrime ? (
          <div className="flex items-center space-x-3 ">
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
      </div>
      <div className="flex flex-col space-x-0 space-y-3 sm:space-x-3 sm:space-y-0 md:flex-row items-center justify-self-end">
        <button onClick={removeItemHandler} className="button ">
          <MinusIcon className="h-4" />
        </button>
        <p>{itemQuantity}</p>

        <button onClick={addItemHandler} className="button">
          <PlusIcon className="h-4" />
        </button>
      </div>
    </div>
  );
};

export default CheckoutItem;
