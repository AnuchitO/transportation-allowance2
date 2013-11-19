package com.spt.tsa.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.fission.web.view.extjs.grid.GridData;
import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.domain.SCP007Domain01;
import com.spt.tsa.domain.SDM009Domain01;
import com.spt.tsa.entity.ParameterTable;
import com.spt.tsa.entity.TravelDetail;
import com.spt.tsa.entity.TravelHeader;
import com.spt.tsa.service.ParameterTable01Service;


@Controller
public class SDM009Controller {
	private static final Logger logger = LoggerFactory.getLogger(SDM009Controller.class);
	private ParameterTable01Service parameterTable01Service;
	
	


	@Autowired
	public void setParameterTable01Service(
			ParameterTable01Service parameterTable01Service) {
		this.parameterTable01Service = parameterTable01Service;
	}

	@RequestMapping(value = "/SDM009.html", method = RequestMethod.GET)
	public ModelAndView view(HttpServletRequest request, HttpServletResponse response) {

		Map<String,Object> model = new HashMap<String,Object>();
		
		return new ModelAndView("SDM009", model);

	}
	
	@RequestMapping(value = "/SDM009.html", method = RequestMethod.POST, params = "method=sdmGridData")
	public void findGrid(HttpServletRequest request,
			HttpServletResponse response) {

		JSONArray jsonArray = new JSONArray();
		GridData gridData = new GridData(); 
		JSONObject jobect = null;
		List<ParameterTable> param = this.parameterTable01Service.findByDept();
		int i=0;
		for(ParameterTable c:param){
			i++;
		
				 jobect = new JSONObject();
				 jobect.accumulate("sdmNo",i);
				 jobect.accumulate("sdmIdDept",c.getEntry());
				 jobect.accumulate("sdmNameDept",c.getDetail());
				 jsonArray.add(jobect);
				 jobect.clear();
		}
		
	

		gridData.setRecords(jsonArray);
		gridData.setTotal(jsonArray.size());
		gridData.setSuccess(true);
		response.setContentType("application/json;charset=UTF-8"); 
		gridData.responseJson(response);

	}
	
	@RequestMapping(value = "/SDM009.html", method = RequestMethod.POST, params = "method=sdmsave")
	public void sdmSave(HttpServletRequest request, HttpServletResponse response,

	@ModelAttribute SDM009Domain01 domain,
			@RequestParam("sdmpack") String sdmpack

	) throws Exception {

		try {
			
			domain.setSdmpack(sdmpack);

			this.parameterTable01Service.saveOrUpdateFromParameterTable(domain);

		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
		}

	}
	
	@RequestMapping(value = "/SDM009.html", method = RequestMethod.POST, params = "method=sdmRemove")
	public void sdmRemove(HttpServletRequest request, HttpServletResponse response,

	@ModelAttribute SDM009Domain01 domain,
			@RequestParam("packRemove") String packRemove

	) throws Exception {

		try {
			domain.setPackRemove(packRemove);
			this.parameterTable01Service.removeFromParametorTable(domain);

		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
		}

	}
}