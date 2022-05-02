import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import Toast from "./Toast";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const [cords, setCords] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const [links, setLinks] = useState({ open: "" });
  const [artist, setArtist] = useState([]);

  const handleContext = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (!e.target!?.dataset.open) {
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
      // const newArtistsNAMES = e.target.dataset.artistName.split(",");
      // const newArtistsURLS = e.target.dataset.artist.split(",");
      // const newarr = [newArtistsNAMES.length];
      // for (let index = 0; index < newarr.length; index++) {
      //   newarr.push({
      //     name: newArtistsNAMES[index],
      //     url: newArtistsURLS[index]
      //   });
      // }
      // setArtist(newarr);
      setLinks({ open: e.target.dataset.open });
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
          className='absolute z-[9999] peer p-1 bg-card-accent rounded-md text-white font-medium shadow-md 
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
            className='px-2 py-1 select-none hover:bg-slate-500'
          >
            Copy link
          </div>
          <div
            className='px-2 py-1 select-none hover:bg-slate-500'
            onClick={() => window.open(links.open, "_blank")}
          >
            Open in Spotify
          </div>
          {artist.length != 0 &&
            artist.map((artist) => (
              <div
                key={artist.url}
                className='px-2 py-1 select-none hover:bg-slate-500'
              >
                {artist.name}
              </div>
            ))}
        </div>
      )}
    </>
  );
};
export default Menu;
