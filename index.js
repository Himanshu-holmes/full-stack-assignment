const express = require('express')
const app = express()
const port = 3001

const USERS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSION = [

]

app.post('/signup', function(req, res) {
  // Add logic to decode body
  // body should have email and password
    const { email, password } = req.body;

  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)
  // Check if the user with the given email already exists
  if (USERS.find(user => user.email === email)) {
    // Return an error message
    res.status(400).send('User already exists');
    return;
  }
     // Store the user in the USERS array
  USERS.push({ email, password });

  

  // return back 200 status code to the client
// Return a success message
  res.status(200).send('User created successfully');
});


app.post('/login', function(req, res) {
  // Add logic to decode body
  // body should have email and password
 const { email, password } = req.body;
  // Check if the user with the given email exists in the USERS array
      if (!user) {
    res.status(401).send('Invalid email or password');
    return;
  }

  // Also ensure that the password is the same and   If the password is not the same, return back 401 status code to the client

if (user.password !== password) {
    res.status(401).send('Invalid email or password');
    return;
  }
  // If the password is the same, return back 200 status code to the client
     // Also send back a token (any random string will do for now)
  const token = Math.random().toString(36).substring(7);
  res.status(200).send({ token });
});
 



app.get('/questions', function(req, res) {

  //return the user all the questions in the QUESTIONS array
  const questions = QUESTIONS;

  // Check if the QUESTIONS array is empty
  if (questions.length === 0) {
    // Return an error message
    res.status(404).send('No questions found');
    return;
  }

  // Return the questions to the user
  res.json(questions);
});

app.get("/submissions", function(req, res) {
   // return the users submissions for this problem
 // Get the user ID from the request
  const userID = req.user.id;

  // Get all the submissions for the user
  const submissions = await db.submissions.find({ userID });

  // Check if the submissions array is empty
  if (submissions.length === 0) {
    // Return an error message
    res.status(404).send('No submissions found');
    return;
  }

  // Return the submissions to the user
  res.json(submissions);
});


app.post("/submissions", function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
   // Store the submission in the SUBMISSION array above
   // Decode the body of the request
  const { problemID, submissionCode } = req.body;

  // Generate a random number between 0 and 1
  const randomNumber = Math.random();

  // If the random number is less than 0.5, accept the submission
  if (randomNumber < 0.5) {
    // Store the submission in the SUBMISSION array
    SUBMISSIONS.push({
      problemID,
      submissionCode,
      accepted: true,
    });

    // Return a success message
    res.status(200).send('Submission accepted');
  } else {
    // Reject the submission
    res.status(400).send('Submission rejected');
  }
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.
// Check if the user is an admin
  if (!req.user.isAdmin) {
    // Return an error message
    res.status(401).send('Unauthorized');
    return;
  }

  // Decode the body of the request
  const { title, description, difficulty, points } = req.body;

  // Create a new problem object
  const problem = {
    title,
    description,
    difficulty,
    points,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Add the problem to the database
  await db.problems.insertOne(problem);

  // Return a success message
  res.status(201).send('Problem created');
});

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})
