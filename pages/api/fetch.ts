function Get(url: string): Promise<any> {
  return new Promise((resolve) => {
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        resolve(data);
        localStorage.setItem(url, JSON.stringify(data));
      })
      .catch(() => {
        resolve(JSON.parse(localStorage.getItem(url) || "{}")); // 这里做了个缓存,在页面打开,断网不刷新生效
      });
  });
}

export { Get };
