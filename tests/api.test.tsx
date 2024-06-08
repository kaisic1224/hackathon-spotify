import { artist } from "../lib/api";

const unmockedFetch = global.fetch;
const mockedFetch = jest.fn();

describe("testing topItems API", () => {
  beforeAll(() => {
    global.fetch = mockedFetch;
  });

  beforeEach(() => {
    mockedFetch.mockClear();
  });

  test("get topArtists successful", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          items: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/3HqSLMAZ3g3d5poNaI7GOU",
              },
              followers: {
                href: null,
                total: 8539098,
              },
              genres: ["k-pop", "pop"],
              href: "https://api.spotify.com/v1/artists/3HqSLMAZ3g3d5poNaI7GOU",
              id: "3HqSLMAZ3g3d5poNaI7GOU",
              images: [
                {
                  height: 640,
                  url: "https://i.scdn.co/image/ab6761610000e5ebbd0642ff425698afac5caffd",
                  width: 640,
                },
                {
                  height: 320,
                  url: "https://i.scdn.co/image/ab67616100005174bd0642ff425698afac5caffd",
                  width: 320,
                },
                {
                  height: 160,
                  url: "https://i.scdn.co/image/ab6761610000f178bd0642ff425698afac5caffd",
                  width: 160,
                },
              ],
              name: "IU",
              popularity: 70,
              type: "artist",
              uri: "spotify:artist:3HqSLMAZ3g3d5poNaI7GOU",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/6ignRjbPmLvKdtMLj9a5Xs",
              },
              followers: {
                href: null,
                total: 689463,
              },
              genres: ["j-acoustic"],
              href: "https://api.spotify.com/v1/artists/6ignRjbPmLvKdtMLj9a5Xs",
              id: "6ignRjbPmLvKdtMLj9a5Xs",
              images: [
                {
                  height: 640,
                  url: "https://i.scdn.co/image/ab6761610000e5eb99118fce7067e359c747873b",
                  width: 640,
                },
                {
                  height: 320,
                  url: "https://i.scdn.co/image/ab6761610000517499118fce7067e359c747873b",
                  width: 320,
                },
                {
                  height: 160,
                  url: "https://i.scdn.co/image/ab6761610000f17899118fce7067e359c747873b",
                  width: 160,
                },
              ],
              name: "Ichiko Aoba",
              popularity: 59,
              type: "artist",
              uri: "spotify:artist:6ignRjbPmLvKdtMLj9a5Xs",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/4F5TrtYYxsVM1PhbtISE5m",
              },
              followers: {
                href: null,
                total: 581669,
              },
              genres: [
                "c-pop",
                "cantopop",
                "classic cantopop",
                "hong kong rock",
              ],
              href: "https://api.spotify.com/v1/artists/4F5TrtYYxsVM1PhbtISE5m",
              id: "4F5TrtYYxsVM1PhbtISE5m",
              images: [
                {
                  height: 640,
                  url: "https://i.scdn.co/image/ab67616d0000b27371befcc92c268193bdda52db",
                  width: 640,
                },
                {
                  height: 300,
                  url: "https://i.scdn.co/image/ab67616d00001e0271befcc92c268193bdda52db",
                  width: 300,
                },
                {
                  height: 64,
                  url: "https://i.scdn.co/image/ab67616d0000485171befcc92c268193bdda52db",
                  width: 64,
                },
              ],
              name: "Beyond",
              popularity: 54,
              type: "artist",
              uri: "spotify:artist:4F5TrtYYxsVM1PhbtISE5m",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/1z4g3DjTBBZKhvAroFlhOM",
              },
              followers: {
                href: null,
                total: 9054681,
              },
              genres: ["k-pop", "k-pop girl group"],
              href: "https://api.spotify.com/v1/artists/1z4g3DjTBBZKhvAroFlhOM",
              id: "1z4g3DjTBBZKhvAroFlhOM",
              images: [
                {
                  height: 640,
                  url: "https://i.scdn.co/image/ab6761610000e5eb7719f0625a2fa078a60c85cd",
                  width: 640,
                },
                {
                  height: 320,
                  url: "https://i.scdn.co/image/ab676161000051747719f0625a2fa078a60c85cd",
                  width: 320,
                },
                {
                  height: 160,
                  url: "https://i.scdn.co/image/ab6761610000f1787719f0625a2fa078a60c85cd",
                  width: 160,
                },
              ],
              name: "Red Velvet",
              popularity: 68,
              type: "artist",
              uri: "spotify:artist:1z4g3DjTBBZKhvAroFlhOM",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/4SpbR6yFEvexJuaBpgAU5p",
              },
              followers: {
                href: null,
                total: 5176249,
              },
              genres: ["k-pop girl group"],
              href: "https://api.spotify.com/v1/artists/4SpbR6yFEvexJuaBpgAU5p",
              id: "4SpbR6yFEvexJuaBpgAU5p",
              images: [
                {
                  height: 640,
                  url: "https://i.scdn.co/image/ab6761610000e5eb73f96bdf146d008680149954",
                  width: 640,
                },
                {
                  height: 320,
                  url: "https://i.scdn.co/image/ab6761610000517473f96bdf146d008680149954",
                  width: 320,
                },
                {
                  height: 160,
                  url: "https://i.scdn.co/image/ab6761610000f17873f96bdf146d008680149954",
                  width: 160,
                },
              ],
              name: "LE SSERAFIM",
              popularity: 77,
              type: "artist",
              uri: "spotify:artist:4SpbR6yFEvexJuaBpgAU5p",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/3lva01D3HtmlEKjuxAZ7bC",
              },
              followers: {
                href: null,
                total: 118482,
              },
              genres: ["cantopop"],
              href: "https://api.spotify.com/v1/artists/3lva01D3HtmlEKjuxAZ7bC",
              id: "3lva01D3HtmlEKjuxAZ7bC",
              images: [
                {
                  height: 640,
                  url: "https://i.scdn.co/image/ab6761610000e5eb9b5ce862fd0a227b314aa8a7",
                  width: 640,
                },
                {
                  height: 320,
                  url: "https://i.scdn.co/image/ab676161000051749b5ce862fd0a227b314aa8a7",
                  width: 320,
                },
                {
                  height: 160,
                  url: "https://i.scdn.co/image/ab6761610000f1789b5ce862fd0a227b314aa8a7",
                  width: 160,
                },
              ],
              name: "Justin Lo",
              popularity: 44,
              type: "artist",
              uri: "spotify:artist:3lva01D3HtmlEKjuxAZ7bC",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/7n2Ycct7Beij7Dj7meI4X0",
              },
              followers: {
                href: null,
                total: 20137430,
              },
              genres: ["k-pop", "k-pop girl group", "pop"],
              href: "https://api.spotify.com/v1/artists/7n2Ycct7Beij7Dj7meI4X0",
              id: "7n2Ycct7Beij7Dj7meI4X0",
              images: [
                {
                  height: 640,
                  url: "https://i.scdn.co/image/ab6761610000e5eb0c6952f39ba680489149a54c",
                  width: 640,
                },
                {
                  height: 320,
                  url: "https://i.scdn.co/image/ab676161000051740c6952f39ba680489149a54c",
                  width: 320,
                },
                {
                  height: 160,
                  url: "https://i.scdn.co/image/ab6761610000f1780c6952f39ba680489149a54c",
                  width: 160,
                },
              ],
              name: "TWICE",
              popularity: 77,
              type: "artist",
              uri: "spotify:artist:7n2Ycct7Beij7Dj7meI4X0",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/4k5fFEYgkWYrYvtOK3zVBl",
              },
              followers: {
                href: null,
                total: 1860323,
              },
              genres: ["k-pop"],
              href: "https://api.spotify.com/v1/artists/4k5fFEYgkWYrYvtOK3zVBl",
              id: "4k5fFEYgkWYrYvtOK3zVBl",
              images: [
                {
                  height: 640,
                  url: "https://i.scdn.co/image/ab6761610000e5ebfdb9292f006730a215b7bfcc",
                  width: 640,
                },
                {
                  height: 320,
                  url: "https://i.scdn.co/image/ab67616100005174fdb9292f006730a215b7bfcc",
                  width: 320,
                },
                {
                  height: 160,
                  url: "https://i.scdn.co/image/ab6761610000f178fdb9292f006730a215b7bfcc",
                  width: 160,
                },
              ],
              name: "BOL4",
              popularity: 58,
              type: "artist",
              uri: "spotify:artist:4k5fFEYgkWYrYvtOK3zVBl",
            },
          ],
          total: 27,
          limit: 8,
          offset: 0,
          href: "https://api.spotify.com/v1/me/top/artists?offset=0&limit=8&time_range=short_term&locale=*",
          next: "https://api.spotify.com/v1/me/top/artists?offset=8&limit=8&time_range=short_term&locale=*",
          previous: null,
        }),
      });
    });
    const resp = await fetch("/api/topArtists");
    const data = await resp.json();
    expect(resp.status).toBe(200);
    expect(data).toHaveProperty("items")
    expect((data.items as artist[])[0].external_urls.spotify).toBe("https://open.spotify.com/artist/3HqSLMAZ3g3d5poNaI7GOU")
  });

  test("get topArtists fail", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        status: 500,
        json: () => (Promise.resolve({
          
        }))
      })
    })
  })
});
