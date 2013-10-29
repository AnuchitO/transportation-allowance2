package com.ss.trainning.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table( name = "MSTDEP" )
public class Department implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4122310234428712362L;
	@Id
	@Column (name = "MSDDPCD")
	private String code;
	
	@Column (name = "MSDEDESC")
	private String description;
	
	
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	
}
