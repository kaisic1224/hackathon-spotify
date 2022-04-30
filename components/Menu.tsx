import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [cords, setCords] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const handleContext = (e: MouseEvent) => {
    e.preventDefault();
    console.log(e.target!?.dataset.open);
    if (!e.target!?.dataset.open) return;
    if (e.pageX + menuRef?.current?.offsetWidth! > window.innerWidth) {
      setCords({
        x: e.pageX - menuRef?.current?.offsetWidth!,
        y: e.pageY - menuRef?.current?.offsetHeight! * 0.6
      });
    } else {
      setCords({
        x: e.pageX,
        y: e.pageY - menuRef?.current?.offsetHeight! * 0.6
      });
    }
    setOpen(!open);
  };
  const handleClick = () => {
    if (open) setOpen(false);
    return;
  };

  useEffect(() => {
    document.addEventListener("contextmenu", handleContext);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("contextmenu", handleContext);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      {open && (
        <div
          ref={menuRef}
          className='absolute z-[9999] p-1 bg-card-accent rounded-md text-white font-medium shadow-md min-w-fit'
          style={{ top: cords.y, left: cords.x }}
        >
          <div className='px-2 py-1 select-none hover:bg-slate-500'>
            Copy link
          </div>
          <div className='px-2 py-1 select-none hover:bg-slate-500'>
            Open in Spotify
          </div>
        </div>
      )}
    </>
  );
};
export default Menu;
