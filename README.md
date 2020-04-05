# Music-Website
Music Website like spotify that allows to add songs, artists and other related contents.


_*This project is Full Stack Project including backend in Node.js which uses Express server and Frontend written in Typescript which works on Angular Framework.*_

- [x] To Run the backend Properly this is step is a must
      You need to create a File - default.json inside /config/ folder with following syntax
      ```
      {
        "mongoURI": "{Your Mongo Connection Name}"
        "jwtKey: "{Your Jwt Secret Key"
      }
      ```

## To Run this Project Run the Following commands in the shell
```
npm install
npm start
ng serve
```

### Now you can browse the website on following Address
```localhost:4200```

## Home Page to Display Top Songs and Top Artists
_You can see following homepage after logging or registering_
![Home](/images/Home.png)

## Adding Songs and Artists
_You can add new songs and corresponding artists_
![Action](/images/Add Artist.png)
