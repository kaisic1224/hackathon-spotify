// test to check functionallity on playlists page to ensure that page is being lazily loaded and checked from cache
import { renderHook } from "@testing-library/react";
import useFetch from '../lib/useFetch'

describe("useFetch", () => {
  test("should be undefined on init", () => {
    const { result } = renderHook(useFetch);
    expect(result.current.recentTracks).tobe();
  });
})