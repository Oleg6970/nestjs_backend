import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './models/user.models';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDTO } from './dto';
import { Watchlist } from '../watchlist/models/watchlist.model';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userRepository: typeof User) {}

  async hashPassword(password) {
    return bcrypt.hash(password, 10)
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } })
  }
  async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
    dto.password = await this.hashPassword(dto.password)

    await this.userRepository.create({
      firstname: dto.firstname,
      username: dto.username,
      email: dto.email,
      password: dto.password
    })
    return dto
  }

  async publicUser (email: string) {
    return await this.userRepository.findOne({
      where: {email},
      attributes: {exclude: ['password']},
      include: {
        model: Watchlist,
        required: false,
      }
    })
  }

  async updateUser (email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
    await this.userRepository.update(dto,{where: {email}})
    return dto
  }

  async deleteUser (email: string): Promise<boolean> {
    await this.userRepository.destroy({where: {email}})
    return true
  }
}
