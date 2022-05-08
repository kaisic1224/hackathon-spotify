import {
  useCallback,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useContext
} from "react";
import { DateContext } from "../pages";

const debounce = (fn: Function, timeout = 600) => {
  let time: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(time);
    time = setTimeout(() => {
      fn.apply(this, args);
    }, timeout);
  };
};

const DatePicker = ({
  setFn,
  endpoint
}: {
  setFn: Dispatch<SetStateAction<any[] | any>>;
  endpoint: string;
}) => {
  const { setTime, time_range } = useContext(DateContext);

  const fetchItems = async (uri: string) => {
    const res = await fetch(uri);
    const data = await res.json();
    setFn(data.items);
  };

  const debouncedDate = useCallback(
    debounce(() => {
      const queryParamString = new URLSearchParams({
        rate: time_range
      });
      const uri = `/api/${endpoint}?${queryParamString.toString()}`;
      fetchItems(uri);
    }),
    [time_range]
  );

  useEffect(() => {
    debouncedDate();
  }, [time_range]);

  return (
    <label htmlFor='date-options' className='text-lg'>
      Past:{" "}
      <select
        value={time_range}
        onChange={async (e) => {
          setTime(e.target.value);
        }}
        name='date-options'
        className='bg-body-main'
      >
        <option value='short_term'>4 weeks</option>
        <option value='medium_term'>6 monthes</option>
        <option value='long_term'>All time</option>
      </select>
    </label>
  );
};
export default DatePicker;
