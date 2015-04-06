package pt.uc.dei.nobugssnackbar.i18n;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.ListResourceBundle;
import java.util.Properties;

import org.apache.commons.lang3.StringEscapeUtils;

import com.eclipsesource.json.JsonObject;
import com.eclipsesource.json.JsonObject.Member;

public class Messages extends ListResourceBundle {

	protected String fileName = "en";
	
	private Object[][] contents;

	@Override
	protected Object[][] getContents() {

		if (contents == null)
			try {
				InputStream inputStream = getClass().getResourceAsStream("/pt/uc/dei/nobugssnackbar/i18n/messages_" + fileName + ".properties");
				
				Properties props = new Properties();
				props.load(inputStream);
				
				inputStream = getClass().getResourceAsStream("/pt/uc/dei/nobugssnackbar/i18n/" + fileName + ".json");
				JsonObject jsonObject = JsonObject.readFrom(new InputStreamReader( inputStream ));
				
				contents = new Object[jsonObject.size() + props.values().size()][2];
				
				int i = 0;
				for (Member member : jsonObject) {
					
					if (member.getValue().isString()) {
						String name = member.getName();
						String value = member.getValue().asString();
						
						contents[i][0] = name;
						contents[i][1] = StringEscapeUtils.unescapeHtml4( value );
						
						i++;
					}
				}
				
				for (Object k:props.keySet()) {
					contents[i][0] = k;
					contents[i][1] = props.get(k);
					i++;
				}
				contents = Arrays.copyOf(contents, i);
				
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		
		return contents;
	}

}
