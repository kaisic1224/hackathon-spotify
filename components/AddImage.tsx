import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
const AddImage = ({
  setOpen,
  name,
  setName,
  file,
  setFile,
  fLink,
  setFlink,
  description,
  setDescription
}: {
  file: File | undefined;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  fLink: string | ArrayBuffer | null | undefined;
  setFlink: Dispatch<SetStateAction<string | ArrayBuffer | null | undefined>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const bgref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (file) {
      const fr = new FileReader();
      fr.addEventListener("load", () => {
        setFlink(fr.result);
      });

      fr.readAsDataURL(file);
    }
  }, [file]);

  return (
    <div
      ref={bgref}
      className='fixed z-[999] inset-0 bg-black bg-opacity-25 grid place-items-center'
      onClick={(e) => {
        if (e.target === bgref.current) {
          setOpen(false);
        }
      }}
    >
      <div className='bg-body-main rounded-lg z-[9999] overflow-hidden'>
        <div className='bg-slate-100 p-8 overflow-hidden'>
          <span className='ml-40 text-6xl font-bold text-slate-300'>
            Customized <br /> <span className='ml-16'>Playlists</span>
          </span>
        </div>
        <div className='pt-2'>
          {file && (
            <div className='flex items-center gap-3'>
              <div className='relative w-fit h-fit'>
                <FaRegTimesCircle
                  className='fill-white absolute top-0 right-0 cursor-pointer w-5 h-5'
                  onClick={() => setFile(undefined)}
                />
                <img
                  src={`${fLink}`}
                  className='object-cover aspect-square w-40 select-none'
                  alt='Your custom playlist cover image'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <input
                  type='text'
                  placeholder={name}
                  value={name}
                  className='text-form text-xl text-white h-fit'
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <textarea
                  placeholder='Add a description...'
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                  className='resize-none text-form text-white overflow-y-visible'
                />
              </div>
            </div>
          )}

          <div className='grid place-items-center bg-body-main hover:bg-card-accent border-8 border-body-main'>
            <label
              htmlFor='cover-img'
              className='text-white select-none font-bold w-full text-center p-8'
            >
              Add an image
            </label>
            <input
              ref={fileRef}
              type='file'
              name='user-cover-img'
              id='cover-img'
              accept='image/*'
              className='hidden'
              onChange={() => {
                setFile(fileRef.current?.files![0]);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddImage;
