import express from "express";
import { urlModel } from "../model/shortUrl";

export const createUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    console.log("the full url ", req.body.fullUrl);
    const { fullUrl } = req.body;
    const urlFound = await urlModel.find({ fullUrl: fullUrl.fullUrl });
    if (urlFound.length < 0) {
      res.status(400).send(urlFound);
    } else {
      const shortUrl = await urlModel.create({ fullUrl });
      res.status(201).send(shortUrl);
    }
  } catch (error) {
    res.status(500).send({ message: "Error creating" });
  }
};

export const getAllUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const shortUrls = await urlModel.find().sort({createdAt: -1});
    if (shortUrls.length < 0) {
      res.status(404).send({ message: "Short urls not found" });
    } else {
      res.status(200).send(shortUrls);
    }
  } catch (error) {
    res.status(500).send({ message: "Some error occurred" });
  }
};
export const getUrl = async (req: express.Request, res: express.Response) => {
  try {
    const shortUrl = await urlModel.findOne({ shortUrl: req.params.id });
    if (!shortUrl) {
      res.status(400).send({ message: "Full url not found" });
    } else {
      shortUrl.clicks++;
      shortUrl.save();
      res.redirect(`${shortUrl.fullUrl}`);
    }
  } catch (error) {
    res.status(500).send({ message: "Some error occurred" });
  }
};

export const deleteUrl = async (
  req: express.Request,
  res: express.Response
) => {
    try {
        const shortUrl = await urlModel.findByIdAndDelete({ _id: req.params.id });
        if (!shortUrl) {
          res.status(200).send({ message: "Url successfully deleted" });
        }
      } catch (error) {
        res.status(500).send({ message: "Some error occurred" });
      }
};
