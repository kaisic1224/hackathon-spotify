import { Dispatch, SetStateAction, useContext, useState } from "react";
import { DateContext } from "../pages";

const LoadMore = ({
  endpoint,
  setFn,
  items,
  anchor
}: {
  endpoint: string;
  setFn: Dispatch<SetStateAction<any>>;
  items: any[];
  anchor: string;
}) => {
  const [current, setCurrent] = useState(8);
  const { time_range } = useContext(DateContext);
  const [dataset, setDataset] = useState(8);

  const load = async () => {
    const queryParamString = new URLSearchParams({
      rate: time_range,
      offset: current.toString()
    });
    const res = await fetch(`/api/${endpoint}?${queryParamString.toString()}`);
    const data = await res.json();
    setCurrent(current + data.items.length);
    setFn([...items, ...data.items]);
    setDataset(data.items.length);
  };

  return (
    <div className='flex'>
      {dataset != 0 ? (
        <span
          onClick={() => load()}
          className='text-white bg-card-accent hover:bg-[#696565] py-1 px-2 rounded-md mt-12 cursor-pointer font-medium text-center inline-block mx-auto'
        >
          Load more
        </span>
      ) : (
        <span
          onClick={() => {
            setFn([...items].slice(0, 8));
            setDataset(8);
            location.hash = `#${anchor}`;
          }}
          className='text-[#707070] mt-12 bg-[#2b2b2b] hover:text-white py-1 px-2 cursor-pointer font-medium text-center inline-block mx-auto'
        >
          Show less
        </span>
      )}
    </div>
  );
};
export default LoadMore;
