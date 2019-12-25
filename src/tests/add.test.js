const add = (a, b) => a + b;
const generateGreeting = (name = "Anonymous") => `Hello ${name}!`

test("should add to numbers", () => {
    const result = add(5, 4);
    expect(result).toBe(9)
    // if(result !== 7) {
    //     throw new Error(`You added 5 and 4.The result should was ${result}.Expected 9`)
    // }
});

test("should generate greeting from name", () => {
    const greeting = generateGreeting("Mike");
    expect(greeting).toBe("Hello Mike!");
});

test("should generate greeting for no name", () => {
   const greeting = generateGreeting();
   expect(greeting).toBe("Hello Anonymous!");
});

//if we use booleans,numbers or stings we can sue toBe();
//if we use objects or arrays we can sue toEqual();