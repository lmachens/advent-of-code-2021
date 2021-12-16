import { getTask } from "./lib.js";

const task = await getTask(16);
// const task = `D2FE28`;
// const task = `38006F45291200`;
// const task = `EE00D40C823060`;
// const task = `8A004A801A8002F478`;
// const task = `620080001611562C8802118E34`;
// const task = `C0015000016115A2E0802F182340`;
// const task = `A0016C880162017C3686B18A3D4780`;
// const task = `C200B40A82`;
// const task = `04005AC33890`;
// const task = `880086C3E88112`;
// const task = `CE00C43D881120`;
// const task = `D8005AC2A8F0`;
// const task = `F600BC2D8F`;
// const task = `9C005AC2F8F0`;
// const task = `9C0141080250320F1802104A08`;

const bits = task
  .split("")
  .map((hex) => parseInt(hex, 16).toString(2).padStart(4, "0"))
  .join("");

const SUM = 0;
const PRODUCT = 1;
const MINIMUM = 2;
const MAXIMUM = 3;
const LITERAL_VALUE = 4;
const GREATER_THAN = 5;
const LESS_THAN = 6;
const EQUAL_TO = 7;

let position = 0;
let versionSum = 0;

const toBinary = (bitsArray) => {
  return parseInt(bitsArray.join(""), 2);
};
const processLiteralValue = (bits) => {
  let literalValueBinary = "";
  while (position < bits.length) {
    const [prefix, ...group] = bits.splice(0, 5);
    literalValueBinary += group.join("");
    if (prefix === "0") {
      // Last group
      break;
    }
  }
  const literalValue = parseInt(literalValueBinary, 2);
  console.log(` Literal value is ${literalValue}`);
  return literalValue;
};

const processOperator = (operator, bits) => {
  const lengthTypeID = toBinary(bits.splice(0, 1));
  if (lengthTypeID === 0) {
    console.log(` Length Type ID ${lengthTypeID} => 15 bits`);
    const numberOfBits = toBinary(bits.splice(0, 15));
    console.log(` Sub-packet bits ${numberOfBits}`);
    const subPacket = bits.splice(0, numberOfBits);
    let literalValues = [];
    while (subPacket.length > 0) {
      literalValues.push(processPacket(subPacket));
    }
    const result = calcResult(operator, literalValues);
    return result;
  } else {
    console.log(` Length Type ID ${lengthTypeID} => 11 bits`);
    const numberOfSubPackets = toBinary(bits.splice(0, 11));
    console.log(` Number of sub packets ${numberOfSubPackets}`);
    let literalValues = [];
    for (let i = 0; i < numberOfSubPackets; i++) {
      literalValues.push(processPacket(bits));
    }
    const result = calcResult(operator, literalValues);
    return result;
  }
};

const processPacket = (bits) => {
  if (bits.length === 0 || toBinary(bits.slice(position)) === 0) {
    return;
  }

  const version = toBinary(bits.splice(0, 3));
  versionSum += version;
  const typeId = toBinary(bits.splice(0, 3));

  console.log(`Packet version ${version}`);
  if (typeId === LITERAL_VALUE) {
    console.log(`${typeId} => Packet is literal value`);
    const literalValue = processLiteralValue(bits);
    return literalValue;
  } else {
    console.log(`${typeId} => Packet is operator`);
    const result = processOperator(typeId, bits);
    return result;
  }
};

const calcResult = (operator, literalValues) => {
  let operatorResult;
  switch (operator) {
    case SUM:
      operatorResult = literalValues.reduce((prev, value) => prev + value, 0);
      break;
    case PRODUCT:
      operatorResult = literalValues.reduce((prev, value) => prev * value, 1);
      break;
    case MINIMUM:
      operatorResult = Math.min(...literalValues);
      break;
    case MAXIMUM:
      operatorResult = Math.max(...literalValues);
      break;
    case GREATER_THAN:
      operatorResult = literalValues[0] > literalValues[1] ? 1 : 0;
      break;
    case LESS_THAN:
      operatorResult = literalValues[0] < literalValues[1] ? 1 : 0;
      break;
    case EQUAL_TO:
      operatorResult = literalValues[0] === literalValues[1] ? 1 : 0;
      break;
  }
  console.log(`Operator ${GREATER_THAN} result is ${operatorResult}`);
  return operatorResult;
};

const result = processPacket(bits.split(""));

console.log(
  `--- Part One ---\nWhat do you get if you add up the version numbers in all packets?\n${versionSum}`
);

console.log(
  `--- Part Two ---\nWhat do you get if you evaluate the expression represented by your hexadecimal-encoded BITS transmission?\n${result}`
);
