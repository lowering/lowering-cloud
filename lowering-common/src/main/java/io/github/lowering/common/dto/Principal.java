package io.github.lowering.common.dto;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

public class Principal implements Serializable{

	private String username;
	private String password;
	private Boolean locked;
	private Boolean enabled;
	private Set<String> authorities = new HashSet<>();

	public Principal(){}

	public Principal(UserDetails details){
		this.username = details.getUsername();
		this.password = details.getPassword();
		this.locked = !details.isAccountNonLocked();
		this.enabled = details.isEnabled();
		this.authorities = details.getAuthorities().stream().collect(HashSet::new,(set,item)->set.add(item.getAuthority()),(left,right)->left.addAll(right));
	}

	public UserDetails getUserDetails(){
		return User.withUsername(this.username).password(this.password).accountLocked(this.locked).disabled(!this.enabled).authorities(this.authorities.toArray(new String[this.authorities.size()])).build();
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean getLocked() {
		return locked;
	}

	public void setLocked(Boolean locked) {
		this.locked = locked;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public Set<String> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(Set<String> authorities) {
		this.authorities = authorities;
	}
}
