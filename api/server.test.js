const server = require('./server');
const express = require('express')
const supertest = require('supertest');
const db = require("../database/dbConfig")


describe("Get request", () => {
    it('returns 401 if no session is found', async () => {
        const res = await supertest(server).get("/api/jokes")
        expect(res.statusCode).toBe(401);
    })
    it('returns a JSON object', async () => {
        const res = await supertest(server).get("/api/jokes")
        expect(res.type).toBe("application/json");
    })
})

describe("Register", () => {
    // beforeEach(async () => {
    //     await db("users").truncate();
    //   });
    it('returns 500 if username already exists', async () => {
        const data = {username: "jesus", password: "jesus"}
        const res = await supertest(server).post("/api/auth/register").send(data)
        expect(res.statusCode).toBe(500);
    })
    it('returns 500 if no username is entered', async () => {
        const data = {password: "jesus"}
        const res = await supertest(server).post("/api/auth/register").send(data)
        expect(res.statusCode).toBe(500);
    })
    it('returns 500 if no password is entered', async () => {
        const data = {username: "jesus"}
        const res = await supertest(server).post("/api/auth/register").send(data)
        expect(res.statusCode).toBe(500);
    })
    // it('returns 201 for succesfully registered user', async () => {
    //     const data = {username: `${Math.random()}`, password: "123"}
    //     const res = await supertest(server).post("/api/auth/register").send(data)
    //     expect(res.statusCode).toBe(201);
    // })
    it('returns a json object', async () => {
        const data = {username: "jesus", password: "jesus"}
        const res = await supertest(server).post("/api/auth/register").send(data)
        expect(res.type).toBe("application/json");
    })
})

describe("Login", () => {
    it('Can login to existing user', async () => {
        const data = {username: "jesus", password: "jesus"}
        const res = await supertest(server).post("/api/auth/login").send(data)
        expect(res.statusCode).toBe(200);
    })
    it('returns 401 if username does not exist', async () => {
        const data = {username: "jesus1234", password: "jesus"}
        const res = await supertest(server).post("/api/auth/login").send(data)
        expect(res.statusCode).toBe(401);
    })
    it('returns 500 if no password is entered', async () => {
        const data = {username: "jesus"}
        const res = await supertest(server).post("/api/auth/login").send(data)
        expect(res.statusCode).toBe(500);
    })
    it('returns 500 if no username is entered', async () => {
        const data = {password: "jesus"}
        const res = await supertest(server).post("/api/auth/login").send(data)
        expect(res.statusCode).toBe(500);
    })
    it('returns 500 if no password is entered', async () => {
        const data = {username: "jesus"}
        const res = await supertest(server).post("/api/auth/login").send(data)
        expect(res.type).toBe("application/json");
    })
})