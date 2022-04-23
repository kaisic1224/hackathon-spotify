import { Navbar, Container, Nav } from "react-bootstrap";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
//#121212
const links = [
  ["Most Recent", "#most-recent"],
  ["Favourite Artists", "#most-listened-artists"],
  ["Favourite Songs", "#most-listened-songs"],
  ["Playlists Made For You", "#customized-playlists"],
];
const SNavbar = ({ viewedSection }: { viewedSection: string }) => {
  return (
    <>
      <Navbar fixed="top" bg="dark" variant="dark">
        <Container className="flex justify-between">
          <Navbar.Brand href="/">
            <img
              alt=""
              src="/photos/spotify-logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Subussy
          </Navbar.Brand>
          <Nav>
            <Nav.Link></Nav.Link>
          </Nav>
          <Nav>
            {links.map((ind) => {
              return (
                <Nav.Link className="relative" key={ind[1]} href={ind[1]}>
                  {ind[0]}
                  {viewedSection === ind[0] ? (
                    <motion.div
                      className="w-full absolute left-0 bottom-1 h-[2px] rounded-xl bg-g-primary"
                      layoutId="underline"
                    />
                  ) : null}
                </Nav.Link>
              );
            })}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default SNavbar;
