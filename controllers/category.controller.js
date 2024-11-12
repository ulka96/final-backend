import Category  from "../models/category.model.js";

export const getAllCategories = async (request, response) => {
  try {
    const categories = await Category.find();
    response.status(200).json(categories);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const getCategory = async (request, response) => {
  try {
    const category = await Category.findById(request.params.id);
    if (!category)
      return response.status(404).json({ message: "Category not found" });
    response.status(200).json(category);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};


export const createCategory = async (request, response) => {

    const { title } = request.body;
    
    const categoryPic = request.file ? request.file.path : null;
  
      if (!categoryPic) {
          return response.status(400).json({ error: "categoryPic is required" });
      }
  
      if (!title) {
          return response.status(400).json({ error: "Please fill all required fields" });
      }
  
      try {
          const existingCategory = await Category.findOne({ title });
          if (existingCategory) {
              return response.status(400).json({ error: "Category with this title already exists" });
          }
  
          const newCategory = await Category.create({
              title,
              categoryPic
          });
  
          return response.status(201).json(newCategory);
      } catch (error) {
          return response.status(500).json({ error: "Server error" });
      }
  };




  export const updateCategory = async (req, res) => {
    const { id } = req.params;
    try {

      const updatedData = req.body;
      if (req.file) {
        updatedData.categoryPic = req.file.path; 
      }
  
      const updatedCategory = await Category.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
  
      if (!updatedCategory) {
        return res.status(404).send({ message: "Category not found" });
      }
  
      res.status(200).send({ updatedCategory });
    } catch (error) {
      res.status(500).send(error);
    }
  };


export const deleteCategory = async (request, response) => {
  try {
    const category = await Category.findByIdAndDelete(request.params.id);
    if (!category)
      return response.status(404).json({ message: "Category not found" });
    response.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};