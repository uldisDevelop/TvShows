# TV Show Search Application

- Application provides functionality for searching TV shows
- After searching a phrase user can open the the TV show details eather by clicking on it or navigating to the desired item via keyboard
- In the Details view season episodes are fetched manualy for each season by pressing the button 'Show Episodes'
- Returning to the search screen (from details) can be done eather by using back button or via the keyboard
- Search is throttled in ordered minimize the request count sent to the server while still making the application responsive
- To ensure sequential AJAX responses from API a AJAX handler is used that can abort previous AJAX calls if they are not relevant
- State managment is done using redux and immer 
- Styling is done using css(scss) modules



## To start the app

1) Clone the repository
2) Install dependencies via ...

```sh
npm install
```
3) Start the application by running

```sh
npm start
```


