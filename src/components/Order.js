import moment from "moment";
import Image from "next/image";
import Currency from "react-currency-formatter";
const Order = ({ amount, items, timestamp, images, id }) => {
  console.log(images);
  return (
    <div className="relative border rounded-md">
      <div className="flex items-center space-x-10 p-5  bg-gray-100 text-gray-600">
        <div> 
          <p className="uppercase font-bold text-xs">order placed</p>
          <p>{moment.unix(timestamp).format("DD MM YYYY")}</p>
        </div>
        <div>
          <p className="uppercase text-xs font-bold">total</p>
          <p>
            <Currency quantity={amount} currency="GBP" />
          </p>
        </div>
        <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-400">
          {items.length} items
        </p>
        <p className="absolute text-xs right-2 top-2 w-40 lg:w-72 whitespace-nowrap truncate">
          ORDER REF : {id}
        </p>
      </div>
      <div className="p-5 flex sm:p-10 space-x-6 overflow-x-auto items-center">
        {images.map((img, i) => {
          return (
            <Image
              key={i}
              src={img}
              width={100}
              height={100}
              alt=" image item"
              className="w-[100] h-[100]"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Order;
