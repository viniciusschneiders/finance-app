import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';

@ApiTags('Cards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cards: CardsService) {}

  @Post()
  create(@Req() req: Request, @Body() dto: CreateCardDto) {
    const userId = (req.user as any).userId;
    return this.cards.create(userId, dto);
  }

  @Get()
  list(@Req() req: Request) {
    const userId = (req.user as any).userId;
    return this.cards.list(userId);
  }

  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string) {
    const userId = (req.user as any).userId;
    return this.cards.remove(userId, id);
  }
}
