Feature: Go to Google with different browsers
	
@Google
Scenario Outline: Open Google
	Given Go to Google with <browser>
	Examples:
	  | browser 			 |
	  | Chrome  			 |
	  | MicrosoftEdge        |