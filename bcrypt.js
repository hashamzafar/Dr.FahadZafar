import bcrypt from 'bcrypt';


const plainPW = "FahadZafar1234"
const numberOfRounds = 10
const hash = bcrypt.hashSync(plainPW, numberOfRounds);
console.log("hash", hash)
const isOk = bcrypt.compareSync(plainPW, hash)

console.log(isOk)

