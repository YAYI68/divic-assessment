import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { SignUpInput, BiometricInput } from './dto/signup-inputs';
import { SignResponse } from './dto/sign-response';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: {
            create: jest.fn(),
            login: jest.fn(),
            bioLogin: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('signup', () => {
    it('should call authService.create with correct arguments', async () => {
      const signUpInput: SignUpInput = { email: 'test@example.com', password: 'password' };
      const signResponse: SignResponse = { accessToken: 'accessToken', refreshToken: 'refreshToken', user: {id:"1",email:"email",biometricKey:"biometricKey"} };
      (authService.create as jest.Mock).mockResolvedValueOnce(signResponse);

      await resolver.signup(signUpInput);

      expect(authService.create).toHaveBeenCalledWith(signUpInput);
    });
  });

  describe('login', () => {
    it('should call authService.login with correct arguments', async () => {
      const loginInput: SignUpInput = { email: 'test@example.com', password: 'password' };
      const signResponse: SignResponse = { accessToken: 'accessToken', refreshToken: 'refreshToken', user: {id:"1",email:"email",biometricKey:"biometricKey"} };
      (authService.login as jest.Mock).mockResolvedValueOnce(signResponse);

      await resolver.login(loginInput);

      expect(authService.login).toHaveBeenCalledWith(loginInput);
    });
  });

  describe('bioLogin', () => {
    it('should call authService.bioLogin with correct arguments', async () => {
      const biometricInput: BiometricInput = { biometricKey: 'key' };
      const signResponse: SignResponse = { accessToken: 'accessToken', refreshToken: 'refreshToken', user: {id:"1",email:"email",biometricKey:"biometricKey"} };
      (authService.bioLogin as jest.Mock).mockResolvedValueOnce(signResponse);

      await resolver.bioLogin(biometricInput);

      expect(authService.bioLogin).toHaveBeenCalledWith(biometricInput);
    });
  });
});
