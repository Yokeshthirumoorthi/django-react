import { applySearch } from "../pages/QnA";

const sampleData = [
  {
    question: "What's the best thing about Switzerland?",
    answer: "I don't know, but the flag is a big plus.",
  },
  {
    question: "Why do you never see elephants hiding in trees?",
    answer: "Because they're so good at it.",
  },
];

describe("Apply search", function () {
  it("should return actual data for empty term", () => {
    const searchTerm = "";
    expect(applySearch(sampleData, searchTerm)).toMatchObject(sampleData);
  });

  it("should return no data for irrelevent search term", () => {
    const searchTerm = "abcdef";
    expect(applySearch(sampleData, searchTerm)).toMatchObject([]);
  });

  it("should search for term in question", () => {
    const searchTerm = "elephants";
    expect(applySearch(sampleData, searchTerm)).toMatchObject([sampleData[1]]);
  });

  it("should search for term in answer", () => {
    const searchTerm = "flag";
    expect(applySearch(sampleData, searchTerm)).toMatchObject([sampleData[0]]);
  });
});
