import { ReactElement, useContext, useEffect, useState } from "react";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { RecommendedContext } from "./Playlist";

const DoubleSlider = ({
  min,
  max,
  desc,
  label,
  setting,
  target,
}: {
  min: number;
  max: number;
  desc: string;
  label: ReactElement;
  setting: string;
  target: number;
}) => {
  const context = useContext(RecommendedContext);
  const [minVal, setMin] = useState(min);
  const [maxVal, setMax] = useState(max);
  const [targetVal, setTarget] = useState(target);

  const setFn = (newVal: number) => {
    if (newVal >= maxVal) return;
    setMin(newVal);
  };

  const setFnMax = (newVal: number) => {
    if (newVal <= minVal) return;
    setMax(newVal);
  };

  const setFnTarget = (newVal: number) => {
    if (minVal > newVal || newVal > maxVal) return;
    setTarget(newVal);
  }


  return (
    <div>
      <label
        className="relative text-zinc-300 uppercase font-semibold flex items-center gap-1"
        htmlFor={`${setting}-min`}
      >
        {label}
        <span className="cursor-pointer peer">
          <HiOutlineQuestionMarkCircle />
        </span>
        <span className="hidden peer-hover:block absolute w-[35ch] normal-case right-0">
          {desc}
        </span>
      </label>
      <div className="relative h-2 w-1/3 mt-3">
        <span className="absolute bg-black-main w-full h-full rounded-lg"></span>
        <input
          className="slider absolute w-full appearance-none rounded-full pointer-events-none bg-transparent"
          type="range"
          name={`${setting}-min`}
          id={`${setting}-min`}
          min={min}
          value={minVal}
          max={max}
          onChange={(e) => setFn(parseInt(e.target.value))}
        />
        <input
          className="slider slider-target absolute w-full appearance-none rounded-full pointer-events-none bg-transparent"
          type="range"
          name={`${setting}-target`}
          id={`${setting}-target`}
          min={min}
          max={max}
          value={targetVal}
          onChange={(e) => setFnTarget(parseInt(e.target.value))}
        />
        <input
          className="slider absolute w-full appearance-none rounded-full pointer-events-none bg-transparent"
          type="range"
          name={`${setting}-max`}
          id={`${setting}-max`}
          min={min}
          value={maxVal}
          onChange={(e) => setFnMax(parseInt(e.target.value))}
          max={max}
        />
      </div>
      <div className="w-1/3 flex justify-between">
        <input
          className="slider-number w-[4ch] focus:text-zinc-300 focus:outline-none text-zinc-400 appearance-none bg-transparent w-fit"
          onChange={(e) => setFn(parseInt(e.target.value))}
          type="number"
          name="min"
          id=""
          value={minVal}
        />
        <input
          className="slider-number w-[4ch] focus:text-zinc-300 text-center focus:outline-none text-zinc-400 appearance-none bg-transparent w-fit"
          onChange={(e) => setFnTarget(parseInt(e.target.value))}
          type="number"
          name="max"
          id=""
          value={targetVal}
        />
        <input
          className="slider-number w-[4ch] focus:text-zinc-300 text-end focus:outline-none text-zinc-400 appearance-none bg-transparent w-fit"
          onChange={(e) => setFnMax(parseInt(e.target.value))}
          type="number"
          name="max"
          id=""
          value={maxVal}
        />
      </div>
    </div>
  );
};

export default DoubleSlider;
