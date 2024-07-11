import prisma from "../models/userModel";

export const addFavorite = async (payload: any) => {
  const { city } = payload;
  const userId = payload.user.userId;

  const favorite = await prisma.favorite.create({
    data: {
      city,
      userId,
    },
  });

  return favorite;
};

export const getFavorites = async (payload: any) => {
  const userId = payload.user.userId;

  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: { user: true },
  });

  return favorites;
};
