// const registerAllRoutes = (app: express.Application, folderPath: string) => {
//     fs.readdirSync(folderPath).forEach((file) => {
//       if (file.endsWith(".ts") || file.endsWith(".js")) {
//         // Import the route module
//         const routeModule = require(path.join(folderPath, file));
//         // Check if the route module has a router property
//         if (routeModule.router) {
//           // Extract the route path from the file name (assuming file name is in kebab-case)
//           const routePath = `/${path.basename(file, path.extname(file)).replace(/_/g, "-")}`;
//           // Attach the route to the Express app for all HTTP methods
//           app.all(routePath, routeModule.router);
//           console.log(`Route registered: ${routePath}`);
//         }
//       }
//     });
//   };

//   registerAllRoutes(app, path.join(__dirname, "routes"));
