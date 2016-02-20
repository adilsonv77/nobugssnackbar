package nobugssnackbar;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TestRegularExpression {

	public static String EXAMPLE_TEST = "This is [%FASE%] my small example string  [%FINISHDATE%] which I'm going to use for pattern matching.";
	public static void main(String[] args) {
		String[] replaces = new String[]{"AA", "BB"};
		Pattern pattern = Pattern.compile("\\[%([A-Z])\\w+%]");
	    // in case you would like to ignore case sensitivity,
	    // you could use this statement:
	    // Pattern pattern = Pattern.compile("\\s+", Pattern.CASE_INSENSITIVE);
	    Matcher matcher = pattern.matcher(EXAMPLE_TEST);
	    // check all occurance
	    String x = "";
	    int j = 0;
	    while (matcher.find()) {
	      System.out.print("Start index: " + matcher.start());
	      System.out.print(" End index: " + matcher.end() + " ");
	      System.out.println(matcher.group());
	     // x = matcher.replaceFirst(replaces[j]);
	 //     matcher = pattern.matcher(x);
	      j++;
	    }
	    System.out.println(x);
	}

}
