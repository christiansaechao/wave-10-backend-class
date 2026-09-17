# Starting your backend server

## STEPS (starting from an empty folder)

1. Create a new empty folder name it [app_name]_backend. (name it whatever you want)
2. Initialize your project
    2.1: Run ``` npm init -y```. This will create your package.json file for your application. This holds some information about your project, as well as a list of your libraries/packages that you'll download. (key term: dependencies)
    2.2: (OPTIONAL) changes in your package.json
        - change the ``` "type": "commonjs" => "type": "module" ``` lets you do import/exports like we've been doing in react.
        - add in a new 'script' to "scripts". ``` "dev": "node --watch src/server.js" ``` This lets you run "npm run dev" in the terminal to start your backend sever. Just like we have in the frontend.
3. Setting Up Your Backend
    - let's start by downloading some of our libraries we'll need to start initially. Make sure your terminal is in the correct folder (your backend project) before we begin.
    1. ``` npm i express dotenv``` (our backend framework, env variable loader). These get download as part of our main build.
    2. ``` npm i --save-dev typescript tsx ``` (typescript stuff). These are downloads for us while developing the app, stuff that helps us as developers to catch errors and bugs. They don't get added to our final build.
        - Setting up Typescript
            - run ``` npx tsc --init ``` in your terminal (this will create a tsconfig.json file in your file tree)
            - this has all the settings you can update for typescript. Replace everything in there with this setup. Grab everything from [line 19 to 31]
            ```
                {
                    "compilerOptions": {
                        "target": "ES2020",
                        "module": "ESNext",
                        "moduleResolution": "Bundler",
                        "rootDir": "./src",
                        "outDir": "./dist",
                        "strict": true,
                        "esModuleInterop": true,
                        "skipLibCheck": true,
                        "forceConsistentCasingInFileNames": true
                    }
                }
            ```
    3. Okay, we're going to go back now to package.json and update our "dev" script, that we made earlier. Now that we have typescript installed we need a different command to watch for our server. we're going to change our dev script now to ``` tsx watch src/server.js ```
4. Structuring the backend
    - We're going to create a src folder and then inside, we're going to make one file: server.js
        [file tree]
        - node_modules
        - [src]
            - server.js
        - package-lock.json
        - package.json
5. From here we're going to be doing some setup for the sever, to get it actually running.
    ```
        import express from "express";
        const app = express();


        app.listen(3001, () => console.log("Server is running on port: 3001"))
    ```
    - importing express (our backend framework, equivalent to like React on the frontend)
    - creating a variable "app", this holds our entire backend/express application. this is the start of our entire sever.
    - app.listen: this takes in a port number and a callback function as parameters. What it does is
        1. starts the sever to listen for incoming requests (like api requests) and says to listen on port 3001 (on your computer, so this only works locally)
6. Starting your server: run ``` npm run dev ```
    - inside your terminal you should see our console.log that we added to the app.listen. Congratulations you have successfully created a backend server and it's now running.

## Connecting to Supabase

Now that our server is running, let's connect it to a real database using Supabase (a hosted Postgres database).

1. Create your Supabase project
    - Go to [supabase.com](https://supabase.com) and sign in/sign up.
    - Click "New Project". Give it a name (e.g. `bounty-board`), set a database password (save this somewhere safe), and pick a region close to you.
    - Wait a minute or two for Supabase to provision your project.

2. Download the packages we need
    - Back in your terminal, in your backend project folder, run:
    ```
    npm i @supabase/supabase-js dotenv
    ```
    - `@supabase/supabase-js`: the client library that lets our Node server talk to our Supabase database.
    - `dotenv`: lets us load secret values (like API keys) from a `.env` file instead of hardcoding them in our code.

3. Grab your project keys
    - In your Supabase project dashboard, go to the gear icon (**Project Settings**) → **API**.
    - You'll need two values:
        - **Project URL** (under "Project URL")
        - **anon public** key (under "Project API keys")
    - Keep this tab open, we're about to paste these into our project.

4. Create your `.env` file
    - In the root of your backend project (same level as `package.json`), create a new file named `.env`.
    - Add the following, replacing the placeholders with the values from step 3:
    ```
    SUPABASE_URL=your_project_url_here
    SUPABASE_KEY=your_anon_public_key_here
    ```
    - **Important:** never commit your `.env` file to GitHub. Create a `.gitignore` file in your project root (if you don't have one) and add:
    ```
    node_modules
    .env
    ```

5. Set up the Supabase config file
    - Inside your `src` folder, create a new folder called `config`, and inside it a file called `supabaseClient.js`.
        [file tree]
        - [src]
            - [config]
                - supabaseClient.js
            - server.js
    - Add the following code:
    ```
    import { createClient } from "@supabase/supabase-js";
    import "dotenv/config";

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    export const supabase = createClient(supabaseUrl, supabaseKey);
    ```
    - `import "dotenv/config"` loads the values from our `.env` file into `process.env` so we can read them here.
    - `createClient` sets up our connection using the URL and key we grabbed from Supabase.
    - We `export` the `supabase` variable so we can `import { supabase } from "../config/supabaseClient.js"` inside our controllers to run queries.

6. Create your tables
    - In the Supabase dashboard, go to the **Table Editor** (left sidebar) and click "New table" to create each table (e.g. `hunters`, `criminals`, `bounties`, `claims`), or use the **SQL Editor** to run `CREATE TABLE` statements directly.
    - Make sure your foreign key columns (like `criminal_id`, `posted_by`, `bounty_id`, `hunter_id`) reference the correct primary keys.

7. Test the connection
    - In `server.js`, temporarily import your client and run a quick test query:
    ```
    import { supabase } from "./config/supabaseClient.js";

    app.get("/test-db", async (req, res) => {
        const { data, error } = await supabase.from("hunters").select("*");
        if (error) return res.status(500).send(error.message);
        return res.send(data);
    });
    ```
    - Run `npm run dev`, visit `http://localhost:5000/test-db` in your browser, and you should see an empty array `[]` (or your data, if you added any rows in the Table Editor). That confirms your server is successfully talking to Supabase.