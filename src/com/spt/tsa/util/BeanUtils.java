package com.spt.tsa.util;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanMap;

public class BeanUtils {

	public static boolean isEmpty(String st){
		boolean b = true;
		if(st!=null && st.trim().length()>0){
			b = false;
		}
		return (b);

	}

	public static boolean isEmpty(StringBuilder st){
		boolean b = true;
		if(st!=null && st.toString().trim().length()>0){
			b = false;
		}
		return (b);

	}

	public static boolean isEmpty(List<?> ls ){
		boolean b = true;
		if(ls!=null && !ls.isEmpty()){
			b = false;
		}
		return (b);

	}

	public static boolean isEmpty(Map<?, ?> map){
		boolean b = true;
		if(map!=null && !map.isEmpty()){
			b = false;
		}
		return(b);
	}

	public static boolean isEmpty(Integer integer){
		boolean b = isNull(integer);
		return (b);

	}

	public static boolean isEmpty(Byte byt){
		boolean b = isNull(byt);
		return (b);

	}

	public static boolean isEmpty(Short s){
		boolean b = isNull(s);
		return (b);

	}

	public static boolean isEmpty(Long l){
		boolean b = isNull(l);
		return (b);

	}

	public static boolean isEmpty(Character c){
		boolean b = isNull(c);
		return (b);

	}

	public static boolean isEmpty(Float f){
		boolean b = isNull(f);
		return (b);

	}

	public static boolean isEmpty(Double d){
		boolean b = isNull(d);
		return (b);

	}

	public static boolean isEmpty(Number num){
		boolean b = isNull(num);
		return (b);

	}

	public static boolean isEmpty(BigDecimal d){
		boolean b = isNull(d);
		return (b);

	}

	public static boolean isNull(Object obj){
		boolean b = true;
		if(obj != null){
			b = false;
		}
		return (b);
	}

	public static Object getDefaultValueIfNull(Object value, Object defaultValue){
		Object result = defaultValue;
		if(value != null){
			result = value;
		}
		return(result);
	}

	public static boolean isNotEmpty(String st){
		boolean b = true;
		if(st ==null || st.trim().length()==0){
			b = false;
		}
		return (b);

	}

	public static boolean isNotEmpty(List<?> ls ){
		boolean b = false;
		if(ls!=null && !ls.isEmpty()){
			b = true;
		}
		return (b);

	}

	public static boolean isNotEmpty(Map<?,?> map){
		boolean b = false;
		if(map!=null && !map.isEmpty()){
			b = true;
		}
		return(b);
	}

	public static boolean isNotEmpty(Integer integer){
		boolean b = isNotNull(integer);
		return (b);

	}

	public static boolean isNotEmpty(Byte byt){
		boolean b = isNotNull(byt);
		return (b);

	}

	public static boolean isNotEmpty(Short s){
		boolean b = isNotNull(s);
		return (b);

	}

	public static boolean isNotEmpty(Long l){
		boolean b = isNotNull(l);
		return (b);

	}

	public static boolean isNotEmpty(Character c){
		boolean b = isNotNull(c);
		return (b);

	}

	public static boolean isNotEmpty(Float f){
		boolean b = isNotNull(f);
		return (b);

	}

	public static boolean isNotEmpty(Double d){
		boolean b = isNotNull(d);
		return (b);

	}

	public static boolean isNotEmpty(Number num){
		boolean b = isNotNull(num);
		return (b);

	}

	public static boolean isNotEmpty(BigDecimal d){
		boolean b = isNotNull(d);
		return (b);

	}

	public static boolean isNotEmpty(Object obj){
		boolean b = false;
		if(obj != null){
			b = (obj instanceof String)?isNotEmpty((String)obj):
				(obj instanceof Integer)?isNotEmpty((Integer)obj):
				(obj instanceof Byte)?isNotEmpty((Byte)obj):
				(obj instanceof Short)?isNotEmpty((Short)obj):
				(obj instanceof Long)?isNotEmpty((Long)obj):
				(obj instanceof Character)?isNotEmpty((Character)obj):
				(obj instanceof Float)?isNotEmpty((Float)obj):
				(obj instanceof Double)?isNotEmpty((Double)obj):
				(obj instanceof Number)?isNotEmpty((Number)obj):
				(obj instanceof BigDecimal)?isNotEmpty((BigDecimal)obj):true;
		}
		
		return (b);
	}

	public static boolean isNotNull(Object obj){
		boolean b = false;
		if(obj != null){
			b = true;
		}
		return (b);
	}
	
	public static List<Map<String,Object>> listBeanToListMap(List obj){
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		if(isNotEmpty(obj)) for(Object c:obj){
			list.add(new BeanMap(c));
		}
		return list;
	}
	
	public static Map<String,Object> beanToMap(Object obj){
		return new BeanMap(obj);
	}
	
	public static Map<String,Object> paramUrlToMap(String paramUrl){
		Map<String, Object> paramMap = new  HashMap<String, Object>();
		for(String c:paramUrl.split("&")){
			if(BeanUtils.isNotEmpty(c)&& c.indexOf("=") >=0){
				String[] strTmp = c.split("=");
				if(BeanUtils.isNotEmpty(strTmp[0])) paramMap.put(strTmp[0], strTmp[1]);
			}
		}
		return paramMap;
	}
}
