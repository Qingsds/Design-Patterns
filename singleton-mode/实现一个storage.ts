/**
 * @description 实现一个 storage
 * @author qingsds
 */

// 实现Storage，使得该对象为单例，基于 localStorage 进行封装。实现方法 setItem(key,value) 和 getItem(key)。

// ts
class MyStorage {
  private static instance: MyStorage | null = null;
  private constructor() {}

  static getInstance() {
    if (MyStorage.instance == null) {
      MyStorage.instance = new MyStorage();
    }
    return MyStorage.instance;
  }

  public getItem(key: string) {
    return localStorage.getItem(key);
  }
  public setItem(key: string, value: any) {
    return localStorage.setItem(key, value);
  }
}

const storage1 = MyStorage.getInstance();
const storage2 = MyStorage.getInstance();

console.log(storage1 === storage2);

// 闭包
class BaseStorage {
  getItem(key: string) {
    return localStorage.getItem(key);
  }
  setItem(key: string, value: any) {
    return localStorage.setItem(key, value);
  }
}

const get_instance = (function () {
  let instance: BaseStorage | null = null;
  return function () {
    if (instance == null) {
      instance = new BaseStorage();
    }
    return instance;
  };
})();
