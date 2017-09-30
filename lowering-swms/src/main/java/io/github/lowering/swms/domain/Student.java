package io.github.lowering.swms.domain;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="swms_student")
public class Student extends Id{

	private static final long serialVersionUID = -5143829312519863806L;
	
	private String name;
	private String email;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

}
