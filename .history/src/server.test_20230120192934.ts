import axios, { AxiosError } from "axios";

let port = 3000;
let host = "localhost";
let protocol = "http";
let baseUrl = `${protocol}://${host}:${port}`;

test("GET /foo?bar returns message", async () => {
    let bar = "xyzzy";
    let { data } = await axios.get(`${baseUrl}/foo?bar=${bar}`);
    expect(data).toEqual({ message: `You sent: ${bar} in the query` });
});

test("GET /foo returns error", async () => {
    try {
        await axios.get(`${baseUrl}/foo`);
    } catch (error) {
        // casting needed b/c typescript gives errors "unknown" type
        let errorObj = error as AxiosError;
        // if server never responds, error.response will be undefined
        // throw the error so typescript can perform type narrowing
        if (errorObj.response === undefined) {
            throw errorObj;
        }
        // now, after the if-statement, typescript knows
        // that errorObj can't be undefined
        let { response } = errorObj;
        // TODO this test will fail, replace 300 with 400
        expect(response.status).toEqual(400);
        expect(response.data).toEqual({ error: "bar is required" });
    }
});

test("POST /bar works good", async () => {
    let bar = "xyzzy";
    let result = await axios.post(`${baseUrl}/foo`, { bar });
    expect(result.data).toEqual({ message: `You sent: ${bar} in the body` });
});


test("POST /book author not exist", async ()=>{
   const body ={
    "id":4,
    "author_id":"3",
    "title":"My Fairest Lady",
    "pub_year":"2000",
    "genre":"romance"
  }
  let result = await axios.post(`${baseUrl}/book`,body)
  console.log(result.data)
  expect(result.data).toEqual({"message": "the author id not exist"})

})

test("POST /book work ok ", async ()=>{
   const body ={
    "id":10,
    "author_id":1,
    "title":"My Fairest Lady",
    "pub_year":"2000",
    "genre":"romance"
  }
  console.log(body)
  let result = await axios.post(`${baseUrl}/book`,body)
  expect(result.data).toEqual({"id":10,"message": "insert id"})

})
test("POST /book author not exist", async ()=>{
   const body ={
    "id":10,
    "author_id":1,
    "title":"My Fairest Lady",
    "pub_year":"2000",
    "genre":"romance"
  }
  let result = await axios.post(`${baseUrl}/book`,body)
  console.log(result.data)
  expect(result.data).toEqual({"id":10,"message":"insert"})

})