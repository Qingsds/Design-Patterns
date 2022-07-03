/**
 * @description 适配器的业务场景, 兼容接口
 * @author qingsds
 */

// 这里是较新的 fetch api 封装的接口
class HttpUtils {
  static get(url: string) {
    return new Promise(async (res, rej) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        res(data);
      } catch (error) {
        rej(error);
      }
    });
  }

  static post(url: string, data: Record<string, any>) {
    return new Promise(async (res, rej) => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const resDate = await response.json();
        res(resDate);
      } catch (error) {
        rej((error as Error).message);
      }
    });
  }
}

// 这里是比较老了 XMLHttpRequest

function Ajax(
  type: string,
  url: string,
  data: Record<string, any>,
  success: (...props: any) => any,
  failed: (...props: any) => any
) {
  let xhr: null | XMLHttpRequest = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  type = type.toUpperCase();
  if (type === 'GET') {
    if (data) {
      xhr?.open('GET', url + data, true);
    }
    xhr?.send;
  } else if (type === 'POST') {
    xhr?.open('POST', url, true);
    xhr?.setRequestHeader('Content-Type', 'application/json');
    xhr?.send(JSON.stringify(data));
  }

  xhr!.onreadystatechange = function () {
    if (xhr!.readyState === 4) {
      if (xhr!.status === 200) {
        success(xhr?.responseText);
      } else {
        failed(xhr?.status);
      }
    }
  };
}

// 这是需要我们抹平差异的适配器模式 来将老的请求方法升级为新的
async function AjaxAdapter(
  type: string,
  url: string,
  data: Record<string, any>,
  success: (...props: any) => any,
  failed: (...props: any) => any
) {
  try {
    type = type.toUpperCase();
    let result: any = null;
    if (type === 'GET') {
      result = (await HttpUtils.get(url)) || {};
    } else if (type === 'POST') {
      result = (await HttpUtils.post(url, data)) || {};
    }
    result.statusCode === 200
      ? success && success(result)
      : failed && failed(result.statusCode);
  } catch (error) {
    failed && failed((error as Error).message);
  }
}
