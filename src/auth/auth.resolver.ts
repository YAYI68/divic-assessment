import { AuthService } from './auth.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Auth } from './entities/auth.entity';
import { BiometricInput, SignUpInput } from './dto/signup-inputs';
import { SignResponse } from './dto/sign-response';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  
  @Mutation(() => SignResponse)
  signup(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.create(signUpInput);
  }

  @Mutation(() => SignResponse)
  login(@Args('loginInput') signUpInput: SignUpInput) {
    return this.authService.login(signUpInput);
  }

  @Mutation(() => SignResponse)
  bioLogin(@Args('biometricInput') biometricInput: BiometricInput) {
    return this.authService.bioLogin(biometricInput);
  }

}
