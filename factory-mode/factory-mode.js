/**
 * @description 工厂模式
 * @author qingsds
 */

// 假设需求 员工信息录入 每个员工都有姓名 年龄 职业等信息, 这时,只需要简单的构造器就可以完成

function User(name, age, career) {
  this.name = name;
  this.age = age;
  this.career = career;
}

const user = new User('qingsds', 19, 'coder');

// 这时 产品经理说 我要求这个系统具备给不同工种分配职责说明的功能 要给每个工种的用户加上一个个性化的字段，来描述他们的工作内容
// 这时 仍要使用构造器的话, 就要创建多个构造器

function Coder(name, age) {
  this.name = name;
  this.age = age;
  this.career = 'coder';
  this.work = ['写代码'];
}

function ProductManger(name, age) {
  this.name = name;
  this.age = age;
  this.career = 'productManger';
  this.work = ['需求'];
}

// 可能还有多少几十个构造器需要创建... 这时要思考一下,这些构造器的共性是什么呢???
// name, age, career, work 这个几个属性都是重复的

// 现在我们把相同的逻辑都封装到 User 中
function User(name, age, career, work) {
  this.name = name;
  this.age = age;
  this.career = career;
  this.work = work;
}

function userFactory(name, age, career) {
  let work;
  switch (career) {
    case 'coder':
      work = ['写代码'];
      break;
    case 'productManger':
      work = ['开会', '需求'];
      break;
    case 'boss':
      work = ['喝茶', '高尔夫'];
      break;
    // ...
  }
  return new User(name, age, career, work);
}
// 将创建对象的过程单独封装，这样的操作就是工厂模式.
// 在写了大量的相似的构造函数, 在写了大量的 new, ,就应该考虑一下是不是要用工厂模式重构代码.
