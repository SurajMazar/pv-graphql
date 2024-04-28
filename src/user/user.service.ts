import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(protected prismaService: PrismaService) {}

  async getUser() {
    return await this.prismaService.user.findMany();
  }
}
