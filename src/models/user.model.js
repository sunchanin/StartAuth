const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const postUser = async (user) => {
  try {
    await prisma.user.create({
      data: user,
    });

    return "User created successfully";
  } catch (err) {
    if (err.code === "P2002" && err.meta?.target?.includes("email")) {
      throw new Error("A user with this email already exists.");
    } else {
      console.log(err);
      throw new Error(err.message);
    }
  }
};

const getUser = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (err) {
    console.log("err: ", err);
    throw new Error(err.message);
  }
};

module.exports = { postUser, getUser };
