import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly confugService: ConfigService
    ) {

  }
  async generateJwtToken(user) {
    const  payload = {user}
    return this.jwtService.sign(payload, {
      secret: this.confugService.get('secret_jwt'),
      expiresIn: this.confugService.get('expires_jwt')
    })
  }
}
