// globals.js
let wss;

const setWss = (ws) => {
  wss = ws;
};

const getWss = () => {
  return wss;
};

module.exports = { setWss, getWss };
