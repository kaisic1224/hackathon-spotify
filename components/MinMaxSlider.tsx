import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

function MinMaxSlider({
  bounds,
  label,
  min,
  max,
  setMin,
  setMax
}: {
  bounds: number[];
  label: string;
  min: number;
  max: number;
  setMin: Dispatch<SetStateAction<number>>;
  setMax: Dispatch<SetStateAction<number>>;
}) {
  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (v: number) => {
      return Math.round(((v - min) / (max - min)) * 100);
    },
    [...bounds]
  );

  useEffect(() => {
    if (maxRef.current) {
      const minPercent = getPercent(min);
      const maxPercent = getPercent(parseInt(maxRef.current.value));

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${
          (maxPercent as unknown as number) - (minPercent as unknown as number)
        }%`;
      }
    }
  }, [min, getPercent]);

  useEffect(() => {
    if (minRef.current) {
      const minPercent = getPercent(parseInt(minRef.current.value));
      const maxPercent = getPercent(max);

      if (range.current) {
        range.current.style.width = `${
          (maxPercent as unknown as number) - (minPercent as unknown as number)
        }%`;
      }
    }
  }, [max, getPercent]);

  return (
    <>
      <div className='w-[25rem] relative'>
        <input
          className={`slider ${min > bounds[1] - 100 ? "z-50" : "z-30"}`}
          type='range'
          min={bounds[0]}
          max={bounds[1]}
          name={`min-${label}`}
          id={`min-${label}`}
          value={min}
          ref={minRef}
          onChange={(e) => {
            // take the smaller of the 2 numbers
            // the input and the value of the max slider
            const value = Math.min(parseInt(e.target.value), max - 1);
            setMin(value);
          }}
        />
        <input
          className='slider z-40'
          type='range'
          min={bounds[0]}
          max={bounds[1]}
          name={`max-${label}`}
          id={`max-${label}`}
          value={max}
          ref={maxRef}
          onChange={(e) => {
            // take larger between input and min+1
            // assures that value will always be at the minimum 1 above the current min slider
            const value = Math.max(parseInt(e.target.value), min + 1);
            setMax(value);
          }}
        />

        <div className='relative w-[400px] flex justify-between'>
          <div className='slider-track bg-white/40 rounded-[3px] h-1 absolute w-full z-10' />
          <div
            ref={range}
            className='slider-range rounded-[3px] h-1 absolute z-20 bg-green-800'
          />
          <label
            className='text-xs uppercase mt-3 tracking-widest'
            htmlFor={`min-${label}`}
          >
            {min}
          </label>
          <label
            className='text-xs uppercase mt-3 tracking-widest'
            htmlFor={`max-${label}`}
          >
            {max}
          </label>
        </div>
      </div>
    </>
  );
}

export default MinMaxSlider;
