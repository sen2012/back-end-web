import { Controller, Get, Param } from "@nestjs/common";
import { AppService } from "./app.service";
import { User } from "@prisma/client";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("test/:id")
  getHello(@Param("id") id: string): Promise<User> {
    return this.appService.user(Number(id));
  }
}
