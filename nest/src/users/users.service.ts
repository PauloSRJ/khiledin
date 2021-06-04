import { Inject, Injectable, Logger } from '@nestjs/common';
import * as Isemail from 'isemail';
import { Model } from 'mongoose';

export type User = any;

@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name);

  constructor(@Inject('USER_MODEL') private userModel: Model<any>) {}

  async newUser(model, req, res): Promise<User | undefined> {
    const response = { msg: 'success' };

    try {
      this.logger.debug('[Create User]: ' + JSON.stringify(model, null, 4));

      if (Isemail.validate(model.email) === false) {
        throw new Error('Email invalido!');
      }

      const request = await new this.userModel(model);
      this.logger.debug('Created success: ', request);
    } catch (e) {
      this.logger.error('[Error Create User]: ' + e);
      response.msg = e;
    }

    const code = response.msg !== 'success' ? 401 : 200;

    res.status(code).json(response);
  }

  async auth(req, res) {
    const response = {
      msg: 'success',
    };
    const responseSend = (code) => res.status(code).json(response);

    // if (Isemail.validate(model.email) === false) {
    //   response.msg = 'error';
    //   responseSend(401);
    // }

    const find = await this.userModel
      .findOne()
      .then((data) => data)
      .catch((err) => {
        response.msg = err;
        return null;
      });

    if (find !== null) {
      this.logger.debug('[Autenticado]: ' + JSON.stringify(find, null, 4));
      req.session.user = find;
      req.session.save(function () {
        responseSend(200);
      });
    } else {
      this.logger.error('[Nao Autenticado]: ' + find);
      response.msg = 'error';
      responseSend(401);
    }
  }
}
