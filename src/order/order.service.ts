import { CreateOrderPayload } from './interfaces/create-order-payload.interface';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as constants from '../constants';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateOrderResponseDto,
  CreateOrderDto,
  GetOrderAssociatedWithCusAndResResponseDto,
  GetOrderAssociatedWithCusAndResDto,
  AddNewItemToOrderDto,
  AddNewItemToOrderResponseDto,
  ReduceOrderItemQuantityDto,
  ReduceOrderItemQuantityResponseDto,
  IncreaseOrderItemQuantityDto,
  IncreaseOrderItemQuantityResponseDto,
  RemoveOrderItemDto,
  RemoveOrderItemResponseDto,
  GetAllRestaurantOrderDto,
  GetAllRestaurantOrderResponseDto,
  GetOrderDetailResponseDto,
  UpdateOrderItemQuantityDto,
  UpdateOrderItemQuantityResponseDto,
  PickCustomerAddressResponseDto,
  ConfirmOrderCheckoutDto,
  ConfirmOrderCheckoutResponseDto,
  ApprovePaypalOrderDto,
  ApprovePaypalOrderResponseDto,
  GetListOrderOfDriverResponseDto,
  GetListOrderOfDriverDto,
  GetDraftOrdersOfCustomerDto,
  GetOngoingOrdersOfCustomerResponseDto,
  GetDraftOrdersOfCustomerResponseDto,
  GetOngoingOrdersOfCustomerDto,
  GetOrderHistoryOfCustomerPayload,
  GetOrderHistoryOfCustomerResponseDto,
  EventPaypalOrderOccurDto,
  GetLastDraftOrderOfCustomerDto,
} from './dto';
import {
  ICreateOrderResponse,
  IGetAddressResponse,
  IOrdersResponse,
  IGetMenuItemInfoResponse,
  IConfirmOrderCheckoutResponse,
  IGetOrderActorInfoResponse,
} from './interfaces';
import { ICustomerAddressResponse } from '../user/customer/interfaces';
import { transformOrderItem } from './helpers/helpers';
import { ISimpleResponse } from '../shared/interfaces/simple-response.interface';
import * as PDFDocument from 'pdfkit';
@Injectable()
export class OrderService {
  constructor(
    @Inject(constants.ORDER_SERVICE)
    private orderServiceClient: ClientProxy,
    @Inject(constants.USER_SERVICE)
    private userServiceClient: ClientProxy,
    @Inject(constants.RESTAURANT_SERVICE)
    private restaurantServiceClient: ClientProxy,
  ) {}

  async createOrderAndFirstOrderItem(
    createOrderDto: CreateOrderDto,
  ): Promise<CreateOrderResponseDto> {
    console.log('createOrder');

    // Lấy thông tin nhà hàng
    // Thông tin địa chỉ customer (neu la sale channel)
    // Name và price của menuItem
    // Name và price của từng menuItemTopping
    const { restaurantId, customerId, orderItem, cashierId } = createOrderDto;
    const isSaleChannelOrder = !!customerId;

    const [
      getCustomerInfoResponse,
      getRestaurantInfoResponse,
      getMenuItemInfoResponse,
    ]: [
      IGetOrderActorInfoResponse,
      IGetOrderActorInfoResponse,
      IGetMenuItemInfoResponse,
    ] = await Promise.all([
      isSaleChannelOrder
        ? this.userServiceClient
            .send('getCustomerInformationToCreateDelivery', { customerId })
            .toPromise()
        : null,
      this.restaurantServiceClient
        .send('getRestaurantInformationToCreateDelivery', {
          restaurantId,
        })
        .toPromise(),
      this.restaurantServiceClient
        .send('getMenuItemInfo', {
          orderItem,
        })
        .toPromise(),
    ]);

    // catch error response
    const responses: (
      | (IGetOrderActorInfoResponse & { label: string })
      | (IGetMenuItemInfoResponse & { label: string })
    )[] = [
      { ...getMenuItemInfoResponse, label: 'getMenuItemInfo' },
      { ...getRestaurantInfoResponse, label: 'getRestaurantInfo' },
      { ...getCustomerInfoResponse, label: 'getCustomerInfo' },
    ];
    const firstErrorResponse = responses
      .filter(
        (response) =>
          response != null &&
          response?.status &&
          response?.status !== HttpStatus.OK,
      )
      .find(({ status = HttpStatus.OK }) => status !== HttpStatus.OK);

    if (firstErrorResponse) {
      console.log(firstErrorResponse.label + ' fail');
      throw new HttpException(
        {
          message: firstErrorResponse.message,
        },
        firstErrorResponse.status,
      );
    }

    // create payload to create order
    let customerPayload = null;
    if (isSaleChannelOrder) {
      const {
        data: {
          address: customerAddress,
          geom: customerGeom,
          name: customerName,
          phoneNumber: customerPhoneNumber,
        },
      } = getCustomerInfoResponse;
      customerPayload = {
        customerId,
        customerName,
        customerPhoneNumber,
        customerAddress,
        customerGeom,
      };
    }

    const {
      data: {
        address: restaurantAddress,
        geom: restaurantGeom,
        name: restaurantName,
        phoneNumber: restaurantPhoneNumber,
      },
    } = getRestaurantInfoResponse;
    const restaurantPayload = {
      restaurantId,
      restaurantName,
      restaurantPhoneNumber,
      restaurantAddress,
      restaurantGeom,
    };

    const {
      data: { menuItemToppings, menuItem },
    } = getMenuItemInfoResponse;

    const tfOrderItem = transformOrderItem(
      menuItemToppings,
      menuItem,
      orderItem,
    );

    const createOrderPayload: CreateOrderPayload = {
      orderItem: tfOrderItem,
      customer: customerPayload,
      restaurant: restaurantPayload,
      cashierId,
    };
    // create order
    const createOrderAndFirstOrderItemResponse: ICreateOrderResponse = await this.orderServiceClient
      .send('createOrderAndFirstOrderItem', createOrderPayload)
      .toPromise();
    const { message, order, status } = createOrderAndFirstOrderItemResponse;

    if (status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: status,
      message,
      data: {
        order,
      },
    };
  }

  async getOrderAssociatedWithCusAndRes(
    getOrderAssociatedWithCusAndResDto: GetOrderAssociatedWithCusAndResDto,
  ): Promise<GetOrderAssociatedWithCusAndResResponseDto> {
    const getOrderAssociatedWithCusAndResResponse: ICreateOrderResponse = await this.orderServiceClient
      .send(
        'getOrderAssociatedWithCusAndRes',
        getOrderAssociatedWithCusAndResDto,
      )
      .toPromise();

    const { message, order, status } = getOrderAssociatedWithCusAndResResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: status,
      message,
      data: {
        order,
      },
    };
  }

  async addNewItemToOrder(
    addNewItemToOrderDto: AddNewItemToOrderDto,
    orderId: string,
  ): Promise<AddNewItemToOrderResponseDto> {
    //TODO: Lấy thông tin name và price của món được gửi lên + topping nếu có
    const getMenuItemInfoResponse: IGetMenuItemInfoResponse = await this.restaurantServiceClient
      .send('getMenuItemInfo', {
        orderItem: addNewItemToOrderDto.sendItem,
      })
      .toPromise();

    if (getMenuItemInfoResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: getMenuItemInfoResponse.message,
        },
        getMenuItemInfoResponse.status,
      );
    }
    const { menuItemToppings, menuItem } = getMenuItemInfoResponse.data;

    const tfOrderItem = transformOrderItem(
      menuItemToppings,
      menuItem,
      addNewItemToOrderDto.sendItem,
    );

    //TODO: Thêm món đó vào order
    const addNewOrderItemToOrderDtoResponse: ICreateOrderResponse = await this.orderServiceClient
      .send('addNewItemToOrder', {
        ...addNewItemToOrderDto,
        sendItem: tfOrderItem,
        orderId,
      })
      .toPromise();

    const { message, order, status } = addNewOrderItemToOrderDtoResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: status,
      message,
      data: {
        order,
      },
    };
  }

  async reduceOrderItemQuantity(
    reduceOrderItemQuantityDto: ReduceOrderItemQuantityDto,
    orderId: string,
  ): Promise<ReduceOrderItemQuantityResponseDto> {
    const reduceQuantityOrderItemResponse: ICreateOrderResponse = await this.orderServiceClient
      .send('reduceOrderItemQuantity', {
        ...reduceOrderItemQuantityDto,
        orderId,
      })
      .toPromise();
    const { message, order, status } = reduceQuantityOrderItemResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: status,
      message,
      data: {
        order,
      },
    };
  }

  async increaseOrderItemQuantity(
    increaseOrderItemQuantityDto: IncreaseOrderItemQuantityDto,
    orderId: string,
  ): Promise<IncreaseOrderItemQuantityResponseDto> {
    const increaseOrderItemQuantityResponse: ICreateOrderResponse = await this.orderServiceClient
      .send('increaseOrderItemQuantity', {
        ...increaseOrderItemQuantityDto,
        orderId,
      })
      .toPromise();
    const { message, order, status } = increaseOrderItemQuantityResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: status,
      message,
      data: {
        order,
      },
    };
  }

  async removeOrderItem(
    removeOrderItemDto: RemoveOrderItemDto,
    orderId: string,
  ): Promise<RemoveOrderItemResponseDto> {
    const removeOrderItemResponse: ICreateOrderResponse = await this.orderServiceClient
      .send('removeOrderItem', { ...removeOrderItemDto, orderId })
      .toPromise();

    const { message, order, status } = removeOrderItemResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: status,
      message,
      data: {
        order,
      },
    };
  }

  async getAllRestaurantOrder(
    getAllRestaurantOrderDto: GetAllRestaurantOrderDto,
  ): Promise<GetAllRestaurantOrderResponseDto> {
    const getAllRestaurantOrderResponse: IOrdersResponse = await this.orderServiceClient
      .send('getOrdersOfRestaurant', { ...getAllRestaurantOrderDto })
      .toPromise();

    const { message, orders, status } = getAllRestaurantOrderResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: status,
      message,
      data: {
        orders,
      },
    };
  }

  async getOrderDetail(orderId: string): Promise<GetOrderDetailResponseDto> {
    const getAllRestaurantOrderResponse: ICreateOrderResponse = await this.orderServiceClient
      .send('getOrderDetail', { orderId })
      .toPromise();

    const { message, order, status } = getAllRestaurantOrderResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: status,
      message,
      data: {
        order,
      },
    };
  }

  async generatePDF(): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });

      // customize your PDF document
      doc.text('hello world', 100, 50);
      doc.end();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });

    return pdfBuffer;
  }

  async updateOrderItemQuantity(
    updateOrderItemQuantityDto: UpdateOrderItemQuantityDto,
    orderId: string,
  ): Promise<UpdateOrderItemQuantityResponseDto> {
    const updateOrderItemQuantityResponse: ICreateOrderResponse = await this.orderServiceClient
      .send('updateOrderItemQuantity', {
        ...updateOrderItemQuantityDto,
        orderId,
      })
      .toPromise();
    const { message, order, status } = updateOrderItemQuantityResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: status,
      message,
      data: {
        order,
      },
    };
  }

  async pickCustomerAddress(
    customerId: string,
    customerAddressId: string,
    orderId: string,
  ): Promise<PickCustomerAddressResponseDto> {
    //TODO: Update địa chỉ mặc định của customer
    const updateDefaultCustomerAddressResponse: ICustomerAddressResponse = await this.userServiceClient
      .send('updateDefaultCustomerAddress', {
        customerId,
        customerAddressId,
      })
      .toPromise();

    const { address } = updateDefaultCustomerAddressResponse;

    if (updateDefaultCustomerAddressResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: updateDefaultCustomerAddressResponse.message,
        },
        updateDefaultCustomerAddressResponse.status,
      );
    }
    //TODO: Update lại thông tin delivery. Tính toán lại shippingFee trả về thông tin order
    const updateDeliveryAddressResponse: ICreateOrderResponse = await this.orderServiceClient
      .send('updateDeliveryAddress', {
        orderId,
        newAddress: {
          address: address.address,
          geom: address.geom,
        },
      })
      .toPromise();
    const { message, order, status } = updateDeliveryAddressResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }

    return {
      statusCode: status,
      message,
      data: {
        order,
      },
    };
  }

  async confirmOrderCheckout(
    confirmOrderCheckoutDto: ConfirmOrderCheckoutDto,
    orderId: string,
    customerId: string,
  ): Promise<ConfirmOrderCheckoutResponseDto> {
    //TODO:
    const confirmOrderCheckout: IConfirmOrderCheckoutResponse = await this.orderServiceClient
      .send('confirmOrderCheckout', {
        ...confirmOrderCheckoutDto,
        orderId,
        customerId,
      })
      .toPromise();

    const { message, status, paypalOrderId } = confirmOrderCheckout;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: message,
        },
        status,
      );
    }

    return {
      statusCode: status,
      message,
      data: {
        paypalOrderId: paypalOrderId,
      },
    };
  }

  async approvePaypalOrder(
    approvePaypalOrderDto: ApprovePaypalOrderDto,
    orderId: string,
    customerId: string,
  ): Promise<ApprovePaypalOrderResponseDto> {
    //TODO:
    const approvePaypalOrderResponse: ICreateOrderResponse = await this.orderServiceClient
      .send('approvePaypalOrder', {
        ...approvePaypalOrderDto,
        orderId,
        customerId,
      })
      .toPromise();

    const { message, status, order } = approvePaypalOrderResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: message,
        },
        status,
      );
    }

    return {
      statusCode: status,
      message,
      data: {
        order: order,
      },
    };
  }

  async getListOrderOfDriver(
    driverId: string,
    callerId: string,
    getListOrderOfDriverDto: GetListOrderOfDriverDto,
  ): Promise<GetListOrderOfDriverResponseDto> {
    const getListOrderOfDriverResponse: IOrdersResponse = await this.orderServiceClient
      .send('getListOrderOfDriver', {
        driverId,
        callerId,
        ...getListOrderOfDriverDto,
      })
      .toPromise();

    const { message, status, orders } = getListOrderOfDriverResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: message,
        },
        status,
      );
    }

    return {
      statusCode: status,
      message,
      data: {
        orders: orders,
      },
    };
  }

  async getOngoingOrdersOfCustomer(
    getOngoingOrdersOfCustomerDto: GetOngoingOrdersOfCustomerDto,
  ): Promise<GetOngoingOrdersOfCustomerResponseDto> {
    const getOngoingOrdersOfCustomer: IOrdersResponse = await this.orderServiceClient
      .send('getOnGoingOrdersOfCustomer', {
        ...getOngoingOrdersOfCustomerDto,
      })
      .toPromise();

    const { message, status, orders } = getOngoingOrdersOfCustomer;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: message,
        },
        status,
      );
    }

    return {
      statusCode: status,
      message,
      data: {
        orders: orders,
      },
    };
  }

  async getDraftOrdersOfCustomer(
    getDraftOrdersOfCustomerDto: GetDraftOrdersOfCustomerDto,
  ): Promise<GetDraftOrdersOfCustomerResponseDto> {
    const getDraftOrdersOfCustomer: IOrdersResponse = await this.orderServiceClient
      .send('getDraftOrdersOfCustomer', {
        ...getDraftOrdersOfCustomerDto,
      })
      .toPromise();

    const { message, status, orders } = getDraftOrdersOfCustomer;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: message,
        },
        status,
      );
    }

    return {
      statusCode: status,
      message,
      data: {
        orders: orders,
      },
    };
  }

  async getLastDraftOrderOfCustomer(
    getLastDraftOrderOfCustomerDto: GetLastDraftOrderOfCustomerDto,
  ): Promise<GetDraftOrdersOfCustomerResponseDto> {
    const getLastDraftOrderOfCustomer: IOrdersResponse = await this.orderServiceClient
      .send('getLastDraftOrderOfCustomer', {
        ...getLastDraftOrderOfCustomerDto,
      })
      .toPromise();

    const { message, status, orders } = getLastDraftOrderOfCustomer;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: message,
        },
        status,
      );
    }

    return {
      statusCode: status,
      message,
      data: {
        orders: orders,
      },
    };
  }

  async getOrderHistoryOfCustomer(
    getOrderHistoryOfCustomerDto: GetOrderHistoryOfCustomerPayload,
  ): Promise<GetOrderHistoryOfCustomerResponseDto> {
    const getOrderHistoryOfCustomer: IOrdersResponse = await this.orderServiceClient
      .send('getOrderHistoryOfCustomer', {
        ...getOrderHistoryOfCustomerDto,
      })
      .toPromise();

    const { message, status, orders } = getOrderHistoryOfCustomer;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: message,
        },
        status,
      );
    }

    return {
      statusCode: status,
      message,
      data: {
        orders: orders,
      },
    };
  }

  async eventPaypalOrderOccur(
    eventPaypalOrderOccurDto: EventPaypalOrderOccurDto,
  ) {
    this.orderServiceClient.emit('eventPaypalOrderOccur', {
      ...eventPaypalOrderOccurDto,
    });
  }
}
