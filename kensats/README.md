# KensaTS

A lightweight package to gather metrics from your GraphQL Apollo Server queries.

## Getting Started

To be able to test your GraphQL application install our package following these instructions.

Note: Currently supporting GraphQL Apollo Server only.

### Prerequisites

You need to have a backend server built using GraphQL Apollo Server. Go to the [GraphQL](https://www.apollographql.com/docs/) to learn more about using GraphQL with Apollo Server.

Have an account with Kensa. Visit [Kensa](https://kensats.link/) and sign up for an account to get full access to the Kensa web app.


<a href="https://www.loom.com/share/b56225773efb488d91ba52d632fe8d46">
    <img style="max-width:600px;" src="https://cdn.loom.com/sessions/thumbnails/b56225773efb488d91ba52d632fe8d46-1668035682296.gif">
  </a>

<hr>

### Installing

Install the KensaTS Package into your project

```sh
npm install kensats
```
<hr>

In your server file, import the following plugins from kensats:

```js
import { kensaPlugin, getContext} from 'kensats';
```
<hr>
Include the kensaPlugin in your plugins array

```js
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [kensaPlugin]
  }); 
```
<hr>

Get the API key from the project you are going to be testing by clicking on the info button.

<a href="https://www.loom.com/share/4b52fd8b23d64c078e976b65bbab735d">
    <img style="max-width:600px;" src="https://cdn.loom.com/sessions/thumbnails/4b52fd8b23d64c078e976b65bbab735d-1668104210002.gif">
  </a>

And paste it on your server file
```js
 const api = '65b00bbe-3b3b-4fea-8d3f-de3a84338914';
 ```

<hr>
Set the required context by calling the function getContext and passing the request and response objects inside an object and the api key as second argument. Optionally you can also pass your test database. The expressMiddleware function enables you to attach Apollo Server to an Express server.

```js
  app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(apolloServer, {
    // when referencing the database in resolvers, use 'db' when deconstructing context object
    context: async ({req, res}: any) => (await getContext({req, res}, api, testDb))
  }));
  ```
  
  
<hr>



## Authors

* **Brian Peinado** 
* **Tommy Li** 
* **Brian Pham** 
* **Raymond Kim** 


See also the list of [contributors](https://github.com/oslabs-beta/Kensa/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

