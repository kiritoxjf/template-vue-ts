import { JSEncrypt } from 'jsencrypt'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = ""

const privateKey =''

// 加密
export function encrypt(txt: string) {
  if (txt === '' || txt === undefined) {
    return txt
  }
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) as string // 对数据进行加密
}

// 解密
export function decrypt(txt: string) {
  if (txt === '' || txt === undefined) {
    return txt
  }
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}
