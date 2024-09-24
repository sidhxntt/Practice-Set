const getrandomValue = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };
  
  const heavyTask = async () => {
    const ms = getrandomValue([700, 800, 1000, 1200, 1500, 2000]);
    const shouldthrowerror = getrandomValue([1, 2, 3, 4, 5, 6, 7, 8]) === 6;
    
    if (shouldthrowerror) {
      const randomError = getrandomValue([
        "DB Payment failure",
        "DB Server is down",
        "DB Connection timeout",
        "Access Denied",
        "Invalid Request"
      ]);
      throw new Error(randomError);
    }
  
    return new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(ms);
      }, ms);
    });
  };

export default heavyTask