import 'dotenv/config'
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// app.use() mounts the specified middleware function (in this case, express.json()) at the specified path.
// The middleware function will be executed when the base of the requested path matches the path.
// In this case, the middleware function will be executed for all requests, as we have not specified any particular path.
// The express.json() middleware function parses incoming requests with JSON payloads and is based on the body-parser package.
// It makes the parsed JSON data available on the request object as req.body.
// the body-parser package helps to parse the request body and make it available on the req object.
// but it is not needed here as express has built-in support for parsing JSON data.
app.use(express.json())

// The data for the tea orders is stored in an array called teaData.
let teaData = []

// the nextID is used to generate the id for the tea order, so that we ca uniquely identify each data
let nextID = 1;

// The POST method is used to submit data to the server.
// In this case, we are submitting data to create a new tea order.
// The route /tea is used to create a new tea order.
// The request body contains the data for the new tea order.
// The data is parsed from the request body using req.body.
// The data is then added to the teaData array.
// The id for the new tea order is generated using the nextID variable.
// The nextID variable is then incremented to generate the id for the next tea order.
// The new tea order is then sent as a response.
app.post('/tea', (req, res) => {
    const {name, price} = req.body;
    const newTea = {
        id : nextID++,
        name,
        price,
    }
    teaData.push(newTea);
    return res.status(201).send(newTea);
})

// The GET method is used to retrieve data from the server.
// In this case, we are retrieving data for all tea orders.
// The route /tea is used to retrieve data for all tea orders.
// The teaData array contains the data for all tea orders.
// The teaData array is then sent as a response.
app.get('/tea', (req, res) => {
    return res.status(200).send(teaData);
})


// The GET method is used to retrieve data from the server.
// In this case, we are retrieving data for a specific tea order.
// The route /tea/:id is used to retrieve data for a specific tea order.
// The id of the tea order is specified as a parameter in the route.
// The id is parsed from the route parameters using req.params.id. as the id is a string, we need to convert it to an integer using parseInt().
// The find() method is used to find the tea order with the specified id.
// If the tea order is found, it is sent as a response.
// If the tea order is not found, a 404 status code is sent as a response.

app.get('/tea/:id', (req,res) => {
    const tea = teaData.find((t)=> t.id === parseInt(req.params.id));
    // If the tea order is not found, a 404 status code is sent as a response.
    if(!tea) return res.status(404).send("Tea Not Found!!");
    res.status(200).send(tea);
})


// The PUT method is used to update data on the server.
// In this case, we are updating the data for a specific tea order.
// The route /tea/:id is used to update the data for a specific tea order.
// The id of the tea order is specified as a parameter in the route.
// The id is parsed from the route parameters using req.params.id.
// The data for the updated tea order is parsed from the request body using req.body.
// The find() method is used to find the tea order with the specified id.
// If the tea order is found, the data for the tea order is updated.
// The updated tea order is then sent as a response.
// If the tea order is not found, a 404 status code is sent as a response.
app.put('/tea/:id', (req, res) => {
    const tea = teaData.find((t)=> t.id === parseInt(req.params.id));
    if(!tea) return res.status(404).send("Tea Not Found!!");
    // The data for the updated tea order is parsed from the request body using req.body. [ i.e the new data is updated in the tea order]
    tea.name = req.body.name;
    tea.price = req.body.price;
    return res.status(200).send(tea);
})

// The DELETE method is used to delete data from the server.
// In this case, we are deleting a specific tea order.
// The route /tea/:id is used to delete a specific tea order.
// The id of the tea order is specified as a parameter in the route.
// The id is parsed from the route parameters using req.params.id.
// The findIndex() method is used to find the index of the tea order with the specified id.
// If the tea order is found, it is removed from the teaData array.
// The removed tea order is then sent as a response.
// If the tea order is not found, a 404 status code is sent as a response.
app.delete('/tea/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id));
    if(index===-1) return res.status(404).send("Tea Not Found!!");
    // The splice method is used to remove the tea order from the teaData array.
    // The splice method takes two arguments: the index of the element to remove and the number of elements to remove.
    // In this case, we are removing one element at the specified index.
    teaData.splice(index, 1);
    return res.status(200).send(teaData);
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}... `)
})


// The express server is created using the express() function.
// The app object represents the express server.
// The port variable specifies the port number on which the server will listen for incoming requests.
// The app.post() method is used to handle POST requests.
// The app.get() method is used to handle GET requests.
// The app.put() method is used to handle PUT requests.
// The app.delete() method is used to handle DELETE requests.
// The app.listen() method is used to start the express server.
// The server listens for incoming requests on the specified port number.
// When a request is received, the corresponding route handler is executed.
// The route handler processes the request and sends a response back to the client.
// The response contains the data requested by the client.
// The response status code indicates the outcome of the request.
// The response body contains the data returned by the server.
// The server runs continuously and listens for incoming requests until it is stopped.
// The server can handle multiple requests concurrently and respond to each request independently.
// The server can be accessed by clients using a web browser, a command-line tool, or an application.
// The server provides a RESTful API that allows clients to interact with the server using standard HTTP methods.
// The server can be deployed on a local machine, a cloud server, or a containerized environment.
// The server can be scaled horizontally to handle a large number of requests and provide high availability.
// The server can be monitored, logged, and secured to ensure optimal performance and reliability.
// The server can be integrated with other services and systems to build complex applications and workflows.
// The server can be tested using automated tests, manual tests, and performance tests to ensure its correctness and efficiency.
// The server can be maintained and updated to address bugs, security vulnerabilities, and new requirements.
// The server can be extended with additional features, plugins, and libraries to enhance its functionality and usability.
// The server can be optimized for performance, scalability, and cost-effectiveness to meet the needs of the users and the business.
// The server can be documented, versioned, and shared with the community to promote collaboration and innovation.
// The server can be customized, configured, and managed to meet the specific requirements of the application and the organization.
// The server can be monitored, analyzed, and optimized to improve its performance, reliability, and security over time.

// Hence the summary is 
// The server is created using the express() function.
// The server listens for incoming requests on the specified port number.
// The server handles different types of requests using the app.post(), app.get(), app.put(), and app.delete() methods.
// The server processes the requests and sends responses back to the clients.
// The server provides a RESTful API that allows clients to interact with the server using standard HTTP methods.
// The server can be deployed, scaled, monitored, tested, maintained, extended, optimized, documented, and customized to meet the requirements of the application and the organization.
// The server is a critical component of modern web applications and services, enabling communication between clients and servers over the internet.