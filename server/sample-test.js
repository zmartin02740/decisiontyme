const shortid = require("shortid");

module.exports = [
  {
    id: shortid(),
    body: "The first question",
    type: "MULTIPLE_CHOICE",
    options: [
      { id: shortid.generate(), answer: "some answer", correct: false },
      { id: shortid.generate(), answer: "another answer", correct: false },
      { id: shortid.generate(), answer: "the right answer", correct: true },
      { id: shortid.generate(), answer: "yet another answer", correct: false }
    ]
  },
  {
    id: shortid.generate(),
    body: "The second question",
    type: "OPEN_RESPONSE"
  }
];
