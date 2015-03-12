/**
 * NoBug's Snack Bar
 *
 * Copyright 2014 Adilson Vahldick.
 * https://nobugssnackbar.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.util.logging.Logger;

import com.mchange.v2.c3p0.ComboPooledDataSource;

public class NoBugsConnection {

	private static Logger log = Logger.getGlobal();
	
	public static NoBugsConnection getConnection() {
		return conn;
	}

	public static void buildConnection(String url, String className,
			String username, String password) throws Exception {
		if (conn == null) {
			conn = new NoBugsConnection(url, className, username, password);
			log.info("Connected successfull");
		}
	}

	private static NoBugsConnection conn;

	private ComboPooledDataSource dataSource;

	private NoBugsConnection(String url, String className, String username,
			String password) throws Exception {

		this.dataSource = new ComboPooledDataSource();
		dataSource.setDriverClass(className);
		dataSource.setJdbcUrl(url);
		dataSource.setUser(username);
		dataSource.setPassword(password);
		
		// this is necessary to prevent the time out of connections
		dataSource.setIdleConnectionTestPeriod(60);
		dataSource.setTestConnectionOnCheckin(true);
		dataSource.setPreferredTestQuery("select last_insert_id()");

	}
	
	public ComboPooledDataSource getDataSource() {
		return dataSource;
	}

}
