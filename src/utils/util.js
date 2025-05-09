import bcrypt from "bcrypt";

export const createHash = (passport) => bcrypt.hashSync(passport, bcrypt.genSaltSync(10));

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);