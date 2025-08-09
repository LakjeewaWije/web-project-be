import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/utils/roles.decorator';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @ApiOperation({
    summary: 'Get all products by user',
    description: 'Get all products by user',
  })
  @Roles(Role.Client)
  @Get()
  async getAllOrderByUser(@Req() req: Request) {
    const userId = req['user'].userId;
    var res = await this.ordersService.getAllOrders(userId);
    return { orders: res };
  }

  @ApiOperation({
    summary: 'Get Single Order Detail',
    description: 'Get single order detail',
  })
  @Roles(Role.Client)
  @Get(`/:orderId`)
  async getOrderByOrderId(@Param('orderId') productId: UUID) {
    var res = await this.ordersService.getOrderByOrderId(productId);
    return { order: res };
  }
}
