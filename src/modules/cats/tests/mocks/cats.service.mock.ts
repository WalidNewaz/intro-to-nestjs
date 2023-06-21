export const mockCatsService = {
  findAll: jest.fn(() => {
    return [
      {
        name: 'test',
        age: 1,
        breed: 'test',
      },
    ];
  }),
  create: jest.fn(() => {
    return [''];
  }),
};
