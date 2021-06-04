import { Controller, Injectable, Logger, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  async newUser(@Req() req, @Res() res) {
    this.logger.debug(
      '[ ApiController -> newUser(req, res) ] iniciando metodo de criar usuario',
    );

    const { body: model = {} } = req;

    return this.usersService.newUser(model, req, res);
  }

  async auth(@Req() req, @Res() res) {
    this.logger.debug(
      '[ ApiController -> auth(req, res) ] iniciando metodo de criar autenticacao',
    );

    const { body: model = {} } = req;

    return this.usersService.auth(req, res);
  }

  async logout(@Req() req) {
    this.logger.debug(
      '[ ApiController -> logout(req, res) ] iniciando metodo de logout',
    );

    const { body: model = {} } = req;

    const socket = req.app.get('socketio');
    socket.emit(model.sala + 'logout', model.data);
  }
}
