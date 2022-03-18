import { render, screen, fireEvent } from "@testing-library/react";
import { AddNewQAForm } from "../views/AddNewModal";

describe("Add New QA Form", () => {
  it("should show error message when form is empty", () => {
    render(<AddNewQAForm />);

    const questionTextBox = screen.getByRole("textbox", { name: /question/i });
    const answerTextBox = screen.getByRole("textbox", { name: /answer/i });
    const saveBtn = screen.getByRole("button", { name: /save/i });

    expect(questionTextBox).toBeInTheDocument();
    expect(answerTextBox).toBeInTheDocument();
    expect(saveBtn).toBeInTheDocument();

    fireEvent.click(saveBtn);
    const ValidationText = screen.getByText(
      /Question and Answer cannot be empty/i
    );

    expect(ValidationText).toBeInTheDocument();

    fireEvent.input(questionTextBox, { target: { value: "Some question" } });
    fireEvent.input(answerTextBox, { target: { value: "Some answer" } });
    fireEvent.click(saveBtn);
    expect(ValidationText).not.toBeInTheDocument();
  });
});
