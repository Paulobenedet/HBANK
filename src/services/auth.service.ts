import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "../config/prisma";
import { env } from "../config/env";
import { RegisterDTO, LoginDTO } from "../types/auth.types";

export class AuthService {
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
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    const token = jwt.sign(
      { id: user.id },
      env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return {
      user,
      token,
    };
  }

  async login(data: LoginDTO) {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
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
      { id: user.id },
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
      },
      token,
    };
  }
}