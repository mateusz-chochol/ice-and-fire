import React from "react";
import "@testing-library/jest-dom";
import { fetchHouse } from "api/houses/HousesApi";
import HouseResponse from "types/api/HouseResponse";
import { mockData } from "../../mockData/HousesMockData";

describe("HousesApi", () => {
  describe("fetchHouse", () => {
    const expectedResponse: HouseResponse = {
      house: {
        name: mockData.houseDto.name,
        region: mockData.houseDto.region,
        coatOfArms: mockData.houseDto.coatOfArms,
        words: mockData.houseDto.words,
        titles: mockData.houseDto.titles,
        seats: mockData.houseDto.seats,
        hasDiedOut: false,
        hasOverlord: true,
        numberOfCadeBranches: 0,
      },
    };

    it("should correctly fetch a house with a given id", async () => {
      jest.spyOn(global, "fetch").mockImplementation((): any =>
        Promise.resolve({
          json: () => Promise.resolve(mockData.houseDto),
        })
      );
      const actualResponse = await fetchHouse("1");

      expect(actualResponse).toEqual(expectedResponse);
    });
  });
});
