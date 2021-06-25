import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CaslModule } from 'src/casl/casl.module';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
import { DriverController } from './driver/driver.controller';
import { DriverService } from './driver/driver.service';
import { MerchantController } from './merchant/merchant.controller';
import { MerchantService } from './merchant/merchant.service';
import { MenuGroupController } from './merchant/restaurant/menu/menu-group/menu-group.controller';
import { MenuGroupService } from './merchant/restaurant/menu/menu-group/menu-group.service';
import { MenuItemController } from './merchant/restaurant/menu/menu-item/menu-item.controller';
import { MenuItemService } from './merchant/restaurant/menu/menu-item/menu-item.service';
import { MenuController } from './merchant/restaurant/menu/menu.controller';
import { MenuService } from './merchant/restaurant/menu/menu.service';
import { ToppingGroupController } from './merchant/restaurant/menu/topping-group/topping-group.controller';
import { ToppingGroupService } from './merchant/restaurant/menu/topping-group/topping-group.service';
import { ToppingItemController } from './merchant/restaurant/menu/topping-item/topping-item.controller';
import { ToppingItemService } from './merchant/restaurant/menu/topping-item/topping-item.service';
import { PaymentController } from './merchant/restaurant/payment/payment.controller';
import { PaymentService } from './merchant/restaurant/payment/payment.service';
import { RestaurantController } from './merchant/restaurant/restaurant.controller';
import { RestaurantService } from './merchant/restaurant/restaurant.service';
import { StaffController } from './merchant/restaurant/staff/staff.controller';
import { StaffService } from './merchant/restaurant/staff/staff.service';
import { PosController } from './pos/pos.controller';
import { PosService } from './pos/pos.service';

@Module({
  imports: [forwardRef(() => AuthModule), CaslModule],
  controllers: [
    CustomerController,
    PosController,
    DriverController,
    MerchantController,
    AdminController,
    PaymentController,
    RestaurantController,
    StaffController,
    MenuController,
    MenuGroupController,
    MenuItemController,
    ToppingGroupController,
    ToppingItemController,
  ],
  providers: [
    CustomerService,
    MerchantService,
    AdminService,
    PosService,
    RestaurantService,
    StaffService,
    MenuService,
    MenuGroupService,
    MenuItemService,
    ToppingGroupService,
    ToppingItemService,
    PaymentService,
    DriverService,
  ],
  exports: [
    CustomerService,
    MerchantService,
    AdminService,
    PosService,
    RestaurantService,
    StaffService,
    MenuService,
    MenuGroupService,
    MenuItemService,
    ToppingGroupService,
    ToppingItemService,
    PaymentService,
    DriverService,
  ],
})
export class UserModule {}
