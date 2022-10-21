const whitespacesRegexp = /([\s]+)/g;

const logWithFormat = (msg: string, format: string, ...args: any) => {
  console.log(`%c: ${msg} :`, format, ...args);
};

export const log = {
  store: (msg: string, ...args: any) =>
    logWithFormat(msg, "color:orangered;margin:4px 0", ...args),
  reducer: (msg: string, ...args: any) =>
    logWithFormat(msg, "color:orange;marginTop:4px", ...args),
  err: (msg: string, ...args: any) =>
    logWithFormat(msg, "color:red;marginTop:4px", ...args),
  hook: (msg: string, ...args: any) =>
    logWithFormat(msg, "color:hsl(250,100%,80%);marginTop:4px", ...args),
  component: (msg: string, ...args: any) =>
    logWithFormat(msg, "color:hsl(250,100%,70%);marginTop:4px", ...args),
  func: (msg: string, ...args: any) =>
    logWithFormat(msg, "color:hsl(300,100%,50%);marginTop:4px", ...args),
  blue: (msg: string, ...args: any) =>
    logWithFormat(msg, "color:hsl(200,100%,70%);margin:4px 0", ...args),
  lime: (msg: string, ...args: any) =>
    logWithFormat(msg, "color:lime;marginTop:4px", ...args),
  orange: (msg: string, ...args: any) =>
    logWithFormat(msg, "color:orange;marginTop:4px", ...args),
};

export const extractValuesToString = (item: any): string => {
  let str = "";

  if (!item) {
  } else if (typeof item === "string") {
    str = item;
  } else if (typeof item === "number") {
    str = String(item);
  } else if (Array.isArray(item)) {
    str = item.reduce((s, i) => {
      return s + " " + extractValuesToString(i);
    }, "");
  } else if (typeof item === "object") {
    str += Object.values(item).reduce((s, i) => {
      return s + " " + extractValuesToString(i);
    }, "");
  } else {
    throw new Error(`Can't extract value from item of type: ${typeof item}`);
  }

  return (" " + str).replace(whitespacesRegexp, " ").trim();
};

export const numberToCostString = (cost: number): string => {
  const c: string = cost.toFixed(2).replace(".", ",");
  return `${c} $`;
};
