# Mello, a Trello clone.

Mello is a web application inspired by Trelo that provides an online way to schedule tasks and be productive. Mello functions almost identically to Trello by allowing users to create boards, lists, and cards to keep your tasks ordered.

### Live link: [Mello](https://mello-e9cv.onrender.com)

### Wiki Links:

- [User Stories](https://github.com/bbimestefer/trello-clone/wiki/User-Stories)
- [Feature List](https://github.com/bbimestefer/trello-clone/wiki/Feature-List)
- [Database Schema](https://github.com/bbimestefer/trello-clone/wiki/Database-Schema-for-first-three-features)
- [Wireframes](https://github.com/bbimestefer/trello-clone/wiki/Wireframes)

Pseudocode used to visualize Redux Store Shape.

### This project is built with:
- Python
- Javascript
- SQLAlchemy
- Flask
- React
- Redux
- HTML
- CSS

Clone the project!

```
git clone https://github.com/bbimestefer/trello-clone.git
```
Install dependencies
```
cd react-app
npm install
cd ..
pipenv install -r requirements.txt
pipenv run
flask db upgrade
flask seed all
```
Set up Environment Variables
Running this project requires you to add a .env file in your root directory. This will have a SECREY_KEY, DATABASE_URL, and SCHEMA variables in it that will allow your website to work.

Start the backend server
```
pipenv run flask run
```
If you are in the python pipenv shell run this command instead:
```
flask run
```
Open another terminal and from the root directory run these commands:
```
cd react-app
npm start
```
The react-app should automatically open in your default browser. Enjoy!


## Screenshots

### Main page
![main-page](https://user-images.githubusercontent.com/72410777/216195467-17df77cd-a5e8-4991-b020-3259bd855653.png)

### Board page
![board-page](https://user-images.githubusercontent.com/72410777/216194931-cfcddcb0-03f4-479a-bdfc-4259952812b6.png)

## Future Goals

In the future I plan on implementing a card details page that allows you to add comments to your tasks so that you know where you left off. I also plan on adding 
the ablility to label your cards to keep them orgainzed and be able to search for cards by their label.

