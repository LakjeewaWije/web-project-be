import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/utils/roles.decorator';
import { OrdersService } from './orders.service';
import { CheckoutDto } from './dto/checkout.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({
    summary: 'Checkout Order',
    description: 'Checkout order',
  })
  @Roles(Role.Client)
  @Post(`/checkout`)
  async submitOrder(@Body() dto: CheckoutDto, @Req() req: Request) {
    const userId = req['user'].userId;
    return { order: true };
  }

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
