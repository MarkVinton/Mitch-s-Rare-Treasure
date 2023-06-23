const { createRef, formatData } = require("../db/utils");

describe("createRef", () => {
  test("returns object", () => {
    expect(typeof createRef("", "", [])).toBe("object");
  });
  test("assigns property of passed key and value attribute", () => {
    const ref = createRef("name", "id", [{ name: "david", id: 1 }]);
    expect(Object.keys(ref)).toHaveLength(1);
    expect(ref).toHaveProperty("david");
    expect(ref.david).toBe(1);
  });
  test("assigns the number of properties as there are objects in array", () => {
    const ref = createRef("name", "id", [
      { name: "david", id: 1 },
      { name: "jim", id: 2 },
      { name: "liam", id: 3 },
    ]);

    expect(Object.keys(ref)).toHaveLength(3);

    expect(ref.david).toBe(1);
    expect(ref.jim).toBe(2);
    expect(ref.liam).toBe(3);
  });
  test("doesn't mutate original input", () => {
    const input = [{ name: "david", id: 1 }];
    createRef("name", "id", input);

    expect(input).toEqual([{ name: "david", id: 1 }]);
  });
});

describe("formatData", () => {
  test("returns an array", () => {
    expect(Array.isArray(formatData({}, "", "", []))).toBe(true);
  });
  test("removes keyToRemove property", () => {
    const keyToRemove = "name";
    const formattedData = formatData({ david: 1 }, keyToRemove, "id", [
      { name: "david" },
    ]);

    expect(formattedData[0]).not.toHaveProperty("name");
  });
  test("adds keyToAdd property", () => {
    const keyToAdd = "id";
    const formattedData = formatData({ david: 1 }, "name", keyToAdd, [
      { name: "david" },
    ]);

    expect(formattedData[0]).toHaveProperty("id");
  });
  test("keyToAdd property has value from refObj", () => {
    const keyToAdd = "id";
    const formattedData = formatData({ david: 1 }, "name", keyToAdd, [
      { name: "david" },
    ]);

    expect(formattedData[0].id).toBe(1);
  });
  test("does not mutate raw data", () => {
    const rawData = [{ name: "david" }];
    formatData({ david: 1 }, "name", "id", rawData);

    expect(rawData).toEqual([{ name: "david" }]);
  });
});
