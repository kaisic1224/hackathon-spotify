interface playLartist {
  external_urls: external_url;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface external_url {
  spotify: string;
}

interface album {
  album_type: string;
  total_tracks: number;
  artists: artist[];
  available_markets: string[];
  external_urls: external_url;
  href: string;
  id: string;
  images: image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: {
    reason: string;
  };
  type: string;
  uri: string;
  album_group: "album" | "single" | "compilation" | "appears_on";
  artists: {
    external_urls: external_url;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  };
}

interface image {
  height: number;
  url: string;
  width: number;
}

export interface artist {
  external_urls: external_url;
  followers: {
    href: string | null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface track {
  album: album;
  artists: artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  external_urls: external_url;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: originalTrack;
  restrictions?: {
    reason: "market" | "product" | "explicit";
  };
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface playlistItem {
  track: track;
  played_at: string;
  context: {
    external_urls: external_url;
    href: string;
    type: string;
    uri: string;
  };
}
