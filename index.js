const express = require("express");
const path = require("path");
const fs = require("fs");
const notes = require("./db/db.json");

const app = extress();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));



