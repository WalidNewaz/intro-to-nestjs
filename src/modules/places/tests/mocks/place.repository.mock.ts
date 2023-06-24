export const mockPlaceRepository = {
  save: jest.fn(),
  find: jest.fn(
    () =>
      new Promise((resolve) =>
        resolve([
          {
            id: 1,
            name: 'Place 1',
          },
          {
            id: 2,
            name: 'Place 2',
          },
        ]),
      ),
  ),
};
