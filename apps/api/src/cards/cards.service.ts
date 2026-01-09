import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateCardDto) {
    const exists = await this.prisma.card.findFirst({
      where: { userId, name: dto.name },
      select: { id: true },
    });

    if (exists) {
      throw new BadRequestException('Cartão já cadastrado.');
    }

    return this.prisma.card.create({
      data: { userId, name: dto.name },
      select: { id: true, name: true, createdAt: true },
    });
  }

  async list(userId: string) {
    return this.prisma.card.findMany({
      where: { userId },
      select: { id: true, name: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async remove(userId: string, id: string) {
    const card = await this.prisma.card.findFirst({
      where: { id, userId },
      select: { id: true },
    });

    if (!card) {
      throw new BadRequestException('Cartão não encontrado.');
    }

    await this.prisma.card.delete({ where: { id } });

    return { ok: true };
  }
}
