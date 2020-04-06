export interface Song{
    song_name: String;
    song_artists: [Artist];
    song_album: String;
    avg_rating: Number;
    song_releasedate: string,
    id:String;
    song_cover:any;
}
export interface Artist{
    artist_name: String;
    artist_dob: string;
    artist_bio: String;
}
export interface User{
    name: String;
    email: String;
    password: String;
}
export interface Image{
    data: BinaryType,
    contentType: String
}