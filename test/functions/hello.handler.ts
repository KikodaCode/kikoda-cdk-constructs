interface HelloWorld {
  hello: string;
}

export const main = (): HelloWorld => {
  return { hello: 'world' };
};
