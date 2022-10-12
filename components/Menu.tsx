import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaCaretRight } from "react-icons/fa";
import Toast from "./Toast";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const [cords, setCords] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const [links, setLinks] = useState({ open: "" });
  const [artists, setArtists] = useState<string[][]>([]);

  const handleContext = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!(e.target as HTMLElement)?.dataset.open) {
        setOpen(false);
        return;
      }
      if (e.pageX + menuRef?.current?.offsetWidth! > window.innerWidth) {
        setCords({
          x: e.pageX - menuRef?.current?.offsetWidth!,
          y: e.pageY
        });
      } else {
        setCords({
          x: e.pageX,
          y: e.pageY
        });
      }
      setOpen(true);
      setLinks({ open: (e.target as HTMLDivElement)?.dataset.open! });
      if ((e.target as HTMLDivElement)?.dataset.artists) {
        const artistes = (e.target as HTMLDivElement)?.dataset
          .artists!.split(",")
          .map((artistPair: string) => artistPair.split("::"));
        setArtists([...artistes]);
      } else {
        setArtists([]);
      }
    },
    [setCords]
  );
  const handleClick = useCallback(() => {
    setOpen(false);
  }, [open]);

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
      {toast && <Toast />}
      {open && (
        <div
          ref={menuRef}
          className='absolute z-[9999] isolate peer p-1 bg-card-accent rounded-md text-white font-medium shadow-md 
          min-w-fit'
          style={{ top: cords.y, left: cords.x }}
        >
          <div
            onClick={() => {
              navigator.clipboard.writeText(links.open);
              setToast(true);
              setTimeout(() => {
                setToast(false);
              }, 2000);
            }}
            className='px-2 py-1 select-none hover:bg-slate-500 rounded-sm'
          >
            Copy link
          </div>
          <div
            className='px-2 py-1 select-none hover:bg-slate-500 rounded-sm'
            onClick={() => window.open(links.open, "_blank")}
          >
            Open in Spotify
          </div>
          {artists.length != 0 && (
            <div className='relative'>
              <div
                onClick={() => {
                  if (artists.length === 1)
                    window.open(artists[0][1], "_blank");
                }}
                className='pl-2 py-1 z-10 select-none hover:bg-slate-500 rounded-sm flex items-center justify-between peer'
              >
                Go to artist {artists.length != 1 && <FaCaretRight />}
              </div>
              {artists.length != 1 ? (
                <div
                  className={`hidden z-50 peer-hover:block hover:block min-w-full max-w-max absolute py-1 px-1 pl-2 bg-card-accent 
               drop-shadow-lg -top-1 ${
                 cords.x + menuRef?.current?.offsetWidth! * 2 >
                 window.innerWidth
                   ? "left-0 -translate-x-full rounded-l-md rounded-br-md"
                   : "right-0 translate-x-full rounded-r-md rounded-bl-md"
               }`}
                >
                  {artists.map((artist: string[]) => (
                    <div
                      key={artist[0]}
                      className='px-2 py-1 select-none text-g-primary hover:text-green-300 hover:bg-slate-500 rounded-sm'
                      onClick={() => window.open(artist[1], "_blank")}
                    >
                      {artist[0]}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default Menu;
