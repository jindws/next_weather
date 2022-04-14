function Get(url: string): Promise<any> {
  return new Promise((resolve) => {
    fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        resolve(data);
      });
  });
}

export { Get };
