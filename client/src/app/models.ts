export interface Song{
    name: String;
    artists: [String];
    average_ratings: Number;
    
}
export interface Artist{
    name: String
}
export interface User{
    name: String;
    email: String;
    password: String;
    dob: Date;
}