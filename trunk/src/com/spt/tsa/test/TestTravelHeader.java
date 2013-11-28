package com.spt.tsa.test;

import static org.junit.Assert.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;

import org.junit.Test;
import org.tuxilla.main;

import com.spt.tsa.dao.Impl.TravelHeader01DaoImpl;

public class TestTravelHeader {
//	@Test
//	public void test() {
//		
//	}
	public static void main(String[] args) {
		Calendar today = new GregorianCalendar(2013,11,11);
		SimpleDateFormat fmtDate = new SimpleDateFormat("dd/MM/yyyy",Locale.US);
		System.out.println(fmtDate.format(new Date(today.getTimeInMillis())));
		
		
	}
}
