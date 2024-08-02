const Offer = require("../Models/offerSchema");
const Book = require("../Models/bookSchema");

exports.createOffer = async (req, res, next) => {
  try {
    const offer = await Offer.create(req.body);

    res.status(200).json({
      success: true,
      offer,
    });
  } catch (error) {
    return next(new ErrorHander(error, 500));
  }
};

exports.getAllOffers = async (req, res, next) => {
  try {
    if (req.query.mode === "sent") {
      const offers = await Offer.find({ offered_by: req.params.id })
        .populate("offered_by")
        .populate("offered_to")
        .populate("offered_by_book")
        .populate("offered_to_book");
      res.status(200).json({
        success: true,
        result: offers,
      });
    } else {
      const offers = await Offer.find({ offered_to: req.params.id })
        .populate("offered_by")
        .populate("offered_to")
        .populate("offered_by_book")
        .populate("offered_to_book");
      res.status(200).json({
        success: true,
        result: offers,
      });
    }
  } catch (error) {
    return next(new ErrorHander(error, 500));
  }
};

exports.acceptOffer = async (req, res, next) => {
  try {
    const offer = await Offer.findById(req.body.id);
    if (!offer) {
      return next(new ErrorHander("Offer not found", 404));
    } else {
      await Offer.findByIdAndUpdate(
        req.body.id,
        { status: "approved" },
        { new: true }
      );
      await Book.findByIdAndUpdate(
        offer.offered_to_book,
        { status: "sold" },
        { new: true }
      );
      await Book.findByIdAndUpdate(
        offer.offered_by_book,
        { status: "sold" },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Operation successfull",
      });
    }
  } catch (error) {
    return next(new ErrorHander(error, 500));
  }
};
exports.declineOffer = async (req, res, next) => {
  try {
    const offer = await Offer.findById(req.body.id);
    if (!offer) {
      return next(new ErrorHander("Offer not found", 404));
    } else {
      await Offer.findByIdAndUpdate(
        req.body.id,
        { status: "declined" },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Operation successfull",
      });
    }
  } catch (error) {
    return next(new ErrorHander(error, 500));
  }
};
