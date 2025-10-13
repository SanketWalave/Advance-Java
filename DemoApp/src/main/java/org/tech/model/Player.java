package org.tech.model;

public class Player {
	private int id;
	private String name;
	private int runs;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getRuns() {
		return runs;
	}
	public void setRuns(int runs) {
		this.runs = runs;
	}
	@Override
	public String toString() {
		return "Player [id=" + id + ", name=" + name + ", runs=" + runs + "]";
	}
	

}
