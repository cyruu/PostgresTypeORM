import { Request, Response } from "express";
import { User } from "../entities/User";
import AppDataSource from "../dbconnect/dbconnect";
import { Profile } from "../entities/Profile";

// get all users
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userRepo = AppDataSource.getRepository(User);
  // get all users
  const allUsers = await userRepo.find();

  res.json({ allUsers });
};

// create new user
export const createNewUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { firstName, lastName, email } = req.body;

  const userRepo = AppDataSource.getRepository(User);
  const profileRepo = AppDataSource.getRepository(Profile);

  // create user profile
  const myProfile = new Profile();
  myProfile.imageUrl = "imageurll";
  myProfile.profileBio = "profilebioo";

  const savedProfile = await profileRepo.save(myProfile);

  // create new user
  const myUser = new User();
  myUser.firstName = firstName;
  myUser.lastName = lastName;
  myUser.email = email;
  myUser.profile = savedProfile;

  const savedUser = await userRepo.save(myUser);

  return res.status(201).json({
    message: "User created successfully",
    user: savedUser,
  });
};

// update user
export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const { firstName, lastName, email } = req.body;
  const { userid } = req.params;
  console.log("passed userid from put", userid);

  const userRepo = AppDataSource.getRepository(User);

  try {
    const foundUser = await userRepo.findOne({
      where: { id: Number(userid) },
    });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    foundUser.firstName = firstName;
    foundUser.lastName = lastName;
    foundUser.email = email;

    const updatedUser = await userRepo.save(foundUser);

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};
