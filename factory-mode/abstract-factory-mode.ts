/**
 * @description abstract factory mode
 * @author qingsds
 */

// 假设这里是一个手机工厂 而我现在并不知道我下一个生产线到底具体想生产一台什么样的手机, 只知道手机必须有两部分组成(硬件,操作系统)

// 这里先实现一个抽象类, 抽象类不能够被实例化
abstract class MobilePhoneFactory {
  // 实现操作系统接口
  abstract createOS(): void;
  // 实现硬件的接口
  abstract createHardWare(): void;
}

// 这里需要一个类来实现抽象类的功能
class StarLight implements MobilePhoneFactory {
  createOS() {
    // 提供操作系统实例
    return new AndroidOS();
  }
  createHardWare() {
    // 提供硬件实例
    return new QualcommHardWare();
  }
}

// 操作系统
abstract class OS {
  abstract controlHardWare(): void;
}

class AndroidOS implements OS {
  controlHardWare() {
    console.log('android');
  }
}

class AppleOS implements OS {
  controlHardWare() {
    console.log('AppleOS');
  }
}

// 硬件
abstract class HardWare {
  abstract operateByOrder(): void;
}

class QualcommHardWare implements HardWare {
  operateByOrder() {
    console.log('qualcomm');
  }
}
class AppleHardWare implements HardWare {
  operateByOrder() {
    console.log('apple');
  }
}

const startLight = new StarLight();
const os = startLight.createOS();
const hardWare = startLight.createHardWare();
os.controlHardWare();
hardWare.operateByOrder();

// 这时, 来了新的产品线,只需要再创建一个类就可以了
class NewStarLightPhone implements MobilePhoneFactory {
  createOS() {
    return new AppleOS();
  }
  createHardWare() {
    return new AppleHardWare();
  }
}

/**
 * 抽象工厂的组成
 * 1. 抽象工厂(抽象类,不能用于具体实例) 用于声明产品的共性
 * 2. 具体工厂(用来实现抽象工厂的功能)
 * 3. 抽象产品(抽象类,不能被实例化) 将产品的共性抽象为一个类
 * 4. 具体产品(用来具体实现抽象产品的功能)
 */
