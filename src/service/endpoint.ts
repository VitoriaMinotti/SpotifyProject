export namespace Endpoints {

  const base = 'https://api.spotify.com/v1';

  export const endpoints = {
    getArtists: () => `${base}/artists`,
    getMyTopArtists: () => `${base}/me/top/artists`,
    getArtistsById: (id: string) => `${base}/artists/${id}`,
    getArtistsAlbum: (id: string) => `${base}/artists/${id}/albums`,
    getAlbumDetails: (id: string) => `${base}/albums/${id}`,
    search: (query: string) => `${base}/search?q=`,
  }
}