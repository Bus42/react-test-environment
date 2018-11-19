const config = {
    // Change base_URL to consume a different API
    base_URL: "https://ghibliapi.herokuapp.com",
    // Edit endpoints to what you will be using for the request. Do not delete, if not using endpoint, set to empty array
    endpoints: ["/films"],
    // Edit parameters to what you will be using for the request. Do not delete, if not using parameters, set to empty array
    parameters: ["limit=20", "fields=title,id,description,url"]
  }
export default config;