export interface Artist {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface ArtistAlbum {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: { reason: string };
  type: string;
  uri: string;
  artists: [
    {
      external_urls: { spotify: string };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }
  ];
  album_group: string;
}

export interface PaginatedResponse<T> {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: T[];
}

export interface AlbumDetails {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: {
    reason: string;
  };
  type: string;
  uri: string;
  artists: Array<{
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }>;
  tracks: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: Array<{
      name: string;
      artists: Array<{
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }>;
      available_markets: string[];
      disc_number: number;
      duration_ms: number;
      explicit: boolean;
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      is_playable: boolean;
      track_number: number;
      type: string;
      uri: string;
      is_local: boolean;
      preview_url: string;
    }>;
  };
  copyrights: Array<{
    text: string;
    type: string;
  }>;
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  genres: string[];
  label: string;
  popularity: number;
}

export type ArtistPaginatedResponse = PaginatedResponse<Artist>;
export type ArtistAlbumPaginatedResponse = PaginatedResponse<ArtistAlbum[]>;

