package com.xuzijia.wechat.common;

import java.security.MessageDigest;
import java.util.Arrays;

/**   
*    
* 项目名称：weixin   
* 类名称：CheckUtil   
* 类描述：
* 创建人：xuzijia   
* 创建时间：2017年10月25日 上午10:57:46   
* 修改人：xuzijia   
* 修改时间：2017年10月25日 上午10:57:46   
* 修改备注：   
* @version 1.0
*    
*/
public class CheckUtil {
	private static String token="jerry";
	public static boolean checkSignature(String signature,String timestamp,String nonce){
		String[] arr=new String[]{token,timestamp,nonce};
		//排序
		Arrays.sort(arr);
		
		StringBuffer buff=new StringBuffer();
		for (int i = 0; i < arr.length; i++) {
			buff.append(arr[i]);
		}
		//ssa1加密
		
		String sha1 = getSha1(buff.toString());
		
		return sha1.equals(signature);
	}
	public static String getSha1(String str){
        if(str==null||str.length()==0){
            return null;
        }
        char hexDigits[] = {'0','1','2','3','4','5','6','7','8','9',
                'a','b','c','d','e','f'};
        try {
            MessageDigest mdTemp = MessageDigest.getInstance("SHA1");
            mdTemp.update(str.getBytes("UTF-8"));

            byte[] md = mdTemp.digest();
            int j = md.length;
            char buf[] = new char[j*2];
            int k = 0;
            for (int i = 0; i < j; i++) {
                byte byte0 = md[i];
                buf[k++] = hexDigits[byte0 >>> 4 & 0xf];
                buf[k++] = hexDigits[byte0 & 0xf];      
            }
            return new String(buf);
        } catch (Exception e) {
            // TODO: handle exception
            return null;
        }
    }
}
