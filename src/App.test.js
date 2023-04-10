import GridCard from "./features/users/GridCard";
import MenuAppBar from "./app/Navbar";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store.js";
import NewPoll from "./features/questions/NewPoll.js";
import preview from "jest-preview";
import { login } from "./features/users/authedUserSlice.js";
import { act } from "react-dom/test-utils";

describe("NewPoll", () => {
  it("will render correctly", async () => {
    store.dispatch(login("sarahedo"));
    var component = render(
      <BrowserRouter>
        <Provider store={store}>
          <NewPoll />
        </Provider>
      </BrowserRouter>
    );
    expect(component).toMatchSnapshot();
  });

  it("will submit correctly", async () => {
    store.dispatch(login("sarahedo"));
    var component = render(
      <BrowserRouter>
        <Provider store={store}>
          <NewPoll />
        </Provider>
      </BrowserRouter>
    );
    act(() => {
      var input = component.getByTestId("text1");
      fireEvent.change(input, { target: { value: "Buy a Macbook" } });
      var input = component.getByTestId("text2");
      fireEvent.change(input, { target: { value: "Buy a Windows PC" } });
      var submitButton = component.getByTestId("submit-button");
      submitButton.click();
    });
    //await new Promise((r) => setTimeout(r, 100));
    // While we navigate away from the page, the component itself will still show
    // the loading div.
    expect(component.getByTestId("api-loading")).toBeInTheDocument();
    preview.debug();
  });
});

describe("NavBar", () => {
  it("will render correctly", async () => {
    var component = render(
      <Provider store={store}>
        <MenuAppBar />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});

describe("GridCard", () => {
  it("will render correctly", async () => {
    let card = {
      id: "myid",
      author: "bj",
      avatar: "kdkd",
      textOptionOne: "The first option",
      textOptionTwo: "The second option",
      timestamp: "20220231",
    };
    var component = render(
      <BrowserRouter>
        <Provider store={store}>
          <GridCard key="myid" card={card} />
        </Provider>
      </BrowserRouter>
    );
    expect(component).toMatchSnapshot();
    preview.debug();
  });
});
