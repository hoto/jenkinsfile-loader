const { App } = require('../src/app')

describe("App should", () => {
  it("say hello", () => {
    expect(App.hello("Andy")).toEqual("Hello Andy");
  })
})
