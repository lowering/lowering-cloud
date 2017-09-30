package io.github.lowering.swms.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.MappedSuperclass;

import org.hibernate.annotations.GenericGenerator;

@MappedSuperclass
public abstract class Id implements Serializable{

	private static final long serialVersionUID = 1998027270187620294L;
	
	@javax.persistence.Id
	@GenericGenerator(name = "uuid",strategy = "uuid")
	@GeneratedValue(generator = "uuid")
	@Column(length = 32)
	private String id;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
}
