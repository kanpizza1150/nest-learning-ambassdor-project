import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { LinkService } from './link.service';

@Controller()
export class LinkController {
  constructor(private readonly linkService: LinkService) {}
  @UseGuards(AuthGuard)
  @Get('admin/users/:id/link')
  async all(@Param('id') id: number) {
    return this.linkService.find({ user: id, relations: ['orders'] });
  }
}
