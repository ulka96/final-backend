// Model
import User from "../models/user.model.js"


// Get users
export const getUsers = async (request, response) => {
    try {
      const users = await User.find();
      response.status(200).send({data: users });
    } catch (error) {
      response.status(500).send({error: error.message });
    }
  };

// Get a single user by ID
export const getUser = async (request, response) => {
    try {
      const { id } = request.params;
      const user = await User.findById(id);
  
      if (!user) {
        response.status(404).send({ message: "User not found" });
        return;
      }
  
      response.status(200).send({data: user });
    } catch (error) {
      response.status(500).send({ error: error.message });
    }
  };


// Delete a user by ID
export const deleteUser = async (request, response) => {
    try {
      const { id } = request.params;
      const user = await User.findByIdAndDelete(id);
  
      if (!user) {
        response.status(404).send({ message: "User not found" });
        return;
      }
  
      response.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
      response.status(500).send({ message: "Error deleting user", error: error.message });
    }
  };

// Update a user by ID 
export const updateUser = async (request, response) => {
    try {
      const { id } = request.params;
      const updates = request.body; 
  
      const updatedUser = await User.findByIdAndUpdate(
        id,
        updates, 
        {
          new: true, 
          runValidators: true, 
        }
      );
  
      if (!updatedUser) {
        response.status(404).send({ message: "User not found" });
        return;
      }
  
      response.status(200).send({data: updatedUser });
    } catch (error) {
      response.status(500).send({error: error.message });
    }
  };
  

// Add a new user
export const addUser = async (request, response) => {

    const { email, userName, password } = request.body;
  
    if (!email || !userName || !password) {
      response.status(400).send({ message: "Please fill all empty fields" });
      return;
    }
  
    try {
      const user = await User.create({
        email,
        userName,
        password,
      });
        
      response.status(201).send({ message: "User is created successfully", data: user });
    } catch (error) {
        response.status(500).send({ message: "Error creating user", error: error.message });
    }
  };
  