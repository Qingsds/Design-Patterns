/**
 * @description singleton mode
 * @author qingsds
 */

// 如何保证一个类只有一个实例?

// 方法 1 ts 实现
class SingleCat {
  private static instance: SingleCat | null = null;
  // private constructor(){}
  static getInstance() {
    if (SingleCat.instance == null) {
      SingleCat.instance = new SingleCat();
    }
    return SingleCat.instance;
  }
  public show() {
    console.log('i am a single cat');
  }
}

let a = SingleCat.getInstance();
let b = SingleCat.getInstance();
console.log(a === b); //true

// 方法 2 闭包实现
const getInstance = (function () {
  let instance: SingleCat | null;
  return function () {
    if (!instance) {
      instance = new SingleCat();
    }
    return instance;
  };
})();

let ins1 = getInstance();
let ins2 = getInstance();
console.log(ins1 === ins2) //true