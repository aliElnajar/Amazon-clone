import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { cartActions } from "./store/store";
const Header = () => {
  const dispatch = useDispatch();
  const wholeState = useSelector((state) => state);
  const { itemsQuantity, cartItems } = wholeState;
  const router = useRouter();
  const { data, status } = useSession();
  useEffect(() => {
    dispatch(cartActions.calcTotals());
  }, [cartItems]);
  return (
    <header>
      <div className="bg-amazon_blue flex items-center p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            alt="logo"
            width={150}
            height={40}
            className="cursor-pointer object-contain"
          />
        </div>
        <div className="sm:flex hidden rounded-md flex-grow  ml-2 items-center h-10 bg-yellow-400 hover:bg-yellow-500 ">
          <input
            type="text"
            className="p-2 h-full rounded-l-md w-6 flex-grow flex-shrink focus:outline-none px-4    "
          />
          <SearchIcon className="h-12 p-4 cursor-pointer text-white" />
        </div>
        <div className="text-white flex space-x-6 mx-6 items-center text-xs whitespace-nowrap ">
          <div className=" link" onClick={data ? signOut : signIn}>
            <p>{data?.user ? `Hello, ${data.user.name}` : "sign in"}</p>
            <p className="font-extrabold md:text-sm"> account&lists</p>
          </div>

          <div className=" link">
            <p>returns</p>
            <p className="font-extrabold md:text-sm">&orders</p>
          </div>
          <div className=" relative flex items-center link">
            <span className="absolute top-0 right-0 md:right-5  bg-yellow-400 text-center rounded-full text-black font-bold h-4 w-4">
              {itemsQuantity}
            </span>
            <ShoppingCartIcon
              className="h-10"
              onClick={() => router.push("/checkout")}
            />
            <p className=" hidden md:inline font-extrabold md:text-sm mt-2">
              cart
            </p>
          </div>
        </div>
      </div>
      {/* bottom nav */}
      <div className="flex items-center space-x-3 bg-amazon_blue-light p-2 pl-6 text-white text-sm">
        <p className="link flex items-center ">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime video</p>
        <p className="link">Amazon business</p>
        <p className="link">Today's deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food&Groceries</p>
        <p className="link hidden lg:inline-flex">Buy again</p>
        <p className="link hidden lg:inline-flex">Shopper toolkit</p>
        <p className="link hidden lg:inline-flex">Health&Personal care</p>
      </div>
    </header>
  );
};

export default Header;
