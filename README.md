# UberDash
A very original idea from very original people.

## Development Setup
- clone repo onto your local machine
- create environment files in `backend/` and `frontend/`, this is where your database credentials will live (these files are gitignored, we don't want to be pushing this onto the remote repo)
  - ```
    // create frontend environment file
    touch frontend/src/environment.json
    
    // write file contents:
    {
     "cwl": "your_cwl"
    }
    ```
  - ```
    // create backend environment file
    touch backend/environment.php
    
    // write file contents (db_uri might be different):
    <?php 
      $_ENV['db_uri'] = 'dbhost.students.cs.ubc.ca:1522/stu';
      $_ENV['db_username'] = 'your_db_username';
      $_ENV['db_password'] = 'your_db_password';
    ?>
    ```
- cd into `frontend/` and run `npm install`
- login into ubc cs undergrad server and make sure you have `~/public_html/uberdash/` folders set up with the appropriate permissions (do through cyberduck or terminal)
  - run this command on the folders: `chmod 711 folder_name `
- copy over `backend/` and `set-permissions.sh` from your local machine to the remote server under `~/public_html/uberdash/` (we don't need frontend code on the server, plus its a pretty thicc folder)
- on the server cd into `~/public_html/uberdash/` and type `./set-permissions.sh` in the terminal. This will execute a bash script that sets the appropriate permissions for all files and folders in the `backend/` directory (otherwise our php won't run properly). 
  - If you try to run it and you get a permissions error, run `chmod 755` on it and try again.
  - You should run this script every time you upload new files to cyberduck (otherwise you'll see some kind of "End of script output before headers: fileName.php" error when testing)
- to initialize database, on the server cd into `~/public_html/uberdash/backend/sql/` and boot up sqlplus to run `init.sql`. We can each add and remove tuples however we like since we each have our own copy of the database, but we should specify in our PRs if we make any schema changes in our CREATE TABLE statements (might indirectly affect each other).


## Development + Testing
- **Frontend**: on your local machine, cd into `frontend/` and run `npm start` to boot up the React app.
- **Backend**: to effectively test whether our REST api works as intended, install any piece of software that can easily let you make REST requests to a server. If your request is meant to modify the database, you will also have to check the database state with `sqlplus` like we had to do for tutorial 7. Some good choices for REST communication software are:
  - vscode extension 'REST Client'
  - Postman
- **End-to-End**: in `frontend/src/services/`, we have JS modules that can make REST requests to our backend with the npm `axios` library. Each module should be responsible for one respective endpoint and database table e.g. `customers.js` is responsible for making requests to the customers endpoint in the backend, and therefore making queries to the CUSTOMERS table in the database.
