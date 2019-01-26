import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
import { RATES_ACTIONS, fetchRates, getRatesExchanges } from "./Rates";
import { RATES_EXCHANGES_API, currenciesAvailable } from "../config";
import mockAxios from "axios";
import reduxThunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

const middlewares = [reduxThunk];
const mockStore = configureMockStore(middlewares);

describe("Rates Component", () => {
  let store;
  beforeEach(() => {
    configure({ adapter: new Adapter() });
    store = mockStore();
  });

  test("call fetchRates correctly", done => {
    expect.assertions(4);

    mockAxios.get
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            base: "USD",
            rates: {
              GBP: 1,
              EUR: 1
            }
          }
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            base: "GBP",
            rates: {
              USD: 1,
              EUR: 1
            }
          }
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            base: "EUR",
            rates: {
              GBP: 1,
              USD: 1
            }
          }
        })
      );

    store.dispatch(fetchRates(["GBP", "USD"])).then(() => {
      expect(mockAxios.get).toHaveBeenCalledWith(`${RATES_EXCHANGES_API}USD`);
      expect(mockAxios.get).toHaveBeenCalledWith(`${RATES_EXCHANGES_API}EUR`);
      expect(mockAxios.get).toHaveBeenCalledWith(`${RATES_EXCHANGES_API}GBP`);

      let types = [];
      store.getActions().forEach(action => {
        types = [...types, action.type];
      });

      expect(types).toEqual(["FETCH_RATES", "RATES_EXCHANGES"]);
      done();
    });
  });
});
