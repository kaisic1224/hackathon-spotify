import { Navbar, Container, Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import { LayoutGroup, motion } from "framer-motion";
//#121212
const links = [
  ["Most Recent", "#most-recent"],
  ["Favourite Artists", "#most-listened-artists"],
  ["Favourite Songs", "#most-listened-songs"],
  ["Playlists Made For You", "#customized-playlists"]
];
const SNavbar = ({ viewedSection }: { viewedSection: string }) => {
  const router = useRouter();
  return (
    <>
      <Navbar fixed='top' bg='dark' variant='dark'>
        <Container className='flex justify-between'>
          <Navbar.Brand>
            <div
              className='cursor-pointer'
              onClick={() => {
                window.scrollTo(0, 0);
                router.push("/", undefined, { shallow: true });
              }}
            >
              <img
                src='/photos/spotify-logo.png'
                width='30'
                height='30'
                className='d-inline-block align-top mr-2'
                alt='spotify logo'
              />
              Subussy
            </div>
          </Navbar.Brand>
          <Nav>
            <LayoutGroup id='ulime'>
              {links.map((ind) => {
                return (
                  <Nav.Link className='relative' key={ind[1]} href={ind[1]}>
                    {ind[0]}
                    {viewedSection === ind[0] && (
                      <motion.div
                        className='w-full absolute left-0 bottom-1 h-[2px] rounded-xl bg-g-primary'
                        layoutId='underline'
                      />
                    )}
                  </Nav.Link>
                );
              })}
            </LayoutGroup>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default SNavbar;
