# CraftyCart
Project for CMPE 133. CraftyCart is a shopping list webapp that will find the cheapest place to purchase your whole cart.

## Running Local Copy
- Install [node.js](https://nodejs.org/en) and clone this repository to your local system.
- Navigate to the `/craftycart-webapp` folder and run `npm install next --force`.
    - Note that the `--force` parameter allows for packages to be installed despite having conflicting dependancies. The fuzzysearch package used in this project depends on an older version of mongoose. In our tests this did not result in any noticeable errors and so we used this combination despite the discrepancy.
- Run `npm run dev` to host a development build or `npm run build` to compile a final build.
- Navigate to [http://localhost:3000/](http://localhost:3000/) on your browser to view the hosted page.
- set token in `.env` to a randomly generated security token. Should look like `TOKEN_SECRET=<token-here>` (without angle brackets).

### Database setup
- Install [MongoDB community server](https://www.mongodb.com/try/download/community) or open a mongodb atlas database.
- Set uri in `.env` to MongoDB instance. If you are using the community server it should look like `MONGO_URI=mongodb://127.0.0.1/CraftyCart`
- The first time each collection is used there is often a delay or error as the collection is created locally. It is probably necessary to refresh the page to resolve these errors.
- To load the database with example data download the following csv tables.
    - [CraftyCart-Example-Items.csv]()
    - [CraftyCart-Example-Stores.csv]()
- On the hosted app navigate to [http://localhost:3000/bulk-add](http://localhost:3000/bulk-add). Using the upload data button upload the items table and click the checkbox for "Items". Click submit to insert the table into the database. Repeat the same steps for the Stores table setting the selection to "Stores".
    - If you are attempting to add a custom store it is recommended to upload a csv table containing the store(s) info except for the _id field. The returned data in the "results" box includes an _id field for each store object as it appears in the database. This can be copied and used on a table of items that are intended to link to this store.
    - The preset data given in the above csv files has store '_id' feilds already filled to go along with the data in the example items table. Adding this data to a database already populated with store data could cause a collision. This is not reccommended.
    - As of now there is no frontend way to delete objects in the store or items collections. Using the MongoDB Compass application packaged with the community server installer might be necessary to delete extra documents.
  
