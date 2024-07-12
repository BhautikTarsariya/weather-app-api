import prisma from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IAuth } from "../types/IAuth";

// User Register API
export const register = async (payload: IAuth) => {
  const { first_name, last_name, email, password } = payload;

  if (!first_name || !last_name || !email || !password) {
    throw Error("Email and password are required");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    throw new Error("User Already Exist. Please Login");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      first_name,
      last_name,
      email,
      password: hashedPassword,
    },
  });

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.TOKEN_EXP,
    }
  );

  return { token: token, message: "User created successfully" };
};

// User Login API
export const login = async (payload: IAuth) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw Error("Email and password are required");
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw Error("Invalid Email");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw Error("Invalid Password");
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );

  return { token: token, message: "User login successfully" };
};
