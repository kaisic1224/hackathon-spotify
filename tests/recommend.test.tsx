// test to check functionallity on playlists page to ensure that page is being lazily loaded and checked from cache
import { cleanup, fireEvent, render, renderHook, screen, waitFor } from "@testing-library/react";
import * as nextAuthReact from 'next-auth/react'
import useFetch from '../lib/useFetch'
import Carousel from "../components/Carousel";
import Playlist from "../components/Playlist";

jest.mock('next-auth/react')
const nextAuthReactMocked = nextAuthReact as jest.Mocked<typeof nextAuthReact>

describe("useFetch", () => {
  afterAll(() => {
    cleanup();
  })
  test("recentTracks should have properties of playlistItem interface", () => {
    const { result } = renderHook(useFetch);
    expect(result.current.recentTracks[0]).toHaveProperty("track");
    expect(result.current.recentTracks[0]).toHaveProperty("context");
  });

  test("carousel should show topArtists", async () => {
    const { result } = renderHook(useFetch);
    // ensure that carousel is rendering property
    render(<Carousel items={result.current.topArtists} />)
    
    await waitFor(() => {
      expect((screen.getByRole("img") as HTMLImageElement).src).toContain(
        result.current.topArtists[0].external_urls.spotify
      );
      expect(screen.getByText(result.current.topArtists[0].name));
    });

    // click on second navigator button on buttom of carousel
    fireEvent.click(screen.getByTestId(1))

    // check that its changed
    expect((screen.getByRole("img") as HTMLImageElement).src).toContain(result.current.topArtists[1].external_urls.spotify);
    expect((screen.getByText(result.current.topArtists[1].name)))
  })

  test("filter chips should have topArtists from usefetch", () => {
    const { result } = renderHook(useFetch);
    render(<Playlist setRecommended={result.current.setRecommended} setAnalyses={result.current.setAnalyses} analyses={result.current.analyses}
      artists={result.current.topArtists} items={result.current.recommended} topTracks={result.current.topTracks} />)

    expect(screen.getByTestId("filter-chips-artists").childElementCount).toBe(result.current.topArtists.length);
    expect(screen.getByTestId("filter-chips-artists").children[0].textContent).toBe(result.current.topArtists[0].name)
  })

})
