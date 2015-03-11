package pt.uc.dei.nobugssnackbar.dao;

import java.util.List;

public interface Dao<T> {

	T read(long key) throws Exception;
	void save(T obj) throws Exception;
	List<T> list() throws Exception;
	
}
