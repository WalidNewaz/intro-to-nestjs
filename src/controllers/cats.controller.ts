import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { CatsService } from '../services/cats.service';
import { CreateCatDto, ListAllEntities, UpdateCatDto } from '../dtos/cat.dto';

/**
 * @description This is a CRUD controller for cats
 */
@Controller('cats')
export class CatsController {
  constructor(private readonly service: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto): string {
    console.log('create', createCatDto);
    return 'This action adds a new cat';
  }

  @Get()
  async findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get('breeds')
  getBreeds(): Array<string> {
    return this.service.getBreeds();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): string {
    console.log('update', updateCatDto);
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `This action removes a #${id} cat`;
  }
}
