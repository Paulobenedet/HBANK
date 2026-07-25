import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "../shared/config/prisma";
import { env } from "../shared/config/env";
import { RegisterDTO, LoginDTO } from "../types/auth.types";
import { AccountService } from "./account.service";

export class AuthService {
  private accountService = new AccountService();

  async register(data: RegisterDTO) {
    const userExists = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      throw new Error("E-mail já cadastrado.");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: passwordHash,
      },
    });

    const account = await this.accountService.create(user.id);

    const token = jwt.sign(
      {
        id: user.id,
      },
      env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        account,
      },
      token,
    };
  }

  async login(data: LoginDTO) {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
      include: {
        account: true,
      },
    });

    if (!user) {
      throw new Error("E-mail ou senha inválidos.");
    }

    const passwordMatch = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!passwordMatch) {
      throw new Error("E-mail ou senha inválidos.");
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        account: user.account,
      },
      token,
    };
  }
}