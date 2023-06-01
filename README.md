# Payana Backend Challenge

## How to run with Docker
### Pre-Requirements

* Docker v4.19.0 (106363) - Engine: 23.0.5 - Compose: v2.17.3

### How to run

First we need to deploy the app inside docker so we need to run this command

```sh
docker compose up
```

Then we can connect using Postman or curl to the endpoint `localhost:3000`

```sh
curl --location 'http://localhost:3000/live'
```

## How to run without Docker
### Pre-Requirements

* Node v16 or later
* Redis v7.0.11

### How to run

First of all we need to start the redis server, once we have that done, then we need to install all dependencies by running this command

```sh
npm install
```

Then we need to generate a build so we run this command

```sh
npm run build
```

Now we can start the server

```sh
npm start
```

Also you can run the server running this command

```sh
npm run dev
```

## Endpoints

### Documentation

Once you run the server, you can found all the common endpoints in **swagger** you can view that on this url

`http://localhost:3000/documentation`

### Live

With this endpoint you can know if the server is alive or not

`http://localhost:3000/live`

### Metrics

With this endpoint you can view some metrics like **Total user CPU time spent in seconds**, **Resident memory size in bytes** and others

`http://localhost:3000/metrics`

## Code Documentation (NEW)

I like to be innovative in terms of documentation and for that I like to use Swimm, which is a platform where you can document the code and explain it, it has to make diagrams, etc. I think it is a good option to explain how your application works.
In my case I did a demonstration of how it works with the **index.ts** file. In order to see it, this [extension](https://marketplace.visualstudio.com/items?itemName=Swimm.swimm) must be installed in your vscode.
Once is installed you need to click the Swimm button on the left side panel and then search for `REPO DOCS`, there you have a file called `How the app starts` open it and enjoy!