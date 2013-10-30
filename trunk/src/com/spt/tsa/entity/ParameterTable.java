package com.spt.tsa.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.NaturalId;




@Entity

@Table(name="PARAMETERTABLE",
uniqueConstraints = {@UniqueConstraint(columnNames={"CODE", "ENTRY"})})
public class ParameterTable  implements Serializable {
	private static final long serialVersionUID = -4122310234428712362L;
	
	@Id
	@Column(name="ID")
	private Integer id;
	
	@Column(name="CODE")
	private String code;
		
	@Column(name="ENTRY")
	private String entry;
	
	@Column(name="DETAIL")
	private String detail;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getEntry() {
		return entry;
	}

	public void setEntry(String entry) {
		this.entry = entry;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}
	
	

}
