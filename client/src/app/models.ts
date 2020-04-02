export interface Song{
    name: String;
    artists: [String];
    album: String;
    average_ratings: Number;
}
export interface Artist{
    name: String;
    songs: String;
    dob: String;
}
export interface User{
    name: String;
    email: String;
    password: String;
    dob: Date;
}