import { FaUnlock } from "react-icons/fa";
import { signIn } from "next-auth/react";

const Locked = () => {
  return (
    <div className="absolute z-30 inset-0 bg-white bg-opacity-50 grid place-items-center">
      <div className="flex flex-col items-center gap-4">
        <FaUnlock className="w-40 h-40" />
        <span className="text-3xl">
          <strong
            className="cursor-pointer hover:text-g-primary"
            onClick={() => signIn()}
          >
            Sign in
          </strong>{" "}
          to unlock
        </span>
      </div>
    </div>
  );
};
export default Locked;
