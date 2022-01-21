import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Test } from '@nestjs/testing';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
  });
  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = [];
      jest.spyOn(userService, 'findAll').mockImplementation(async () => result);

      expect(await userController.findAll()).toBe(result);
    });
  });
});
