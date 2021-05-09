import {
  Controller,
  Post,
  Body,
  Logger,
  UseGuards,
  HttpCode,
  Param,
  Get,
  Query,
  Patch,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { InternalServerErrorResponseDto } from '../shared/dto/internal-server-error.dto';
import { CustomerJwtAuthGuard } from 'src/auth/guards/jwts/jwt-auth.guard';
import {
  CreateOrderResponseDto,
  CreateOrderDto,
  GetOrderAssociatedWithCusAndResResponseDto,
  GetOrderAssociatedWithCusAndResDto,
  AddNewItemToOrderDto,
  AddNewItemToOrderResponseDto,
  ReduceOrderItemQuantityResponseDto,
  ReduceOrderItemQuantityDto,
  IncreaseOrderItemQuantityResponseDto,
  IncreaseOrderItemQuantityDto,
  RemoveOrderItemResponseDto,
  RemoveOrderItemDto,
  GetAllRestaurantOrderResponseDto,
  GetAllRestaurantOrderDto,
  GetOrderDetailResponseDto,
  UpdateOrderItemQuantityResponseDto,
  UpdateOrderItemQuantityDto,
} from './dto';

@ApiTags('orders')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('order')
export class OrderController {
  private logger = new Logger('OrderController');

  constructor(private readonly orderService: OrderService) { }

  // Tạo order và orderItem tương ứng
  @ApiCreatedResponse({ type: CreateOrderResponseDto })
  @ApiBody({ type: CreateOrderDto })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard)
  @Post()
  async createOrderAndFirstOrderItem(
    @Body()
    createOrderDto: CreateOrderDto,
  ): Promise<CreateOrderResponseDto> {
    return this.orderService.createOrderAndFirstOrderItem(createOrderDto);
  }

  // Lấy order DRAFT của customer và restaurant
  @ApiOkResponse({ type: GetOrderAssociatedWithCusAndResResponseDto })
  @ApiBody({ type: GetOrderAssociatedWithCusAndResDto })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard)
  @HttpCode(200)
  @Post('/get-order-associated')
  async getOrderAssociatedWithCusAndRes(
    @Body()
    getOrderAssociatedWithCusAndResDto: GetOrderAssociatedWithCusAndResDto,
  ): Promise<GetOrderAssociatedWithCusAndResResponseDto> {
    return this.orderService.getOrderAssociatedWithCusAndRes(
      getOrderAssociatedWithCusAndResDto,
    );
  }

  // Thêm item vào trong order
  @ApiOkResponse({ type: AddNewItemToOrderResponseDto })
  @ApiBody({ type: AddNewItemToOrderDto })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard)
  @HttpCode(200)
  @Patch('/:orderId/add-new-item')
  async addNewItemToOrder(
    @Body()
    addNewItemToOrderDto: AddNewItemToOrderDto,
    @Param() params,
  ): Promise<AddNewItemToOrderResponseDto> {
    const { orderId } = params;
    return this.orderService.addNewItemToOrder(addNewItemToOrderDto, orderId);
  }

  // Giảm số lượng quantity của 1 orderItem trong order
  @ApiOkResponse({ type: ReduceOrderItemQuantityResponseDto })
  @ApiBody({ type: ReduceOrderItemQuantityDto })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard)
  @HttpCode(200)
  @Patch('/:orderId/reduce-orditem-quantity')
  async reduceOrderItemQuantity(
    @Body()
    reduceQuantityOrderItemResponseDto: ReduceOrderItemQuantityDto,
    @Param() params,
  ): Promise<ReduceOrderItemQuantityResponseDto> {
    const { orderId } = params;
    return this.orderService.reduceOrderItemQuantity(
      reduceQuantityOrderItemResponseDto,
      orderId,
    );
  }

  // Tăng số lượng quantity của 1 orderItem trong order
  @ApiOkResponse({ type: IncreaseOrderItemQuantityResponseDto })
  @ApiBody({ type: IncreaseOrderItemQuantityDto })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard)
  @HttpCode(200)
  @Patch('/:orderId/increase-orditem-quantity')
  async increaseOrderItemQuantity(
    @Body()
    increaseOrderItemQuantityDto: IncreaseOrderItemQuantityDto,
    @Param() params,
  ): Promise<IncreaseOrderItemQuantityResponseDto> {
    const { orderId } = params;
    return this.orderService.increaseOrderItemQuantity(
      increaseOrderItemQuantityDto,
      orderId,
    );
  }

  // Xóa 1 orderItem
  @ApiOkResponse({ type: RemoveOrderItemResponseDto })
  @ApiBody({ type: RemoveOrderItemDto })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard)
  @HttpCode(200)
  @Patch('/:orderId/remove-orditem')
  async removeOrderItem(
    @Body()
    removeOrderItemDto: RemoveOrderItemDto,
    @Param() params,
  ): Promise<RemoveOrderItemResponseDto> {
    const { orderId } = params;
    return this.orderService.removeOrderItem(removeOrderItemDto, orderId);
  }

  // Lấy tất cả order của nhà hàng
  @ApiOkResponse({ type: GetAllRestaurantOrderResponseDto })
  @ApiQuery({ type: GetAllRestaurantOrderDto })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard)
  @HttpCode(200)
  @Get('/get-all-restaurant-orders')
  async getAllRestaurantOrder(
    @Query()
    getAllRestaurantOrderDto: GetAllRestaurantOrderDto,
  ): Promise<GetAllRestaurantOrderResponseDto> {
    return this.orderService.getAllRestaurantOrder(getAllRestaurantOrderDto);
  }

  // Lấy thông tin order theo orderId
  @ApiOkResponse({ type: GetOrderDetailResponseDto })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard)
  @HttpCode(200)
  @Get('/:orderId')
  async getOrderDetail(
    @Param() params: { orderId: string },
  ): Promise<GetOrderDetailResponseDto> {
    const { orderId } = params;
    return this.orderService.getOrderDetail(orderId);
  }

  /* Update số lượng của 1 orderItem */
  @ApiOkResponse({ type: UpdateOrderItemQuantityResponseDto })
  @ApiBody({ type: UpdateOrderItemQuantityDto })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard)
  @HttpCode(200)
  @Patch('/:orderId/update-orditem-quantity')
  async updateOrderItemQuantity(
    @Body()
    updateOrderItemQuantityDto: UpdateOrderItemQuantityDto,
    @Param() params,
  ): Promise<UpdateOrderItemQuantityResponseDto> {
    const { orderId } = params;
    return this.orderService.updateOrderItemQuantity(
      updateOrderItemQuantityDto,
      orderId,
    );
  }
}
