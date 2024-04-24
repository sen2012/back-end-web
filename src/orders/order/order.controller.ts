import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';

@ApiBearerAuth()
@ApiTags("Order")
@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService){}

    
}
