import * as brokenPaginationCombinations from "./fixtures-exercise/combinations-broken-pagination.json";
import * as fixedPaginationCombinations from "./fixtures-exercise/combinations-fixed-pagination.json";
import { parseTopWorkplaces } from "./helpers";

interface TestCombination {
  fixedPagination: boolean;
  pageCorrectly: boolean;
  filterActiveWorkplaces: boolean;
  filterPastShifts: boolean;
  filterShiftsWithoutWorkers: boolean;
  fetchAllWorkplacesBeforeGrouping: boolean;
  expectedResult: { name: string; shifts: number }[];
}

const TEST_COMBINATIONS: TestCombination[] = [
  ...fixedPaginationCombinations,
  ...brokenPaginationCombinations,
];

describe("Top Workplaces", () => {
  describe("basic functionality", () => {
    it("successfully runs", async () => {
      const topWorkplaces = await parseTopWorkplaces();
      expect(topWorkplaces).not.toBeNull();
    });

    it("returns an array with three objects of the correct shape", async () => {
      const topWorkplaces = await parseTopWorkplaces();
      expect(topWorkplaces).toHaveLength(3);
      expect(topWorkplaces).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            shifts: expect.any(Number),
          }),
        ]),
      );
    });
  });

  describe("individual scenarios", () => {
    it.each(TEST_COMBINATIONS)(
      "should return the top 3 workplaces with options: { fixedPagination: $fixedPagination, pageCorrectly: $pageCorrectly, filterActiveWorkplaces: $filterActiveWorkplaces, filterPastShifts: $filterPastShifts, filterShiftsWithoutWorkers: $filterShiftsWithoutWorkers, fetchAllWorkplacesBeforeGrouping: $fetchAllWorkplacesBeforeGrouping}",
      async ({ expectedResult }) => {
        const topWorkplaces = await parseTopWorkplaces();
        expect(topWorkplaces).toEqual(expectedResult);
      },
    );
  });
});
