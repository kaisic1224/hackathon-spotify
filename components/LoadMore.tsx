import { Dispatch, SetStateAction, useContext, useState } from "react";
import { DateContext } from "../pages";

const LoadMore = ({
  endpoint,
  setFn,
  items
}: {
  endpoint: string;
  setFn: Dispatch<SetStateAction<any>>;
  items: any[];
}) => {
  const [current, setCurrent] = useState(items.length);
  const { time_range } = useContext(DateContext);

  const load = async () => {
    const queryParamString = new URLSearchParams({
      rate: time_range,
      offset: current.toString()
    });
    const res = await fetch(`/api/${endpoint}?${queryParamString.toString()}`);
    const data = await res.json();
    setCurrent(current + 8);
    setFn([...items, ...data.items]);
  };

  return (
    <span
      onClick={() => load()}
      className='text-white mt-7 cursor-pointer font-medium text-center mx-auto'
    >
      Load More...
    </span>
  );
};
export default LoadMore;
