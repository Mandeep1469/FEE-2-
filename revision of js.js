console.log("Hello world");
//let var const

// //var
// var a=182;
// console.log(a);
// var a=5;//var can be redeclared, reassign and is function scoped
// console.log(a);
// function s(){
//     var b=52;
//     //as var is function scoped so cant be called outside
// }
// // console.log(b);
// if (true){
//     c=2;
// }
// //it is function scoped but not block scoped like in if or loop it can be accessed outside
// console.log(c);

//let
// let a=10;
// a=11;
// console.log(a);//let can be reassigned 
// // let a=5;
// // console.log(a);//but let can not be redeclared
// // if (true){
// //     let d=50;
// // }
// // console.log(d);
// // let is block scoped means defined in () can not be called out

//const
// const a=5;
//cant reassigned redeclared and is block scoped

//hoisting
// console.log(a);//undefined
// var a=5;
// console.log(a);//5
// if use let , const then give error in first case


//function
// console.log(sum(5,3));//run because functions are hoisted
// function sum(a,b){
//     //a,b are parameters
//     return a+b;
// }
// console.log(sum(5,6));//5,6 are arguments

//function expression
// // console.log(sum(5,3));//not run because function expression are not hoisted
// const sum=function(a,b){
//     return a+b;
// }
// console.log(sum(5,6));//5,6 are arguments

//function using only arguments without paramters
// function sum(){
//     console.log(arguments);//it return an object
//     return arguments[0]+arguments[1];
// }
// console.log(sum(2,5));

//arrow function
// const sum=(a,b)=> a+b;
// console.log(sum(8856423,964564));


//arrays
//sequential collection of data and can contain diffrent data types
a=[1,2,6,3,6];
// console.log(a.at(-1));//for negative index we use at keyword
// a.unshift(7);
// console.log(a);
// console.log(a.findIndex(x=>x==3));//arrow function is passed for finindexof
// console.log(a.sort());
// console.log(a.sort((a,b)=>a-b));//ascending
// console.log(a.sort((a,b)=>b-a));//descnding

//map apply operation on all
//reduce will make the one value of whole array
//filter checks condition of all elements in array
//map and filter makes new array

// for in loop give index and forof give value
// for (let item of a){
//     console.log(item);
// }
// for (let item in a){
//     console.log(item);
// }

// const student={
//     name="Mandeep",
//     age=20,
//     address="FGS"
// }
// console.log(student.name);

