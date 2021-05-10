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
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
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
  PickCustomerAddressResponseDto,
  PickCustomerAddressDto,
} from './dto';
import { ForbiddenResponseDto } from 'src/user/customer/dto';
import { PoliciesGuard } from 'src/casl/guards/policy.guard';
import { CheckPolicies } from 'src/casl/decorators/check-policy.decorator';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { Action } from 'src/shared/enum/actions.enum';
import { Customer } from 'src/shared/classes';

@ApiTags('orders')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('order')
export class OrderController {
  private logger = new Logger('OrderController');

  constructor(private readonly orderService: OrderService) {}

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
    //! FIXME
    const { orderId } = params;
    return this.orderService.updateOrderItemQuantity(
      updateOrderItemQuantityDto,
      orderId,
    );
  }

  /* Update delivery address */
  @ApiOkResponse({ type: PickCustomerAddressResponseDto })
  @ApiForbiddenResponse({
    type: ForbiddenResponseDto,
  })
  @ApiBody({ type: PickCustomerAddressDto })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Customer))
  @Patch('/:orderId/pick-delivery-address')
  async pickCustomerAddress(
    @Request() req,
    @Param() params,
    @Body()
    pickCustomerAddressDto: PickCustomerAddressDto,
  ): Promise<PickCustomerAddressResponseDto> {
    const { orderId } = params;
    const { customerAddressId, customerId } = pickCustomerAddressDto;
    // Nếu không phải chính user đó
    if (req.user.userId !== customerId) {
      return {
        statusCode: 403,
        message: 'Forbidden',
        data: null,
      };
    }

    return this.orderService.pickCustomerAddress(
      customerId,
      customerAddressId,
      orderId,
    );
  }
}
