import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Render,
  Request,
  UseGuards,
} from '@nestjs/common';
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
import { CustomerJwtAuthGuard } from 'src/auth/guards/jwts/jwt-auth.guard';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { CheckPolicies } from 'src/casl/decorators/check-policy.decorator';
import { PoliciesGuard } from 'src/casl/guards/policy.guard';
import { Customer } from 'src/shared/classes';
import { Action } from 'src/shared/enum/actions.enum';
import { ForbiddenResponseDto } from 'src/user/customer/dto';
import { InternalServerErrorResponseDto } from '../shared/dto/internal-server-error.dto';
import {
  AddNewItemToOrderDto,
  AddNewItemToOrderResponseDto,
  ApprovePaypalOrderDto,
  ApprovePaypalOrderResponseDto,
  ConfirmOrderCheckoutDto,
  ConfirmOrderCheckoutResponseDto,
  CreateOrderDto,
  CreateOrderResponseDto,
  EventPaymentZALOPAYDto,
  GetAllRestaurantOrderDto,
  GetAllRestaurantOrderResponseDto,
  GetDraftOrdersOfCustomerParams,
  GetDraftOrdersOfCustomerResponseDto,
  GetListOrderOfDriverDto,
  GetListOrderOfDriverResponseDto,
  GetOngoingOrdersOfCustomerParams,
  GetOngoingOrdersOfCustomerResponseDto,
  GetOrderAssociatedWithCusAndResDto,
  GetOrderAssociatedWithCusAndResResponseDto,
  GetOrderDetailResponseDto,
  GetOrderHistoryOfCustomerDto,
  GetOrderHistoryOfCustomerParams,
  GetOrderHistoryOfCustomerPayload,
  GetOrderHistoryOfCustomerResponseDto,
  IncreaseOrderItemQuantityDto,
  IncreaseOrderItemQuantityResponseDto,
  PickCustomerAddressDto,
  PickCustomerAddressResponseDto,
  RateDriverDto,
  RateDriverResponseDto,
  RateRestaurantDto,
  RateRestaurantResponseDto,
  ReduceOrderItemQuantityDto,
  ReduceOrderItemQuantityResponseDto,
  RemoveOrderItemDto,
  RemoveOrderItemResponseDto,
  UpdateOrderItemQuantityDto,
  UpdateOrderItemQuantityResponseDto,
  UpdateZALOPAYPaymentStatusResponseDto,
} from './dto';
import { OrderService } from './order.service';
// const fs = require('fs');
@ApiTags('orders')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('order')
export class OrderController {
  private logger = new Logger('OrderController');

  constructor(private readonly orderService: OrderService) {}

  // Ta??o order va?? orderItem t????ng ????ng
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

  // L????y order DRAFT cu??a customer va?? restaurant
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

  // Th??m item va??o trong order
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

  // Gia??m s???? l??????ng quantity cu??a 1 orderItem trong order
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

  // T??ng s???? l??????ng quantity cu??a 1 orderItem trong order
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

  // Xo??a 1 orderItem
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

  // L????y t????t ca?? order cu??a nha?? ha??ng
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

  // L????y th??ng tin order theo orderId
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
  // Render view order invoice
  @Get('/:orderId/invoice')
  @Render('orders/index')
  async getOrderInvoice(@Param() params: { orderId: string }) {
    const { orderId } = params;
    return this.orderService.getOrderDetail(orderId).then((result) => {
      const { data } = result;
      const order: any = data?.order;
      console.log(order);
      return {
        invoice: order.id?.split('-')[0]?.toUpperCase(),
        createdAt: order.createdAt,
        company: {
          name: 'Smart POS International',
          address: 'Ho Chi Minh, Viet Name',
        },
        customer: {
          phone: order.delivery.customerPhoneNumber ?? '_',
          name: order.delivery.customerName ?? '_',
          address: order.delivery.customerAddress ?? '_',
        },
        order: order,
        orderItems: order?.orderItems,
        delivery: order?.delivery,
        discount: order?.delivery.discount ?? 0,
        shippingFee: order?.delivery.shippingFee ?? 0,
        grandTotal: order?.grandTotal ?? 0,
      };
    });
  }

  /* Update s???? l??????ng cu??a 1 orderItem */
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
    // N????u kh??ng pha??i chi??nh user ??o??
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

  //! Confirm Order Checkout
  @ApiOkResponse({ type: ConfirmOrderCheckoutResponseDto })
  @ApiForbiddenResponse({
    type: ForbiddenResponseDto,
  })
  @ApiBody({ type: ConfirmOrderCheckoutDto })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Customer))
  @Patch('/:orderId/confirm-ord-checkout')
  async confirmOrderCheckout(
    @Request() req,
    @Param() params,
    @Body()
    confirmOrderCheckoutDto: ConfirmOrderCheckoutDto,
  ): Promise<ConfirmOrderCheckoutResponseDto> {
    const { orderId } = params;
    return this.orderService.confirmOrderCheckout(
      confirmOrderCheckoutDto,
      orderId,
      req.user.userId,
    );
  }

  //! Approve Paypal Order
  @ApiOkResponse({ type: ApprovePaypalOrderResponseDto })
  @ApiForbiddenResponse({
    type: ForbiddenResponseDto,
  })
  @ApiBody({ type: ApprovePaypalOrderDto })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Customer))
  @Patch('/:orderId/approve-paypal-order')
  async approvePaypalOrder(
    @Request() req,
    @Param() params,
    @Body()
    approvePaypalOrderDto: ApprovePaypalOrderDto,
  ): Promise<ApprovePaypalOrderResponseDto> {
    const { orderId } = params;
    return this.orderService.approvePaypalOrder(
      approvePaypalOrderDto,
      orderId,
      req.user.userId,
    );
  }

  //! Approve Paypal Order
  @ApiOkResponse({ type: RateRestaurantResponseDto })
  @ApiBody({ type: RateRestaurantDto })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard)
  @Post('/:orderId/rate-restaurant')
  async rateRestaurant(
    @Request() req,
    @Param() params,
    @Body()
    rateRestaurantDto: RateRestaurantDto,
  ) {
    const { orderId } = params;
    return this.orderService.rateRestaurant(
      req.user.userId,
      orderId,
      rateRestaurantDto,
    );
  }

  @ApiOkResponse({ type: RateDriverResponseDto })
  @ApiBody({ type: RateDriverDto })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard)
  @Post('/:orderId/rate-driver')
  async rateDriver(
    @Request() req,
    @Param() params,
    @Body()
    rateDriverDto: RateDriverDto,
  ) {
    const { orderId } = params;
    return this.orderService.rateDriver(
      req.user.userId,
      orderId,
      rateDriverDto,
    );
  }

  //! Get list order ON_GOING, PICKED_UP of driver
  @ApiOkResponse({ type: GetListOrderOfDriverResponseDto })
  @ApiForbiddenResponse({
    type: ForbiddenResponseDto,
  })
  @ApiQuery({ type: GetListOrderOfDriverDto })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Customer))
  @Get('/driver/:driverId/list-order')
  async getListOrderOfDriver(
    @Request() req,
    @Param() params,
    @Query()
    getListOrderOfDriverDto: GetListOrderOfDriverDto,
  ): Promise<GetListOrderOfDriverResponseDto> {
    const { driverId } = params;
    return this.orderService.getListOrderOfDriver(
      driverId,
      req.user.userId,
      getListOrderOfDriverDto,
    );
  }

  @ApiOkResponse({ type: GetOngoingOrdersOfCustomerResponseDto })
  @ApiQuery({ type: GetOngoingOrdersOfCustomerParams })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard)
  @Post('/get-ongoing')
  async getOngoingOrdersOfCustomer(
    @Request() req,
    @Query() { offset, limit }: GetOngoingOrdersOfCustomerParams,
  ): Promise<GetOngoingOrdersOfCustomerResponseDto> {
    const { user } = req;
    const { userId } = user;
    return this.orderService.getOngoingOrdersOfCustomer({
      customerId: userId,
      offset,
      limit,
    });
  }

  @ApiOkResponse({ type: GetDraftOrdersOfCustomerResponseDto })
  @ApiQuery({ type: GetDraftOrdersOfCustomerParams })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard)
  @Post('/get-drafts')
  async getDraftOrdersOfCustomer(
    @Request() req,
    @Query() { offset, limit }: GetDraftOrdersOfCustomerParams,
  ): Promise<GetDraftOrdersOfCustomerResponseDto> {
    const { user } = req;
    const { userId } = user;
    return this.orderService.getDraftOrdersOfCustomer({
      customerId: userId,
      offset,
      limit,
    });
  }

  @ApiOkResponse({ type: GetDraftOrdersOfCustomerResponseDto })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard)
  @Post('/get-last-draft-order')
  async getLastDraftOrderOfCustomer(
    @Request() req,
  ): Promise<GetDraftOrdersOfCustomerResponseDto> {
    const { user } = req;
    const { userId } = user;
    return this.orderService.getLastDraftOrderOfCustomer({
      customerId: userId,
    });
  }

  @ApiOkResponse({ type: GetOrderHistoryOfCustomerResponseDto })
  @ApiQuery({ type: GetOrderHistoryOfCustomerParams })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard)
  @Post('/get-history')
  async getOrderHistoryOfCustomer(
    @Request() req,
    @Query() queries: GetOrderHistoryOfCustomerParams,
    @Body() getOrderHistoryOfCustomerDto: GetOrderHistoryOfCustomerDto,
  ): Promise<GetOrderHistoryOfCustomerResponseDto> {
    const { user } = req;
    const { userId } = user;
    const { offset, limit } = queries;
    const { filter, from, to } = getOrderHistoryOfCustomerDto;
    const getOrderHistoryPayload: GetOrderHistoryOfCustomerPayload = {
      customerId: userId,
      offset,
      limit,
      filter,
      from,
      to,
    };
    return this.orderService.getOrderHistoryOfCustomer(getOrderHistoryPayload);
  }

  //! Event payment order
  @Post('/events')
  async eventPaypalOrderOccur(
    @Body()
    eventPaypalOrderOccurDto,
  ) {
    console.log('Body', eventPaypalOrderOccurDto);
    this.orderService.eventPaypalOrderOccur(eventPaypalOrderOccurDto);
  }

  //! S??? ki???n thanh to??n th??nh c??ng c???a ZALOPAY
  @Post('/:orderId/payment-result')
  async eventPaymentZALOPAY(
    @Body()
    eventPaymentZALOPAYDto: EventPaymentZALOPAYDto,
    @Param() params,
  ) {
    console.log('Body', eventPaymentZALOPAYDto);
    const { orderId } = params;
    return this.orderService.eventPaymentZALOPAY(
      eventPaymentZALOPAYDto,
      orderId,
    );
  }

  //! Frontend g???i ????? update tr???ng th??i payment ZALOPAY
  @ApiOkResponse({ type: UpdateZALOPAYPaymentStatusResponseDto })
  @ApiForbiddenResponse({
    type: ForbiddenResponseDto,
  })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard)
  @Patch('/:orderId/update-zalopay-payment')
  async updateZALOPAYPaymentStatus(
    @Request() req,
    @Param() params,
  ): Promise<UpdateZALOPAYPaymentStatusResponseDto> {
    const { orderId } = params;
    return this.orderService.updateZALOPAYPaymentStatus(
      orderId,
      req.user.userId,
    );
  }
}
