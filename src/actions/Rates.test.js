// import Adapter from "enzyme-adapter-react-16";
// import { configure } from "enzyme";
// import { RATES_ACTIONS, fetchRates, getRatesExchanges } from "./Rates";
// import mockAxios from "axios";

// describe("Rates Component", () => {
//   let props;
//   beforeEach(() => {
//     configure({ adapter: new Adapter() });
//   });

//   test("call fetchRates correctly", () => {
//     expect.assertions(2);

//     mockAxios.get.mockImplementation(() =>
//       Promise.resolve({
//         data: {}
//       })
//     );

//     const createUserReturn = createUser("asdf");

//     expect(mockAxios.post).toHaveBeenCalledWith(`${ROOT_URL}/createUser`, {
//       username: "asdf"
//     });
//     const { type } = createUserReturn;
//     expect(type).toEqual(USER_ACTIONS.CREATE_USER);
//   });
// });
