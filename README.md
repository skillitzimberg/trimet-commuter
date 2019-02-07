# Trimet Commuter

![](screenshots/HomeScreen.png)

You can see the current state of my project deployed [here](https://trimet-commuter.firebaseapp.com).

### Authors
Scott Bergler  
Phil Mass
Ralph Perdomo
Jared Reando

## Table of contents
**[Resources](#resources)**<br>
**[Setup & Installation](#setup-and-installation)**<br>
**[Known Bugs](#known-bugs)**<br>
**[Acknowledgements](#acknowledgements)**<br>
**[Support](#support)**<br>
**[Technologies Used](#technologies-used)**<br>
**[License](#license)**<br>
**[Copyright](#copyright)**<br>

## Resources

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.

[PROJECT PLANNING](./PLANNING.md): Outlines planning criteria, use cases, specifications, notes, and errata.

See [SETUP.md](./SETUP.md) for details about tools you may need to install and use to work on and use this project on your Mac.  

Here are some links in case you need information about setup for other operating systems:  
[Angular](https://angular.io/)  
[Angularfire](https://github.com/angular/angularfire2)  
[Firebase](https://firebase.google.com/)  
[Karma](https://karma-runner.github.io/latest/index.html)  
[Jasmine](https://jasmine.github.io/)  
[Node JS](https://nodejs.org/en/)  
[TypeScript](https://www.typescriptlang.org/)

## Setup and Installation
After making sure that you have everything you need from [SETUP.md](./SETUP.md) . . .

Making the assumption that you know your way around Github, fork the repository from [GitHub](https://github.com/philrmass/trimet-commuter).  

Clone your forked repository to your computer.  

Use your preferred command line/terminal to navigate into the directory:
```
cd trimet-commuter/
```

Open the project in a text editor like Atom or VS Code.

#### Setup for Firebase database usage
Go to [Firebase](https://firebase.google.com/).
Set up an account for yourself. If you already have a Google or Gmail account, you already have access - just sign in.  
Once you've created an account, you should be taken to a user dashboard area, with an option to Create a New Project. Select this option, provide a name for your new project, and select your Country/region from the drop-down menu.  

You'll then be taken to an "Overview" area. Where you'll be offered three options:  

- Add Firebase to your iOS app
- Add Firebase to your Android app
- Add Firebase to your web app

Select Add Firebase to your web app. Firebase should respond with a pop-up modal window. Keep the information in this modal handy.  

Create a new file called api-keys.ts in the src/app directory. This file has been added to the .gitingore, so your credentials will not be pushed to Github.  

Copy your Firebase credentials into api-keys.ts (the x's represent your specific information just for this example. Replace them with your actual credentials):
```
export const masterFirebaseConfig = {
    apiKey: "xxxx",
    authDomain: "xxxx.firebaseapp.com",
    databaseURL: "https://xxxx.firebaseio.com",
    storageBucket: "xxxx.appspot.com",
    messagingSenderId: "xxxx"
  };
```

**NOTE: The exported constant in the above code must be named masterFirebaseConfig. If you decide to rename it here you will need to find masterFirebaseConfig everywhere in the project and replace it with your constant's name.**

#### Setup for using the TriMet API
Go to [Trimet Developer Services](https://developer.trimet.org/appid/registration/) to register your app. Your application id will be emailed to you along with a link to confirm your registration.  
This application uses [Arrivals Web Service V2](https://developer.trimet.org/ws_docs/arrivals2_ws.shtml) and the HTTP GET parameters style:
"https://developer.trimet.org/ws/V1/arrivals?locIDs=6849,6850&appID=0000000000000000000000000".  

 In the api-keys.ts file mentioned above save your trimet app id as:

 ```
 export const trimetApiKey = yourAPIkey;
 ```
Replace 'yourAPIkey' in the code above with the app id that was emailed to you.

As with the Firebase api key above, you must name the TriMet app id "trimetApiKey" or else you'll have to rename it elsewhere in the code.

#### Run the application
In the project root directory run the command:
```
npm install
```

Run the command:
```
ng serve --open
```
Your default browser should open a new window or tab with the website/app ready to use at [localhost:4200](localhost:4200).  

## Acknowledgements

## Known Bugs
## NOTES:
* [AUTH SERVICE]
  * issue- returns USER object when wrong credentials entered.
  * expected behavior- does not return USER object
* [USER DATA]
  * request- missing 'formal stop' name

## Support
Scott Bergler :: commandinghands@gmail.com
Phil Mass :: philrmass@gmail.com
Ralph Perdomo :: ralph@perdomo.com
Jared Reando :: 

## Technologies Used
For versions and a full list of dependencies, plugins, and scripts see [package.json](./package.json).  

| Dependency | Description |
| --- | --- |
| @angular/fire | library for connecting Firebase with Angular |
| firebase | library for working with Firebase |
| jasmine-core | JavaScript BDD testing framework |
| jasmine-spec-reporter | Allows Jasmine specs to be run |
| karma | Allows the execution of JavaScript code in multiple *real* browsers |
| karma-chrome-launcher | Launcher for Google Chrome, Google Chrome Canary, and Google Chromium |
| karma-coverage-istanbul-reporter | Launcher for Google Chrome, Google Chrome Canary, and Google Chromium |
| karma-jasmine | Plugin - adapter for Jasmine testing framework |
| karma-jasmine-html-reporter | Dynamically shows test results at debug.html page |
| tslint | Identifies and reports on patterns found in Javscript code |

## License
Licensed under the MIT license.

## Copyright
Copyright (c) 2019 ** Scott Bergler; Phil Mass; Ralph Perdomo; Jared Reando **
