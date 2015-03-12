package pt.uc.dei.nobugssnackbar.dao;

import java.util.List;

public interface Dao<T> {

	T read(Object... key) throws Exception;
	void save(T obj) throws Exception;
	List<T> list() throws Exception;
	void delete(Object... key) throws Exception;
	
}
