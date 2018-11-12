import * as express from "express";

export const getCookie = (req?: express.Request) =>
  req ? req.headers.cookie || "" : document.cookie;
