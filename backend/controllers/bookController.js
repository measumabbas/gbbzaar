const ErrorHandler = require("../utills/errorhandler");
const { artSchema, reviewSchema, orderSchema } = require("../schemas/artSchema");
const Book = require("../Models/bookSchema");
const User = require("../Models/userSchema");
const sendEmail = require("../utills/sendEmail");

exports.createArt = async (req, res, next) => {
  try {
    const data = { ...req.body }
    // const { error } = artSchema.validate(data, { abortEarly: false });
    // if (error) {
    //     console.log(error)
    //     const errorMessages = error.details.map((detail) => detail.message);
    //     return next(new ErrorHandler(errorMessages, 400))
    // }

    const book = await Book.create(req.body);
    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};

exports.getSingleArt = async (req, res, next) => {
  try {
    const result = await Book.findOne({ _id: req.params.id }).populate(
      "user_id"
    );
    if (result) {
      res.status(200).json({
        success: true,
        result,
      });
    } else {
      return next(new ErrorHandler("No art found with this id", 404));
    }
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};

exports.deleteArt = async (req, res, next) => {
  // console.log(req.params.id)

  try {
    const result = await Book.findOne({ _id: req.params.id });
    // console.log(result)
    if (result) {
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Art deleted successfully",
      });
    } else {
      return next(new ErrorHandler("No art found with this id", 404));
    }
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};

exports.getSingleUserArts = async (req, res, next) => {
  try {
    const arts = await Book.find({ user_id: req.body.id }).populate("user_id");

    res.status(200).json({
      success: true,
      arts,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};

exports.updateArtTitle = async (req, res, next) => {
  try {

    const art = await Book.findOne({ _id: req.params.id });

   
    if(req.body.title){
      art.title = req.body.title
    }
    if(req.body.description){
      art.description = req.body.description
    }
    if(req.body.imageUrl){
      art.imageUrl = req.body.imageUrl
    }
    await art.save();

    res.status(200).json({
      success: true,
      art,
    });
  } catch (error) {
    console.log(error)
    return next(new ErrorHandler(error, 500));
  }
};

exports.getAllArts = async (req, res,next) => {
  try {
    const { title,language,condition,availability } = req.query;
    let query = {};
    if (title) {
      query.title = { $regex: new RegExp(title, 'i') };
    }
    if (language) {
      query.language = { $regex: new RegExp(language, 'i') };
    }
    if(condition){
      query.condition = condition
    }
    if(availability){
      query.availability = availability
    }
    const arts = await Book.find(query).populate("user_id");

    
    res.status(200).json({
      success: true,
      arts,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};

exports.createArtReview = async (req, res, next) => {
  try {
    const data = { ...req.body }
    const { error } = reviewSchema.validate(data, { abortEarly: false });
    if (error) {
        console.log(error)
        const errorMessages = error.details.map((detail) => detail.message);
        return next(new ErrorHandler(errorMessages, 400))
    }
    const { rating, comment, artId, userId } = req.body;

    const review = {
      user: userId,
      rating: Number(rating),
      comment,
    };

    const art = await Book.findById(artId);
    const isReviewed = art.reviews.find(
      (rev) => rev.user.toString() === userId.toString()
    );

    if (isReviewed) {
      art.reviews.forEach((rev) => {
        if (rev.user.toString() === userId.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      art.reviews.push(review);
      art.numOfReviews = art.reviews.length;
    }

    let avg = 0;

    art.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    art.ratings = avg / art.reviews.length;

    await art.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// Get All Reviews of a product
exports.getArtReviews = async (req, res, next) => {
  try {

    const art = await Book.findById(req.query.id);
    if (!art) {
      res.status(400).json({
        success: false,
        message: "Product Not found",
      });
    } else {
      
      await art.populate({path:'reviews',populate: {
        path: 'user',
        model: 'User',
      },})
      res.status(200).json({
        success: true,
        reviews: art.reviews,
      });
    }
  } catch (error) {
    res.status(500).json({
      success:false,
      error:error.message
    })
  }
};

// Delete Review
exports.deleteReview = async (req, res, next) => {
  const art = await Book.findById(req.query.artId);

  if (!art) {
    res.status(400).json({
      success: false,
      message: "Product Not found",
    });
  } else {
    const reviews = art.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
      avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Book.findByIdAndUpdate(
      req.query.artId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );


    res.status(200).json({
      success: true,
    });
  }
};


exports.orderArt = async(req,res,next)=>{

  try {
    const data = { ...req.body }
    const { error } = orderSchema.validate(data, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return next(new ErrorHandler(errorMessages, 400))
    }

    const {artId,address,email,userName,number,userEmail} = req.body
    const art = await Book.findById(artId)
    const mailOptions = {
      to: userEmail,
      subject: "New order recieved from GBArtsBazaar",
      message: `
            customer details
               
                Name : ${userName}
                Email : ${email}
                Contact Number : ${number}
                Address : ${address}
                
            Arts Details

                Title : ${art.title}
                id : ${art._id}
                
      `,
    };

    await sendEmail(mailOptions)

    res.status(200).json({
      success:true,
      message:'Mail has been sent successfully'
    })

  } catch (error) {
    return next(new ErrorHandler(error, 500))
  }
}